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

console.log('🔥 FIXED SERVER.JS - NETWORK INVOICES & CLIENT DETAILS 🔥');

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
    console.log('🔥 MongoDB Connected');
  } catch (error) {
    console.error('❌ Database connection error:', error);
  }
};

// Schemas
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
  billingDay: { type: Number, default: 15 },
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
  type: { type: String, enum: ['client', 'commission', 'network'], default: 'client' },
  description: String,
  invoiceData: {
    thisMonthRevenue: Number,
    commissionExcl: Number,
    vatRate: Number,
    vatAmount: Number,
    totalAmount: Number,
    companyDetails: Object,
    // For network invoices
    totalSalesRepCommission: Number,
    networkRate: Number,
    networkAmount: Number,
    salesRepInvoices: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Invoice' }]
  },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Client = mongoose.model('Client', clientSchema);
const SalesRep = mongoose.model('SalesRep', salesRepSchema);
const Invoice = mongoose.model('Invoice', invoiceSchema);

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
    message: '🔥 FIXED SERVER VERSION - NETWORK INVOICES & CLIENT DETAILS',
    version: '3.1.0',
    status: 'running'
  });
});

// Login route
app.post('/api/auth/login', async (req, res) => {
  try {
    console.log('🔥 LOGIN ATTEMPT:', req.body.email);
    const { email, password } = req.body;
    
    const user = await User.findOne({ email })
      .populate('clientId')
      .populate('salesRepId');
    
    console.log('🔥 USER FOUND:', !!user);
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log('🔥 PASSWORD VALID:', isValidPassword);
    
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

    console.log('🔥 LOGIN SUCCESS FOR:', user.role);

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
    console.error('❌ Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔥 FIXED SALES REP COMPANY DETAILS WITH COMPLETE CLIENT INFO
app.get('/api/salesrep/company-details', authenticateToken, async (req, res) => {
  try {
    console.log('🔥 GETTING COMPLETE COMPANY DETAILS FOR SALES REP');
    console.log('🔥 User ID:', req.user.userId);
    console.log('🔥 Sales Rep ID:', req.user.salesRepId);
    console.log('🔥 Client ID:', req.user.clientId);
    
    if (req.user.role !== 'salesrep') {
      return res.status(403).json({ message: 'Sales representative access required' });
    }
    
    // Get sales rep data
    const salesRep = await SalesRep.findById(req.user.salesRepId);
    console.log('🔥 Sales Rep found:', !!salesRep);
    
    // Get client data - THIS IS KEY!
    const client = await Client.findById(req.user.clientId);
    console.log('🔥 Client found:', !!client);
    
    if (client) {
      console.log('🔥 COMPLETE CLIENT DATA:', {
        name: client.name,
        contactName: client.contactName,
        address: client.address,
        phone: client.phone,
        kvkNumber: client.kvkNumber,
        vatNumber: client.vatNumber,
        bankAccount: client.bankAccount
      });
    } else {
      console.log('❌ NO CLIENT DATA FOUND!');
    }
    
    // Build complete company details
    const companyDetails = {
      // Sales rep's own company details
      companyName: salesRep?.companyDetails?.companyName || '',
      contactName: salesRep?.companyDetails?.contactName || salesRep?.name || '',
      address: salesRep?.companyDetails?.address || '',
      city: salesRep?.companyDetails?.city || '',
      postalCode: salesRep?.companyDetails?.postalCode || '',
      country: salesRep?.companyDetails?.country || 'Nederland',
      phone: salesRep?.companyDetails?.phone || salesRep?.phone || '',
      email: salesRep?.companyDetails?.email || salesRep?.email || '',
      kvkNumber: salesRep?.companyDetails?.kvkNumber || '',
      vatNumber: salesRep?.companyDetails?.vatNumber || '',
      bankAccount: salesRep?.companyDetails?.bankAccount || '',
      
      // 🔥 COMPLETE CLIENT INFORMATION - WHO THE INVOICE GOES TO
      clientCompanyName: client?.name || '',
      clientContactName: client?.contactName || '',
      clientAddress: client?.address || '',
      clientPhone: client?.phone || '',
      clientKvk: client?.kvkNumber || '',
      clientVat: client?.vatNumber || '',
      clientBankAccount: client?.bankAccount || ''
    };
    
    console.log('🔥 SENDING COMPLETE COMPANY DETAILS WITH CLIENT KVK & BTW:', companyDetails);
    
    res.json({ companyDetails });
    
  } catch (error) {
    console.error('❌ Get company details error:', error);
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
    );

    res.json({ 
      message: 'Company details saved successfully',
      companyDetails: salesRep?.companyDetails
    });
  } catch (error) {
    console.error('Save company details error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Sales rep routes
app.get('/api/salesrep/invoices', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'salesrep') {
      return res.status(403).json({ message: 'Sales representative access required' });
    }
    
    const invoices = await Invoice.find({ salesRepId: req.user.salesRepId })
      .sort({ year: -1, month: -1 });
    
    res.json(invoices);
  } catch (error) {
    console.error('Get sales rep invoices error:', error);
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

    if (!invoiceNumber || !commissionExcl || !month || !year) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Check for duplicate invoice
    const existingInvoice = await Invoice.findOne({
      salesRepId: req.user.salesRepId,
      month: parseInt(month),
      year: parseInt(year),
      type: 'commission'
    });

    if (existingInvoice) {
      return res.status(400).json({ 
        message: `Factuur bestaat al voor ${new Date(0, month - 1).toLocaleDateString('nl-NL', {month: 'long'})} ${year}` 
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
      invoice
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

// ADMIN ENDPOINTS
app.get('/api/admin/clients', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    const clients = await Client.find({ isActive: true })
      .sort({ createdAt: -1 });
    
    // Add sales rep count to each client
    const clientsWithCounts = await Promise.all(
      clients.map(async (client) => {
        const salesRepCount = await SalesRep.countDocuments({ 
          clientId: client._id, 
          isActive: true 
        });
        
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

app.post('/api/admin/clients', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

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
    
    // EMAIL TRIGGER: Send welcome email to new client
    const emailSent = await sendEmail(client.email, emailTemplates.welcomeClient, {
      recipientName: client.contactName,
      email: client.email,
      tempPassword: tempPassword,
      loginUrl: `${process.env.FRONTEND_URL || 'https://recruitment-portal-2ai9.onrender.com'}/login`
    });
    
    res.status(201).json({ 
      message: 'Client created successfully' + (emailSent ? ' and welcome email sent' : ''),
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
    
    const client = await Client.findById(req.params.clientId);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    const salesReps = await SalesRep.find({ 
      clientId: req.params.clientId, 
      isActive: true 
    });
    
    const invoices = await Invoice.find({ 
      clientId: req.params.clientId 
    })
    .populate('salesRepId')
    .sort({ year: -1, month: -1 });
    
    res.json({ client, salesReps, invoices });
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
    
    const { clientId } = req.params;
    const updateData = req.body;
    
    const client = await Client.findByIdAndUpdate(
      clientId,
      updateData,
      { new: true }
    );
    
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
      );
    }
    
    res.json({ message: 'Client updated successfully', client });
  } catch (error) {
    console.error('Update client error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔥 NEW ADMIN SALES REP OVERVIEW ENDPOINT
app.get('/api/admin/clients/:clientId/salesrep-overview', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    const client = await Client.findById(req.params.clientId);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    const salesReps = await SalesRep.find({ 
      clientId: req.params.clientId, 
      isActive: true 
    });

    // Get detailed invoice data for each sales rep
    const salesRepsWithInvoiceData = await Promise.all(
      salesReps.map(async (rep) => {
        const invoices = await Invoice.find({ 
          salesRepId: rep._id,
          type: 'commission'
        }).sort({ year: -1, month: -1 });

        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        
        const currentMonthInvoice = invoices.find(inv => 
          inv.month === currentMonth && inv.year === currentYear
        );

        const stats = {
          totalInvoices: invoices.length,
          pendingInvoices: invoices.filter(inv => inv.status === 'pending').length,
          approvedInvoices: invoices.filter(inv => inv.status === 'approved').length,
          paidInvoices: invoices.filter(inv => inv.status === 'paid').length,
          revisionRequestedInvoices: invoices.filter(inv => inv.status === 'revision_requested').length,
          totalCommissionValue: invoices
            .filter(inv => inv.status === 'approved' || inv.status === 'paid')
            .reduce((sum, inv) => sum + (inv.invoiceData?.commissionExcl || 0), 0),
          hasSubmittedThisMonth: !!currentMonthInvoice,
          currentMonthStatus: currentMonthInvoice?.status || null
        };

        return {
          ...rep.toObject(),
          invoices: invoices.slice(0, 5), // Last 5 invoices for preview
          stats,
          currentMonthInvoice
        };
      })
    );

    res.json({
      client,
      salesReps: salesRepsWithInvoiceData,
      billingDay: client.billingDay,
      isAfterBillingDay: new Date().getDate() > (client.billingDay || 15)
    });
    
  } catch (error) {
    console.error('Get sales rep overview error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Sales rep management endpoints
app.post('/api/admin/clients/:clientId/salesreps', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }

    const { name, email, phone, position, hireDate, commissionRate } = req.body;
    
    // Check if email already exists
    const existingUser = await User.findOne({ email });
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

app.delete('/api/admin/salesreps/:salesRepId', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
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

// CLIENT ENDPOINTS
app.get('/api/client/dashboard', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'client') {
      return res.status(403).json({ message: 'Client access required' });
    }
    
    const client = await Client.findById(req.user.clientId);
    const salesReps = await SalesRep.find({ 
      clientId: req.user.clientId, 
      isActive: true 
    });
    
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
      .sort({ year: -1, month: -1 });
    
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

// Mark sales rep as paid
app.put('/api/admin/mark-paid', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    const { salesRepId, month, year } = req.body;
    
    const invoice = await Invoice.findOneAndUpdate(
      {
        salesRepId,
        month: parseInt(month),
        year: parseInt(year),
        status: 'approved'
      },
      { 
        status: 'paid',
        paidAt: new Date()
      },
      { new: true }
    );
    
    if (!invoice) {
      return res.status(404).json({ message: 'Geen goedgekeurde factuur gevonden' });
    }
    
    res.json({ message: 'Factuur gemarkeerd als betaald', invoice });
  } catch (error) {
    console.error('Mark as paid error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Upload Moneybird invoice
app.post('/api/admin/upload-moneybird-invoice', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    const { clientId, fileName, month, year, amount, description } = req.body;
    
    const networkInvoice = new Invoice({
      clientId,
      uploadedBy: req.user.userId,
      invoiceNumber: `MB-${year}-${String(month).padStart(2, '0')}-${Date.now().toString().slice(-4)}`,
      amount: parseFloat(amount) || 0,
      month: parseInt(month),
      year: parseInt(year),
      status: 'paid',
      type: 'network',
      description: description || `Moneybird factuur - ${fileName}`,
      invoiceData: {
        fileName,
        uploadedAt: new Date()
      }
    });
    
    await networkInvoice.save();
    
    res.status(201).json({
      message: 'Moneybird factuur succesvol geupload',
      invoice: networkInvoice
    });
  } catch (error) {
    console.error('Upload Moneybird invoice error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});
// 🔥 FIXED NETWORK COMMISSION ENDPOINTS
app.get('/api/admin/network-commissions', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    const networkInvoices = await Invoice.find({ 
      type: 'network' 
    })
    .populate('clientId')
    .sort({ year: -1, month: -1 });
    
    console.log('🔥 FOUND NETWORK INVOICES:', networkInvoices.length);
    
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

app.post('/api/admin/generate-network-invoice', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    const { clientId, month, year } = req.body;
    
    console.log('🔥 GENERATING NETWORK INVOICE:', { clientId, month, year });
    
    if (!clientId || !month || !year) {
      return res.status(400).json({ message: 'Missing required fields: clientId, month, year' });
    }
    
    // Get client details
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    console.log('🔥 CLIENT FOUND:', client.name);
    
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
    
    console.log('🔥 NO EXISTING NETWORK INVOICE - PROCEEDING');
    
    // Find all approved sales rep invoices for this client in specified month/year
    const salesRepInvoices = await Invoice.find({
      clientId,
      type: 'commission',
      status: 'approved',
      month: parseInt(month),
      year: parseInt(year)
    });
    
    console.log('🔥 FOUND APPROVED SALES REP INVOICES:', salesRepInvoices.length);
    
    if (salesRepInvoices.length === 0) {
      return res.status(400).json({ 
        message: 'Geen goedgekeurde sales rep facturen gevonden voor deze periode' 
      });
    }
    
    // Calculate total sales rep commission (excl BTW)
    const totalSalesRepCommission = salesRepInvoices.reduce((total, invoice) => {
      const commissionExcl = invoice.invoiceData?.commissionExcl || 0;
      console.log('🔥 ADDING COMMISSION:', commissionExcl);
      return total + commissionExcl;
    }, 0);
    
    console.log('🔥 TOTAL SALES REP COMMISSION:', totalSalesRepCommission);
    
    // Calculate network commission
    const networkRate = client.networkCommissionRate || 0.10;
    const networkCommissionExcl = totalSalesRepCommission * networkRate;
    const networkVat = networkCommissionExcl * 0.21; // 21% BTW
    const networkTotal = networkCommissionExcl + networkVat;
    
    console.log('🔥 NETWORK CALCULATIONS:', {
      networkRate,
      networkCommissionExcl,
      networkVat,
      networkTotal
    });
    
    // Generate invoice number
    const invoiceNumber = `RN-${year}-${String(month).padStart(2, '0')}-${client.name.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`;
    
    console.log('🔥 GENERATED INVOICE NUMBER:', invoiceNumber);
    
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
    
    console.log('🔥 NETWORK INVOICE SAVED SUCCESSFULLY');
    
    res.status(201).json({
      message: 'Network factuur succesvol gegenereerd',
      invoice: networkInvoice,
      totalSalesRepCommission,
      networkRate,
      networkAmount: networkCommissionExcl,
      networkTotal
    });
    
  } catch (error) {
    console.error('❌ Generate network invoice error:', error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// Initialize admin and demo data
const initializeAdmin = async () => {
  try {
    console.log('🔥 INITIALIZING FRESH DATA...');
    
    // Clear existing data
    await User.deleteMany({});
    await Client.deleteMany({});
    await SalesRep.deleteMany({});
    console.log('🔥 Cleared existing data');
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const admin = new User({
      email: 'admin@recruitersnetwork.nl',
      password: hashedPassword,
      role: 'admin',
      name: 'Admin User'
    });
    await admin.save();
    console.log('✅ Admin user created: admin@recruitersnetwork.nl / admin123');

    // Create demo client with ALL FIELDS INCLUDING KVK & BTW
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
    console.log('✅ Demo client created: Acme Corporation with KVK & BTW');

    const clientHashedPassword = await bcrypt.hash('demo123', 12);
    const clientUser = new User({
      email: 'demo@acmecorp.com',
      password: clientHashedPassword,
      role: 'client',
      name: 'John Doe',
      clientId: client._id
    });
    await clientUser.save();
    console.log('✅ Client user created: demo@acmecorp.com / demo123');

    // Create demo sales rep
    const salesRep = new SalesRep({
      name: 'Sarah Johnson',
      email: 'sarah@acmecorp.com',
      phone: '+31 20 123 4568',
      position: 'Senior Sales Representative',
      clientId: client._id,
      hireDate: new Date('2024-01-15'),
      commissionRate: 0.10,
      isConnected: true
    });
    await salesRep.save();
    console.log('✅ Demo sales rep created: Sarah Johnson');

    const repPassword = await bcrypt.hash('demo123', 12);
    const salesRepUser = new User({
      email: 'sarah@acmecorp.com',
      password: repPassword,
      role: 'salesrep',
      name: 'Sarah Johnson',
      clientId: client._id,
      salesRepId: salesRep._id
    });
    await salesRepUser.save();
    console.log('✅ Sales rep user created: sarah@acmecorp.com / demo123');

    console.log('🎉 ALL DEMO DATA CREATED SUCCESSFULLY!');
    console.log('');
    console.log('🔑 LOGIN CREDENTIALS:');
    console.log('   👑 Admin: admin@recruitersnetwork.nl / admin123');
    console.log('   🏢 Client: demo@acmecorp.com / demo123');
    console.log('   💼 Sales Rep: sarah@acmecorp.com / demo123');
    console.log('');
    
  } catch (error) {
    console.error('❌ Initialization error:', error);
  }
};

// Error handling
app.use((error, req, res, next) => {
  console.error('❌ Server Error:', error);
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
// Mark sales rep as paid
app.put('/api/admin/mark-paid', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    const { salesRepId, month, year } = req.body;
    
    // Find the invoice and update status to paid
    const invoice = await Invoice.findOneAndUpdate(
      {
        salesRepId,
        month: parseInt(month),
        year: parseInt(year),
        status: 'approved'
      },
      { 
        status: 'paid',
        paidAt: new Date()
      },
      { new: true }
    );
    
    if (!invoice) {
      return res.status(404).json({ message: 'Geen goedgekeurde factuur gevonden voor deze periode' });
    }
    
    res.json({ 
      message: 'Factuur gemarkeerd als betaald',
      invoice 
    });
  } catch (error) {
    console.error('Mark as paid error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Upload Moneybird invoice
app.post('/api/admin/upload-moneybird-invoice', authenticateToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    
    const { clientId, fileName, month, year, amount, description } = req.body;
    
    // Create a network invoice record
    const networkInvoice = new Invoice({
      clientId,
      uploadedBy: req.user.userId,
      invoiceNumber: `MB-${year}-${String(month).padStart(2, '0')}-${Date.now().toString().slice(-4)}`,
      amount: parseFloat(amount),
      month: parseInt(month),
      year: parseInt(year),
      status: 'paid', // Moneybird invoices are already sent/paid
      type: 'moneybird',
      description: description || `Moneybird factuur - ${fileName}`,
      invoiceData: {
        fileName,
        uploadedAt: new Date()
      }
    });
    
    await networkInvoice.save();
    
    res.status(201).json({
      message: 'Moneybird factuur succesvol geüpload',
      invoice: networkInvoice
    });
  } catch (error) {
    console.error('Upload Moneybird invoice error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
// Start server
const startServer = async () => {
  try {
    await connectDB();
    await initializeAdmin();
    
    app.listen(PORT, () => {
      console.log('');
      console.log('🔥🔥🔥 FIXED SERVER WITH NETWORK INVOICES & CLIENT DETAILS 🔥🔥🔥');
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📝 API: http://localhost:${PORT}/api`);
      console.log('');
      console.log('🔑 FRESH CREDENTIALS:');
      console.log('   👑 Admin: admin@recruitersnetwork.nl / admin123');
      console.log('   🏢 Client: demo@acmecorp.com / demo123');
      console.log('   💼 Sales Rep: sarah@acmecorp.com / demo123');
      console.log('');
      console.log('🔧 FIXES APPLIED:');
      console.log('   ✅ Client KVK & BTW in factuur generator');
      console.log('   ✅ Network invoice generation fixed');
      console.log('   ✅ Admin sales rep overview endpoint added');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();




