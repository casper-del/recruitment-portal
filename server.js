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

// Enhanced schemas with all required fields
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
  
  // Company registration details
  kvkNumber: String,
  vatNumber: String,
  bankAccount: String,
  
  // Commission settings
  networkCommissionRate: { type: Number, default: 0.10 }, // What Recruiters Network gets from sales rep commission
  commissionRate: { type: Number, default: 0.10 }, // Client's commission rate for sales reps
  commissionCap: { type: Number, default: 50000 },
  
  // Billing settings
  billingDay: { type: Number, default: 15 }, // Day of month when invoices are expected
  
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
  revisionReason: String, // For when client requests changes
  invoiceData: {
    thisMonthRevenue: Number,
    commissionExcl: Number,
    vatRate: Number,
    vatAmount: Number,
    totalAmount: Number,
    companyDetails: Object
  },
  createdAt: { type: Date, default: Date.now },
  approvedAt: { type: Date },
  paidAt: { type: Date }
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

const requireAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// Basic API routes
app.get('/api', (req, res) => {
  res.json({ 
    message: 'Recruiters Network API - Enhanced Version',
    version: '2.0.0',
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
app.get('/api/admin/clients', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const clients = await Client.find({ isActive: true })
      .sort({ createdAt: -1 })
      .catch(() => []);
    
    // Add sales rep count to each client
    const clientsWithCounts = await Promise.all(
      clients.map(async (client) => {
        const salesRepCount = await SalesRep.countDocuments({ 
          clientId: client._id, 
          isActive: true 
        }).catch(() => 0);
        
        return {
          ...client.toObject(),
          salesRepCount
        };
      })
    );
    
    res.json(clientsWithCounts);
  } catch (error) {
    console.error('Get clients error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/admin/clients', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { 
      name, 
      contactName, 
      email, 
      phone, 
      address, 
      kvkNumber, 
      vatNumber, 
      bankAccount, 
      networkCommissionRate, 
      billingDay,
      commissionRate,
      commissionCap
    } = req.body;
    
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
      billingDay: billingDay || 15,
      commissionRate: commissionRate || 0.10,
      commissionCap: commissionCap || 50000
    });
    
    await client.save();
    
    // Generate a secure temporary password
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

app.get('/api/admin/clients/:clientId', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const client = await Client.findById(req.params.clientId).catch(() => null);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    const salesReps = await SalesRep.find({ 
      clientId: req.params.clientId, 
      isActive: true 
    }).catch(() => []);
    
    const invoices = await Invoice.find({ 
      clientId: req.params.clientId 
    })
    .populate('salesRepId')
    .sort({ year: -1, month: -1 })
    .catch(() => []);
    
    res.json({ client, salesReps, invoices });
  } catch (error) {
    console.error('Get client details error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/admin/clients/:clientId', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { clientId } = req.params;
    const updateData = req.body;
    
    const client = await Client.findByIdAndUpdate(
      clientId,
      updateData,
      { new: true }
    ).catch(() => null);
    
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    // Update the associated user email and name if changed
    if (updateData.email || updateData.contactName) {
      await User.findOneAndUpdate(
        { clientId: clientId },
        { 
          email: updateData.email || client.email,
          name: updateData.contactName || client.contactName
        }
      ).catch(() => {});
    }
    
    res.json({ message: 'Client updated successfully', client });
  } catch (error) {
    console.error('Update client error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Sales rep routes
app.post('/api/admin/clients/:clientId/salesreps', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { name, email, phone, position, hireDate, commissionRate } = req.body;
    
    // Check if email already exists
    const existingUser = await User.findOne({ email }).catch(() => null);
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    
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

app.delete('/api/admin/salesreps/:salesRepId', authenticateToken, requireAdmin, async (req, res) => {
  try {
    // Delete associated user first
    await User.deleteOne({ salesRepId: req.params.salesRepId });
    
    // Delete sales rep
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
    const salesReps = await SalesRep.find({ 
      clientId: req.user.clientId, 
      isActive: true 
    }).catch(() => []);
    
    // Add mock performance data for each sales rep
    const repsWithData = salesReps.map(rep => ({
      ...rep.toObject(),
      thisMonthRevenue: Math.floor(Math.random() * 50000) + 10000,
      thisMonthCommission: Math.floor(Math.random() * 5000) + 1000,
      isConnected: Math.random() > 0.3 // 70% chance of being connected
    }));

    const totals = {
      thisMonthRevenue: repsWithData.reduce((sum, rep) => sum + rep.thisMonthRevenue, 0),
      thisMonthCommission: repsWithData.reduce((sum, rep) => sum + rep.thisMonthCommission, 0)
    };

    res.json({
      client,
      salesReps: repsWithData,
      totals
    });
  } catch (error) {
    console.error('Client dashboard error:', error);
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
    console.error('Get client invoices error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Invoice approval endpoints
app.put('/api/client/invoices/:invoiceId/approve', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'client') {
      return res.status(403).json({ message: 'Client access required' });
    }
    
    const invoice = await Invoice.findOneAndUpdate(
      { 
        _id: req.params.invoiceId, 
        clientId: req.user.clientId 
      },
      { 
        status: 'approved', 
        approvedAt: new Date() 
      },
      { new: true }
    );
    
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    
    res.json({ message: 'Invoice approved successfully', invoice });
  } catch (error) {
    console.error('Approve invoice error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.put('/api/client/invoices/:invoiceId/revision', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'client') {
      return res.status(403).json({ message: 'Client access required' });
    }
    
    const { reason } = req.body;
    
    const invoice = await Invoice.findOneAndUpdate(
      { 
        _id: req.params.invoiceId, 
        clientId: req.user.clientId 
      },
      { 
        status: 'revision_requested', 
        revisionReason: reason 
      },
      { new: true }
    );
    
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    
    res.json({ message: 'Revision requested successfully', invoice });
  } catch (error) {
    console.error('Request revision error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Sales rep routes
app.get('/api/salesrep/dashboard', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'salesrep') {
      return res.status(403).json({ message: 'Sales representative access required' });
    }
    
    const salesRep = await SalesRep.findById(req.user.salesRepId)
      .populate('clientId')
      .catch(() => null);
    
    // Generate mock current month data
    const currentRevenue = {
      revenue: Math.floor(Math.random() * 50000) + 10000,
      commission: Math.floor(Math.random() * 5000) + 1000
    };
    
    const myInvoices = await Invoice.find({ salesRepId: req.user.salesRepId })
      .sort({ year: -1, month: -1 })
      .limit(5)
      .catch(() => []);
    
    res.json({
      salesRep,
      currentRevenue,
      myInvoices,
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
    
    // Pre-fill with client data if available
    const client = await Client.findById(req.user.clientId).catch(() => null);
    
    const companyDetails = salesRep?.companyDetails || {
      companyName: '',
      contactName: salesRep?.name || '',
      address: client?.address || '',
      city: '',
      postalCode: '',
      country: 'Nederland',
      phone: salesRep?.phone || '',
      email: salesRep?.email || '',
      kvkNumber: '',
      vatNumber: '',
      bankAccount: ''
    };
    
    res.json({ companyDetails });
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

    if (!salesRep) {
      return res.status(404).json({ message: 'Sales representative not found' });
    }

    res.json({ 
      message: 'Company details saved successfully',
      companyDetails: salesRep.companyDetails
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
    
    const { 
      invoiceNumber, 
      thisMonthRevenue, 
      commissionExcl, 
      vatRate, 
      vatAmount, 
      totalAmount, 
      month, 
      year, 
      description, 
      companyDetails 
    } = req.body;

    // Validation
    if (!invoiceNumber || !commissionExcl || !month || !year) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check for duplicate invoice for same month/year
    const existingInvoice = await Invoice.findOne({
      salesRepId: req.user.salesRepId,
      month: parseInt(month),
      year: parseInt(year)
    });

    if (existingInvoice) {
      return res.status(400).json({ 
        message: `Er bestaat al een factuur voor ${new Date(0, month - 1).toLocaleDateString('nl-NL', {month: 'long'})} ${year}` 
      });
    }

    const invoice = new Invoice({
      clientId: req.user.clientId,
      salesRepId: req.user.salesRepId,
      uploadedBy: req.user.userId,
      invoiceNumber,
      amount: parseFloat(totalAmount),
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
      status: { $nin: ['paid', 'approved'] } // Cannot delete paid or approved invoices
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

// Network Commission endpoints for admin
app.get('/api/admin/network-commissions', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const networkInvoices = await Invoice.find({ 
      type: 'network' 
    })
    .populate('clientId')
    .sort({ year: -1, month: -1 });
    
    const formattedInvoices = networkInvoices.map(invoice => ({
      _id: invoice._id,
      clientName: invoice.clientId?.name || 'Unknown',
      invoiceNumber: invoice.invoiceNumber,
      month: invoice.month,
      year: invoice.year,
      monthName: new Date(0, invoice.month - 1).toLocaleDateString('nl-NL', {month: 'long'}),
      status: invoice.status,
      totalSalesRepCommission: invoice.invoiceData?.totalSalesRepCommission || 0,
      networkRate: invoice.invoiceData?.networkRate || 0,
      networkAmount: invoice.invoiceData?.networkAmount || 0,
      createdAt: invoice.createdAt
    }));
    
    res.json(formattedInvoices);
  } catch (error) {
    console.error('Get network commissions error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/api/admin/generate-network-invoice', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { clientId, month, year } = req.body;
    
    if (!clientId || !month || !year) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    
    // Get client details
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    // Check if network invoice already exists for this month/year
    const existingNetworkInvoice = await Invoice.findOne({
      clientId,
      type: 'network',
      month: parseInt(month),
      year: parseInt(year)
    });
    
    if (existingNetworkInvoice) {
      return res.status(400).json({ 
        message: `Network factuur bestaat al voor ${new Date(0, month - 1).toLocaleDateString('nl-NL', {month: 'long'})} ${year}` 
      });
    }
    
    // Find all approved sales rep invoices for this client in specified month/year
    const salesRepInvoices = await Invoice.find({
      clientId,
      type: 'commission',
      status: 'approved',
      month: parseInt(month),
      year: parseInt(year)
    });
    
    if (salesRepInvoices.length === 0) {
      return res.status(400).json({ 
        message: 'Geen goedgekeurde sales rep facturen gevonden voor deze periode' 
      });
    }
    
    // Calculate total sales rep commission (excl BTW)
    const totalSalesRepCommission = salesRepInvoices.reduce((total, invoice) => {
      return total + (invoice.invoiceData?.commissionExcl || 0);
    }, 0);
    
    // Calculate network commission
    const networkRate = client.networkCommissionRate || 0.10;
    const networkCommissionExcl = totalSalesRepCommission * networkRate;
    const networkVat = networkCommissionExcl * 0.21; // 21% BTW
    const networkTotal = networkCommissionExcl + networkVat;
    
    // Generate invoice number
    const invoiceNumber = `RN-${year}-${String(month).padStart(2, '0')}-${client.name.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    
    // Create network invoice
    const networkInvoice = new Invoice({
      clientId,
      uploadedBy: req.user.userId,
      invoiceNumber,
      amount: networkTotal,
      month: parseInt(month),
      year: parseInt(year),
      status: 'pending',
      type: 'network',
      description: `Recruiters Network commissie - ${new Date(0, month - 1).toLocaleDateString('nl-NL', {month: 'long'})} ${year}`,
      invoiceData: {
        totalSalesRepCommission,
        networkRate,
        networkAmount: networkCommissionExcl,
        vatRate: 21,
        vatAmount: networkVat,
        totalAmount: networkTotal,
        salesRepInvoices: salesRepInvoices.map(inv => inv._id)
      }
    });
    
    await networkInvoice.save();
    
    res.status(201).json({
      message: 'Network factuur succesvol gegenereerd',
      invoice: networkInvoice,
      totalSalesRepCommission,
      networkRate,
      networkAmount: networkCommissionExcl,
      networkTotal
    });
    
  } catch (error) {
    console.error('Generate network invoice error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
app.get('/api/salesrep/invoices/:invoiceId/download', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'salesrep') {
      return res.status(403).json({ message: 'Sales representative access required' });
    }
    
    const invoice = await Invoice.findOne({
      _id: req.params.invoiceId,
      salesRepId: req.user.salesRepId
    });
    
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    
    // For now, return a simple text response
    // In production, this would generate and return a PDF
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', `attachment; filename="invoice-${invoice.invoiceNumber}.txt"`);
    res.send(`Factuur #${invoice.invoiceNumber}\nBedrag: €${invoice.amount}\nStatus: ${invoice.status}`);
  } catch (error) {
    console.error('Download invoice error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Initialize admin user and demo data
const initializeAdmin = async () => {
  try {
    // Create admin user if doesn't exist
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

    // Create demo client with all fields
    const demoClient = await Client.findOne({ email: 'demo@acmecorp.com' }).catch(() => null);
    if (!demoClient) {
      const client = new Client({
        name: 'Acme Corporation',
        contactName: 'John Doe',
        email: 'demo@acmecorp.com',
        phone: '+31 20 123 4567',
        address: 'Damrak 70, 1012 LM Amsterdam',
        kvkNumber: '12345678',
        vatNumber: 'NL123456789B01',
        bankAccount: 'NL91 ABNA 0417 1643 00',
        networkCommissionRate: 0.10,
        billingDay: 15,
        commissionRate: 0.10,
        commissionCap: 50000
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
        { 
          name: 'Sarah Johnson', 
          email: 'sarah@acmecorp.com', 
          phone: '+31 20 123 4568', 
          hireDate: new Date('2024-01-15'),
          position: 'Senior Sales Representative'
        },
        { 
          name: 'Mike Chen', 
          email: 'mike@acmecorp.com', 
          phone: '+31 20 123 4569', 
          hireDate: new Date('2024-03-01'),
          position: 'Sales Representative'
        },
        { 
          name: 'Lisa van der Berg', 
          email: 'lisa@acmecorp.com', 
          phone: '+31 20 123 4570', 
          hireDate: new Date('2024-02-15'),
          position: 'Junior Sales Representative'
        }
      ];

      for (const repData of salesRepsData) {
        const rep = new SalesRep({
          ...repData,
          clientId: client._id,
          isConnected: Math.random() > 0.3, // 70% chance of being connected
          commissionRate: 0.10
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

      console.log('✓ Demo client and sales reps created');
      console.log('✓ Demo logins:');
      console.log('  - Client: demo@acmecorp.com / demo123');
      console.log('  - Sales Rep 1: sarah@acmecorp.com / demo123');
      console.log('  - Sales Rep 2: mike@acmecorp.com / demo123');
      console.log('  - Sales Rep 3: lisa@acmecorp.com / demo123');
    }
  } catch (error) {
    console.error('Initialization error:', error);
  }
};

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Serve React app (catch-all handler)
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
      console.log(`💼 Demo Sales Reps: sarah@acmecorp.com / demo123`);
      console.log(`                    mike@acmecorp.com / demo123`);
      console.log(`                    lisa@acmecorp.com / demo123`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
