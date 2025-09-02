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

const DollarSignIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" x2="12" y1="2" y2="22"/>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
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

const downloadFile = async (endpoint, filename) => {
  const token = localStorage.getItem('authToken');
  
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`
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

// Client Dashboard Component
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

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h2>
        <p className="text-gray-600">Welkom bij je klantportaal, {user?.name}!</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Deze Maand Omzet</p>
              <p className="text-3xl font-bold text-gray-900">
                €{(dashboardData?.totals?.thisMonthRevenue || 0).toLocaleString('nl-NL')}
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
                €{(dashboardData?.totals?.thisMonthCommission || 0).toLocaleString('nl-NL')}
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
              <p className="text-3xl font-bold text-gray-900">{dashboardData?.salesReps?.length || 0}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <UsersIcon />
            </div>
          </div>
        </div>
      </div>

      {/* Sales Reps Overview */}
      {dashboardData?.salesReps && dashboardData.salesReps.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Team Overzicht</h3>
          
          <div className="space-y-4">
            {dashboardData.salesReps.map((rep) => (
              <div key={rep._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-sm">
                      {rep.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{rep.name}</p>
                    <p className="text-sm text-gray-500">{rep.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">€{(rep.thisMonthRevenue || 0).toLocaleString('nl-NL')}</p>
                  <p className="text-sm text-gray-500">€{(rep.thisMonthCommission || 0).toLocaleString('nl-NL')} commissie</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Client Invoices Component
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
      setInvoices(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadInvoice = async (invoiceId, fileName) => {
    try {
      await downloadFile(`/client/invoices/${invoiceId}/download`, fileName);
    } catch (err) {
      setError('Download mislukt');
    }
  };

  // Group invoices by year and month
  const groupedInvoices = invoices.reduce((acc, invoice) => {
    const key = `${invoice.year}-${invoice.month}`;
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
        <p className="text-gray-600">Overzicht van al je facturen en betalingen per maand</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {Object.keys(groupedInvoices).length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <FileTextIcon />
          <h3 className="text-lg font-semibold text-gray-900 mt-4">Nog geen facturen</h3>
          <p className="text-gray-600 mt-2">Je facturen verschijnen hier zodra ze zijn geüpload</p>
        </div>
      ) : (
        <div className="space-y-6">
          {Object.entries(groupedInvoices)
            .sort(([a], [b]) => b.localeCompare(a))
            .map(([monthYear, monthInvoices]) => {
              const [year, month] = monthYear.split('-').map(Number);
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
                        €{totalAmount.toLocaleString('nl-NL', {minimumFractionDigits: 2})}
                      </p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {monthInvoices.map((invoice) => (
                      <div key={invoice._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <FileTextIcon />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900">Factuur #{invoice.invoiceNumber}</h4>
                            <p className="text-gray-600">
                              €{invoice.amount.toLocaleString('nl-NL', {minimumFractionDigits: 2})}
                            </p>
                            <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                              <span>{invoice.type === 'commission' ? 'Commissie Factuur' : 'Client Factuur'}</span>
                              {invoice.salesRepId && <span>• {invoice.salesRepId.name}</span>}
                              {invoice.description && <span>• {invoice.description}</span>}
                              {invoice.uploadedBy && (
                                <span>• Geüpload door {invoice.uploadedBy.name}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            invoice.status === 'paid' 
                              ? 'bg-green-100 text-green-600' 
                              : 'bg-yellow-100 text-yellow-600'
                          }`}>
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

// Client Settings Component with CRM Integration
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
      const response = await apiCall(`/client/crm/connect?type=${crmType}`);
      
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

      {/* CRM Integration Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">CRM Integratie</h3>
            <p className="text-gray-600">Koppel je CRM systeem voor automatische synchronisatie</p>
          </div>
          {clientData?.crmCredentials?.accessToken && (
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
                {clientData?.crmType === crm.id && (
                  <span className="px-2 py-1 bg-green-100 text-green-600 text-xs font-medium rounded-full">
                    Actief
                  </span>
                )}
              </div>

              <div className="space-y-3">
                {clientData?.crmType !== crm.id ? (
                  <button
                    onClick={() => updateCRMSettings(crm.id)}
                    disabled={isLoading}
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                  >
                    Selecteer
                  </button>
                ) : (
                  <>
                    {!clientData?.crmCredentials?.accessToken ? (
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
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Account Informatie</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bedrijfsnaam</label>
            <p className="text-gray-900">{clientData?.name || 'Niet beschikbaar'}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contactpersoon</label>
            <p className="text-gray-900">{clientData?.contactName || 'Niet beschikbaar'}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">E-mailadres</label>
            <p className="text-gray-900">{clientData?.email || 'Niet beschikbaar'}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Commissie Percentage</label>
            <p className="text-gray-900">{clientData ? `${(clientData.commissionRate * 100).toFixed(1)}%` : 'Niet beschikbaar'}</p>
          </div>
        </div>
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

// Admin Client Modal Component (Complete with all functionality)
const AdminClientModal = ({ client, isOpen, onClose, onUpdate }) => {
  const [activeTab, setActiveTab] = useState('info');
  const [clientData, setClientData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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

  const [newInvoice, setNewInvoice] = useState({
    invoiceNumber: '',
    amount: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    description: '',
    type: 'client',
    salesRepId: '',
    file: null
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
      onUpdate();
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
      onUpdate();
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
      onUpdate();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadInvoice = async () => {
    if (!newInvoice.file) {
      setError('Selecteer een PDF bestand');
      return;
    }

    try {
      setIsLoading(true);
      await uploadFile(`/admin/clients/${client._id}/invoices`, newInvoice.file, {
        invoiceNumber: newInvoice.invoiceNumber,
        amount: newInvoice.amount,
        month: newInvoice.month,
        year: newInvoice.year,
        description: newInvoice.description,
        type: newInvoice.type,
        salesRepId: newInvoice.salesRepId || undefined
      });
      
      setNewInvoice({
        invoiceNumber: '',
        amount: '',
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        description: '',
        type: 'client',
        salesRepId: '',
        file: null
      });
      
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
      
      await fetchClientDetails();
      onUpdate();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadInvoice = async (invoiceId, fileName) => {
    try {
      await downloadFile(`/client/invoices/${invoiceId}/download`, fileName);
    } catch (err) {
      setError('Download mislukt');
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
              { id: 'info', label: 'Bedrijfsinformatie', icon: Building2Icon },
              { id: 'team', label: 'Team Beheren', icon: UsersIcon },
              { id: 'invoices', label: 'Facturatie', icon: CreditCardIcon }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-white text-green-600' 
                    : 'text-green-100 hover:bg-green-700'
                }`}
              >
                <tab.icon />
                <span className="ml-2">{tab.label}</span>
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
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Adres</label>
                <input
                  type="text"
                  value={companyInfo.address}
                  onChange={(e) => setCompanyInfo({...companyInfo, address: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
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
                  
                  <input
                    type="text"
                    placeholder="Functie"
                    value={newSalesRep.position}
                    onChange={(e) => setNewSalesRep({...newSalesRep, position: e.target.value})}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  
                  <div className="flex items-center">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="1"
                      placeholder="Commissie"
                      value={newSalesRep.commissionRate}
                      onChange={(e) => setNewSalesRep({...newSalesRep, commissionRate: parseFloat(e.target.value)})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                    <span className="ml-2 text-gray-500">({(newSalesRep.commissionRate * 100).toFixed(1)}%)</span>
                  </div>
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
                  <span className="ml-2">Factuur Uploaden</span>
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <input
                    type="text"
                    placeholder="Factuurnummer"
                    value={newInvoice.invoiceNumber}
                    onChange={(e) => setNewInvoice({...newInvoice, invoiceNumber: e.target.value})}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  
                  <input
                    type="number"
                    placeholder="Bedrag (€)"
                    value={newInvoice.amount}
                    onChange={(e) => setNewInvoice({...newInvoice, amount: e.target.value})}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  
                  <select
                    value={newInvoice.month}
                    onChange={(e) => setNewInvoice({...newInvoice, month: parseInt(e.target.value)})}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {Array.from({length: 12}, (_, i) => (
                      <option key={i+1} value={i+1}>
                        {new Date(0, i).toLocaleDateString('nl-NL', {month: 'long'})}
                      </option>
                    ))}
                  </select>
                  
                  <input
                    type="number"
                    placeholder="Jaar"
                    value={newInvoice.year}
                    onChange={(e) => setNewInvoice({...newInvoice, year: parseInt(e.target.value)})}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  
                  <select
                    value={newInvoice.type}
                    onChange={(e) => setNewInvoice({...newInvoice, type: e.target.value})}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="client">Client Factuur</option>
                    <option value="commission">Commissie Factuur</option>
                  </select>
                  
                  {newInvoice.type === 'commission' && clientData?.salesReps && (
                    <select
                      value={newInvoice.salesRepId}
                      onChange={(e) => setNewInvoice({...newInvoice, salesRepId: e.target.value})}
                      className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="">Selecteer Sales Rep</option>
                      {clientData.salesReps.map((rep) => (
                        <option key={rep._id} value={rep._id}>{rep.name}</option>
                      ))}
                    </select>
                  )}
                </div>
                
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Beschrijving (optioneel)"
                    value={newInvoice.description}
                    onChange={(e) => setNewInvoice({...newInvoice, description: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div className="mb-4">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setNewInvoice({...newInvoice, file: e.target.files[0]})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <p className="text-sm text-gray-500 mt-1">Alleen PDF bestanden toegestaan</p>
                </div>
                
                <button
                  onClick={uploadInvoice}
                  disabled={isLoading || !newInvoice.file || !newInvoice.invoiceNumber || !newInvoice.amount}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center"
                >
                  <UploadIcon />
                  <span className="ml-2">Factuur Uploaden</span>
                </button>
              </div>

              {clientData?.invoices && clientData.invoices.length > 0 && (
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">Geüploade Facturen</h4>
                  
                  <div className="space-y-3">
                    {clientData.invoices
                      .sort((a, b) => b.year - a.year || b.month - a.month)
                      .map((invoice) => (
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
                              <p className="text-gray-400 text-xs">
                                {invoice.type === 'commission' ? 'Commissie Factuur' : 'Client Factuur'}
                                {invoice.salesRepId && ` • ${invoice.salesRepId.name}`}
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
                            <button
                              onClick={() => downloadInvoice(invoice._id, invoice.fileName)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <DownloadIcon />
                            </button>
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
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welkom terug, {user?.name}!</h2>
        <p className="text-gray-600">{dashboardData?.salesRep?.position} bij {dashboardData?.salesRep?.clientId?.name}</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Deze Maand Omzet</p>
              <p className="text-3xl font-bold text-gray-900">
                €{(dashboardData?.currentRevenue?.revenue || 0).toLocaleString('nl-NL')}
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
                €{(dashboardData?.currentRevenue?.commission || 0).toLocaleString('nl-NL')}
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
              <p className="text-3xl font-bold text-gray-900">{dashboardData?.myInvoices?.length || 0}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <FileTextIcon />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Invoices */}
      {dashboardData?.myInvoices && dashboardData.myInvoices.length > 0 && (
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
                    <p className="font-semibold text-gray-900">Factuur #{invoice.invoiceNumber}</p>
                    <p className="text-sm text-gray-500">
                      €{invoice.amount.toLocaleString('nl-NL', {minimumFractionDigits: 2})} • 
                      {new Date(0, invoice.month - 1).toLocaleDateString('nl-NL', {month: 'long'})} {invoice.year}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  invoice.status === 'paid' 
                    ? 'bg-green-100 text-green-600' 
                    : 'bg-yellow-100 text-yellow-600'
                }`}>
                  {invoice.status === 'paid' ? 'Betaald' : 'Openstaand'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Revenue History */}
      {dashboardData?.revenueHistory && dashboardData.revenueHistory.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Omzet Geschiedenis</h3>
          
          <div className="space-y-3">
            {dashboardData.revenueHistory.map((record) => (
              <div key={`${record.year}-${record.month}`} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">
                  {new Date(record.year, record.month - 1).toLocaleDateString('nl-NL', {month: 'long', year: 'numeric'})}
                </span>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">€{record.revenue.toLocaleString('nl-NL')}</p>
                  <p className="text-sm text-gray-500">€{record.commission.toLocaleString('nl-NL')} commissie</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Sales Rep Invoices Component
const SalesRepInvoices = ({ user }) => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);
  
  const [newInvoice, setNewInvoice] = useState({
    invoiceNumber: '',
    amount: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    description: '',
    type: 'commission',
    file: null
  });

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

  const uploadInvoice = async () => {
    if (!newInvoice.file) {
      setError('Selecteer een PDF bestand');
      return;
    }

    try {
      setIsLoading(true);
      await uploadFile('/salesrep/invoices', newInvoice.file, {
        invoiceNumber: newInvoice.invoiceNumber,
        amount: newInvoice.amount,
        month: newInvoice.month,
        year: newInvoice.year,
        description: newInvoice.description,
        type: newInvoice.type
      });
      
      setNewInvoice({
        invoiceNumber: '',
        amount: '',
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        description: '',
        type: 'commission',
        file: null
      });
      
      setShowUploadForm(false);
      
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
      
      await fetchInvoices();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadInvoice = async (invoiceId, fileName) => {
    try {
      await downloadFile(`/salesrep/invoices/${invoiceId}/download`, fileName);
    } catch (err) {
      setError('Download mislukt');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Mijn Facturen</h2>
            <p className="text-gray-600">Upload en beheer je commissie facturen</p>
          </div>
          <button
            onClick={() => setShowUploadForm(!showUploadForm)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-colors flex items-center"
          >
            <PlusIcon />
            <span className="ml-2">Factuur Uploaden</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-red-700 text-sm">{error}</p>
        </div>
      )}

      {showUploadForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Nieuwe Factuur Uploaden</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              placeholder="Factuurnummer"
              value={newInvoice.invoiceNumber}
              onChange={(e) => setNewInvoice({...newInvoice, invoiceNumber: e.target.value})}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            
            <input
              type="number"
              placeholder="Bedrag (€)"
              value={newInvoice.amount}
              onChange={(e) => setNewInvoice({...newInvoice, amount: e.target.value})}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            
            <select
              value={newInvoice.month}
              onChange={(e) => setNewInvoice({...newInvoice, month: parseInt(e.target.value)})}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {Array.from({length: 12}, (_, i) => (
                <option key={i+1} value={i+1}>
                  {new Date(0, i).toLocaleDateString('nl-NL', {month: 'long'})}
                </option>
              ))}
            </select>
            
            <input
              type="number"
              placeholder="Jaar"
              value={newInvoice.year}
              onChange={(e) => setNewInvoice({...newInvoice, year: parseInt(e.target.value)})}
              className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
          
          <input
            type="text"
            placeholder="Beschrijving (optioneel)"
            value={newInvoice.description}
            onChange={(e) => setNewInvoice({...newInvoice, description: e.target.value})}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent mb-4"
          />
          
          <div className="mb-6">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setNewInvoice({...newInvoice, file: e.target.files[0]})}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-2">Alleen PDF bestanden toegestaan (max 10MB)</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={uploadInvoice}
              disabled={isLoading || !newInvoice.file || !newInvoice.invoiceNumber || !newInvoice.amount}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-colors disabled:opacity-50 flex items-center"
            >
              <UploadIcon />
              <span className="ml-2">{isLoading ? 'Uploaden...' : 'Factuur Uploaden'}</span>
            </button>
            
            <button
              onClick={() => setShowUploadForm(false)}
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl transition-colors"
            >
              Annuleren
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Mijn Facturen Overzicht</h3>
        
        {invoices.length === 0 ? (
          <div className="text-center py-12">
            <FileTextIcon />
            <h4 className="text-lg font-semibold text-gray-900 mt-4">Nog geen facturen</h4>
            <p className="text-gray-600 mt-2">Upload je eerste factuur om aan de slag te gaan</p>
          </div>
        ) : (
          <div className="space-y-4">
            {invoices
              .sort((a, b) => b.year - a.year || b.month - a.month)
              .map((invoice) => (
              <div key={invoice._id} className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center">
                      <FileTextIcon />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        Factuur #{invoice.invoiceNumber}
                      </h4>
                      <p className="text-gray-600">
                        €{invoice.amount.toLocaleString('nl-NL', {minimumFractionDigits: 2})}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <span>
                          {new Date(0, invoice.month - 1).toLocaleDateString('nl-NL', {month: 'long'})} {invoice.year}
                        </span>
                        <span>{invoice.type === 'commission' ? 'Commissie' : 'Client'}</span>
                        {invoice.description && <span>• {invoice.description}</span>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      invoice.status === 'paid' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-yellow-100 text-yellow-600'
                    }`}>
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Placeholder Pages
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

  const handleClientUpdate = () => {
    if (activeMenuItem === 'admin-dashboard') {
      setActiveMenuItem('admin-dashboard');
    }
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
                <SalesRepDashboard user={user} />
              )}
              
              {activeMenuItem === 'salesrep-invoices' && (
                <SalesRepInvoices user={user} />
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
                <ClientDashboard user={user} />
              )}

              {activeMenuItem === 'invoices' && (
                <ClientInvoices user={user} />
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
                <ClientSettings user={user} />
              )}
            </>
          )}
        </div>
      </div>

      {/* Admin Client Modal */}
      {user.role === 'admin' && (
        <AdminClientModal
          client={selectedClient}
          isOpen={showClientModal}
          onClose={() => {
            setShowClientModal(false);
            setSelectedClient(null);
          }}
          onUpdate={handleClientUpdate}
        />
      )}
    </div>
  );
};

export default App;
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contactpersoon</label>
                  <input
                    type="text"
                    value={companyInfo.contactName}
                    onChange={(e) => setCompanyInfo({...companyInfo, contactName: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
