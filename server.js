const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static('uploads'));

// Serve static files from React build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
}

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://recruitment:password@cluster.mongodb.net/recruitment?retryWrites=true&w=majority');
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
};

// Models
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'client', 'salesrep'], required: true },
  name: { type: String, required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  salesRepId: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesRep' },
  createdAt: { type: Date, default: Date.now }
});

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  crmType: { type: String, enum: ['teamleader', 'hubspot', 'pipedrive'], default: 'teamleader' },
  crmCredentials: {
    accessToken: String,
    refreshToken: String,
    clientId: String,
    clientSecret: String,
    expiresAt: Date,
    portalId: String
  },
  commissionRate: { type: Number, default: 0.10 }, // Fixed: Now correctly represents 10%
  commissionCap: { type: Number, default: 50000 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const salesRepSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  position: { type: String, default: 'Sales Representative' },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  hireDate: { type: Date, required: true },
  commissionRate: { type: Number, default: 0.10 }, // Individual commission rate
  crmContactId: String,
  isConnected: { type: Boolean, default: false },
  totalRevenue: { type: Number, default: 0 },
  totalCommission: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const revenueSchema = new mongoose.Schema({
  salesRepId: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesRep', required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  revenue: { type: Number, required: true },
  commission: { type: Number, required: true },
  lastSyncAt: { type: Date, default: Date.now }
});

const invoiceSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  salesRepId: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesRep' }, // Optional: for sales rep specific invoices
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Who uploaded this invoice
  invoiceNumber: { type: String, required: true },
  amount: { type: Number, required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  type: { type: String, enum: ['client', 'commission'], default: 'client' }, // client invoice or commission invoice
  filePath: String,
  fileName: String,
  paidAt: Date,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Client = mongoose.model('Client', clientSchema);
const SalesRep = mongoose.model('SalesRep', salesRepSchema);
const Revenue = mongoose.model('Revenue', revenueSchema);
const Invoice = mongoose.model('Invoice', invoiceSchema);

// Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'recruitment_jwt_secret_2024', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

const requireClient = (req, res, next) => {
  if (req.user.role !== 'client') {
    return res.status(403).json({ message: 'Client access required' });
  }
  next();
};

const requireSalesRep = (req, res, next) => {
  if (req.user.role !== 'salesrep') {
    return res.status(403).json({ message: 'Sales representative access required' });
  }
  next();
};

// File upload setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/invoices';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF documents allowed.'));
    }
  }
});

// API Routes
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Recruiters Network API',
    version: '2.0.0',
    status: 'running',
    features: ['Admin Portal', 'Client Portal', 'Sales Rep Portal', 'Invoice Management']
  });
});

// Auth Routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email })
      .populate('clientId')
      .populate('salesRepId');
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email, 
        role: user.role,
        clientId: user.clientId?._id,
        salesRepId: user.salesRepId?._id
      },
      process.env.JWT_SECRET || 'recruitment_jwt_secret_2024',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        client: user.clientId,
        salesRep: user.salesRepId
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin Routes - Client Management
app.post('/api/admin/clients', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { name, contactName, email, phone, address, commissionRate, commissionCap, crmType } = req.body;
    
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: 'Client with this email already exists' });
    }
    
    const client = new Client({
      name,
      contactName,
      email,
      phone,
      address,
      commissionRate: commissionRate || 0.10,
      commissionCap: commissionCap || 50000,
      crmType: crmType || 'teamleader'
    });
    
    await client.save();
    
    // Create client user account
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 12);
    const clientUser = new User({
      email,
      password: hashedPassword,
      role: 'client',
      name: contactName,
      clientId: client._id
    });
    
    await clientUser.save();
    
    res.status(201).json({ 
      message: 'Client created successfully',
      client,
      tempPassword,
      loginUrl: `${process.env.FRONTEND_URL || 'http://localhost:3000'}`
    });
  } catch (error) {
    console.error('Create client error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/admin/clients', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const clients = await Client.find({ isActive: true }).sort({ createdAt: -1 });
    
    const clientsWithCounts = await Promise.all(
      clients.map(async (client) => {
        const salesRepCount = await SalesRep.countDocuments({ clientId: client._id, isActive: true });
        const connectedCount = await SalesRep.countDocuments({ clientId: client._id, isActive: true, isConnected: true });
        const invoiceCount = await Invoice.countDocuments({ clientId: client._id });
        
        return {
          ...client.toObject(),
          salesRepCount,
          connectedCount,
          invoiceCount
        };
      })
    );
    
    res.json(clientsWithCounts);
  } catch (error) {
    console.error('Get clients error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single client details for admin
app.get('/api/admin/clients/:clientId', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { clientId } = req.params;
    
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    const salesReps = await SalesRep.find({ clientId, isActive: true }).sort({ createdAt: -1 });
    const invoices = await Invoice.find({ clientId }).sort({ year: -1, month: -1 });
    
    res.json({
      client,
      salesReps,
      invoices
    });
  } catch (error) {
    console.error('Get client details error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.put('/api/admin/clients/:clientId', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { clientId } = req.params;
    const { name, contactName, email, phone, address, commissionRate, commissionCap, crmType } = req.body;
    
    const client = await Client.findByIdAndUpdate(
      clientId,
      {
        name,
        contactName,
        email,
        phone,
        address,
        commissionRate,
        commissionCap,
        crmType
      },
      { new: true, runValidators: true }
    );
    
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    // Update user account
    await User.findOneAndUpdate(
      { clientId: clientId },
      { 
        email,
        name: contactName 
      }
    );
    
    res.json({ 
      message: 'Client updated successfully',
      client 
    });
  } catch (error) {
    console.error('Update client error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.delete('/api/admin/clients/:clientId', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { clientId } = req.params;
    
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Delete all sales reps for this client
      const salesReps = await SalesRep.find({ clientId });
      for (const salesRep of salesReps) {
        // Delete sales rep user accounts
        await User.deleteOne({ salesRepId: salesRep._id }, { session });
      }
      await SalesRep.deleteMany({ clientId }, { session });
      
      // Delete all revenue records
      await Revenue.deleteMany({ clientId }, { session });
      
      // Delete all invoices and their files
      const invoices = await Invoice.find({ clientId });
      for (const invoice of invoices) {
        if (invoice.filePath && fs.existsSync(invoice.filePath)) {
          fs.unlinkSync(invoice.filePath);
        }
      }
      await Invoice.deleteMany({ clientId }, { session });
      
      // Delete client user account
      await User.deleteOne({ clientId }, { session });
      
      // Delete client
      const deletedClient = await Client.findByIdAndDelete(clientId, { session });
      
      if (!deletedClient) {
        await session.abortTransaction();
        return res.status(404).json({ message: 'Client not found' });
      }
      
      await session.commitTransaction();
      
      res.json({ 
        message: 'Client and all associated data deleted successfully',
        deletedClient: {
          name: deletedClient.name,
          email: deletedClient.email
        }
      });
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.error('Delete client error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin Sales Rep Management
app.post('/api/admin/clients/:clientId/salesreps', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { clientId } = req.params;
    const { name, email, phone, position, hireDate, commissionRate } = req.body;
    
    // Check if email is already in use
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email address already in use' });
    }
    
    // Create sales rep
    const salesRep = new SalesRep({
      name,
      email,
      phone,
      position: position || 'Sales Representative',
      clientId,
      hireDate: new Date(hireDate),
      commissionRate: commissionRate || 0.10
    });
    
    await salesRep.save();
    
    // Create user account for the sales rep
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 12);
    
    const salesRepUser = new User({
      email,
      password: hashedPassword,
      role: 'salesrep',
      name,
      clientId,
      salesRepId: salesRep._id
    });
    
    await salesRepUser.save();
    
    res.status(201).json({ 
      message: 'Sales representative added successfully',
      salesRep,
      tempPassword,
      loginCredentials: {
        email,
        password: tempPassword,
        loginUrl: `${process.env.FRONTEND_URL || 'http://localhost:3000'}`
      }
    });
  } catch (error) {
    console.error('Add sales rep error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update sales rep
app.put('/api/admin/salesreps/:salesRepId', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { salesRepId } = req.params;
    const { name, email, phone, position, commissionRate } = req.body;
    
    const salesRep = await SalesRep.findByIdAndUpdate(
      salesRepId,
      {
        name,
        email,
        phone,
        position,
        commissionRate
      },
      { new: true, runValidators: true }
    );
    
    if (!salesRep) {
      return res.status(404).json({ message: 'Sales representative not found' });
    }
    
    // Update user account
    await User.findOneAndUpdate(
      { salesRepId },
      { 
        email,
        name
      }
    );
    
    res.json({ 
      message: 'Sales representative updated successfully',
      salesRep 
    });
  } catch (error) {
    console.error('Update sales rep error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete sales rep
app.delete('/api/admin/salesreps/:salesRepId', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { salesRepId } = req.params;
    
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // Delete user account
      await User.deleteOne({ salesRepId }, { session });
      
      // Delete revenue records
      await Revenue.deleteMany({ salesRepId }, { session });
      
      // Delete sales rep invoices
      const invoices = await Invoice.find({ salesRepId });
      for (const invoice of invoices) {
        if (invoice.filePath && fs.existsSync(invoice.filePath)) {
          fs.unlinkSync(invoice.filePath);
        }
      }
      await Invoice.deleteMany({ salesRepId }, { session });
      
      // Delete sales rep
      const deletedSalesRep = await SalesRep.findByIdAndDelete(salesRepId, { session });
      
      if (!deletedSalesRep) {
        await session.abortTransaction();
        return res.status(404).json({ message: 'Sales representative not found' });
      }
      
      await session.commitTransaction();
      
      res.json({ 
        message: 'Sales representative deleted successfully',
        deletedSalesRep: {
          name: deletedSalesRep.name,
          email: deletedSalesRep.email
        }
      });
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.error('Delete sales rep error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin Invoice Management
app.post('/api/admin/clients/:clientId/invoices', authenticateToken, requireAdmin, upload.single('invoice'), async (req, res) => {
  try {
    const { clientId } = req.params;
    const { invoiceNumber, amount, month, year, status, description, type, salesRepId } = req.body;
    
    const invoice = new Invoice({
      clientId,
      salesRepId: salesRepId || undefined,
      uploadedBy: req.user.userId,
      invoiceNumber,
      amount: parseFloat(amount),
      month: parseInt(month),
      year: parseInt(year),
      status: status || 'pending',
      type: type || 'client',
      description,
      filePath: req.file?.path,
      fileName: req.file?.originalname
    });
    
    await invoice.save();
    
    await invoice.populate(['uploadedBy', 'salesRepId']);
    
    res.status(201).json({ 
      message: 'Invoice uploaded successfully', 
      invoice 
    });
  } catch (error) {
    console.error('Upload invoice error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Client Routes
app.get('/api/client/dashboard', authenticateToken, requireClient, async (req, res) => {
  try {
    const clientId = req.user.clientId;
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const client = await Client.findById(clientId);
    const salesReps = await SalesRep.find({ clientId, isActive: true });
    
    const currentRevenue = await Revenue.find({
      clientId,
      month: currentMonth,
      year: currentYear
    }).populate('salesRepId');

    const totalRevenue = currentRevenue.reduce((sum, record) => sum + record.revenue, 0);
    const totalCommission = currentRevenue.reduce((sum, record) => sum + record.commission, 0);

    const repsWithData = salesReps.map(rep => {
      const revenueRecord = currentRevenue.find(r => r.salesRepId && r.salesRepId._id.toString() === rep._id.toString());
      return {
        ...rep.toObject(),
        thisMonthRevenue: revenueRecord?.revenue || 0,
        thisMonthCommission: revenueRecord?.commission || 0
      };
    });

    res.json({
      client,
      salesReps: repsWithData,
      totals: {
        thisMonthRevenue: totalRevenue,
        thisMonthCommission: totalCommission
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/client/invoices', authenticateToken, requireClient, async (req, res) => {
  try {
    const invoices = await Invoice.find({ clientId: req.user.clientId })
      .populate(['uploadedBy', 'salesRepId'])
      .sort({ year: -1, month: -1 });
    
    res.json(invoices);
  } catch (error) {
    console.error('Get invoices error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/client/invoices/:invoiceId/download', authenticateToken, requireClient, async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.invoiceId);
    
    if (!invoice || invoice.clientId.toString() !== req.user.clientId) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    if (!invoice.filePath || !fs.existsSync(invoice.filePath)) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.download(invoice.filePath, invoice.fileName || `invoice-${invoice.invoiceNumber}.pdf`);
  } catch (error) {
    console.error('Download invoice error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Sales Rep Routes
app.get('/api/salesrep/dashboard', authenticateToken, requireSalesRep, async (req, res) => {
  try {
    const salesRepId = req.user.salesRepId;
    const clientId = req.user.clientId;
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    const salesRep = await SalesRep.findById(salesRepId).populate('clientId');
    const currentRevenue = await Revenue.findOne({
      salesRepId,
      month: currentMonth,
      year: currentYear
    });

    const myInvoices = await Invoice.find({ salesRepId })
      .sort({ year: -1, month: -1 })
      .limit(5);

    const revenueHistory = await Revenue.find({ salesRepId })
      .sort({ year: -1, month: -1 })
      .limit(12);

    res.json({
      salesRep,
      currentRevenue: currentRevenue || { revenue: 0, commission: 0 },
      myInvoices,
      revenueHistory
    });
  } catch (error) {
    console.error('Sales rep dashboard error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/salesrep/invoices', authenticateToken, requireSalesRep, async (req, res) => {
  try {
    const invoices = await Invoice.find({ 
      $or: [
        { salesRepId: req.user.salesRepId },
        { clientId: req.user.clientId, salesRepId: { $exists: false } } // Client invoices visible to all reps
      ]
    })
      .populate(['uploadedBy', 'salesRepId'])
      .sort({ year: -1, month: -1 });
    
    res.json(invoices);
  } catch (error) {
    console.error('Get sales rep invoices error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/salesrep/invoices', authenticateToken, requireSalesRep, upload.single('invoice'), async (req, res) => {
  try {
    const { invoiceNumber, amount, month, year, description, type } = req.body;
    
    const invoice = new Invoice({
      clientId: req.user.clientId,
      salesRepId: req.user.salesRepId,
      uploadedBy: req.user.userId,
      invoiceNumber,
      amount: parseFloat(amount),
      month: parseInt(month),
      year: parseInt(year),
      status: 'pending',
      type: type || 'commission',
      description,
      filePath: req.file?.path,
      fileName: req.file?.originalname
    });
    
    await invoice.save();
    await invoice.populate(['uploadedBy', 'salesRepId']);
    
    res.status(201).json({ 
      message: 'Invoice uploaded successfully', 
      invoice 
    });
  } catch (error) {
    console.error('Sales rep upload invoice error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/salesrep/invoices/:invoiceId/download', authenticateToken, requireSalesRep, async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.invoiceId);
    
    // Sales rep can download their own invoices or client invoices
    const canDownload = invoice && (
      invoice.salesRepId?.toString() === req.user.salesRepId ||
      (invoice.clientId.toString() === req.user.clientId && !invoice.salesRepId)
    );
    
    if (!canDownload) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    if (!invoice.filePath || !fs.existsSync(invoice.filePath)) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.download(invoice.filePath, invoice.fileName || `invoice-${invoice.invoiceNumber}.pdf`);
  } catch (error) {
    console.error('Sales rep download invoice error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// CRM Integration Routes (existing code...)
app.get('/api/client/crm/connect', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'client') {
      return res.status(403).json({ message: 'Client access required' });
    }

    const client = await Client.findById(req.user.clientId);
    const { type } = req.query;
    
    let authUrl;
    
    switch (type || client.crmType) {
      case 'teamleader':
        authUrl = `https://app.teamleader.eu/oauth2/authorize?client_id=${process.env.TEAMLEADER_CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(process.env.TEAMLEADER_REDIRECT_URI)}&state=${req.user.clientId}`;
        break;
      case 'hubspot':
        authUrl = `https://app.hubspot.com/oauth/authorize?client_id=${process.env.HUBSPOT_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.HUBSPOT_REDIRECT_URI)}&scope=crm.objects.contacts.read&state=${req.user.clientId}`;
        break;
      default:
        return res.status(400).json({ message: 'Unsupported CRM type' });
    }
    
    res.json({ authUrl });
  } catch (error) {
    console.error('CRM connect error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// HubSpot OAuth Callback
app.get('/auth/hubspot/callback', async (req, res) => {
  try {
    const { code, state } = req.query;
    const clientId = state;
    
    if (!code) {
      return res.status(400).send('❌ Authorization code not provided');
    }

    console.log('HubSpot OAuth callback received:', { code: code.substring(0, 20) + '...', clientId });

    const tokenResponse = await fetch('https://api.hubapi.com/oauth/v1/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.HUBSPOT_CLIENT_ID,
        client_secret: process.env.HUBSPOT_CLIENT_SECRET,
        redirect_uri: process.env.HUBSPOT_REDIRECT_URI,
        code: code
      })
    });

    const tokenData = await tokenResponse.json();
    
    if (!tokenResponse.ok) {
      console.error('HubSpot token error:', tokenData);
      return res.status(400).send(`❌ OAuth Error: ${tokenData.message || tokenData.error}`);
    }

    await Client.findByIdAndUpdate(clientId, {
      crmCredentials: {
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        expiresAt: new Date(Date.now() + (tokenData.expires_in * 1000)),
        portalId: tokenData.hub_id || tokenData.hub_domain
      }
    });

    const frontendUrl = process.env.FRONTEND_URL || 'https://recruitment-portal-2ai9.onrender.com';
    res.redirect(`${frontendUrl}?crm_connected=success`);
    
  } catch (error) {
    console.error('HubSpot OAuth callback error:', error);
    res.status(500).send(`❌ Internal server error during OAuth: ${error.message}`);
  }
});

// Get available CRMs
app.get('/api/crm/available', authenticateToken, async (req, res) => {
  try {
    const availableCRMs = [
      { id: 'teamleader', name: 'Teamleader', description: 'Complete business management' },
      { id: 'hubspot', name: 'HubSpot', description: 'Customer relationship management' },
      { id: 'pipedrive', name: 'Pipedrive', description: 'Sales-focused CRM' }
    ];
    
    res.json(availableCRMs);
  } catch (error) {
    console.error('Get available CRMs error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update CRM settings
app.post('/api/client/crm/settings', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'client') {
      return res.status(403).json({ message: 'Client access required' });
    }

    const { crmType } = req.body;
    const clientId = req.user.clientId;
    
    const client = await Client.findByIdAndUpdate(
      clientId,
      { crmType },
      { new: true }
    );
    
    res.json({ 
      message: 'CRM settings updated successfully',
      client 
    });
  } catch (error) {
    console.error('Update CRM settings error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// CRM Sync
app.post('/api/client/crm/sync', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'client') {
      return res.status(403).json({ message: 'Client access required' });
    }

    const clientId = req.user.clientId;
    const client = await Client.findById(clientId);
    
    if (!client.crmCredentials?.accessToken) {
      return res.status(400).json({ message: 'CRM not connected. Please connect your CRM first.' });
    }

    let syncResult;
    
    if (client.crmType === 'hubspot') {
      syncResult = await syncHubSpotContacts(client, clientId);
    } else {
      syncResult = await demoSync(client, clientId);
    }
    
    res.json(syncResult);

  } catch (error) {
    console.error('CRM sync error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// HubSpot sync function
async function syncHubSpotContacts(client, clientId) {
  try {
    console.log('Starting HubSpot sync for client:', clientId);

    if (new Date() >= new Date(client.crmCredentials.expiresAt)) {
      await refreshHubSpotToken(client);
      client = await Client.findById(clientId);
    }

    const contactsResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts?properties=email,firstname,lastname,createdate&limit=100', {
      headers: {
        'Authorization': `Bearer ${client.crmCredentials.accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    const contactsData = await contactsResponse.json();
    
    if (!contactsResponse.ok) {
      throw new Error(`HubSpot API error: ${contactsData.message || 'Unknown error'}`);
    }

    console.log(`Found ${contactsData.results.length} contacts in HubSpot`);

    const salesReps = await SalesRep.find({ clientId });
    let updatedReps = 0;
    let newReps = 0;

    for (const contact of contactsData.results) {
      const email = contact.properties.email;
      const firstName = contact.properties.firstname || '';
      const lastName = contact.properties.lastname || '';
      const fullName = `${firstName} ${lastName}`.trim() || email?.split('@')[0] || 'Unknown';

      if (!email) continue;

      let salesRep = salesReps.find(rep => 
        rep.email.toLowerCase() === email.toLowerCase()
      );

      if (salesRep && !salesRep.isConnected) {
        salesRep.isConnected = true;
        salesRep.crmContactId = contact.id;
        if (salesRep.name === 'Unknown' || salesRep.name === email) {
          salesRep.name = fullName;
        }
        await salesRep.save();
        updatedReps++;
        console.log(`Updated existing rep: ${salesRep.name} (${email})`);
      } else if (!salesRep) {
        const createDate = contact.properties.createdate ? new Date(contact.properties.createdate) : new Date();
        
        salesRep = new SalesRep({
          name: fullName,
          email: email,
          clientId,
          hireDate: createDate,
          isConnected: true,
          crmContactId: contact.id
        });
        await salesRep.save();
        
        // Create user account for new sales rep
        const tempPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(tempPassword, 12);
        
        const salesRepUser = new User({
          email,
          password: hashedPassword,
          role: 'salesrep',
          name: fullName,
          clientId,
          salesRepId: salesRep._id
        });
        
        await salesRepUser.save();
        newReps++;
        console.log(`Created new rep: ${fullName} (${email}) - Password: ${tempPassword}`);
      }

      if (salesRep?.isConnected) {
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        const mockRevenue = Math.floor(Math.random() * 50000) + 15000;
        const commission = mockRevenue * client.commissionRate;

        await Revenue.findOneAndUpdate(
          { salesRepId: salesRep._id, month: currentMonth, year: currentYear },
          {
            salesRepId: salesRep._id,
            clientId,
            month: currentMonth,
            year: currentYear,
            revenue: mockRevenue,
            commission,
            lastSyncAt: new Date()
          },
          { upsert: true }
        );
      }
    }

    return { 
      message: `✅ HubSpot sync completed! ${updatedReps} reps updated, ${newReps} new reps created from CRM.`,
      updatedReps,
      newReps,
      totalContacts: contactsData.results.length,
      lastSync: new Date(),
      crmType: 'HubSpot'
    };

  } catch (error) {
    console.error('HubSpot sync error:', error);
    throw new Error(`HubSpot sync failed: ${error.message}`);
  }
}

// Demo sync function
async function demoSync(client, clientId) {
  const salesReps = await SalesRep.find({ clientId });
  let updatedReps = 0;

  for (const rep of salesReps) {
    if (!rep.isConnected) {
      if (Math.random() > 0.5) {
        rep.isConnected = true;
        rep.crmContactId = `demo_${rep._id}`;
        
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        const mockRevenue = Math.floor(Math.random() * 50000) + 10000;
        const commission = mockRevenue * client.commissionRate;

        await Revenue.findOneAndUpdate(
          { salesRepId: rep._id, month: currentMonth, year: currentYear },
          {
            salesRepId: rep._id,
            clientId,
            month: currentMonth,
            year: currentYear,
            revenue: mockRevenue,
            commission,
            lastSyncAt: new Date()
          },
          { upsert: true }
        );

        await rep.save();
        updatedReps++;
      }
    }
  }

  return { 
    message: `🎯 Demo sync completed. ${updatedReps} sales reps updated.`,
    updatedReps,
    lastSync: new Date(),
    crmType: 'Demo'
  };
}

// Token refresh helper
async function refreshHubSpotToken(client) {
  try {
    const refreshResponse = await fetch('https://api.hubapi.com/oauth/v1/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        client_id: process.env.HUBSPOT_CLIENT_ID,
        client_secret: process.env.HUBSPOT_CLIENT_SECRET,
        refresh_token: client.crmCredentials.refreshToken
      })
    });

    const refreshData = await refreshResponse.json();
    
    if (refreshResponse.ok) {
      await Client.findByIdAndUpdate(client._id, {
        'crmCredentials.accessToken': refreshData.access_token,
        'crmCredentials.refreshToken': refreshData.refresh_token || client.crmCredentials.refreshToken,
        'crmCredentials.expiresAt': new Date(Date.now() + (refreshData.expires_in * 1000))
      });
      console.log('HubSpot token refreshed successfully');
    } else {
      console.error('HubSpot token refresh failed:', refreshData);
    }
  } catch (error) {
    console.error('HubSpot token refresh failed:', error);
  }
}

// Initialize default admin and demo data
const initializeAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('admin123', 12);
      const admin = new User({
        email: 'admin@recruitersnetwork.nl',
        password: hashedPassword,
        role: 'admin',
        name: 'Admin User'
      });
      await admin.save();
      console.log('✓ Default admin created: admin@recruitersnetwork.nl / admin123');
    }

    const demoClient = await Client.findOne({ email: 'demo@acmecorp.com' });
    if (!demoClient) {
      const client = new Client({
        name: 'Acme Corporation',
        contactName: 'John Doe',
        email: 'demo@acmecorp.com',
        phone: '+31 20 123 4567',
        address: 'Damrak 70, 1012 LM Amsterdam',
        commissionRate: 0.10,
        commissionCap: 50000,
        crmType: 'hubspot'
      });
      await client.save();

      const hashedPassword = await bcrypt.hash('demo123', 12);
      const clientUser = new User({
        email: 'demo@acmecorp.com',
        password: hashedPassword,
        role: 'client',
        name: 'John Doe',
        clientId: client._id
      });
      await clientUser.save();

      // Add demo sales reps with accounts
      const salesRepsData = [
        { name: 'Sarah Johnson', email: 'sarah@acmecorp.com', phone: '+31 20 123 4568', hireDate: new Date('2024-01-15') },
        { name: 'Mike Chen', email: 'mike@acmecorp.com', phone: '+31 20 123 4569', hireDate: new Date('2024-03-01') },
        { name: 'Emma Wilson', email: 'emma@acmecorp.com', phone: '+31 20 123 4570', hireDate: new Date('2024-08-15') }
      ];

      for (const repData of salesRepsData) {
        const rep = new SalesRep({
          ...repData,
          clientId: client._id,
          position: 'Sales Representative',
          isConnected: Math.random() > 0.6
        });
        await rep.save();

        // Create user account for demo sales rep
        const repPassword = await bcrypt.hash('demo123', 12);
        const salesRepUser = new User({
          email: repData.email,
          password: repPassword,
          role: 'salesrep',
          name: repData.name,
          clientId: client._id,
          salesRepId: rep._id
        });
        await salesRepUser.save();
      }

      console.log('✓ Demo client created: demo@acmecorp.com / demo123');
      console.log('✓ Demo sales reps created with password: demo123');
    }
  } catch (error) {
    console.error('Initialization error:', error);
  }
};

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? error.message : undefined
  });
});

// Serve React app
app.get('*', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    res.sendFile(path.join(__dirname, 'build/index.html'));
  } else {
    res.status(404).json({ message: 'Route not found' });
  }
});

// Start server
const startServer = async () => {
  try {
    await connectDB();
    await initializeAdmin();
    
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📝 API Documentation: http://localhost:${PORT}/api`);
      console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 Multi-Portal System: Admin | Client | Sales Rep`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
