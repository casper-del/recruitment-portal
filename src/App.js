import React, { useState, useEffect } from 'react';

console.log('APP.JS LOADED - COMPLETE VERSION WITH INVOICE GENERATOR');

// Icon components
const Building2Icon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
    <path d="M6 12h12"/>
    <path d="M12 12v10"/>
    <path d="M12 2v4"/>
    <rect width="4" height="4" x="14" y="4"/>
    <rect width="4" height="4" x="6" y="4"/>
    <rect width="4" height="4" x="14" y="16"/>
    <rect width="4" height="4" x="6" y="16"/>
  </svg>
);

const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
    <polyline points="9,22 9,12 15,12 15,22"/>
  </svg>
);

const CreditCardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect width="20" height="14" x="2" y="5" rx="2"/>
    <line x1="2" x2="22" y1="10" y2="10"/>
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const BarChart3Icon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 3v18h18"/>
    <path d="M18 17V9"/>
    <path d="M13 17V5"/>
    <path d="M8 17v-3"/>
  </svg>
);

const SettingsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const LogOutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16,17 21,12 16,7"/>
    <line x1="21" x2="9" y1="12" y2="12"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m9 18 6-6-6-6"/>
  </svg>
);

const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m15 18-6-6 6-6"/>
  </svg>
);

const TrendingUpIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"/>
    <polyline points="16,7 22,7 22,13"/>
  </svg>
);

const DollarSignIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" x2="12" y1="2" y2="22"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
  </svg>
);

const FileTextIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
    <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7,10 12,15 17,10"/>
    <line x1="12" x2="12" y1="15" y2="3"/>
  </svg>
);

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14"/>
    <path d="M12 5v14"/>
  </svg>
);

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" x2="6" y1="6" y2="18"/>
    <line x1="6" x2="18" y1="6" y2="18"/>
  </svg>
);

const AlertCircleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" x2="12" y1="8" y2="12"/>
    <line x1="12" x2="12.01" y1="16" y2="16"/>
  </svg>
);

const CheckCircle2Icon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);

const RefreshCwIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
    <path d="M21 3v5h-5"/>
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
    <path d="M3 21v-5h5"/>
  </svg>
);

const LinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const PrinterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6,9 6,2 18,2 18,9"/>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
    <rect width="12" height="8" x="6" y="14"/>
  </svg>
);

// API Configuration
const API_BASE = process.env.REACT_APP_API_URL || (
  window.location.hostname === 'localhost' 
    ? 'http://localhost:3001/api'
    : window.location.protocol + '//' + window.location.hostname + '/api'
);

// API utility functions
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('authToken');
  
  const defaultHeaders = {
    'Content-Type': 'application/json'
  };
  
  if (token) {
    defaultHeaders.Authorization = 'Bearer ' + token;
  }

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

const uploadFile = async (endpoint, file, additionalData = {}) => {
  const token = localStorage.getItem('authToken');
  
  const formData = new FormData();
  formData.append('invoice', file);
  
  Object.keys(additionalData).forEach(key => {
    formData.append(key, additionalData[key]);
  });

  const response = await fetch(API_BASE + endpoint, {
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + token
    },
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Upload failed');
  }

  return response.json();
};

const downloadFile = async (endpoint, filename) => {
  const token = localStorage.getItem('authToken');
  
  const response = await fetch(API_BASE + endpoint, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  });

  if (!response.ok) {
    throw new Error('Download failed');
  }

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-4">
            <div className="text-white">
              <Building2Icon />
            </div>
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
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:transform-none"
            >
              {isLoading ? 'Inloggen...' : 'Inloggen'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 mb-2">Demo accounts:</p>
            <div className="space-y-1 text-xs text-gray-400">
              <p>Admin: admin@recruitersnetwork.nl / admin123</p>
              <p>Client: demo@acmecorp.com / demo123</p>
              <p>Sales Rep: sarah@acmecorp.com / demo123</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© 2024 Recruiters Network. Alle rechten voorbehouden.</p>
        </div>
      </div>
    </div>
  );
};

// Sidebar Component
const Sidebar = ({ user, currentPage, setCurrentPage, sidebarCollapsed, setSidebarCollapsed, onLogout }) => {
  const menuItems = user && user.role === 'admin' ? [
    { id: 'admin-dashboard', label: 'Admin Dashboard', icon: HomeIcon },
    { id: 'clients', label: 'Klanten Beheer', icon: UsersIcon },
    { id: 'admin-settings', label: 'Instellingen', icon: SettingsIcon }
  ] : user && user.role === 'salesrep' ? [
    { id: 'salesrep-dashboard', label: 'Mijn Dashboard', icon: HomeIcon },
    { id: 'salesrep-invoices', label: 'Mijn Facturen', icon: CreditCardIcon },
    { id: 'salesrep-reports', label: 'Mijn Prestaties', icon: BarChart3Icon },
    { id: 'salesrep-settings', label: 'Instellingen', icon: SettingsIcon }
  ] : [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
    { id: 'invoices', label: 'Betalingen & Facturen', icon: CreditCardIcon },
    { id: 'team', label: 'Team Management', icon: UsersIcon },
    { id: 'reports', label: 'Rapportages', icon: BarChart3Icon },
    { id: 'settings', label: 'Instellingen', icon: SettingsIcon }
  ];

  const getRoleLabel = () => {
    if (!user) return 'Portal';
    switch(user.role) {
      case 'admin': return 'Admin Panel';
      case 'salesrep': return 'Sales Portal';
      default: return 'Klantportaal';
    }
  };

  return (
    <div className={'bg-white shadow-xl transition-all duration-300 border-r border-gray-200 ' + (sidebarCollapsed ? 'w-20' : 'w-72')}>
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                <div className="text-white">
                  <Building2Icon />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Recruiters Network</h1>
                <p className="text-xs text-gray-500">{getRoleLabel()}</p>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {sidebarCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </button>
        </div>
      </div>

      <nav className="px-4 py-6 space-y-2">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={'w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-200 ' + (
                isActive 
                  ? 'bg-green-50 text-green-600 shadow-sm border border-green-100' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <div className={'flex-shrink-0 ' + (isActive ? 'text-green-600' : 'text-gray-400')}>
                <IconComponent />
              </div>
              {!sidebarCollapsed && <span className="ml-3 font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
        <div className={'flex items-center mb-4 ' + (sidebarCollapsed ? 'justify-center' : 'justify-between')}>
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-green-600 font-semibold text-sm">
                  {(user && user.name && user.name.charAt(0)) || 'U'}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{user && user.name}</p>
                <p className="text-xs text-gray-500">
                  {user && user.role === 'salesrep' 
                    ? ((user.salesRep && user.salesRep.clientId && user.salesRep.clientId.name) || 'Sales Rep')
                    : ((user.client && user.client.name) || (user && user.email))
                  }
                </p>
              </div>
            </div>
          )}
        </div>
        
        <button 
          onClick={onLogout}
          className={'w-full flex items-center px-4 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors ' + (sidebarCollapsed ? 'justify-center' : '')}
        >
          <LogOutIcon />
          {!sidebarCollapsed && <span className="ml-3 font-medium">Uitloggen</span>}
        </button>
      </div>
    </div>
  );
};

// Admin Client Management Component
const AdminClientManagement = ({ selectedClient, onClose }) => {
  const [clientDetails, setClientDetails] = useState(null);
  const [salesReps, setSalesReps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showAddSalesRep, setShowAddSalesRep] = useState(false);
  const [newSalesRep, setNewSalesRep] = useState({
    name: '',
    email: '',
    phone: '',
    position: 'Sales Representative',
    hireDate: new Date().toISOString().split('T')[0],
    commissionRate: 0.10
  });

  useEffect(() => {
    if (selectedClient) {
      fetchClientDetails();
    }
  }, [selectedClient]);

  const fetchClientDetails = async () => {
    try {
      setIsLoading(true);
      const response = await apiCall('/admin/clients/' + selectedClient._id);
      setClientDetails(response.client);
      setSalesReps(response.salesReps || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-gray-600">Dashboard laden...</p>
        </div>
      </div>
    );
  }

  const totalClients = clients.length;
  const totalSalesReps = clients.reduce((sum, client) => sum + (client.salesRepCount || 0), 0);
  const connectedClients = clients.filter(client => (client.connectedCount || 0) > 0).length;
  const totalInvoices = clients.reduce((sum, client) => sum + (client.invoiceCount || 0), 0);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
        <p className="text-gray-600">Beheer klanten, teams en facturatie</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Totaal Klanten</p>
              <p className="text-3xl font-bold text-gray-900">{totalClients}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <UsersIcon />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sales Reps</p>
              <p className="text-3xl font-bold text-gray-900">{totalSalesReps}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <UsersIcon />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">CRM Connected</p>
              <p className="text-3xl font-bold text-gray-900">{connectedClients}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <SettingsIcon />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Facturen</p>
              <p className="text-3xl font-bold text-gray-900">{totalInvoices}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <FileTextIcon />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Klanten Overzicht</h3>
        
        {clients.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Nog geen klanten toegevoegd</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client) => (
              <div key={client._id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-lg">
                      {client.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{client.name}</h4>
                    <p className="text-sm text-gray-500">{client.email}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Contact:</span>
                    <span className="text-gray-900">{client.contactName}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">CRM:</span>
                    <span className="text-gray-900 capitalize">{client.crmType}</span>
                  </div>
                </div>

                <div className="bg-green-100 px-4 py-2 rounded-lg mb-4">
                  <span className="text-green-600 font-medium text-sm">
                    {client.salesRepCount || 0} team • {client.invoiceCount || 0} facturen
                  </span>
                </div>

                <button
                  onClick={() => {
                    console.log('Button clicked', client);
                    onClientClick && onClientClick(client);
                  }}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Beheren
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Sales Rep Dashboard Component
const SalesRepDashboard = ({ user }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setIsLoading(true);
      const response = await apiCall('/salesrep/dashboard');
      setDashboardData(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-gray-600">Dashboard laden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">
          {'Welkom terug, ' + (user && user.name) + '!'}
        </h2>
        <p className="text-gray-600">
          {(dashboardData && dashboardData.salesRep && dashboardData.salesRep.position) + ' bij ' +
           (dashboardData && dashboardData.salesRep && dashboardData.salesRep.clientId && dashboardData.salesRep.clientId.name)}
        </p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Deze Maand Omzet</p>
              <p className="text-3xl font-bold text-gray-900">
                {'€' + ((dashboardData && dashboardData.currentRevenue && dashboardData.currentRevenue.revenue) || 0).toLocaleString('nl-NL')}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <DollarSignIcon />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Deze Maand Commissie</p>
              <p className="text-3xl font-bold text-gray-900">
                {'€' + ((dashboardData && dashboardData.currentRevenue && dashboardData.currentRevenue.commission) || 0).toLocaleString('nl-NL')}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUpIcon />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Mijn Facturen</p>
              <p className="text-3xl font-bold text-gray-900">
                {(dashboardData && dashboardData.myInvoices && dashboardData.myInvoices.length) || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <FileTextIcon />
            </div>
          </div>
        </div>
      </div>

      {dashboardData && dashboardData.myInvoices && dashboardData.myInvoices.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Recente Facturen</h3>
          
          <div className="space-y-4">
            {dashboardData.myInvoices.map((invoice) => (
              <div key={invoice._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileTextIcon />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{'Factuur #' + invoice.invoiceNumber}</p>
                    <p className="text-sm text-gray-500">
                      {'€' + invoice.amount.toLocaleString('nl-NL', {minimumFractionDigits: 2}) + ' • ' +
                       new Date(0, invoice.month - 1).toLocaleDateString('nl-NL', {month: 'long'}) + ' ' + invoice.year}
                    </p>
                  </div>
                </div>
                <span className={'px-3 py-1 rounded-full text-sm font-medium ' + (
                  invoice.status === 'paid' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-yellow-100 text-yellow-600'
                )}>
                  {invoice.status === 'paid' ? 'Betaald' : 'Openstaand'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {dashboardData && dashboardData.revenueHistory && dashboardData.revenueHistory.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Omzet Geschiedenis</h3>
          
          <div className="space-y-3">
            {dashboardData.revenueHistory.map((record) => (
              <div key={record.year + '-' + record.month} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">
                  {new Date(record.year, record.month - 1).toLocaleDateString('nl-NL', {month: 'long', year: 'numeric'})}
                </span>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{'€' + record.revenue.toLocaleString('nl-NL')}</p>
                  <p className="text-sm text-gray-500">{'€' + record.commission.toLocaleString('nl-NL') + ' commissie'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Updated Sales Rep Invoices Component with Invoice Generator
const SalesRepInvoices = ({ user }) => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showInvoiceGenerator, setShowInvoiceGenerator] = useState(false);
  const [companyDetails, setCompanyDetails] = useState({
    companyName: '',
    contactName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Nederland',
    phone: '',
    email: '',
    kvkNumber: '',
    vatNumber: ''
  });
  const [invoiceData, setInvoiceData] = useState({
    thisMonthRevenue: '',
    commissionExcl: '',
    vatRate: '21',
    description: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  });
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    fetchInvoices();
    loadCompanyDetails();
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

  const loadCompanyDetails = async () => {
    try {
      const response = await apiCall('/salesrep/company-details');
      if (response.companyDetails) {
        setCompanyDetails(response.companyDetails);
      } else {
        // Pre-fill with user data if available
        if (user && user.salesRep) {
          setCompanyDetails(prev => ({
            ...prev,
            contactName: user.name,
            email: user.email,
            phone: user.salesRep.phone || ''
          }));
        }
      }
    } catch (err) {
      // Company details not found - first time setup
      if (user && user.salesRep) {
        setCompanyDetails(prev => ({
          ...prev,
          contactName: user.name,
          email: user.email,
          phone: user.salesRep.phone || ''
        }));
      }
    }
  };

  const saveCompanyDetails = async () => {
    try {
      await apiCall('/salesrep/company-details', {
        method: 'POST',
        body: JSON.stringify(companyDetails)
      });
      setSuccess('Bedrijfsgegevens opgeslagen!');
    } catch (err) {
      setError('Kon bedrijfsgegevens niet opslaan');
    }
  };

  const generateInvoice = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      // Calculate VAT and total
      const commissionAmount = parseFloat(invoiceData.commissionExcl) || 0;
      const vatRate = parseFloat(invoiceData.vatRate) / 100;
      const vatAmount = commissionAmount * vatRate;
      const totalAmount = commissionAmount + vatAmount;
      
      // Generate invoice number
      const invoiceNumber = 'F-' + invoiceData.year + '-' + 
                           String(invoiceData.month).padStart(2, '0') + '-' + 
                           String(Date.now()).slice(-4);
      
      const invoicePayload = {
        invoiceNumber,
        thisMonthRevenue: parseFloat(invoiceData.thisMonthRevenue) || 0,
        commissionExcl: commissionAmount,
        vatRate: parseFloat(invoiceData.vatRate),
        vatAmount,
        totalAmount,
        month: invoiceData.month,
        year: invoiceData.year,
        description: invoiceData.description,
        companyDetails
      };
      
      const response = await apiCall('/salesrep/generate-invoice', {
        method: 'POST',
        body: JSON.stringify(invoicePayload)
      });
      
      setSuccess('Factuur succesvol gegenereerd!');
      setInvoiceData({
        thisMonthRevenue: '',
        commissionExcl: '',
        vatRate: '21',
        description: '',
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
      });
      setShowInvoiceGenerator(false);
      setShowPreview(false);
      await fetchInvoices();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadInvoice = async (invoiceId, fileName) => {
    try {
      await downloadFile('/salesrep/invoices/' + invoiceId + '/download', fileName);
    } catch (err) {
      setError('Download mislukt');
    }
  };

  // Calculate live totals for preview
  const commissionAmount = parseFloat(invoiceData.commissionExcl) || 0;
  const vatRate = parseFloat(invoiceData.vatRate) / 100;
  const vatAmount = commissionAmount * vatRate;
  const totalAmount = commissionAmount + vatAmount;

  // Get client details for invoice
  const clientDetails = user && user.salesRep && user.salesRep.clientId ? {
    name: user.salesRep.clientId.name,
    contactName: user.salesRep.clientId.contactName,
    address: user.salesRep.clientId.address,
    email: user.salesRep.clientId.email
  } : {
    name: 'Client naam wordt automatisch ingevuld',
    contactName: 'Contact persoon',
    address: 'Adres gegevens',
    email: 'client@email.com'
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Mijn Facturen</h2>
            <p className="text-gray-600">Genereer professionele facturen voor je commissies</p>
          </div>
          <button
            onClick={() => setShowInvoiceGenerator(!showInvoiceGenerator)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center"
          >
            <PlusIcon />
            <span className="ml-2">Nieuwe Factuur</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <p className="text-red-700 text-sm">{error}</p>
            <button onClick={() => setError('')} className="text-red-500 hover:text-red-700">
              <XIcon />
            </button>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <p className="text-green-700 text-sm">{success}</p>
            <button onClick={() => setSuccess('')} className="text-green-500 hover:text-green-700">
              <XIcon />
            </button>
          </div>
        </div>
      )}

      {showInvoiceGenerator && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Factuur Generator</h3>
          
          {/* Company Details Section */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">Bedrijfsgegevens</h4>
              <button
                onClick={saveCompanyDetails}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
              >
                Opslaan
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bedrijfsnaam *</label>
                <input
                  type="text"
                  value={companyDetails.companyName}
                  onChange={(e) => setCompanyDetails({...companyDetails, companyName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Jouw Bedrijf B.V."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contactpersoon *</label>
                <input
                  type="text"
                  value={companyDetails.contactName}
                  onChange={(e) => setCompanyDetails({...companyDetails, contactName: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Je naam"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
                <input
                  type="text"
                  value={companyDetails.address}
                  onChange={(e) => setCompanyDetails({...companyDetails, address: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Straatnaam 123"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
                  <input
                    type="text"
                    value={companyDetails.postalCode}
                    onChange={(e) => setCompanyDetails({...companyDetails, postalCode: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="1234AB"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Plaats</label>
                  <input
                    type="text"
                    value={companyDetails.city}
                    onChange={(e) => setCompanyDetails({...companyDetails, city: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Amsterdam"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefoon</label>
                <input
                  type="tel"
                  value={companyDetails.phone}
                  onChange={(e) => setCompanyDetails({...companyDetails, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="+31 6 12345678"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
                <input
                  type="email"
                  value={companyDetails.email}
                  onChange={(e) => setCompanyDetails({...companyDetails, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="jouw@email.nl"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">KVK Nummer</label>
                <input
                  type="text"
                  value={companyDetails.kvkNumber}
                  onChange={(e) => setCompanyDetails({...companyDetails, kvkNumber: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="12345678"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">BTW Nummer</label>
                <input
                  type="text"
                  value={companyDetails.vatNumber}
                  onChange={(e) => setCompanyDetails({...companyDetails, vatNumber: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="NL123456789B01"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Factuur Gegevens</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Omzet deze maand (informatie) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={invoiceData.thisMonthRevenue}
                    onChange={(e) => setInvoiceData({...invoiceData, thisMonthRevenue: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="25000.00"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Dit wordt niet gefactureerd, maar helpt bij tracking</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mijn commissie excl. BTW *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={invoiceData.commissionExcl}
                    onChange={(e) => setInvoiceData({...invoiceData, commissionExcl: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="2500.00"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">BTW Tarief</label>
                  <select
                    value={invoiceData.vatRate}
                    onChange={(e) => setInvoiceData({...invoiceData, vatRate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="21">Hoog (21%)</option>
                    <option value="9">Laag (9%)</option>
                    <option value="0">Vrijgesteld (0%)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Maand</label>
                    <select
                      value={invoiceData.month}
                      onChange={(e) => setInvoiceData({...invoiceData, month: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      {Array.from({length: 12}, (_, i) => (
                        <option key={i+1} value={i+1}>
                          {new Date(0, i).toLocaleDateString('nl-NL', {month: 'long'})}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Jaar</label>
                    <input
                      type="number"
                      value={invoiceData.year}
                      onChange={(e) => setInvoiceData({...invoiceData, year: parseInt(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder={new Date().getFullYear().toString()}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Omschrijving</label>
                  <input
                    type="text"
                    value={invoiceData.description}
                    onChange={(e) => setInvoiceData({...invoiceData, description: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Commissie voor geplaatste kandidaten"
                  />
                </div>
              </div>

              {/* Live Preview */}
              <div className="bg-gray-50 p-6 rounded-xl">
                <h5 className="font-semibold text-gray-900 mb-4">Live Preview</h5>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Omzet deze maand:</span>
                    <span className="font-medium">€{(parseFloat(invoiceData.thisMonthRevenue) || 0).toLocaleString('nl-NL', {minimumFractionDigits: 2})}</span>
                  </div>
                  
                  <div className="border-t border-gray-300 pt-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Commissie excl. BTW:</span>
                      <span className="font-medium">€{commissionAmount.toLocaleString('nl-NL', {minimumFractionDigits: 2})}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">BTW {invoiceData.vatRate}%:</span>
                      <span className="font-medium">€{vatAmount.toLocaleString('nl-NL', {minimumFractionDigits: 2})}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-300 pt-2">
                    <div className="flex justify-between font-bold">
                      <span>Totaal:</span>
                      <span>€{totalAmount.toLocaleString('nl-NL', {minimumFractionDigits: 2})}</span>
                    </div>
                  </div>

                  <div className="border-t border-gray-300 pt-2">
                    <p className="text-xs text-gray-500">
                      Factuur voor: {clientDetails.name}<br/>
                      Periode: {new Date(0, invoiceData.month - 1).toLocaleDateString('nl-NL', {month: 'long'})} {invoiceData.year}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
              >
                <EyeIcon />
                <span className="ml-2">{showPreview ? 'Verberg Preview' : 'Toon Preview'}</span>
              </button>
              
              <button
                onClick={generateInvoice}
                disabled={isLoading || !invoiceData.thisMonthRevenue || !invoiceData.commissionExcl || !companyDetails.companyName || !companyDetails.email}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <PrinterIcon />
                <span className="ml-2">{isLoading ? 'Genereren...' : 'Factuur Genereren'}</span>
              </button>
              
              <button
                onClick={() => {
                  setShowInvoiceGenerator(false);
                  setShowPreview(false);
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Annuleren
              </button>
            </div>
          </div>

          {/* Full Invoice Preview */}
          {showPreview && (
            <div className="border-t border-gray-200 pt-8 mt-8">
              <div className="bg-white border-2 border-gray-300 rounded-xl p-8 max-w-4xl mx-auto">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900">FACTUUR</h3>
                  <p className="text-gray-600">
                    F-{invoiceData.year}-{String(invoiceData.month).padStart(2, '0')}-{String(Date.now()).slice(-4)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Van:</h4>
                    <div className="text-sm text-gray-700">
                      <p className="font-medium">{companyDetails.companyName || 'Bedrijfsnaam'}</p>
                      <p>{companyDetails.contactName}</p>
                      {companyDetails.address && <p>{companyDetails.address}</p>}
                      {(companyDetails.postalCode || companyDetails.city) && (
                        <p>{companyDetails.postalCode} {companyDetails.city}</p>
                      )}
                      {companyDetails.phone && <p>{companyDetails.phone}</p>}
                      <p>{companyDetails.email}</p>
                      {companyDetails.kvkNumber && <p>KVK: {companyDetails.kvkNumber}</p>}
                      {companyDetails.vatNumber && <p>BTW: {companyDetails.vatNumber}</p>}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Aan:</h4>
                    <div className="text-sm text-gray-700">
                      <p className="font-medium">{clientDetails.name}</p>
                      <p>{clientDetails.contactName}</p>
                      {clientDetails.address && <p>{clientDetails.address}</p>}
                      <p>{clientDetails.email}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-sm text-gray-600">
                    <strong>Factuurdatum:</strong> {new Date().toLocaleDateString('nl-NL')}<br/>
                    <strong>Periode:</strong> {new Date(0, invoiceData.month - 1).toLocaleDateString('nl-NL', {month: 'long'})} {invoiceData.year}
                  </p>
                </div>

                <div className="border border-gray-300 rounded-lg overflow-hidden mb-8">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Omschrijving</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">Bedrag</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 text-sm text-gray-700">
                          <div>
                            <p className="font-medium">
                              {invoiceData.description || 'Commissie voor geplaatste kandidaten'}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              Omzet deze maand: €{(parseFloat(invoiceData.thisMonthRevenue) || 0).toLocaleString('nl-NL', {minimumFractionDigits: 2})}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-900 text-right">
                          €{commissionAmount.toLocaleString('nl-NL', {minimumFractionDigits: 2})}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end mb-8">
                  <div className="w-64">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Subtotaal:</span>
                        <span>€{commissionAmount.toLocaleString('nl-NL', {minimumFractionDigits: 2})}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>BTW {invoiceData.vatRate}%:</span>
                        <span>€{vatAmount.toLocaleString('nl-NL', {minimumFractionDigits: 2})}</span>
                      </div>
                      <div className="border-t border-gray-300 pt-2 flex justify-between font-bold">
                        <span>Totaal:</span>
                        <span>€{totalAmount.toLocaleString('nl-NL', {minimumFractionDigits: 2})}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-500 border-t border-gray-200 pt-4">
                  <p>Betalingstermijn: 30 dagen na factuurdatum</p>
                  <p className="mt-2">Deze factuur is gegenereerd via het Recruiters Network platform.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Invoices List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">{'Mijn Facturen (' + invoices.length + ')'}</h3>
        
        {invoices.length === 0 ? (
          <div className="text-center py-8">
            <FileTextIcon />
            <h4 className="text-lg font-medium text-gray-900 mt-4">Nog geen facturen</h4>
            <p className="text-gray-600 mt-2">Genereer je eerste factuur om te beginnen</p>
          </div>
        ) : (
          <div className="space-y-4">
            {invoices
              .sort((a, b) => b.year - a.year || b.month - a.month)
              .map((invoice) => (
              <div key={invoice._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <FileTextIcon />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{'Factuur #' + invoice.invoiceNumber}</h4>
                    <p className="text-gray-600">
                      {'€' + invoice.amount.toLocaleString('nl-NL', {minimumFractionDigits: 2})}
                    </p>
                    <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                      <span>
                        {new Date(0, invoice.month - 1).toLocaleDateString('nl-NL', {month: 'long'}) + ' ' + invoice.year}
                      </span>
                      {invoice.description && <span>{'• ' + invoice.description}</span>}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={'px-3 py-1 rounded-full text-sm font-medium ' + (
                    invoice.status === 'paid' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-yellow-100 text-yellow-600'
                  )}>
                    {invoice.status === 'paid' ? 'Betaald' : 'Openstaand'}
                  </span>
                  
                  <button
                    onClick={() => downloadInvoice(invoice._id, invoice.fileName)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                  >
                    <DownloadIcon />
                    <span className="ml-2">Download</span>
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

// Updated Client Dashboard Component with Revenue Chart
const ClientDashboard = ({ user }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setIsLoading(true);
      const response = await apiCall('/client/dashboard');
      setDashboardData(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-gray-600">Dashboard laden...</p>
        </div>
      </div>
    );
  }

  // Calculate max revenue for chart scaling
  const maxRevenue = dashboardData && dashboardData.salesReps ? 
    Math.max(...dashboardData.salesReps.map(rep => rep.thisMonthRevenue || 0), 1000) : 1000;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">{'Welkom bij je klantportaal, ' + (user && user.name) + '!'}</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Deze Maand Omzet</p>
              <p className="text-3xl font-bold text-gray-900">
                {'€' + ((dashboardData && dashboardData.totals && dashboardData.totals.thisMonthRevenue) || 0).toLocaleString('nl-NL')}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <DollarSignIcon />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Deze Maand Commissie</p>
              <p className="text-3xl font-bold text-gray-900">
                {'€' + ((dashboardData && dashboardData.totals && dashboardData.totals.thisMonthCommission) || 0).toLocaleString('nl-NL')}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUpIcon />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Actieve Sales Reps</p>
              <p className="text-3xl font-bold text-gray-900">
                {(dashboardData && dashboardData.salesReps && dashboardData.salesReps.length) || 0}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <UsersIcon />
            </div>
          </div>
        </div>
      </div>

      {dashboardData && dashboardData.salesReps && dashboardData.salesReps.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Team Overzicht</h3>
          
          <div className="space-y-6">
            {dashboardData.salesReps.map((rep) => {
              const revenuePercentage = maxRevenue > 0 ? (rep.thisMonthRevenue || 0) / maxRevenue * 100 : 0;
              
              return (
                <div key={rep._id} className="border border-gray-200 rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 font-semibold text-lg">
                          {rep.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-lg">{rep.name}</p>
                        <p className="text-sm text-gray-500">{rep.email}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 text-lg">
                        {'€' + (rep.thisMonthRevenue || 0).toLocaleString('nl-NL')}
                      </p>
                      <p className="text-sm text-gray-500">
                        {'€' + (rep.thisMonthCommission || 0).toLocaleString('nl-NL') + ' commissie'}
                      </p>
                    </div>
                  </div>

                  {/* Revenue Bar Chart */}
                  <div className="mb-3">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Omzet deze maand</span>
                      <span className="text-sm text-gray-500">
                        {revenuePercentage.toFixed(0) + '% van top performer'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500"
                        style={{width: revenuePercentage + '%'}}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <p className="text-gray-500">Positie</p>
                      <p className="font-medium">{rep.position || 'Sales Rep'}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-500">Start datum</p>
                      <p className="font-medium">
                        {rep.hireDate ? new Date(rep.hireDate).toLocaleDateString('nl-NL') : 'Onbekend'}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-gray-500">Commissie rate</p>
                      <p className="font-medium">
                        {((rep.commissionRate || 0.1) * 100).toFixed(1) + '%'}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

// Updated Client Invoices Component - Only Recruitment Network Invoices
const ClientInvoices = ({ user }) => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      setIsLoading(true);
      const response = await apiCall('/client/invoices');
      // Filter out sales rep invoices - only show recruitment network invoices
      const recruitmentInvoices = response.filter(invoice => 
        invoice.type === 'client' || !invoice.salesRepId
      );
      setInvoices(recruitmentInvoices);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadInvoice = async (invoiceId, fileName) => {
    try {
      // Fixed download path
      const response = await fetch(API_BASE + '/client/invoices/' + invoiceId + '/download', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('authToken')
        }
      });

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName || ('invoice-' + invoiceId + '.pdf');
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Download error:', err);
      setError('Download mislukt: ' + err.message);
    }
  };

  const groupedInvoices = invoices.reduce((acc, invoice) => {
    const key = invoice.year + '-' + invoice.month;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(invoice);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Betalingen & Facturen</h2>
        <p className="text-gray-600">Overzicht van recruitment fees van Recruiters Network</p>
        <div className="mt-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700">
            <strong>Info:</strong> Dit overzicht toont alleen facturen van Recruiters Network voor recruitment services. 
            Sales rep commissie facturen zijn te vinden bij Team Management.
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-700 text-sm">{error}</p>
          <button 
            onClick={() => setError('')}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Sluiten
          </button>
        </div>
      )}

      {Object.keys(groupedInvoices).length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <FileTextIcon />
          <h3 className="text-lg font-semibold text-gray-900 mt-4">Nog geen facturen</h3>
          <p className="text-gray-600 mt-2">Je recruitment fee facturen verschijnen hier zodra ze zijn geupload</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedInvoices)
            .sort((a, b) => b[0].localeCompare(a[0]))
            .map((entry) => {
              const monthYear = entry[0];
              const monthInvoices = entry[1];
              const yearMonth = monthYear.split('-').map(Number);
              const year = yearMonth[0];
              const month = yearMonth[1];
              const monthName = new Date(year, month - 1).toLocaleDateString('nl-NL', {
                month: 'long',
                year: 'numeric'
              });
              
              const totalAmount = monthInvoices.reduce((sum, inv) => sum + inv.amount, 0);
              
              return (
                <div key={monthYear} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-semibold text-gray-900 capitalize">{monthName}</h3>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Totaal bedrag</p>
                      <p className="text-xl font-bold text-gray-900">
                        {'€' + totalAmount.toLocaleString('nl-NL', {minimumFractionDigits: 2})}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {monthInvoices.map((invoice) => (
                      <div key={invoice._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <FileTextIcon />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">{'Factuur #' + invoice.invoiceNumber}</h4>
                            <p className="text-gray-600">
                              {'€' + invoice.amount.toLocaleString('nl-NL', {minimumFractionDigits: 2})}
                            </p>
                            <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                                Recruitment Fee
                              </span>
                              {invoice.description && <span>{'• ' + invoice.description}</span>}
                              {invoice.uploadedBy && (
                                <span>{'• Geupload door ' + invoice.uploadedBy.name}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <span className={'px-3 py-1 rounded-full text-sm font-medium ' + (
                            invoice.status === 'paid' 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-yellow-100 text-yellow-600'
                          )}>
                            {invoice.status === 'paid' ? 'Betaald' : 'Openstaand'}
                          </span>
                          
                          <button
                            onClick={() => downloadInvoice(invoice._id, invoice.fileName)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                          >
                            <DownloadIcon />
                            <span className="ml-2">Download</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

// New Team Management Component
const ClientTeamManagement = ({ user }) => {
  const [teamData, setTeamData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTeamData();
  }, []);

  const fetchTeamData = async () => {
    try {
      setIsLoading(true);
      const dashboardResponse = await apiCall('/client/dashboard');
      
      // Get sales rep invoices for each team member
      const salesRepsWithInvoices = await Promise.all(
        (dashboardResponse.salesReps || []).map(async (rep) => {
          try {
            const invoicesResponse = await apiCall('/client/invoices');
            const repInvoices = invoicesResponse.filter(invoice => 
              invoice.salesRepId && invoice.salesRepId._id === rep._id
            );
            return {
              ...rep,
              invoices: repInvoices,
              totalCommissionPaid: repInvoices
                .filter(inv => inv.status === 'paid')
                .reduce((sum, inv) => sum + inv.amount, 0),
              maxCommissionCap: rep.commissionCap || 50000 // Default cap
            };
          } catch (err) {
            return {
              ...rep,
              invoices: [],
              totalCommissionPaid: 0,
              maxCommissionCap: rep.commissionCap || 50000
            };
          }
        })
      );

      setTeamData({
        ...dashboardResponse,
        salesReps: salesRepsWithInvoices
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadInvoice = async (invoiceId, fileName) => {
    try {
      const response = await fetch(API_BASE + '/client/invoices/' + invoiceId + '/download', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('authToken')
        }
      });

      if (!response.ok) {
        throw new Error('Download failed');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName || ('invoice-' + invoiceId + '.pdf');
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError('Download mislukt: ' + err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-gray-600">Team data laden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Team Management</h2>
        <p className="text-gray-600">Beheer je recruitment team en bekijk individuele prestaties en commissie uitbetalingen</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-700 text-sm">{error}</p>
          <button 
            onClick={() => setError('')}
            className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
          >
            Sluiten
          </button>
        </div>
      )}

      {(!teamData || !teamData.salesReps || teamData.salesReps.length === 0) ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <UsersIcon />
          <h3 className="text-lg font-semibold text-gray-900 mt-4">Nog geen team leden</h3>
          <p className="text-gray-600 mt-2">Je sales reps verschijnen hier zodra ze zijn toegevoegd door een admin</p>
        </div>
      ) : (
        <div className="space-y-6">
          {teamData.salesReps.map((rep) => {
            const commissionPercentage = rep.maxCommissionCap > 0 ? 
              (rep.totalCommissionPaid / rep.maxCommissionCap * 100) : 0;
            const thisMonthCommissionPercentage = rep.maxCommissionCap > 0 ? 
              ((rep.thisMonthCommission || 0) / rep.maxCommissionCap * 100) : 0;

            return (
              <div key={rep._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-xl">
                      {rep.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900">{rep.name}</h3>
                    <p className="text-gray-600">{rep.email}</p>
                    <p className="text-sm text-gray-500">{rep.position || 'Sales Representative'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Deze maand omzet</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {'€' + (rep.thisMonthRevenue || 0).toLocaleString('nl-NL')}
                    </p>
                  </div>
                </div>

                {/* Commission Progress */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-semibold text-gray-900">Vergoeding Status</h4>
                    <span className="text-sm text-gray-600">
                      {'€' + rep.totalCommissionPaid.toLocaleString('nl-NL') + ' / €' + 
                       rep.maxCommissionCap.toLocaleString('nl-NL') + ' (' + 
                       Math.round(commissionPercentage) + '%)'}
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-6 relative overflow-hidden">
                    {/* Total commission paid */}
                    <div 
                      className="bg-green-500 h-6 rounded-full transition-all duration-700"
                      style={{width: Math.min(commissionPercentage, 100) + '%'}}
                    ></div>
                    {/* This month commission overlay */}
                    <div 
                      className="bg-green-300 h-6 rounded-full absolute top-0 transition-all duration-700"
                      style={{
                        width: Math.min(thisMonthCommissionPercentage, 100) + '%',
                        right: Math.max(0, 100 - commissionPercentage) + '%'
                      }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-2 text-sm">
                    <span className="text-gray-600">
                      Deze maand: €{(rep.thisMonthCommission || 0).toLocaleString('nl-NL')}
                    </span>
                    <span className="text-gray-600">
                      Resterend: €{Math.max(0, rep.maxCommissionCap - rep.totalCommissionPaid).toLocaleString('nl-NL')}
                    </span>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Commissie Rate</p>
                    <p className="font-bold text-lg text-gray-900">
                      {((rep.commissionRate || 0.1) * 100).toFixed(1) + '%'}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Start Datum</p>
                    <p className="font-bold text-lg text-gray-900">
                      {rep.hireDate ? new Date(rep.hireDate).toLocaleDateString('nl-NL', {
                        month: 'short', year: 'numeric'
                      }) : '-'}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">Facturen</p>
                    <p className="font-bold text-lg text-gray-900">{rep.invoices.length}</p>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-500">CRM Status</p>
                    <p className="font-bold text-lg text-gray-900">
                      {rep.isConnected ? '✅ Connected' : '❌ Offline'}
                    </p>
                  </div>
                </div>

                {/* Commission Invoices */}
                {rep.invoices.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">
                      {'Commissie Facturen (' + rep.invoices.length + ')'}
                    </h4>
                    <div className="space-y-3">
                      {rep.invoices
                        .sort((a, b) => b.year - a.year || b.month - a.month)
                        .slice(0, 5) // Show only last 5 invoices
                        .map((invoice) => (
                        <div key={invoice._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <FileTextIcon />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 text-sm">
                                {'#' + invoice.invoiceNumber}
                              </p>
                              <p className="text-xs text-gray-500">
                                {new Date(0, invoice.month - 1).toLocaleDateString('nl-NL', {month: 'long'}) + ' ' + invoice.year}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3">
                            <span className="font-semibold text-gray-900">
                              {'€' + invoice.amount.toLocaleString('nl-NL')}
                            </span>
                            <span className={'px-2 py-1 rounded text-xs font-medium ' + (
                              invoice.status === 'paid' 
                                ? 'bg-green-100 text-green-600' 
                                : 'bg-yellow-100 text-yellow-600'
                            )}>
                              {invoice.status === 'paid' ? 'Betaald' : 'Open'}
                            </span>
                            <button
                              onClick={() => downloadInvoice(invoice._id, invoice.fileName)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs transition-colors"
                            >
                              Download
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      {rep.invoices.length > 5 && (
                        <p className="text-sm text-gray-500 text-center">
                          {'... en ' + (rep.invoices.length - 5) + ' oudere facturen'}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Client Settings Component
const ClientSettings = ({ user }) => {
  const [availableCRMs, setAvailableCRMs] = useState([]);
  const [clientData, setClientData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchAvailableCRMs();
    fetchClientData();
  }, []);

  const fetchAvailableCRMs = async () => {
    try {
      const response = await apiCall('/crm/available');
      setAvailableCRMs(response);
    } catch (err) {
      setError('Kon CRM opties niet laden');
    }
  };

  const fetchClientData = async () => {
    try {
      const response = await apiCall('/client/dashboard');
      setClientData(response.client);
    } catch (err) {
      setError('Kon client data niet laden');
    }
  };

  const connectCRM = async (crmType) => {
    try {
      setIsLoading(true);
      const response = await apiCall('/client/crm/connect?type=' + crmType);
      
      if (response.authUrl) {
        window.location.href = response.authUrl;
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateCRMSettings = async (crmType) => {
    try {
      setIsLoading(true);
      await apiCall('/client/crm/settings', {
        method: 'POST',
        body: JSON.stringify({ crmType })
      });
      
      setSuccess('CRM instellingen bijgewerkt');
      await fetchClientData();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const syncCRM = async () => {
    try {
      setIsLoading(true);
      const response = await apiCall('/client/crm/sync', {
        method: 'POST'
      });
      
      setSuccess(response.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Instellingen</h2>
        <p className="text-gray-600">CRM koppelingen en systeemconfiguratie</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center">
            <AlertCircleIcon />
            <p className="text-red-700 text-sm ml-2">{error}</p>
          </div>
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-4">
          <div className="flex items-center">
            <CheckCircle2Icon />
            <p className="text-green-700 text-sm ml-2">{success}</p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">CRM Integratie</h3>
            <p className="text-gray-600">Koppel je CRM systeem voor automatische synchronisatie</p>
          </div>
          {clientData && clientData.crmCredentials && clientData.crmCredentials.accessToken && (
            <button
              onClick={syncCRM}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center disabled:opacity-50"
            >
              <RefreshCwIcon />
              <span className="ml-2">Synchroniseren</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {availableCRMs.map((crm) => (
            <div key={crm.id} className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{crm.name}</h4>
                  <p className="text-sm text-gray-500">{crm.description}</p>
                </div>
                {clientData && clientData.crmType === crm.id && (
                  <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full">
                    Actief
                  </span>
                )}
              </div>

              <div className="space-y-3">
                {!clientData || clientData.crmType !== crm.id ? (
                  <button
                    onClick={() => updateCRMSettings(crm.id)}
                    disabled={isLoading}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                  >
                    Selecteer
                  </button>
                ) : (
                  <div>
                    {!clientData.crmCredentials || !clientData.crmCredentials.accessToken ? (
                      <button
                        onClick={() => connectCRM(crm.id)}
                        disabled={isLoading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center disabled:opacity-50"
                      >
                        <LinkIcon />
                        <span className="ml-2">Verbinden</span>
                      </button>
                    ) : (
                      <div className="space-y-2">
                        <div className="flex items-center text-green-600 text-sm">
                          <CheckCircle2Icon />
                          <span className="ml-2">Verbonden</span>
                        </div>
                        <button
                          onClick={() => connectCRM(crm.id)}
                          disabled={isLoading}
                          className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                        >
                          Opnieuw verbinden
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Account Informatie</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bedrijfsnaam</label>
            <p className="text-gray-900">{(clientData && clientData.name) || 'Niet beschikbaar'}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contactpersoon</label>
            <p className="text-gray-900">{(clientData && clientData.contactName) || 'Niet beschikbaar'}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">E-mailadres</label>
            <p className="text-gray-900">{(clientData && clientData.email) || 'Niet beschikbaar'}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Commissie Percentage</label>
            <p className="text-gray-900">
              {clientData ? ((clientData.commissionRate * 100).toFixed(1) + '%') : 'Niet beschikbaar'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Placeholder Page Component
const PlaceholderPage = ({ title, description }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

// Main App Component
const App = () => {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showClientModal, setShowClientModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const parsed = JSON.parse(userData);
        setUser(parsed);
        
        if (parsed.role === 'admin') {
          setCurrentPage('admin-dashboard');
        } else if (parsed.role === 'salesrep') {
          setCurrentPage('salesrep-dashboard');
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
        setCurrentPage('salesrep-dashboard');
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
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser(null);
    setCurrentPage('dashboard');
    setSelectedClient(null);
    setShowClientModal(false);
  };

  const handleClientClick = (client) => {
    console.log('handleClientClick called with:', client);
    setSelectedClient(client);
    setShowClientModal(true);
  };

  if (!user) {
    return <LoginForm onLogin={login} isLoading={isLoading} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        user={user}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        onLogout={logout}
      />

      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-8 py-8">
          {user.role === 'admin' && (
            <div>
              {currentPage === 'admin-dashboard' && (
                <AdminDashboard onClientClick={handleClientClick} />
              )}
              
              {currentPage === 'clients' && (
                <PlaceholderPage 
                  title="Klanten Beheer" 
                  description="Beheer alle klanten, hun instellingen en toegangsrechten."
                />
              )}
              
              {currentPage === 'admin-settings' && (
                <PlaceholderPage 
                  title="Admin Instellingen" 
                  description="Systeemconfiguratie, gebruikersbeheer en globale instellingen."
                />
              )}
            </div>
          )}

          {user.role === 'salesrep' && (
            <div>
              {currentPage === 'salesrep-dashboard' && (
                <SalesRepDashboard user={user} />
              )}
              
              {currentPage === 'salesrep-invoices' && (
                <SalesRepInvoices user={user} />
              )}
              
              {currentPage === 'salesrep-reports' && (
                <PlaceholderPage 
                  title="Mijn Prestaties" 
                  description="Bekijk je omzet, commissies en performance metrics."
                />
              )}
              
              {currentPage === 'salesrep-settings' && (
                <PlaceholderPage 
                  title="Mijn Instellingen" 
                  description="Persoonlijke instellingen en account beheer."
                />
              )}
            </div>
          )}

          {user.role === 'client' && (
            <div>
              {currentPage === 'dashboard' && (
                <ClientDashboard user={user} />
              )}

              {currentPage === 'invoices' && (
                <ClientInvoices user={user} />
              )}

              {currentPage === 'team' && (
                <ClientTeamManagement user={user} />
              )}

              {currentPage === 'reports' && (
                <PlaceholderPage 
                  title="Rapportages" 
                  description="Uitgebreide analytics en rapportages van je recruitment performance."
                />
              )}

              {currentPage === 'settings' && (
                <ClientSettings user={user} />
              )}
            </div>
          )}
        </div>
      </div>

      {showClientModal && selectedClient && (
        <AdminClientManagement
          selectedClient={selectedClient}
          onClose={() => {
            setShowClientModal(false);
            setSelectedClient(null);
          }}
        />
      )}
    </div>
  );
};

export default App;
