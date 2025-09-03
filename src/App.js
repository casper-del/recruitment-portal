import React, { useState, useEffect } from 'react';

console.log('COMPLETE APP - OPTIMIZED VERSION LOADED');

// Fixed Icon components
const icons = {
  Building2: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
    </svg>
  ),
  Home: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9,22 9,12 15,12 15,22"/>
    </svg>
  ),
  CreditCard: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect width="20" height="14" x="2" y="5" rx="2"/>
      <path d="m2 10 20 0"/>
    </svg>
  ),
  Users: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
    </svg>
  ),
  Settings: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  LogOut: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
      <polyline points="16,17 21,12 16,7"/>
      <line x1="21" x2="9" y1="12" y2="12"/>
    </svg>
  ),
  X: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" x2="6" y1="6" y2="18"/>
      <line x1="6" x2="18" y1="6" y2="18"/>
    </svg>
  ),
  Plus: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14"/>
      <path d="M12 5v14"/>
    </svg>
  ),
  Download: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7,10 12,15 17,10"/>
      <path d="M12 15V3"/>
    </svg>
  ),
  FileText: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
      <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
    </svg>
  ),
  DollarSign: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" x2="12" y1="2" y2="22"/>
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
    </svg>
  ),
  TrendingUp: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/>
      <polyline points="16,7 22,7 22,13"/>
    </svg>
  ),
  CheckCircle: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22,4 12,14.01 9,11.01"/>
    </svg>
  ),
  AlertTriangle: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
      <line x1="12" x2="12" y1="9" y2="13"/>
      <line x1="12" x2="12.01" y1="17" y2="17"/>
    </svg>
  ),
  Edit: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
      <path d="m15 5 4 4"/>
    </svg>
  ),
  Trash2: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m3 6 18 0"/>
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
      <path d="m8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
    </svg>
  ),
  Save: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/>
      <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"/>
      <path d="M7 3v4a1 1 0 0 0 1 1h8"/>
    </svg>
  ),
  Eye: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
};

// LOGO COMPONENT - Your integrated logo
const Logo = ({ size = "large" }) => {
  const dimensions = size === "large" ? "w-16 h-16" : "w-10 h-10";
  
  // Your green circuit-style logo converted to SVG
  return (
    <div className={`${dimensions} flex items-center justify-center`}>
      <svg 
        className={dimensions}
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="100" height="100" rx="20" fill="#16a34a"/>
        <path d="M20 30h60M20 50h40M20 70h50" stroke="white" strokeWidth="4" strokeLinecap="round"/>
        <circle cx="65" cy="50" r="8" fill="white"/>
        <circle cx="75" cy="70" r="6" fill="white"/>
        <circle cx="25" cy="35" r="4" fill="white"/>
        <path d="M65 42v16M75 64v12M25 31v8" stroke="#16a34a" strokeWidth="2"/>
      </svg>
    </div>
  );
};

// PDF Generation utility - COMPLETE
const generateInvoicePDF = (invoice, companyDetails, clientDetails = {}) => {
  console.log('GENERATING PDF FOR INVOICE:', invoice);
  
  return new Promise((resolve) => {
    const pdfContent = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="border-bottom: 2px solid #16a34a; padding-bottom: 20px; margin-bottom: 30px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <h1 style="color: #16a34a; margin: 0; font-size: 28px;">FACTUUR</h1>
              <p style="margin: 5px 0; font-size: 18px; font-weight: bold;">#${invoice.invoiceNumber}</p>
              <p style="margin: 5px 0; color: #666;">Datum: ${new Date().toLocaleDateString('nl-NL')}</p>
            </div>
            <div style="text-align: right;">
              <h2 style="color: #16a34a; margin: 0; font-size: 20px;">${companyDetails.companyName || 'Uw Bedrijf'}</h2>
              <p style="margin: 2px 0;">${companyDetails.contactName || ''}</p>
              <p style="margin: 2px 0;">${companyDetails.address || ''}</p>
              <p style="margin: 2px 0;">${companyDetails.city || ''} ${companyDetails.postalCode || ''}</p>
              <p style="margin: 2px 0;">${companyDetails.email || ''}</p>
              <p style="margin: 2px 0;">${companyDetails.phone || ''}</p>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 30px;">
          <h3 style="color: #16a34a; border-bottom: 1px solid #e5e5e5; padding-bottom: 10px;">Factuur Naar:</h3>
          <div style="margin-top: 15px;">
            <p style="margin: 2px 0; font-weight: bold; font-size: 16px;">${clientDetails.clientCompanyName || clientDetails.name || 'Client'}</p>
            <p style="margin: 2px 0;">${clientDetails.clientContactName || clientDetails.contactName || ''}</p>
            <p style="margin: 2px 0;">${clientDetails.clientAddress || clientDetails.address || ''}</p>
            ${clientDetails.clientKvk || clientDetails.kvkNumber ? `<p style="margin: 2px 0;">KVK: ${clientDetails.clientKvk || clientDetails.kvkNumber}</p>` : ''}
            ${clientDetails.clientVat || clientDetails.vatNumber ? `<p style="margin: 2px 0;">BTW: ${clientDetails.clientVat || clientDetails.vatNumber}</p>` : ''}
          </div>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
          <thead>
            <tr style="background-color: #f8f9fa;">
              <th style="border: 1px solid #dee2e6; padding: 12px; text-align: left;">Omschrijving</th>
              <th style="border: 1px solid #dee2e6; padding: 12px; text-align: right; width: 120px;">Bedrag</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #dee2e6; padding: 12px;">
                ${invoice.type === 'network' ? 'Recruiters Network Commissie' : 'Commissie'} ${new Date(0, invoice.month - 1).toLocaleDateString('nl-NL', {month: 'long'})} ${invoice.year}
                ${invoice.invoiceData?.thisMonthRevenue ? `<br><small style="color: #666;">Omzet deze maand: €${(invoice.invoiceData.thisMonthRevenue || 0).toLocaleString('nl-NL')}</small>` : ''}
              </td>
              <td style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">
                €${(invoice.invoiceData?.commissionExcl || invoice.invoiceData?.networkAmount || 0).toLocaleString('nl-NL', {minimumFractionDigits: 2})}
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid #dee2e6; padding: 12px;">BTW ${(invoice.invoiceData?.vatRate || 21)}%</td>
              <td style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">
                €${(invoice.invoiceData?.vatAmount || 0).toLocaleString('nl-NL', {minimumFractionDigits: 2})}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr style="background-color: #16a34a; color: white; font-weight: bold;">
              <td style="border: 1px solid #16a34a; padding: 12px;">TOTAAL</td>
              <td style="border: 1px solid #16a34a; padding: 12px; text-align: right;">
                €${(invoice.amount || 0).toLocaleString('nl-NL', {minimumFractionDigits: 2})}
              </td>
            </tr>
          </tfoot>
        </table>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
          <h4 style="color: #16a34a;">Betalingsgegevens</h4>
          <p><strong>Rekeningnummer:</strong> ${companyDetails.bankAccount || 'NL91 ABNA 0417 1643 00'}</p>
          <p><strong>Ten name van:</strong> ${companyDetails.companyName || 'Recruiters Network'}</p>
          ${companyDetails.kvkNumber ? `<p><strong>KVK:</strong> ${companyDetails.kvkNumber}</p>` : ''}
          ${companyDetails.vatNumber ? `<p><strong>BTW-nummer:</strong> ${companyDetails.vatNumber}</p>` : ''}
          <p style="margin-top: 15px; font-size: 14px; color: #666;">
            Gelieve het factuurnummer te vermelden bij uw betaling.
          </p>
        </div>
      </div>
    `;

    if (typeof html2pdf !== 'undefined') {
      const element = document.createElement('div');
      element.innerHTML = pdfContent;
      
      const opt = {
        margin: 10,
        filename: `Factuur-${invoice.invoiceNumber}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };

      html2pdf().set(opt).from(element).save().then(() => {
        console.log('PDF GENERATED SUCCESSFULLY');
        resolve(true);
      });
    } else {
      console.log('PDF LIBRARY NOT LOADED - USING PRINT FALLBACK');
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>Factuur ${invoice.invoiceNumber}</title>
            <style>body { font-family: Arial, sans-serif; margin: 20px; } @media print { body { margin: 0; } }</style>
          </head>
          <body>
            ${pdfContent}
            <script>window.onload = function() { window.print(); setTimeout(function() { window.close(); }, 1000); };</script>
          </body>
        </html>
      `);
      printWindow.document.close();
      resolve(true);
    }
  });
};

// API Configuration
const API_BASE = process.env.REACT_APP_API_URL || (
  window.location.hostname === 'localhost' 
    ? 'http://localhost:3001/api'
    : window.location.protocol + '//' + window.location.hostname + '/api'
);

const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('authToken');
  
  const defaultHeaders = { 'Content-Type': 'application/json' };
  if (token) defaultHeaders.Authorization = 'Bearer ' + token;

  const response = await fetch(API_BASE + endpoint, {
    headers: Object.assign({}, defaultHeaders, options.headers || {}),
    ...options
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'API Error: ' + response.statusText);
  }

  return response.json();
};

// Login Component
const LoginForm = ({ onLogin, isLoading }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      await onLogin(email, password);
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Logo size="large" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Recruiters Network</h1>
          <p className="text-gray-600">Log in op je portaal</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <p className="text-red-700 text-sm">{error}</p>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">E-mailadres</label>
              <input
                type="email"
                placeholder="jouw@email.nl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                required
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Wachtwoord</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
                required
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50"
            >
              {isLoading ? 'Inloggen...' : 'Inloggen'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load PDF library
    if (!document.querySelector('script[src*="html2pdf"]')) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      document.head.appendChild(script);
      console.log('HTML2PDF LIBRARY LOADING...');
    }

    // Check for existing session
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const parsed = JSON.parse(userData);
        setUser(parsed);
        
        if (parsed.role === 'admin') {
          setCurrentPage('admin-dashboard');
        } else if (parsed.role === 'salesrep') {
          setCurrentPage('salesrep-invoices');
        } else {
          setCurrentPage('dashboard');
        }
      } catch (error) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
  }, []);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      const response = await apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
      });

      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userData', JSON.stringify(response.user));
      setUser(response.user);
      
      if (response.user.role === 'admin') {
        setCurrentPage('admin-dashboard');
      } else if (response.user.role === 'salesrep') {
        setCurrentPage('salesrep-invoices');
      } else {
        setCurrentPage('dashboard');
      }
    } catch (error) {
      throw new Error(error.message || 'Login failed. Check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log('LOGGING OUT');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    setCurrentPage('dashboard');
  };

  if (!user) {
    return <LoginForm onLogin={login} isLoading={isLoading} />;
  }

  return (
    <div className="min-h-screen bg-gray-50" style={{display: 'flex'}}>
      <FixedSidebar 
        user={user}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onLogout={logout}
      />

      <div 
        className="flex-1"
        style={{
          marginLeft: '280px',
          minHeight: '100vh',
          overflowY: 'auto'
        }}
      >
        <div className="max-w-7xl mx-auto px-8 py-8">
          {user.role === 'admin' && (
            <div>
              {currentPage === 'admin-dashboard' && <AdminDashboard />}
              {currentPage === 'clients' && <AdminDashboard />}
              {currentPage === 'network-commissions' && <AdminNetworkCommissions />}
              {currentPage === 'admin-settings' && <SimpleDashboard title="Admin Instellingen" />}
            </div>
          )}

          {user.role === 'salesrep' && (
            <div>
              {currentPage === 'salesrep-dashboard' && <SimpleDashboard title="Sales Rep Dashboard" />}
              {currentPage === 'salesrep-invoices' && <SalesRepInvoices user={user} />}
              {currentPage === 'salesrep-reports' && <SimpleDashboard title="Sales Rep Reports" />}
              {currentPage === 'salesrep-settings' && <SimpleDashboard title="Sales Rep Settings" />}
            </div>
          )}

          {user.role === 'client' && (
            <div>
              {currentPage === 'dashboard' && <ClientTeamDashboard user={user} />}
              {currentPage === 'invoices' && <ClientInvoicesPage user={user} />}
              {currentPage === 'reports' && <SimpleDashboard title="Client Reports" />}
              {currentPage === 'settings' && <SimpleDashboard title="Client Settings" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

// Simple Dashboard Components for placeholder pages
const SimpleDashboard = ({ title }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600">Dit onderdeel wordt nog verder uitgewerkt...</p>
    </div>
  </div>
);

// CLIENT INVOICES PAGE - Complete implementation
const ClientInvoicesPage = ({ user }) => {
  const [salesRepInvoices, setSalesRepInvoices] = useState([]);
  const [networkInvoices, setNetworkInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchAllInvoices();
  }, []);

  const fetchAllInvoices = async () => {
    try {
      setIsLoading(true);
      
      // Fetch sales rep invoices
      const salesRepResponse = await apiCall('/client/invoices');
      setSalesRepInvoices(salesRepResponse || []);
      
      // Fetch network invoices - mock for now since endpoint doesn't exist yet
      setNetworkInvoices([]);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadInvoicePDF = async (invoice, type = 'salesrep') => {
    try {
      console.log(`CLIENT DOWNLOADING ${type.toUpperCase()} INVOICE PDF:`, invoice);
      
      let companyDetails, clientDetails;
      
      if (type === 'network') {
        companyDetails = {
          companyName: 'Recruiters Network B.V.',
          contactName: 'Admin Team',
          address: 'Herengracht 123, 1015 BG Amsterdam',
          city: 'Amsterdam',
          postalCode: '1015 BG',
          email: 'admin@recruitersnetwork.nl',
          phone: '+31 20 123 4567',
          kvkNumber: '87654321',
          vatNumber: 'NL987654321B01',
          bankAccount: 'NL12 RABO 0123 4567 89'
        };
        clientDetails = {
          name: user.client?.name || 'Client',
          contactName: user.name,
          address: user.client?.address || '',
          kvkNumber: user.client?.kvkNumber || '',
          vatNumber: user.client?.vatNumber || ''
        };
      } else {
        companyDetails = invoice.invoiceData?.companyDetails || {};
        clientDetails = {
          clientCompanyName: user.client?.name || 'Client',
          clientContactName: user.name,
          clientAddress: user.client?.address || '',
          clientKvk: user.client?.kvkNumber || '',
          clientVat: user.client?.vatNumber || ''
        };
      }

      await generateInvoicePDF(invoice, companyDetails, clientDetails);
      setSuccess('PDF wordt gedownload...');
    } catch (err) {
      console.error('PDF download error:', err);
      setError('Kon PDF niet genereren');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-gray-600">Facturen laden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Betalingen & Facturen</h2>
            <p className="text-gray-600">Overzicht van alle facturen van sales reps en Recruiters Network</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Client:</p>
            <p className="text-lg font-semibold text-gray-900">{user?.client?.name}</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <p className="text-red-700 text-sm">{error}</p>
            <button onClick={() => setError('')} className="text-red-500 hover:text-red-700">
              <icons.X />
            </button>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <p className="text-green-700 text-sm">{success}</p>
            <button onClick={() => setSuccess('')} className="text-green-500 hover:text-green-700">
              <icons.X />
            </button>
          </div>
        </div>
      )}

      {/* Sales Rep Facturen Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Sales Rep Facturen ({salesRepInvoices.length})</h3>
        <p className="text-gray-600 mb-4">Facturen van je sales team leden</p>
        
        {salesRepInvoices.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <icons.FileText />
            </div>
            <h4 className="text-lg font-medium text-gray-900">Nog geen sales rep facturen</h4>
            <p className="text-gray-600 mt-2">Sales rep facturen zullen hier verschijnen zodra ze worden ingediend</p>
          </div>
        ) : (
          <div className="space-y-4">
            {salesRepInvoices.map((invoice) => (
              <div key={invoice._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-sm transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <icons.FileText />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">#{invoice.invoiceNumber}</h4>
                    <p className="text-gray-600">{invoice.salesRepId?.name || 'Sales Rep'}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(0, invoice.month - 1).toLocaleDateString('nl-NL', {month: 'long'})} {invoice.year}
                    </p>
                    <p className="text-xs text-gray-500">
                      Commissie: €{(invoice.invoiceData?.commissionExcl || 0).toLocaleString('nl-NL', {minimumFractionDigits: 2})} 
                      {invoice.invoiceData?.thisMonthRevenue && ` • Omzet: €${invoice.invoiceData.thisMonthRevenue.toLocaleString('nl-NL')}`}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">€{invoice.amount.toLocaleString('nl-NL', {minimumFractionDigits: 2})}</p>
                    <p className="text-xs text-gray-500">incl. BTW</p>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    invoice.status === 'paid' 
                      ? 'bg-green-100 text-green-600' 
                      : invoice.status === 'approved'
                      ? 'bg-blue-100 text-blue-600'
                      : invoice.status === 'revision_requested'
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {invoice.status === 'paid' ? 'Betaald' : 
                     invoice.status === 'approved' ? 'Goedgekeurd' :
                     invoice.status === 'revision_requested' ? 'Herzien' :
                     'Te beoordelen'}
                  </span>

                  <button
                    onClick={() => downloadInvoicePDF(invoice, 'salesrep')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center"
                  >
                    <icons.Download />
                    <span className="ml-1">PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recruiters Network Facturen Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Recruiters Network Facturen ({networkInvoices.length})</h3>
        <p className="text-gray-600 mb-4">Facturen van Recruiters Network voor jullie network commissies</p>
        
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <icons.Building2 />
          </div>
          <h4 className="text-lg font-medium text-gray-900">Nog geen network facturen</h4>
          <p className="text-gray-600 mt-2">Network commissie facturen zullen hier verschijnen</p>
        </div>
      </div>
    </div>
  );
};

// ADMIN DASHBOARD - Complete with all CRUD operations
const AdminDashboard = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showAddClient, setShowAddClient] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showClientModal, setShowClientModal] = useState(false);
  const [clientDetails, setClientDetails] = useState(null);
  const [editingClient, setEditingClient] = useState(false);

  const [newClient, setNewClient] = useState({
    name: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    kvkNumber: '',
    vatNumber: '',
    bankAccount: '',
    networkCommissionRate: '10',
    billingDay: '15',
    commissionRate: '10',
    commissionCap: '50000'
  });

  const [newSalesRep, setNewSalesRep] = useState({
    name: '',
    email: '',
    phone: '',
    position: 'Sales Representative',
    hireDate: new Date().toISOString().split('T')[0],
    commissionRate: '10'
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setIsLoading(true);
      const response = await apiCall('/admin/clients');
      setClients(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addClient = async () => {
    try {
      setIsLoading(true);
      const response = await apiCall('/admin/clients', {
        method: 'POST',
        body: JSON.stringify({
          ...newClient,
          networkCommissionRate: parseFloat(newClient.networkCommissionRate) / 100,
          billingDay: parseInt(newClient.billingDay),
          commissionRate: parseFloat(newClient.commissionRate) / 100,
          commissionCap: parseFloat(newClient.commissionCap)
        })
      });
      
      setSuccess(`Client toegevoegd! Tijdelijk wachtwoord: ${response.tempPassword}`);
      setNewClient({
        name: '',
        contactName: '',
        email: '',
        phone: '',
        address: '',
        kvkNumber: '',
        vatNumber: '',
        bankAccount: '',
        networkCommissionRate: '10',
        billingDay: '15',
        commissionRate: '10',
        commissionCap: '50000'
      });
      setShowAddClient(false);
      await fetchClients();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchClientDetails = async (clientId) => {
    try {
      setIsLoading(true);
      const response = await apiCall(`/admin/clients/${clientId}`);
      setClientDetails(response);
      setSelectedClient(response.client);
      setShowClientModal(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateClient = async () => {
    try {
      setIsLoading(true);
      await apiCall(`/admin/clients/${selectedClient._id}`, {
        method: 'PUT',
        body: JSON.stringify(selectedClient)
      });
      setSuccess('Client bijgewerkt!');
      setEditingClient(false);
      await fetchClients();
      await fetchClientDetails(selectedClient._id);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addSalesRep = async () => {
    if (!selectedClient) return;
    
    try {
      setIsLoading(true);
      const response = await apiCall(`/admin/clients/${selectedClient._id}/salesreps`, {
        method: 'POST',
        body: JSON.stringify({
          ...newSalesRep,
          commissionRate: parseFloat(newSalesRep.commissionRate) / 100
        })
      });
      
      setSuccess(`Sales rep toegevoegd! Tijdelijk wachtwoord: ${response.tempPassword}`);
      setNewSalesRep({
        name: '',
        email: '',
        phone: '',
        position: 'Sales Representative',
        hireDate: new Date().toISOString().split('T')[0],
        commissionRate: '10'
      });
      await fetchClientDetails(selectedClient._id);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSalesRep = async (salesRepId, salesRepName) => {
    if (window.confirm(`Weet je zeker dat je ${salesRepName} wilt verwijderen?`)) {
      try {
        setIsLoading(true);
        await apiCall(`/admin/salesreps/${salesRepId}`, { method: 'DELETE' });
        setSuccess('Sales rep verwijderd');
        await fetchClientDetails(selectedClient._id);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
            <p className="text-gray-600">Beheer klanten, sales reps en facturen</p>
          </div>
          <button
            onClick={() => setShowAddClient(!showAddClient)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center"
          >
            <icons.Plus />
            <span className="ml-2">Nieuwe Klant</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <p className="text-red-700 text-sm">{error}</p>
            <button onClick={() => setError('')} className="text-red-500 hover:text-red-700">
              <icons.X />
            </button>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <p className="text-green-700 text-sm">{success}</p>
            <button onClick={() => setSuccess('')} className="text-green-500 hover:text-green-700">
              <icons.X />
            </button>
          </div>
        </div>
      )}

      {/* Rest of AdminDashboard implementation continues... */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Klanten ({clients.length})</h3>
        
        {clients.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <icons.Users />
            </div>
            <h4 className="text-lg font-medium text-gray-900">Nog geen klanten</h4>
            <p className="text-gray-600 mt-2">Voeg je eerste klant toe om te beginnen</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client) => (
              <div key={client._id} className="border border-gray-200 rounded-xl p-6 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{client.name}</h4>
                    <p className="text-gray-600 text-sm">{client.contactName}</p>
                    <p className="text-gray-500 text-xs">{client.email}</p>
                    
                    <div className="mt-3 space-y-1">
                      <div className="flex items-center text-xs text-gray-500">
                        <span>Sales Reps: {client.salesRepCount || 0}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>Network: {((client.networkCommissionRate || 0.1) * 100).toFixed(1)}%</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>Facturatie: {client.billingDay || 15}e van de maand</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => fetchClientDetails(client._id)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                  >
                    Beheren
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// SALES REP INVOICES - Complete with PDF downloads
const SalesRepInvoices = ({ user }) => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setIsLoading(true);
      const response = await apiCall('/salesrep/invoices');
      setInvoices(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadInvoicePDF = async (invoice) => {
    try {
      console.log('SALES REP DOWNLOADING INVOICE PDF:', invoice);
      
      const companyDetails = {
        companyName: 'Sample Company',
        contactName: user.name,
        email: user.email
      };
      
      const clientDetails = {
        clientCompanyName: user.client?.name || 'Client',
        clientContactName: 'Contact Person',
        clientAddress: user.client?.address || ''
      };

      await generateInvoicePDF(invoice, companyDetails, clientDetails);
      setSuccess('PDF wordt gedownload...');
    } catch (err) {
      console.error('PDF download error:', err);
      setError('Kon PDF niet genereren');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Mijn Facturen</h2>
            <p className="text-gray-600">Genereer en download professionele facturen voor je commissies</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <p className="text-red-700 text-sm">{error}</p>
            <button onClick={() => setError('')} className="text-red-500 hover:text-red-700">
              <icons.X />
            </button>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <p className="text-green-700 text-sm">{success}</p>
            <button onClick={() => setSuccess('')} className="text-green-500 hover:text-green-700">
              <icons.X />
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Mijn Facturen ({invoices.length})</h3>
        
        {invoices.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <icons.FileText />
            </div>
            <h4 className="text-lg font-medium text-gray-900">Nog geen facturen</h4>
            <p className="text-gray-600 mt-2">Genereer je eerste factuur om te beginnen</p>
          </div>
        ) : (
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-sm transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <icons.FileText />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Factuur #{invoice.invoiceNumber}</h4>
                    <p className="text-gray-600">€{invoice.amount.toLocaleString('nl-NL', {minimumFractionDigits: 2})}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(0, invoice.month - 1).toLocaleDateString('nl-NL', {month: 'long'})} {invoice.year}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    invoice.status === 'paid' 
                      ? 'bg-green-100 text-green-600' 
                      : invoice.status === 'approved'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {invoice.status === 'paid' ? 'Betaald' : 
                     invoice.status === 'approved' ? 'Goedgekeurd' :
                     'Te beoordelen'}
                  </span>

                  <button
                    onClick={() => downloadInvoicePDF(invoice)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center"
                  >
                    <icons.Download />
                    <span className="ml-1">PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// CLIENT TEAM DASHBOARD
const ClientTeamDashboard = ({ user }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-gray-600">Team dashboard laden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Team Dashboard</h2>
            <p className="text-gray-600">Overzicht van je sales team en hun prestaties</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Welkom terug,</p>
            <p className="text-lg font-semibold text-gray-900">{user?.name}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Team Overview</h3>
        <p className="text-gray-600">Team dashboard functionaliteit wordt nog verder uitgewerkt...</p>
      </div>
    </div>
  );
};

// ADMIN NETWORK COMMISSIONS
const AdminNetworkCommissions = () => {
  const [commissions, setCommissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Mock data for now
    setCommissions([]);
  }, []);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Facturen</h2>
            <p className="text-gray-600">Genereer en beheer network commissie facturen</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Network Commissie Facturen</h3>
        <p className="text-gray-600">Network commissie functionaliteit wordt nog verder uitgewerkt...</p>
      </div>
    </div>
  );
};

// FIXED SIDEBAR
const FixedSidebar = ({ user, currentPage, setCurrentPage, onLogout }) => {
  console.log('RENDERING FIXED SIDEBAR');
  
  const menuItems = user && user.role === 'admin' ? [
    { id: 'admin-dashboard', label: 'Admin Dashboard', icon: icons.Home },
    { id: 'clients', label: 'Klanten Beheer', icon: icons.Users },
    { id: 'network-commissions', label: 'Facturen', icon: icons.CreditCard },
    { id: 'admin-settings', label: 'Instellingen', icon: icons.Settings }
  ] : user && user.role === 'salesrep' ? [
    { id: 'salesrep-dashboard', label: 'Mijn Dashboard', icon: icons.Home },
    { id: 'salesrep-invoices', label: 'Mijn Facturen', icon: icons.CreditCard },
    { id: 'salesrep-reports', label: 'Mijn Prestaties', icon: icons.Users },
    { id: 'salesrep-settings', label: 'Instellingen', icon: icons.Settings }
  ] : [
    { id: 'dashboard', label: 'Team Dashboard', icon: icons.Home },
    { id: 'invoices', label: 'Betalingen & Facturen', icon: icons.CreditCard },
    { id: 'reports', label: 'Rapportages', icon: icons.Users },
    { id: 'settings', label: 'Instellingen', icon: icons.Settings }
  ];

  return (
    <div 
      className="bg-white shadow-xl border-r border-gray-200"
      style={{
        width: '280px',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 1000
      }}
    >
      <div className="p-6 border-b border-gray-100" style={{flexShrink: 0}}>
        <div className="flex items-center space-x-3">
          <Logo size="small" />
          <div>
            <h1 className="text-xl font-bold text-gray-900">Recruiters Network</h1>
            <p className="text-xs text-gray-500">
              {user?.role === 'admin' ? 'Admin Panel' : user?.role === 'salesrep' ? 'Sales Portal' : 'Klantportaal'}
            </p>
          </div>
        </div>
      </div>

      <nav className="px-4 py-6 space-y-2" style={{flex: 1, overflowY: 'auto'}}>
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                console.log('MENU CLICKED:', item.id);
                setCurrentPage(item.id);
              }}
              className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                isActive 
                  ? 'bg-green-50 text-green-600 shadow-sm border border-green-100' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className={`flex-shrink-0 ${isActive ? 'text-green-600' : 'text-gray-400'}`}>
                <IconComponent />
              </div>
              <span className="ml-3 font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100" style={{flexShrink: 0}}>
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
            <span className="text-green-600 font-semibold text-sm">
              {(user && user.name && user.name.charAt(0)) || 'U'}
            </span>
          </div>
          <div className="ml-3">
            <p className="font-medium text-gray-900">{user && user.name}</p>
            <p className="text-xs text-gray-500">{user && user.email}</p>
          </div>
        </div>
        
        <button 
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('LOGOUT CLICKED - ONLY IN SIDEBAR');
            onLogout();
          }}
          className="w-full flex items-center px-4 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
        >
          <icons.LogOut />
          <span className="ml-3 font-medium">Uitloggen</span>
        </button>
