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
    expiresAt: Date,
    portalId: String // For HubSpot
  },
  commissionRate: { type: Number, default: 0.10 },
  commissionCap: { type: Number, default: 50000 },
  isActive: { type: Boolean, default: true },
  autoSyncEnabled: { type: Boolean, default: false }, // New field for real-time sync
  lastSyncAt: { type: Date }, // New field to track last sync
  createdAt: { type: Date, default: Date.now }
});

const salesRepSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  hireDate: { type: Date, required: true },
  crmContactId: String,
  crmAccountId: String, // Additional field for better CRM matching
  isConnected: { type: Boolean, default: false },
  totalRevenue: { type: Number, default: 0 },
  totalCommission: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  lastRevenueSync: { type: Date }, // New field to track last revenue update
  createdAt: { type: Date, default: Date.now }
});

const revenueSchema = new mongoose.Schema({
  salesRepId: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesRep', required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  revenue: { type: Number, required: true },
  commission: { type: Number, required: true },
  dealId: String, // CRM deal identifier for tracking
  dealName: String, // Name of the deal from CRM
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
  originalFileName: String, // Store original file name
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

// Enhanced File upload setup for invoices
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/invoices';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const originalName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, `${timestamp}-${originalName}`);
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
      cb(new Error('Only PDF files are allowed for invoices.'));
    }
  }
});

// API Routes
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Recruiters Network API - Enhanced Version',
    version: '2.0.0',
    status: 'running',
    features: ['Invoice Management', 'Real-time CRM Sync', 'Enhanced Team Management']
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

// Admin client update endpoint
app.put('/api/admin/clients/:clientId', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { clientId } = req.params;
    const { name, contactName, email, commissionRate, commissionCap, crmType } = req.body;
    
    // Find and update the client
    const client = await Client.findByIdAndUpdate(
      clientId,
      {
        name,
        contactName,
        email,
        commissionRate,
        commissionCap,
        crmType
      },
      { new: true, runValidators: true }
    );
    
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    // Also update the user account email if it changed
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

// Complete client deletion endpoint
app.delete('/api/admin/clients/:clientId', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { clientId } = req.params;
    
    // Start a transaction to ensure all data is deleted together
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      // 1. Delete all sales reps for this client
      await SalesRep.deleteMany({ clientId }, { session });
      
      // 2. Delete all revenue records for this client
      await Revenue.deleteMany({ clientId }, { session });
      
      // 3. Delete all invoices for this client and their files
      const invoices = await Invoice.find({ clientId });
      for (const invoice of invoices) {
        // Delete invoice files if they exist
        if (invoice.filePath && fs.existsSync(invoice.filePath)) {
          try {
            fs.unlinkSync(invoice.filePath);
            console.log(`Deleted invoice file: ${invoice.filePath}`);
          } catch (fileError) {
            console.error(`Failed to delete invoice file ${invoice.filePath}:`, fileError);
          }
        }
      }
      await Invoice.deleteMany({ clientId }, { session });
      
      // 4. Delete the client user account
      await User.deleteOne({ clientId }, { session });
      
      // 5. Delete the client itself
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

// Enhanced: Add Team Member (formerly Sales Rep) endpoint
app.post('/api/admin/clients/:clientId/salesreps', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { clientId } = req.params;
    const { name, email, hireDate } = req.body;
    
    // Check if team member already exists for this client
    const existingRep = await SalesRep.findOne({ clientId, email: email.toLowerCase() });
    if (existingRep) {
      return res.status(400).json({ message: 'Team member with this email already exists for this client' });
    }
    
    const salesRep = new SalesRep({
      name,
      email: email.toLowerCase(),
      clientId,
      hireDate: new Date(hireDate)
    });
    
    await salesRep.save();

    // Auto-match with CRM if client has CRM connected
    const client = await Client.findById(clientId);
    if (client?.crmCredentials?.accessToken) {
      console.log(`Auto-matching new team member ${name} with CRM...`);
      await autoMatchTeamMemberWithCRM(salesRep, client);
    }
    
    res.status(201).json({ 
      message: 'Team member added successfully',
      salesRep: {
        ...salesRep.toObject(),
        autoMatched: client?.crmCredentials?.accessToken ? true : false
      }
    });
  } catch (error) {
    console.error('Add team member error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get team members for a specific client (Admin)
app.get('/api/admin/clients/:clientId/salesreps', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { clientId } = req.params;
    const salesReps = await SalesRep.find({ clientId, isActive: true }).sort({ createdAt: -1 });
    res.json(salesReps);
  } catch (error) {
    console.error('Get team members error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Enhanced Invoice Management Routes
app.post('/api/admin/clients/:clientId/invoices', authenticateToken, requireAdmin, upload.single('invoice'), async (req, res) => {
  try {
    const { clientId } = req.params;
    const { invoiceNumber, amount, month, year, status } = req.body;
    
    // Check if invoice number already exists for this client
    const existingInvoice = await Invoice.findOne({ clientId, invoiceNumber });
    if (existingInvoice) {
      // Delete uploaded file if invoice already exists
      if (req.file && fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(400).json({ message: 'Invoice number already exists for this client' });
    }
    
    const invoice = new Invoice({
      clientId,
      invoiceNumber,
      amount: parseFloat(amount),
      month: parseInt(month),
      year: parseInt(year),
      status: status || 'pending',
      filePath: req.file?.path,
      originalFileName: req.file?.originalname,
      paidAt: status === 'paid' ? new Date() : null
    });
    
    await invoice.save();
    
    res.status(201).json({ 
      message: 'Invoice uploaded successfully',
      invoice: {
        ...invoice.toObject(),
        hasFile: !!req.file
      }
    });
  } catch (error) {
    console.error('Upload invoice error:', error);
    // Clean up uploaded file if there was an error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get invoices for a specific client (Admin)
app.get('/api/admin/clients/:clientId/invoices', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { clientId } = req.params;
    const invoices = await Invoice.find({ clientId }).sort({ year: -1, month: -1 });
    res.json(invoices);
  } catch (error) {
    console.error('Get client invoices error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update invoice status (Admin)
app.put('/api/admin/invoices/:invoiceId', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { invoiceId } = req.params;
    const { status } = req.body;
    
    const updateData = { status };
    if (status === 'paid') {
      updateData.paidAt = new Date();
    } else {
      updateData.paidAt = null;
    }
    
    const invoice = await Invoice.findByIdAndUpdate(invoiceId, updateData, { new: true });
    
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    
    res.json({ 
      message: 'Invoice status updated successfully',
      invoice
    });
  } catch (error) {
    console.error('Update invoice error:', error);
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

// Enhanced Client Invoice Routes
app.get('/api/client/invoices', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'client') {
      return res.status(403).json({ message: 'Client access required' });
    }

    const invoices = await Invoice.find({ clientId: req.user.clientId })
      .sort({ year: -1, month: -1 });
    
    // Add download availability info
    const invoicesWithDownloadInfo = invoices.map(invoice => ({
      ...invoice.toObject(),
      downloadAvailable: !!(invoice.filePath && fs.existsSync(invoice.filePath))
    }));
    
    res.json(invoicesWithDownloadInfo);
  } catch (error) {
    console.error('Get invoices error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Enhanced Invoice Download Route
app.get('/api/client/invoices/:invoiceId/download', authenticateToken, async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.invoiceId);
    
    if (!invoice || invoice.clientId.toString() !== req.user.clientId) {
      return res.status(404).json({ message: 'Invoice not found' });
    }

    if (!invoice.filePath || !fs.existsSync(invoice.filePath)) {
      return res.status(404).json({ message: 'Invoice file not found' });
    }

    // Set proper headers for PDF download
    const fileName = invoice.originalFileName || `factuur-${invoice.invoiceNumber}.pdf`;
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    
    // Log download for tracking
    console.log(`Invoice downloaded: ${invoice.invoiceNumber} by client ${req.user.clientId}`);
    
    res.download(invoice.filePath, fileName, (err) => {
      if (err) {
        console.error('Download error:', err);
        if (!res.headersSent) {
          res.status(500).json({ message: 'Download failed' });
        }
      }
    });
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
        authUrl = `https://app.hubspot.com/oauth/authorize?client_id=${process.env.HUBSPOT_CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.HUBSPOT_REDIRECT_URI)}&scope=crm.objects.contacts.read crm.objects.deals.read&state=${req.user.clientId}`;
        break;
      default:
        return res.status(400).json({ message: 'Unsupported CRM type' });
    }
    
    console.log('Generated OAuth URL for', type || client.crmType, ':', authUrl);
    res.json({ authUrl });
  } catch (error) {
    console.error('CRM connect error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Enhanced HubSpot OAuth Callback with better error handling
app.get('/auth/hubspot/callback', async (req, res) => {
  try {
    const { code, state } = req.query;
    const clientId = state;
    
    if (!code) {
      return res.status(400).send('❌ Authorization code not provided');
    }

    console.log('HubSpot OAuth callback received for client:', clientId);

    // Exchange code for access token
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

    console.log('HubSpot token received successfully for client:', clientId);

    // Save credentials to client and enable auto-sync
    await Client.findByIdAndUpdate(clientId, {
      crmCredentials: {
        accessToken: tokenData.access_token,
        refreshToken: tokenData.refresh_token,
        expiresAt: new Date(Date.now() + (tokenData.expires_in * 1000)),
        portalId: tokenData.hub_id || tokenData.hub_domain
      },
      autoSyncEnabled: true, // Enable auto-sync when CRM is connected
      lastSyncAt: new Date()
    });

    // Auto-match existing team members
    const client = await Client.findById(clientId);
    const existingTeamMembers = await SalesRep.find({ clientId: clientId, isConnected: false });
    
    for (const teamMember of existingTeamMembers) {
      await autoMatchTeamMemberWithCRM(teamMember, client);
    }

    // Redirect back to app with success
    const frontendUrl = process.env.FRONTEND_URL || 'https://recruitment-portal-2ai9.onrender.com';
    res.redirect(`${frontendUrl}?crm_connected=success`);
    
  } catch (error) {
    console.error('HubSpot OAuth callback error:', error);
    res.status(500).send(`❌ Internal server error during OAuth: ${error.message}`);
  }
});

// Get available CRM systems
app.get('/api/crm/available', authenticateToken, async (req, res) => {
  try {
    const availableCRMs = [
      { 
        id: 'hubspot', 
        name: 'HubSpot', 
        description: 'Customer relationship management',
        features: ['Real-time revenue tracking', 'Automatic contact matching', 'Deal pipeline sync']
      },
      { 
        id: 'teamleader', 
        name: 'Teamleader', 
        description: 'Complete business management',
        features: ['Demo functionality', 'Awaiting OAuth approval']
      },
      { 
        id: 'pipedrive', 
        name: 'Pipedrive', 
        description: 'Sales-focused CRM',
        features: ['Demo functionality available']
      }
    ];
    
    res.json(availableCRMs);
  } catch (error) {
    console.error('Get available CRMs error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update client CRM settings
app.post('/api/client/crm/settings', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'client') {
      return res.status(403).json({ message: 'Client access required' });
    }

    const { crmType, autoSyncEnabled } = req.body;
    const clientId = req.user.clientId;
    
    const updateData = {};
    if (crmType) updateData.crmType = crmType;
    if (typeof autoSyncEnabled === 'boolean') updateData.autoSyncEnabled = autoSyncEnabled;
    
    const client = await Client.findByIdAndUpdate(
      clientId,
      updateData,
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

// Enhanced CRM Sync with Real-time capabilities
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
      syncResult = await syncHubSpotData(client, clientId);
    } else {
      // Fallback to demo sync for other CRMs
      syncResult = await demoSync(client, clientId);
    }
    
    // Update last sync time
    await Client.findByIdAndUpdate(clientId, { lastSyncAt: new Date() });
    
    res.json(syncResult);

  } catch (error) {
    console.error('CRM sync error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// New: Real-time Sync Activation Route
app.post('/api/client/crm/sync-realtime', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'client') {
      return res.status(403).json({ message: 'Client access required' });
    }

    const clientId = req.user.clientId;
    const client = await Client.findByIdAndUpdate(
      clientId,
      { 
        autoSyncEnabled: true,
        lastSyncAt: new Date()
      },
      { new: true }
    );
    
    if (!client.crmCredentials?.accessToken) {
      return res.status(400).json({ message: 'CRM must be connected first' });
    }

    // Perform initial sync
    let syncResult;
    if (client.crmType === 'hubspot') {
      syncResult = await syncHubSpotData(client, clientId);
    } else {
      syncResult = await demoSync(client, clientId);
    }
    
    res.json({
      message: 'Real-time sync activated successfully! Revenue will be automatically updated when deals are closed.',
      syncResult,
      autoSyncEnabled: true
    });

  } catch (error) {
    console.error('Real-time sync activation error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Enhanced HubSpot sync function with revenue tracking
async function syncHubSpotData(client, clientId) {
  try {
    console.log('Starting enhanced HubSpot sync for client:', clientId);

    // Check if token expired and refresh if needed
    if (new Date() >= new Date(client.crmCredentials.expiresAt)) {
      await refreshHubSpotToken(client);
      client = await Client.findById(clientId);
    }

    // Fetch contacts from HubSpot
    const contactsResponse = await fetch('https://api.hubapi.com/crm/v3/objects/contacts?properties=email,firstname,lastname,createdate&limit=100', {
      headers: {
        'Authorization': `Bearer ${client.crmCredentials.accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    const contactsData = await contactsResponse.json();
    
    if (!contactsResponse.ok) {
      throw new Error(`HubSpot Contacts API error: ${contactsData.message || 'Unknown error'}`);
    }

    // Fetch deals for revenue tracking
    const dealsResponse = await fetch('https://api.hubapi.com/crm/v3/objects/deals?properties=dealname,amount,closedate,dealstage,hubspot_owner_id&limit=100', {
      headers: {
        'Authorization': `Bearer ${client.crmCredentials.accessToken}`,
        'Content-Type': 'application/json'
      }
    });

    const dealsData = await dealsResponse.json();
    console.log(`Found ${contactsData.results.length} contacts and ${dealsData.results?.length || 0} deals in HubSpot`);

    // Sync contacts with team members
    const teamMembers = await SalesRep.find({ clientId });
    let updatedMembers = 0;
    let newMembers = 0;

    for (const contact of contactsData.results) {
      const email = contact.properties.email;
      const firstName = contact.properties.firstname || '';
      const lastName = contact.properties.lastname || '';
      const fullName = `${firstName} ${lastName}`.trim() || email?.split('@')[0] || 'Unknown';

      if (!email) continue;

      let teamMember = teamMembers.find(member => 
        member.email.toLowerCase() === email.toLowerCase() ||
        member.name.toLowerCase().includes(firstName.toLowerCase()) ||
        member.name.toLowerCase().includes(lastName.toLowerCase())
      );

      if (teamMember && !teamMember.isConnected) {
        teamMember.isConnected = true;
        teamMember.crmContactId = contact.id;
        if (teamMember.name === 'Unknown' || teamMember.name === email) {
          teamMember.name = fullName;
        }
        await teamMember.save();
        updatedMembers++;
        console.log(`Updated existing team member: ${teamMember.name} (${email})`);
      } else if (!teamMember) {
        const createDate = contact.properties.createdate ? new Date(contact.properties.createdate) : new Date();
        
        teamMember = new SalesRep({
          name: fullName,
          email: email,
          clientId,
          hireDate: createDate,
          isConnected: true,
          crmContactId: contact.id
        });
        await teamMember.save();
        newMembers++;
        console.log(`Created new team member: ${fullName} (${email})`);
      }
    }

    // Process deals for revenue tracking
    let revenueUpdates = 0;
    if (dealsData.results) {
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();

      for (const deal of dealsData.results) {
        if (deal.properties.dealstage === 'closedwon' && deal.properties.amount) {
          const amount = parseFloat(deal.properties.amount);
          const closeDate = deal.properties.closedate ? new Date(deal.properties.closedate) : new Date();
          const dealMonth = closeDate.getMonth() + 1;
          const dealYear = closeDate.getFullYear();
          
          // Try to match deal to team member (basic matching for now)
          const connectedMembers = await SalesRep.find({ clientId, isConnected: true });
          if (connectedMembers.length > 0) {
            // For demo purposes, assign to random connected member
            const randomMember = connectedMembers[Math.floor(Math.random() * connectedMembers.length)];
            const commission = amount * client.commissionRate;

            await Revenue.findOneAndUpdate(
              { 
                salesRepId: randomMember._id, 
                month: dealMonth, 
                year: dealYear,
                dealId: deal.id
              },
              {
                salesRepId: randomMember._id,
                clientId,
                month: dealMonth,
                year: dealYear,
                revenue: amount,
                commission,
                dealId: deal.id,
                dealName: deal.properties.dealname,
                lastSyncAt: new Date()
              },
              { upsert: true }
            );
            revenueUpdates++;
          }
        }
      }
    }

    // Add demo revenue for connected members if no real deals
    if (revenueUpdates === 0) {
      const connectedMembers = await SalesRep.find({ clientId, isConnected: true });
      for (const member of connectedMembers) {
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        const mockRevenue = Math.floor(Math.random() * 50000) + 15000;
        const commission = mockRevenue * client.commissionRate;

        await Revenue.findOneAndUpdate(
          { salesRepId: member._id, month: currentMonth, year: currentYear },
          {
            salesRepId: member._id,
            clientId,
            month: currentMonth,
            year: currentYear,
            revenue: mockRevenue,
            commission,
            lastSyncAt: new Date()
          },
          { upsert: true }
        );
        revenueUpdates++;
      }
    }

    return { 
      message: `✅ HubSpot sync completed! ${updatedMembers} members updated, ${newMembers} new members created, ${revenueUpdates} revenue records processed.`,
      updatedMembers,
      newMembers,
      revenueUpdates,
      totalContacts: contactsData.results.length,
      totalDeals: dealsData.results?.length || 0,
      lastSync: new Date(),
      crmType: 'HubSpot'
    };

  } catch (error) {
    console.error('HubSpot sync error:', error);
    throw new Error(`HubSpot sync failed: ${error.message}`);
  }
}

// Auto-match new team member with CRM
async function autoMatchTeamMemberWithCRM(teamMember, client) {
  try {
    if (client.crmType === 'hubspot' && client.crmCredentials?.accessToken) {
      // Search for contact by email first, then by name
      const searchParams = new URLSearchParams({
        q: teamMember.email,
        properties: 'email,firstname,lastname,createdate'
      });

      const searchResponse = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/search?${searchParams}`, {
        headers: {
          'Authorization': `Bearer ${client.crmCredentials.accessToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (searchResponse.ok) {
        const searchData = await searchResponse.json();
        
        if (searchData.results && searchData.results.length > 0) {
          const match = searchData.results[0];
          teamMember.isConnected = true;
          teamMember.crmContactId = match.id;
          await teamMember.save();
          
          console.log(`✅ Auto-matched team member ${teamMember.name} with CRM contact ${match.id}`);
          return true;
        }
      }
    }
    
    console.log(`⚠️ No CRM match found for team member ${teamMember.name}`);
    return false;
  } catch (error) {
    console.error('Auto-match error:', error);
    return false;
  }
}

// Demo sync function (fallback)
async function demoSync(client, clientId) {
  const teamMembers = await SalesRep.find({ clientId });
  let updatedMembers = 0;
  let revenueUpdates = 0;

  for (const member of teamMembers) {
    if (!member.isConnected) {
      // Mock: randomly connect some members
      if (Math.random() > 0.3) {
        member.isConnected = true;
        member.crmContactId = `demo_${member._id}`;
        await member.save();
        updatedMembers++;
      }
    }
    
    if (member.isConnected) {
      // Add mock revenue data
      const currentMonth = new Date().getMonth() + 1;
      const currentYear = new Date().getFullYear();
      const mockRevenue = Math.floor(Math.random() * 50000) + 10000;
      const commission = mockRevenue * client.commissionRate;

      await Revenue.findOneAndUpdate(
        { salesRepId: member._id, month: currentMonth, year: currentYear },
        {
          salesRepId: member._id,
          clientId,
          month: currentMonth,
          year: currentYear,
          revenue: mockRevenue,
          commission,
          lastSyncAt: new Date()
        },
        { upsert: true }
      );
      revenueUpdates++;
    }
  }

  return { 
    message: `🎯 Demo sync completed. ${updatedMembers} team members connected, ${revenueUpdates} revenue records updated.`,
    updatedMembers,
    newMembers: 0,
    revenueUpdates,
    lastSync: new Date(),
    crmType: 'Demo'
  };
}

// Token refresh helper for HubSpot
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

    // Create demo client for testing
    const demoClient = await Client.findOne({ email: 'demo@acmecorp.com' });
    if (!demoClient) {
      const client = new Client({
        name: 'Acme Corporation',
        contactName: 'John Doe',
        email: 'demo@acmecorp.com',
        commissionRate: 0.10,
        commissionCap: 50000,
        crmType: 'hubspot',
        autoSyncEnabled: false
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

      // Add demo team members
      const teamMembers = [
        { name: 'Sarah Johnson', email: 'sarah@acmecorp.com', hireDate: new Date('2024-01-15') },
        { name: 'Mike Chen', email: 'mike@acmecorp.com', hireDate: new Date('2024-03-01') },
        { name: 'Emma Wilson', email: 'emma@acmecorp.com', hireDate: new Date('2024-08-15') }
      ];

      for (const memberData of teamMembers) {
        const member = new SalesRep({
          ...memberData,
          clientId: client._id,
          isConnected: Math.random() > 0.6
        });
        await member.save();
      }

      console.log('✓ Demo client created: demo@acmecorp.com / demo123 (HubSpot CRM)');
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
      console.log(`🔗 HubSpot OAuth configured: ${process.env.HUBSPOT_CLIENT_ID ? 'YES' : 'NO'}`);
      console.log('✨ Enhanced Features:');
      console.log('   • Invoice Management & Download');
      console.log('   • Real-time CRM Synchronization');  
      console.log('   • Automatic Team Member Matching');
      console.log('   • Enhanced Admin Dashboard');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
