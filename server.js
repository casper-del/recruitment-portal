const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Basic middleware
app.use(cors());
app.use(express.json());

// Serve static files from React build
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
}

// Database connection
const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb+srv://recruitment:password@cluster.mongodb.net/recruitment?retryWrites=true&w=majority';
    await mongoose.connect(uri);
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Database connection error:', error);
    // Don't exit, continue without DB for now
  }
};

// Simple schemas
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
  phone: String,
  address: String,
  kvkNumber: String,
  vatNumber: String,
  bankAccount: String,
  networkCommissionRate: { type: Number, default: 0.10 },
  commissionRate: { type: Number, default: 0.10 },
  commissionCap: { type: Number, default: 50000 },
  billingDay: { type: Number, default: 1 },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const salesRepSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  position: { type: String, default: 'Sales Representative' },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  hireDate: { type: Date, required: true },
  commissionRate: { type: Number, default: 0.10 },
  isConnected: { type: Boolean, default: false },
  companyDetails: {
    companyName: String,
    contactName: String,
    address: String,
    city: String,
    postalCode: String,
    country: { type: String, default: 'Nederland' },
    phone: String,
    email: String,
    kvkNumber: String,
    vatNumber: String,
    bankAccount: String
  },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

const invoiceSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
  salesRepId: { type: mongoose.Schema.Types.ObjectId, ref: 'SalesRep' },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  invoiceNumber: { type: String, required: true },
  amount: { type: Number, required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'approved', 'revision_requested', 'paid'], default: 'pending' },
  type: { type: String, enum: ['client', 'commission'], default: 'client' },
  description: String,
  invoiceData: {
    thisMonthRevenue: Number,
    commissionExcl: Number,
    vatRate: Number,
    vatAmount: Number,
    totalAmount: Number,
    companyDetails: Object
  },
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

const User = mongoose.model('User', userSchema);
const Client = mongoose.model('Client', clientSchema);
const SalesRep = mongoose.model('SalesRep', salesRepSchema);
const Invoice = mongoose.model('Invoice', invoiceSchema);
const Revenue = mongoose.model('Revenue', revenueSchema);

// Auth middleware
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

// Basic API routes
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Recruiters Network API - Simple Version',
    version: '1.0.0',
    status: 'running'
  });
});

// Login route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email })
      .populate('clientId')
      .populate('salesRepId')
      .catch(() => null);
    
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
    res.status(500).json({ message: 'Server error' });
  }
});

// Admin routes
app.get('/api/admin/clients', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    const clients = await Client.find({ isActive: true }).sort({ createdAt: -1 }).catch(() => []);
    res.json(clients);
  } catch (error) {
    console.error('Get clients error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/admin/clients', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { name, contactName, email, phone, address, kvkNumber, vatNumber, bankAccount, networkCommissionRate, billingDay } = req.body;
    
    const existingClient = await Client.findOne({ email }).catch(() => null);
    if (existingClient) {
      return res.status(400).json({ message: 'Client with this email already exists' });
    }
    
    const client = new Client({
      name,
      contactName,
      email,
      phone,
      address,
      kvkNumber,
      vatNumber,
      bankAccount,
      networkCommissionRate: networkCommissionRate || 0.10,
      billingDay: billingDay || 1
    });
    
    await client.save();
    
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
      tempPassword
    });
  } catch (error) {
    console.error('Create client error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/admin/clients/:clientId', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    const client = await Client.findById(req.params.clientId).catch(() => null);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    const salesReps = await SalesRep.find({ clientId: req.params.clientId, isActive: true }).catch(() => []);
    
    res.json({ client, salesReps, invoices: [] });
  } catch (error) {
    console.error('Get client details error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/admin/clients/:clientId', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    const client = await Client.findByIdAndUpdate(
      req.params.clientId,
      req.body,
      { new: true }
    ).catch(() => null);
    
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    res.json({ message: 'Client updated successfully', client });
  } catch (error) {
    console.error('Update client error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Sales rep routes
app.post('/api/admin/clients/:clientId/salesreps', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { name, email, phone, position, hireDate, commissionRate } = req.body;
    
    const salesRep = new SalesRep({
      name,
      email,
      phone,
      position: position || 'Sales Representative',
      clientId: req.params.clientId,
      hireDate: new Date(hireDate),
      commissionRate: commissionRate || 0.10
    });
    
    await salesRep.save();
    
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 12);
    
    const salesRepUser = new User({
      email,
      password: hashedPassword,
      role: 'salesrep',
      name,
      clientId: req.params.clientId,
      salesRepId: salesRep._id
    });
    
    await salesRepUser.save();
    
    res.status(201).json({ 
      message: 'Sales representative added successfully',
      salesRep,
      tempPassword
    });
  } catch (error) {
    console.error('Add sales rep error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/admin/salesreps/:salesRepId', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    await User.deleteOne({ salesRepId: req.params.salesRepId });
    const deletedSalesRep = await SalesRep.findByIdAndDelete(req.params.salesRepId);
    
    if (!deletedSalesRep) {
      return res.status(404).json({ message: 'Sales representative not found' });
    }
    
    res.json({ message: 'Sales representative deleted successfully' });
  } catch (error) {
    console.error('Delete sales rep error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Client routes
app.get('/api/client/dashboard', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'client') {
      return res.status(403).json({ message: 'Client access required' });
    }
    
    const client = await Client.findById(req.user.clientId).catch(() => null);
    const salesReps = await SalesRep.find({ clientId: req.user.clientId, isActive: true }).catch(() => []);
    
    const repsWithData = salesReps.map(rep => ({
      ...rep.toObject(),
      thisMonthRevenue: Math.floor(Math.random() * 50000),
      thisMonthCommission: Math.floor(Math.random() * 5000)
    }));

    res.json({
      client,
      salesReps: repsWithData,
      totals: {
        thisMonthRevenue: 0,
        thisMonthCommission: 0
      }
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/client/invoices', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'client') {
      return res.status(403).json({ message: 'Client access required' });
    }
    
    const invoices = await Invoice.find({ clientId: req.user.clientId })
      .populate(['uploadedBy', 'salesRepId'])
      .sort({ year: -1, month: -1 })
      .catch(() => []);
    
    res.json(invoices);
  } catch (error) {
    console.error('Get invoices error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Sales rep routes
app.get('/api/salesrep/dashboard', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'salesrep') {
      return res.status(403).json({ message: 'Sales representative access required' });
    }
    
    const salesRep = await SalesRep.findById(req.user.salesRepId).populate('clientId').catch(() => null);
    
    res.json({
      salesRep,
      currentRevenue: { revenue: 0, commission: 0 },
      myInvoices: [],
      revenueHistory: []
    });
  } catch (error) {
    console.error('Sales rep dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/salesrep/invoices', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'salesrep') {
      return res.status(403).json({ message: 'Sales representative access required' });
    }
    
    const invoices = await Invoice.find({ salesRepId: req.user.salesRepId })
      .populate(['uploadedBy', 'salesRepId'])
      .sort({ year: -1, month: -1 })
      .catch(() => []);
    
    res.json(invoices);
  } catch (error) {
    console.error('Get sales rep invoices error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.get('/api/salesrep/company-details', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'salesrep') {
      return res.status(403).json({ message: 'Sales representative access required' });
    }
    
    const salesRep = await SalesRep.findById(req.user.salesRepId).catch(() => null);
    
    res.json({ 
      companyDetails: salesRep?.companyDetails || {
        companyName: '',
        contactName: '',
        address: '',
        city: '',
        postalCode: '',
        country: 'Nederland',
        phone: '',
        email: '',
        kvkNumber: '',
        vatNumber: '',
        bankAccount: ''
      }
    });
  } catch (error) {
    console.error('Get company details error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/salesrep/company-details', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'salesrep') {
      return res.status(403).json({ message: 'Sales representative access required' });
    }
    
    const salesRep = await SalesRep.findByIdAndUpdate(
      req.user.salesRepId,
      { companyDetails: req.body },
      { new: true }
    ).catch(() => null);

    res.json({ 
      message: 'Company details saved successfully',
      companyDetails: salesRep?.companyDetails
    });
  } catch (error) {
    console.error('Save company details error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/salesrep/generate-invoice', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'salesrep') {
      return res.status(403).json({ message: 'Sales representative access required' });
    }
    
    const { invoiceNumber, thisMonthRevenue, commissionExcl, vatRate, vatAmount, totalAmount, month, year, description, companyDetails } = req.body;

    if (!invoiceNumber || !commissionExcl || !month || !year) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const invoice = new Invoice({
      clientId: req.user.clientId,
      salesRepId: req.user.salesRepId,
      uploadedBy: req.user.userId,
      invoiceNumber,
      amount: totalAmount,
      month: parseInt(month),
      year: parseInt(year),
      status: 'pending',
      type: 'commission',
      description: description || 'Commissie factuur',
      invoiceData: {
        thisMonthRevenue: parseFloat(thisMonthRevenue) || 0,
        commissionExcl: parseFloat(commissionExcl),
        vatRate: parseFloat(vatRate),
        vatAmount: parseFloat(vatAmount),
        totalAmount: parseFloat(totalAmount),
        companyDetails
      }
    });

    await invoice.save();

    res.status(201).json({ 
      message: 'Invoice generated successfully',
      invoice: {
        _id: invoice._id,
        invoiceNumber: invoice.invoiceNumber,
        amount: invoice.amount,
        month: invoice.month,
        year: invoice.year,
        status: invoice.status,
        description: invoice.description,
        createdAt: invoice.createdAt
      }
    });
  } catch (error) {
    console.error('Generate invoice error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.delete('/api/salesrep/invoices/:invoiceId', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'salesrep') {
      return res.status(403).json({ message: 'Sales representative access required' });
    }
    
    const invoice = await Invoice.findOne({
      _id: req.params.invoiceId,
      salesRepId: req.user.salesRepId,
      status: { $nin: ['paid', 'approved'] }
    });
    
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found or cannot be deleted' });
    }

    await Invoice.findByIdAndDelete(req.params.invoiceId);
    
    res.json({ message: 'Invoice deleted successfully' });
  } catch (error) {
    console.error('Delete invoice error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Initialize admin user
const initializeAdmin = async () => {
  try {
    const adminExists = await User.findOne({ role: 'admin' }).catch(() => null);
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

    // Create demo client
    const demoClient = await Client.findOne({ email: 'demo@acmecorp.com' }).catch(() => null);
    if (!demoClient) {
      const client = new Client({
        name: 'Acme Corporation',
        contactName: 'John Doe',
        email: 'demo@acmecorp.com',
        phone: '+31 20 123 4567',
        address: 'Damrak 70, Amsterdam',
        kvkNumber: '12345678',
        vatNumber: 'NL123456789B01',
        bankAccount: 'NL91 ABNA 0417 1643 00',
        networkCommissionRate: 0.10,
        billingDay: 15
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
      const salesRepsData = [
        { name: 'Sarah Johnson', email: 'sarah@acmecorp.com', phone: '+31 20 123 4568', hireDate: new Date('2024-01-15') },
        { name: 'Mike Chen', email: 'mike@acmecorp.com', phone: '+31 20 123 4569', hireDate: new Date('2024-03-01') }
      ];

      for (const repData of salesRepsData) {
        const rep = new SalesRep({
          ...repData,
          clientId: client._id,
          position: 'Sales Representative',
          isConnected: Math.random() > 0.5
        });
        await rep.save();

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

      console.log('✓ Demo data created');
    }
  } catch (error) {
    console.error('Initialization error:', error);
  }
};

// Error handling
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ message: 'Something went wrong!' });
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
      console.log(`📝 API: http://localhost:${PORT}/api`);
      console.log(`🔑 Admin: admin@recruitersnetwork.nl / admin123`);
      console.log(`👤 Demo Client: demo@acmecorp.com / demo123`);
      console.log(`💼 Demo Sales: sarah@acmecorp.com / demo123`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
