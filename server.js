import React, { useState, useEffect } from 'react';

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
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
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

const EyeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const FileTextIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
    <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
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

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m3 6 18 0"/>
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
    <line x1="10" x2="10" y1="11" y2="17"/>
    <line x1="14" x2="14" y1="11" y2="17"/>
  </svg>
);

const UserPlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
    <circle cx="8.5" cy="7" r="4"/>
    <line x1="20" x2="20" y1="8" y2="14"/>
    <line x1="23" x2="17" y1="11" y2="11"/>
  </svg>
);

const LinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
  </svg>
);

const UploadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17,8 12,3 7,8"/>
    <line x1="12" x2="12" y1="3" y2="15"/>
  </svg>
);

// API Configuration
const API_BASE = process.env.REACT_APP_API_URL || (
  window.location.hostname === 'localhost' 
    ? 'http://localhost:3001/api'
    : `${window.location.protocol}//${window.location.hostname}/api`
);

// API utility functions
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('authToken');
  
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };

  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: { ...defaultHeaders, ...options.headers },
    ...options
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `API Error: ${response.statusText}`);
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

  const response = await fetch(`${API_BASE}${endpoint}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Upload failed');
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
const Sidebar = ({ user, activeMenuItem, setActiveMenuItem, sidebarCollapsed, setSidebarCollapsed, onLogout }) => {
  const menuItems = user?.role === 'admin' ? [
    { id: 'admin-dashboard', label: 'Admin Dashboard', icon: HomeIcon },
    { id: 'clients', label: 'Klanten Beheer', icon: UsersIcon },
    { id: 'admin-settings', label: 'Instellingen', icon: SettingsIcon },
  ] : user?.role === 'salesrep' ? [
    { id: 'salesrep-dashboard', label: 'Mijn Dashboard', icon: HomeIcon },
    { id: 'salesrep-invoices', label: 'Mijn Facturen', icon: CreditCardIcon },
    { id: 'salesrep-reports', label: 'Mijn Prestaties', icon: BarChart3Icon },
    { id: 'salesrep-settings', label: 'Instellingen', icon: SettingsIcon },
  ] : [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
    { id: 'invoices', label: 'Betalingen & Facturen', icon: CreditCardIcon },
    { id: 'team', label: 'Team Management', icon: UsersIcon },
    { id: 'reports', label: 'Rapportages', icon: BarChart3Icon },
    { id: 'settings', label: 'Instellingen', icon: SettingsIcon },
  ];

  const getRoleLabel = () => {
    switch(user?.role) {
      case 'admin': return 'Admin Panel';
      case 'salesrep': return 'Sales Portal';
      default: return 'Klantportaal';
    }
  };

  return (
    <div className={`bg-white shadow-xl transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-72'} border-r border-gray-200`}>
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
          const isActive = activeMenuItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveMenuItem(item.id)}
              className={`w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                isActive 
                  ? 'bg-green-50 text-green-600 shadow-sm border border-green-100' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className={`flex-shrink-0 ${isActive ? 'text-green-600' : 'text-gray-400'}`}>
                <IconComponent />
              </div>
              {!sidebarCollapsed && <span className="ml-3 font-medium">{item.label}</span>}
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
        <div className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-between'} mb-4`}>
          {!sidebarCollapsed && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-green-600 font-semibold text-sm">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <p className="font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">
                  {user?.role === 'salesrep' 
                    ? (user?.salesRep?.clientId?.name || 'Sales Rep')
                    : (user?.client?.name || user?.email)
                  }
                </p>
              </div>
            </div>
          )}
        </div>
        
        <button 
          onClick={onLogout}
          className={`w-full flex items-center px-4 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors ${sidebarCollapsed ? 'justify-center' : ''}`}
        >
          <LogOutIcon />
          {!sidebarCollapsed && <span className="ml-3 font-medium">Uitloggen</span>}
        </button>
      </div>
    </div>
  );
};

// Admin Dashboard Component
const AdminDashboard = ({ onClientClick }) => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-gray-600">Klanten laden...</p>
        </div>
      </div>
    );
  }

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
              <p className="text-3xl font-bold text-gray-900">{clients.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <UsersIcon />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Sales Reps</p>
              <p className="text-3xl font-bold text-gray-900">
                {clients.reduce((sum, client) => sum + (client.salesRepCount || 0), 0)}
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
              <p className="text-sm text-gray-600">CRM Connected</p>
              <p className="text-3xl font-bold text-gray-900">
                {clients.reduce((sum, client) => sum + (client.connectedCount || 0), 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <LinkIcon />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Facturen</p>
              <p className="text-3xl font-bold text-gray-900">
                {clients.reduce((sum, client) => sum + (client.invoiceCount || 0), 0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <FileTextIcon />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Klanten Overzicht</h3>
        
        <div className="space-y-4">
          {clients.map((client) => (
            <div key={client._id} className="border border-gray-200 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center">
                    <span className="text-green-600 font-bold text-xl">
                      {client.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{client.name}</h4>
                    <p className="text-gray-600">{client.contactName} • {client.email}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <span>{client.salesRepCount || 0} teamleden</span>
                      <span>{client.connectedCount || 0} connected</span>
                      <span>{((client.commissionRate || 0) * 100).toFixed(1)}% commissie</span>
                      <span className="text-blue-600 font-medium">{(client.crmType || 'teamleader').toUpperCase()}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => onClientClick(client)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center"
                >
                  <EyeIcon />
                  <span className="ml-2">Beheren</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Simple Client Modal Component
const ClientModal = ({ client, isOpen, onClose }) => {
  const [clientData, setClientData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('info');

  const [companyInfo, setCompanyInfo] = useState({
    name: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    commissionRate: 0.10,
    commissionCap: 50000,
    crmType: 'teamleader'
  });

  const [newSalesRep, setNewSalesRep] = useState({
    name: '',
    email: '',
    phone: '',
    position: 'Sales Representative',
    hireDate: new Date().toISOString().split('T')[0],
    commissionRate: 0.10
  });

  useEffect(() => {
    if (isOpen && client) {
      fetchClientDetails();
      setCompanyInfo({
        name: client.name || '',
        contactName: client.contactName || '',
        email: client.email || '',
        phone: client.phone || '',
        address: client.address || '',
        commissionRate: client.commissionRate || 0.10,
        commissionCap: client.commissionCap || 50000,
        crmType: client.crmType || 'teamleader'
      });
    }
  }, [isOpen, client]);

  const fetchClientDetails = async () => {
    try {
      setIsLoading(true);
      const response = await apiCall(`/admin/clients/${client._id}`);
      setClientData(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateCompanyInfo = async () => {
    try {
      setIsLoading(true);
      await apiCall(`/admin/clients/${client._id}`, {
        method: 'PUT',
        body: JSON.stringify(companyInfo)
      });
      await fetchClientDetails();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addSalesRep = async () => {
    try {
      setIsLoading(true);
      const response = await apiCall(`/admin/clients/${client._id}/salesreps`, {
        method: 'POST',
        body: JSON.stringify(newSalesRep)
      });
      
      alert(`Sales Rep toegevoegd!\n\nLogin gegevens:\nE-mail: ${newSalesRep.email}\nWachtwoord: ${response.tempPassword}\n\nLet op: Bewaar deze gegevens veilig!`);
      
      setNewSalesRep({
        name: '',
        email: '',
        phone: '',
        position: 'Sales Representative',
        hireDate: new Date().toISOString().split('T')[0],
        commissionRate: 0.10
      });
      await fetchClientDetails();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSalesRep = async (salesRepId) => {
    if (!window.confirm('Weet je zeker dat je deze sales rep wilt verwijderen?')) return;
    
    try {
      setIsLoading(true);
      await apiCall(`/admin/salesreps/${salesRepId}`, { method: 'DELETE' });
      await fetchClientDetails();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="bg-green-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">{client?.name}</h2>
              <p className="text-green-100">{client?.contactName} • {client?.email}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-green-700 rounded-lg transition-colors"
            >
              <XIcon />
            </button>
          </div>
          
          <div className="flex space-x-1 mt-6">
            {[
              { id: 'info', label: 'Bedrijfsinformatie' },
              { id: 'team', label: 'Team Beheren' },
              { id: 'invoices', label: 'Facturatie' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-white text-green-600' 
                    : 'text-green-100 hover:bg-green-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {activeTab === 'info' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Bedrijfsinformatie</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bedrijfsnaam</label>
                  <input
                    type="text"
                    value={companyInfo.name}
                    onChange={(e) => setCompanyInfo({...companyInfo, name: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contactpersoon</label>
                  <input
                    type="text"
                    value={companyInfo.contactName}
                    onChange={(e) => setCompanyInfo({...companyInfo, contactName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-mail</label>
                  <input
                    type="email"
                    value={companyInfo.email}
                    onChange={(e) => setCompanyInfo({...companyInfo, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefoon</label>
                  <input
                    type="text"
                    value={companyInfo.phone}
                    onChange={(e) => setCompanyInfo({...companyInfo, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Commissie Percentage</label>
                  <div className="flex items-center">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="1"
                      value={companyInfo.commissionRate}
                      onChange={(e) => setCompanyInfo({...companyInfo, commissionRate: parseFloat(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <span className="ml-2 text-gray-500">({(companyInfo.commissionRate * 100).toFixed(1)}%)</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">CRM Type</label>
                  <select
                    value={companyInfo.crmType}
                    onChange={(e) => setCompanyInfo({...companyInfo, crmType: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="teamleader">Teamleader</option>
                    <option value="hubspot">HubSpot</option>
                    <option value="pipedrive">Pipedrive</option>
                  </select>
                </div>
              </div>
              
              <button
                onClick={updateCompanyInfo}
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Opslaan...' : 'Wijzigingen Opslaan'}
              </button>
            </div>
          )}

          {activeTab === 'team' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Team Beheren</h3>
                <span className="text-sm text-gray-500">
                  {clientData?.salesReps?.length || 0} teamleden
                </span>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <UserPlusIcon />
                  <span className="ml-2">Teamlid Toevoegen</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Naam"
                    value={newSalesRep.name}
                    onChange={(e) => setNewSalesRep({...newSalesRep, name: e.target.value})}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  
                  <input
                    type="email"
                    placeholder="E-mail"
                    value={newSalesRep.email}
                    onChange={(e) => setNewSalesRep({...newSalesRep, email: e.target.value})}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  
                  <input
                    type="text"
                    placeholder="Telefoon"
                    value={newSalesRep.phone}
                    onChange={(e) => setNewSalesRep({...newSalesRep, phone: e.target.value})}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  
                  <input
                    type="date"
                    value={newSalesRep.hireDate}
                    onChange={(e) => setNewSalesRep({...newSalesRep, hireDate: e.target.value})}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <button
                  onClick={addSalesRep}
                  disabled={isLoading || !newSalesRep.name || !newSalesRep.email}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center"
                >
                  <PlusIcon />
                  <span className="ml-2">Teamlid Toevoegen</span>
                </button>
              </div>

              {clientData?.salesReps && clientData.salesReps.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Huidige Teamleden</h4>
                  {clientData.salesReps.map((rep) => (
                    <div key={rep._id} className="bg-white border border-gray-200 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-green-600 font-semibold">
                              {rep.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900">{rep.name}</h5>
                            <p className="text-gray-500 text-sm">{rep.email}</p>
                            <p className="text-gray-400 text-xs">
                              {rep.position} • {((rep.commissionRate || 0) * 100).toFixed(1)}% commissie
                              {rep.isConnected && <span className="ml-2 text-green-600">• CRM Connected</span>}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => deleteSalesRep(rep._id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'invoices' && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-900">Facturatie</h3>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                  <UploadIcon />
                  <span className="ml-2">Factuur Upload</span>
                </h4>
                <p className="text-gray-600">Factuur upload functionaliteit komt binnenkort beschikbaar.</p>
              </div>

              {clientData?.invoices && clientData.invoices.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Geüploade Facturen</h4>
                  
                  <div className="space-y-3">
                    {clientData.invoices.map((invoice) => (
                      <div key={invoice._id} className="bg-white border border-gray-200 rounded-xl p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                              <FileTextIcon />
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-900">
                                Factuur #{invoice.invoiceNumber}
                              </h5>
                              <p className="text-gray-500 text-sm">
                                €{invoice.amount.toLocaleString('nl-NL', {minimumFractionDigits: 2})} • 
                                {new Date(0, invoice.month - 1).toLocaleDateString('nl-NL', {month: 'long'})} {invoice.year}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              invoice.status === 'paid' 
                                ? 'bg-green-100 text-green-600' 
                                : 'bg-yellow-100 text-yellow-600'
                            }`}>
                              {invoice.status === 'paid' ? 'Betaald' : 'Openstaand'}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
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
  const [activeMenuItem, setActiveMenuItem] = useState('dashboard');
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
          setActiveMenuItem('admin-dashboard');
        } else if (parsed.role === 'salesrep') {
          setActiveMenuItem('salesrep-dashboard');
        } else {
          setActiveMenuItem('dashboard');
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
        setActiveMenuItem('admin-dashboard');
      } else if (response.user.role === 'salesrep') {
        setActiveMenuItem('salesrep-dashboard');
      } else {
        setActiveMenuItem('dashboard');
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
    setActiveMenuItem('dashboard');
    setSelectedClient(null);
    setShowClientModal(false);
  };

  const handleClientClick = (client) => {
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
        activeMenuItem={activeMenuItem}
        setActiveMenuItem={setActiveMenuItem}
        sidebarCollapsed={sidebarCollapsed}
        setSidebarCollapsed={setSidebarCollapsed}
        onLogout={logout}
      />

      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-8 py-8">
          {/* Admin Routes */}
          {user.role === 'admin' && (
            <>
              {activeMenuItem === 'admin-dashboard' && (
                <AdminDashboard onClientClick={handleClientClick} />
              )}
              
              {activeMenuItem === 'clients' && (
                <PlaceholderPage 
                  title="Klanten Beheer" 
                  description="Beheer alle klanten, hun instellingen en toegangsrechten. Gebruik het dashboard om klanten te beheren."
                />
              )}
              
              {activeMenuItem === 'admin-settings' && (
                <PlaceholderPage 
                  title="Admin Instellingen" 
                  description="Systeemconfiguratie, gebruikersbeheer en globale instellingen."
                />
              )}
            </>
          )}

          {/* Sales Rep Routes */}
          {user.role === 'salesrep' && (
            <>
              {activeMenuItem === 'salesrep-dashboard' && (
                <PlaceholderPage 
                  title="Mijn Dashboard" 
                  description="Welkom bij je sales portal. Hier zie je binnenkort je performance en commissie overzicht."
                />
              )}
              
              {activeMenuItem === 'salesrep-invoices' && (
                <PlaceholderPage 
                  title="Mijn Facturen" 
                  description="Upload en beheer je commissie facturen."
                />
              )}
              
              {activeMenuItem === 'salesrep-reports' && (
                <PlaceholderPage 
                  title="Mijn Prestaties" 
                  description="Bekijk je omzet, commissies en performance metrics."
                />
              )}
              
              {activeMenuItem === 'salesrep-settings' && (
                <PlaceholderPage 
                  title="Mijn Instellingen" 
                  description="Persoonlijke instellingen en account beheer."
                />
              )}
            </>
          )}

          {/* Client Routes */}
          {user.role === 'client' && (
            <>
              {activeMenuItem === 'dashboard' && (
                <PlaceholderPage 
                  title="Dashboard" 
                  description="Welkom bij je klantportaal. Hier zie je binnenkort je team performance en omzet overzicht."
                />
              )}

              {activeMenuItem === 'invoices' && (
                <PlaceholderPage 
                  title="Betalingen & Facturen" 
                  description="Hier vind je al je facturen en betalingsinformatie."
                />
              )}

              {activeMenuItem === 'team' && (
                <PlaceholderPage 
                  title="Team Management" 
                  description="Beheer je recruitment team en bekijk individuele prestaties."
                />
              )}

              {activeMenuItem === 'reports' && (
                <PlaceholderPage 
                  title="Rapportages" 
                  description="Uitgebreide analytics en rapportages van je recruitment performance."
                />
              )}

              {activeMenuItem === 'settings' && (
                <PlaceholderPage 
                  title="Instellingen" 
                  description="CRM koppelingen, gebruikersinstellingen en systeemconfiguratie."
                />
              )}
            </>
          )}
        </div>
      </div>

      {/* Client Modal */}
      {user.role === 'admin' && (
        <ClientModal
          client={selectedClient}
          isOpen={showClientModal}
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
