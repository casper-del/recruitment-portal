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

console.log('🔥 COMPLETELY NEW SERVER.JS LOADING 🔥');

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
    message: '🔥 COMPLETELY NEW API VERSION',
    version: '3.0.0',
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

// 🔥 FIXED SALES REP COMPANY DETAILS WITH CLIENT INFO
app.get('/api/salesrep/company-details', authenticateToken, async (req, res) => {
  try {
    console.log('🔥 GETTING COMPANY DETAILS FOR SALES REP');
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
      console.log('🔥 CLIENT DATA:', {
        name: client.name,
        contactName: client.contactName,
        address: client.address,
        phone: client.phone,
        kvkNumber: client.kvkNumber,
        vatNumber: client.vatNumber
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
      
      // 🔥 CLIENT INFORMATION - WHO THE INVOICE GOES TO
      clientCompanyName: client?.name || '',
      clientContactName: client?.contactName || '',
      clientAddress: client?.address || '',
      clientPhone: client?.phone || '',
      clientKvk: client?.kvkNumber || '',
      clientVat: client?.vatNumber || ''
    };
    
    console.log('🔥 SENDING COMPANY DETAILS:', companyDetails);
    
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

// 🔥 INITIALIZE FRESH DATA EVERY TIME
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

    // Create demo client with ALL FIELDS
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
    console.log('✅ Demo client created: Acme Corporation');

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

// Start server
const startServer = async () => {
  try {
    await connectDB();
    await initializeAdmin();
    
    app.listen(PORT, () => {
      console.log('');
      console.log('🔥🔥🔥 COMPLETELY NEW SERVER RUNNING 🔥🔥🔥');
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📝 API: http://localhost:${PORT}/api`);
      console.log('');
      console.log('🔑 FRESH CREDENTIALS (database reset):');
      console.log('   👑 Admin: admin@recruitersnetwork.nl / admin123');
      console.log('   🏢 Client: demo@acmecorp.com / demo123');
      console.log('   💼 Sales Rep: sarah@acmecorp.com / demo123');
      console.log('');
      console.log('🔥 All issues should now be FIXED!');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
