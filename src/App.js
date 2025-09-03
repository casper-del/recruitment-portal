import React, { useState, useEffect } from 'react';

console.log('COMPLETE APP - ALL FEATURES LOADED');

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
  )
};

// Your Logo Component
const Logo = ({ size = "large" }) => {
  const dimensions = size === "large" ? "w-16 h-16" : "w-10 h-10";
  
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

// PDF Generation utility
const generateInvoicePDF = (invoice, companyDetails, clientDetails = {}) => {
  return new Promise((resolve) => {
    const pdfContent = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="border-bottom: 2px solid #16a34a; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="color: #16a34a; margin: 0; font-size: 28px;">FACTUUR</h1>
          <p style="margin: 5px 0; font-size: 18px; font-weight: bold;">#${invoice.invoiceNumber}</p>
        </div>
        <div style="margin-bottom: 30px;">
          <h3 style="color: #16a34a;">Factuur Naar:</h3>
          <p style="font-weight: bold;">${clientDetails.clientCompanyName || clientDetails.name || 'Client'}</p>
        </div>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
          <tr style="background-color: #16a34a; color: white;">
            <td style="padding: 12px;">TOTAAL</td>
            <td style="padding: 12px; text-align: right;">€${(invoice.amount || 0).toLocaleString('nl-NL', {minimumFractionDigits: 2})}</td>
          </tr>
        </table>
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
        resolve(true);
      });
    } else {
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head><title>Factuur ${invoice.invoiceNumber}</title></head>
          <body>${pdfContent}<script>window.print();</script></body>
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
    throw new Error(errorData.message || 'API Error');
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

// Simple Dashboard Components
const SimpleDashboard = ({ title }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600">Dit onderdeel wordt nog verder uitgewerkt...</p>
    </div>
  </div>
);

// CLIENT INVOICES PAGE
const ClientInvoicesPage = ({ user }) => {
  const [salesRepInvoices, setSalesRepInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchAllInvoices();
  }, []);

  const fetchAllInvoices = async () => {
    try {
      setIsLoading(true);
      const salesRepResponse = await apiCall('/client/invoices');
      setSalesRepInvoices(salesRepResponse || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadInvoicePDF = async (invoice) => {
    try {
      const companyDetails = invoice.invoiceData?.companyDetails || {};
      const clientDetails = {
        clientCompanyName: user.client?.name || 'Client',
        clientContactName: user.name
      };
      await generateInvoicePDF(invoice, companyDetails, clientDetails);
      setSuccess('PDF wordt gedownload...');
    } catch (err) {
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
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Betalingen & Facturen</h2>
        <p className="text-gray-600">Overzicht van alle facturen</p>
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
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Sales Rep Facturen</h3>
        
        {salesRepInvoices.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <icons.FileText />
            </div>
            <h4 className="text-lg font-medium text-gray-900">Nog geen facturen</h4>
          </div>
        ) : (
          <div className="space-y-4">
            {salesRepInvoices.map((invoice) => (
              <div key={invoice._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <icons.FileText />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">#{invoice.invoiceNumber}</h4>
                    <p className="text-gray-600">€{invoice.amount.toLocaleString('nl-NL', {minimumFractionDigits: 2})}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
                    {invoice.status === 'paid' ? 'Betaald' : 'Te beoordelen'}
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

// ADMIN DASHBOARD - Complete and properly closed
const AdminDashboard = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
            <p className="text-gray-600">Beheer klanten, sales reps en facturen</p>
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
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Klanten ({clients.length})</h3>
        
        {clients.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <icons.Users />
            </div>
            <h4 className="text-lg font-medium text-gray-900">Nog geen klanten</h4>
            <p className="text-gray-600 mt-2">Admin functionaliteit wordt verder uitgewerkt</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client) => (
              <div key={client._id} className="border border-gray-200 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900">{client.name}</h4>
                <p className="text-gray-600 text-sm">{client.contactName}</p>
                <p className="text-gray-500 text-xs">{client.email}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// SALES REP INVOICES
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
      const companyDetails = {
        companyName: 'Sample Company',
        contactName: user.name,
        email: user.email
      };
      
      const clientDetails = {
        clientCompanyName: user.client?.name || 'Client'
      };

      await generateInvoicePDF(invoice, companyDetails, clientDetails);
      setSuccess('PDF wordt gedownload...');
    } catch (err) {
      setError('Kon PDF niet genereren');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Mijn Facturen</h2>
        <p className="text-gray-600">Genereer en download professionele facturen</p>
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
            <p className="text-gray-600 mt-2">Sales rep functionaliteit wordt verder uitgewerkt</p>
          </div>
        ) : (
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <icons.FileText />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Factuur #{invoice.invoiceNumber}</h4>
                    <p className="text-gray-600">€{invoice.amount.toLocaleString('nl-NL', {minimumFractionDigits: 2})}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
                    {invoice.status === 'paid' ? 'Betaald' : 'Te beoordelen'}
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
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Team Dashboard</h2>
            <p className="text-gray-600">Overzicht van je sales team</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Welkom terug,</p>
            <p className="text-lg font-semibold text-gray-900">{user?.name}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Team Overview</h3>
        <p className="text-gray-600">Team dashboard functionaliteit wordt verder uitgewerkt...</p>
      </div>
    </div>
  );
};

// ADMIN NETWORK COMMISSIONS
const AdminNetworkCommissions = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Facturen</h2>
        <p className="text-gray-600">Genereer en beheer network commissie facturen</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Network Commissie Facturen</h3>
        <p className="text-gray-600">Network commissie functionaliteit wordt verder uitgewerkt...</p>
      </div>
    </div>
  );
};

// FIXED SIDEBAR
const FixedSidebar = ({ user, currentPage, setCurrentPage, onLogout }) => {
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
              onClick={() => setCurrentPage(item.id)}
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
          onClick={onLogout}
          className="w-full flex items-center px-4 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
        >
          <icons.LogOut />
          <span className="ml-3 font-medium">Uitloggen</span>
        </button>
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
    if (!document.querySelector('script[src*="html2pdf"]')) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      document.head.appendChild(script);
    }

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
      throw new Error(error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
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
