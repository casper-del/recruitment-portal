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
  role: { type: String, enum: ['admin', 'client'], required: true },
  name: { type: String, required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  createdAt: { type: Date, default: Date.now }
});

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  contactName: { type: String, required: true },
  email: { type: String, required: true },
  crmType: { type: String, enum: ['teamleader', 'hubspot', 'pipedrive'], default: 'teamleader' },
  crmCredentials: {
    accessToken: String,
    refreshToken: String,
    clientId: String,
    clientSecret: String,
    expiresAt: Date
  },
  commissionRate: { type: Number, default: 0.10 },
  commissionCap: { type: Number, default: 50000 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const salesRepSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  hireDate: { type: Date, required: true },
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
  invoiceNumber: { type: String, required: true },
  amount: { type: Number, required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'paid'], default: 'pending' },
  filePath: String,
  paidAt: Date,
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
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF and Word documents allowed.'));
    }
  }
});

// API Routes
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Recruiters Network API',
    version: '1.0.0',
    status: 'running'
  });
});

// Auth Routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email }).populate('clientId');
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
        clientId: user.clientId?._id
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
        client: user.clientId
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin Routes
app.post('/api/admin/clients', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { name, contactName, email, commissionRate, commissionCap, crmType } = req.body;
    
    // Check if client already exists
    const existingClient = await Client.findOne({ email });
    if (existingClient) {
      return res.status(400).json({ message: 'Client with this email already exists' });
    }
    
    const client = new Client({
      name,
      contactName,
      email,
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
    
    // Get sales rep counts for each client
    const clientsWithCounts = await Promise.all(
      clients.map(async (client) => {
        const salesRepCount = await SalesRep.countDocuments({ clientId: client._id, isActive: true });
        const connectedCount = await SalesRep.countDocuments({ clientId: client._id, isActive: true, isConnected: true });
        return {
          ...client.toObject(),
          salesRepCount,
          connectedCount
        };
      })
    );
    
    res.json(clientsWithCounts);
  } catch (error) {
    console.error('Get clients error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/admin/clients/:clientId/salesreps', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { clientId } = req.params;
    const { name, email, hireDate } = req.body;
    
    const salesRep = new SalesRep({
      name,
      email,
      clientId,
      hireDate: new Date(hireDate)
    });
    
    await salesRep.save();
    res.status(201).json({ message: 'Sales rep added successfully', salesRep });
  } catch (error) {
    console.error('Add sales rep error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.post('/api/admin/clients/:clientId/invoices', authenticateToken, requireAdmin, upload.single('invoice'), async (req, res) => {
  try {
    const { clientId } = req.params;
    const { invoiceNumber, amount, month, year, status } = req.body;
    
    const invoice = new Invoice({
      clientId,
      invoiceNumber,
      amount: parseFloat(amount),
      month: parseInt(month),
      year: parseInt(year),
      status: status || 'pending',
      filePath: req.file?.path
    });
    
    await invoice.save();
    res.status(201).json({ message: 'Invoice uploaded successfully', invoice });
  } catch (error) {
    console.error('Upload invoice error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Client Routes
app.get('/api/client/dashboard', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'client') {
      return res.status(403).json({ message: 'Client access required' });
    }

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

app.get('/api/client/invoices', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'client') {
      return res.status(403).json({ message: 'Client access required' });
    }

    const invoices = await Invoice.find({ clientId: req.user.clientId })
      .sort({ year: -1, month: -1 });
    
    res.json(invoices);
  } catch (error) {
    console.error('Get invoices error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

app.get('/api/client/invoices/:invoiceId/download', authenticateToken, async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.invoiceId);
    
    if (!invoice || invoice.clientId.toString() !== req.user.clientId) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    if (!invoice.filePath || !fs.existsSync(invoice.filePath)) {
      return res.status(404).json({ message: 'File not found' });
    }

    res.download(invoice.filePath, `invoice-${invoice.invoiceNumber}.pdf`);
  } catch (error) {
    console.error('Download invoice error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// CRM Integration Routes
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
        authUrl = `https://app.hubspot.com/oauth/authorize?client_id=${process.env.HUBSPOT_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.HUBSPOT_REDIRECT_URI)}&scope=contacts&state=${req.user.clientId}`;
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

app.post('/api/client/crm/sync', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'client') {
      return res.status(403).json({ message: 'Client access required' });
    }

    const clientId = req.user.clientId;
    const client = await Client.findById(clientId);
    
    if (!client.crmCredentials?.accessToken) {
      return res.status(400).json({ message: 'CRM not connected' });
    }

    // Mock sync for now - replace with actual CRM API calls
    const salesReps = await SalesRep.find({ clientId });
    let updatedReps = 0;

    for (const rep of salesReps) {
      if (!rep.isConnected) {
        // Mock: randomly connect some reps
        if (Math.random() > 0.5) {
          rep.isConnected = true;
          rep.crmContactId = `mock_${rep._id}`;
          
          // Add mock revenue data
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

    res.json({ 
      message: `Sync completed. ${updatedReps} sales reps updated.`,
      updatedReps,
      lastSync: new Date()
    });
  } catch (error) {
    console.error('CRM sync error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Initialize default admin
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

    // Create demo client for testing
    const demoClient = await Client.findOne({ email: 'demo@acmecorp.com' });
    if (!demoClient) {
      const client = new Client({
        name: 'Acme Corporation',
        contactName: 'John Doe',
        email: 'demo@acmecorp.com',
        commissionRate: 0.10,
        commissionCap: 50000,
        crmType: 'teamleader'
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

      // Add demo sales reps
      const salesReps = [
        { name: 'Sarah Johnson', email: 'sarah@acmecorp.com', hireDate: new Date('2024-01-15') },
        { name: 'Mike Chen', email: 'mike@acmecorp.com', hireDate: new Date('2024-03-01') },
        { name: 'Emma Wilson', email: 'emma@acmecorp.com', hireDate: new Date('2024-08-15') }
      ];

      for (const repData of salesReps) {
        const rep = new SalesRep({
          ...repData,
          clientId: client._id,
          isConnected: Math.random() > 0.3 // 70% chance connected
        });
        await rep.save();
      }

      console.log('✓ Demo client created: demo@acmecorp.com / demo123');
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

// Serve React app for all non-API routes
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
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
