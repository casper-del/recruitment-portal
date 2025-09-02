import React, { useState, useEffect } from 'react';

// Icons (alle iconen behouden + nieuwe toegevoegd)
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

const UploadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-15"/>
    <polyline points="17,10 12,5 7,10"/>
    <line x1="12" x2="12" y1="5" y2="15"/>
  </svg>
);

const LinkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
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

// API Configuration
const API_BASE = process.env.REACT_APP_API_URL || (
  window.location.hostname === 'localhost' 
    ? 'http://localhost:3001/api'
    : `${window.location.protocol}//${window.location.hostname}/api`
);

// Utility function for API calls
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

// File upload API call
const uploadFile = async (endpoint, file, additionalData = {}) => {
  const token = localStorage.getItem('authToken');
  
  const formData = new FormData();
  formData.append('invoice', file);
  
  // Add additional form fields
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
    throw new Error(errorData.message || `Upload failed`);
  }

  return response.json();
};

// File download helper
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
          <p className="text-gray-600">Log in op je klantportaal</p>
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
  ] : [
    { id: 'dashboard', label: 'Dashboard', icon: HomeIcon },
    { id: 'invoices', label: 'Betalingen & Facturen', icon: CreditCardIcon },
    { id: 'team', label: 'Team Management', icon: UsersIcon },
    { id: 'reports', label: 'Rapportages', icon: BarChart3Icon },
    { id: 'settings', label: 'Instellingen', icon: SettingsIcon },
  ];

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
                <p className="text-xs text-gray-500">{user?.role === 'admin' ? 'Admin Panel' : 'Klantportaal'}</p>
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
                <p className="text-xs text-gray-500">{user?.client?.name || user?.email}</p>
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
const ClientDashboard = ({ dashboardData, formatCurrency, onRefresh, onSalesRepClick }) => {
  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Dashboard data laden...</div>
      </div>
    );
  }

  const { client, salesReps, totals } = dashboardData;
  const connectedReps = salesReps.filter(rep => rep.isConnected);
  const unconnectedReps = salesReps.filter(rep => !rep.isConnected);
  const allReps = salesReps;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Welkom terug, {client?.contactName?.split(' ')[0]}!</h2>
          <p className="text-gray-600 mt-1">
            {client?.name} • Bekijk je recruitment performance en team overzicht
          </p>
        </div>
        <button 
          onClick={onRefresh}
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition-all duration-200"
        >
          <RefreshCwIcon />
          <span>Sync Nu</span>
        </button>
      </div>

      {unconnectedReps.length > 0 ? (
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-2xl p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <div className="text-white">
                  <AlertCircleIcon />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-orange-900 mb-2">CRM Koppeling Vereist</h3>
                <div className="space-y-1">
                  {unconnectedReps.map(rep => (
                    <p key={rep._id} className="text-orange-800">
                      <span className="font-medium">{rep.name}</span> moet nog gekoppeld worden aan je CRM systeem
                    </p>
                  ))}
                </div>
                <p className="text-sm text-orange-700 mt-2">
                  Ga naar Instellingen om je CRM te koppelen en teamlid data te synchroniseren.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <div className="text-white">
                  <CheckCircle2Icon />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold text-green-900 mb-1">Systeem Volledig Gekoppeld</h3>
                <p className="text-green-700">Alle teamleden zijn succesvol verbonden met je CRM systeem</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-green-600">
              <span className="text-sm font-medium">Status: Actief</span>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <div className="text-green-600">
                <TrendingUpIcon />
              </div>
            </div>
            <span className="text-sm text-gray-500">Deze maand</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(totals?.thisMonthRevenue || 0)}
            </p>
            <p className="text-sm text-gray-600">Totale omzet team</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <div className="text-blue-600">
                <DollarSignIcon />
              </div>
            </div>
            <span className="text-sm text-gray-500">Deze maand</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {formatCurrency(totals?.thisMonthCommission || 0)}
            </p>
            <p className="text-sm text-gray-600">Commissie voor Recruiters Network</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <div className="text-purple-600">
                <UsersIcon />
              </div>
            </div>
            <span className="text-sm text-gray-500">Team</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{allReps.length}</p>
            <p className="text-sm text-gray-600">Totaal teamleden ({connectedReps.length} gekoppeld)</p>
          </div>
        </div>
      </div>

      {allReps.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Team Performance</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <EyeIcon />
              <span>Alle teamleden</span>
            </div>
          </div>
          
          <div className="space-y-6">
            {allReps
              .sort((a, b) => (b.thisMonthRevenue || 0) - (a.thisMonthRevenue || 0))
              .map((rep, index) => {
                const maxRevenue = Math.max(...allReps.map(r => r.thisMonthRevenue || 0));
                const barWidth = maxRevenue > 0 ? ((rep.thisMonthRevenue || 0) / maxRevenue) * 100 : 0;
                
                return (
                  <div key={rep._id} className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                          rep.isConnected ? (
                            index === 0 ? 'bg-green-500' : 
                            index === 1 ? 'bg-blue-500' : 
                            'bg-gray-400'
                          ) : 'bg-orange-400'
                        }`}>
                          {rep.isConnected ? `#${connectedReps.indexOf(rep) + 1}` : '!'}
                        </div>
                        <div>
                          <button 
                            onClick={() => onSalesRepClick(rep)}
                            className="font-medium text-gray-900 hover:text-green-600 transition-colors text-left"
                          >
                            {rep.name}
                          </button>
                          <div className="flex items-center space-x-2">
                            <p className="text-sm text-gray-500">
                              Aangenomen: {new Date(rep.hireDate).toLocaleDateString('nl-NL', { 
                                month: 'short', 
                                year: 'numeric' 
                              })}
                            </p>
                            {!rep.isConnected && (
                              <span className="px-2 py-0.5 bg-orange-100 text-orange-800 text-xs rounded-full">
                                Niet gekoppeld
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{formatCurrency(rep.thisMonthRevenue || 0)}</p>
                        <p className="text-sm text-gray-500">Deze maand</p>
                      </div>
                    </div>
                    
                    <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div 
                        className={`h-3 rounded-full transition-all duration-1000 ease-out ${
                          rep.isConnected ? (
                            connectedReps.indexOf(rep) === 0 ? 'bg-gradient-to-r from-green-400 to-green-600' : 
                            connectedReps.indexOf(rep) === 1 ? 'bg-gradient-to-r from-blue-400 to-blue-600' : 
                            'bg-gradient-to-r from-gray-400 to-gray-500'
                          ) : 'bg-gradient-to-r from-orange-300 to-orange-400'
                        }`}
                        style={{ width: `${barWidth}%` }}
                      />
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

// Enhanced Invoices Component met download functionaliteit
const InvoicesPage = ({ invoices = [], onRefresh }) => {
  const [loading, setLoading] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('nl-NL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const getMonthName = (month, year) => {
    return new Date(year, month - 1).toLocaleDateString('nl-NL', {
      month: 'long',
      year: 'numeric'
    });
  };

  const handleDownload = async (invoice) => {
    try {
      setLoading(true);
      await downloadFile(`/client/invoices/${invoice._id}/download`, `factuur-${invoice.invoiceNumber}.pdf`);
    } catch (error) {
      alert('❌ Download mislukt: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    return status === 'paid' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-orange-100 text-orange-800';
  };

  const getStatusText = (status) => {
    return status === 'paid' ? 'Betaald' : 'Openstaand';
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Betalingen & Facturen</h2>
          <p className="text-gray-600 mt-1">Overzicht van je maandelijkse facturen en betalingsstatus</p>
        </div>
        <button 
          onClick={onRefresh}
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition-all duration-200"
        >
          <RefreshCwIcon />
          <span>Vernieuwen</span>
        </button>
      </div>

      {invoices.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="text-gray-400 mb-4 flex justify-center">
            <FileTextIcon />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Geen facturen gevonden</h3>
          <p className="text-gray-600">Je facturen verschijnen hier zodra ze beschikbaar zijn.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900">Factuur Overzicht</h3>
          </div>
          
          <div className="divide-y divide-gray-100">
            {invoices.map((invoice) => (
              <div key={invoice._id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                      <FileTextIcon />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Factuur #{invoice.invoiceNumber}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {getMonthName(invoice.month, invoice.year)}
                      </p>
                      <p className="text-xs text-gray-500">
                        Aangemaakt: {formatDate(invoice.createdAt)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-900">
                        {formatCurrency(invoice.amount)}
                      </p>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                        {getStatusText(invoice.status)}
                      </span>
                    </div>
                    
                    {invoice.downloadAvailable && (
                      <button
                        onClick={() => handleDownload(invoice)}
                        disabled={loading}
                        className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors disabled:opacity-50"
                      >
                        <DownloadIcon />
                        <span>Download</span>
                      </button>
                    )}
                  </div>
                </div>
                
                {invoice.status === 'paid' && invoice.paidAt && (
                  <div className="mt-3 text-xs text-green-600">
                    ✓ Betaald op {formatDate(invoice.paidAt)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Sales Rep Detail Modal
const SalesRepDetailModal = ({ isOpen, onClose, salesRep }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [historicalData] = useState([
    { month: 9, year: 2024, revenue: salesRep?.thisMonthRevenue || 0, commission: salesRep?.thisMonthCommission || 0 },
    { month: 8, year: 2024, revenue: Math.floor(Math.random() * 40000) + 15000, commission: 0 },
    { month: 7, year: 2024, revenue: Math.floor(Math.random() * 35000) + 10000, commission: 0 },
    { month: 6, year: 2024, revenue: Math.floor(Math.random() * 45000) + 20000, commission: 0 },
    { month: 5, year: 2024, revenue: Math.floor(Math.random() * 30000) + 12000, commission: 0 }
  ]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const totalRevenue = historicalData.reduce((sum, data) => sum + data.revenue, 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{salesRep?.name}</h3>
              <p className="text-gray-600">{salesRep?.email}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XIcon />
            </button>
          </div>
          
          <div className="flex space-x-1 mt-4">
            {[
              { id: 'overview', label: 'Overzicht' },
              { id: 'history', label: 'Geschiedenis' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-green-50 text-green-600' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Contact Informatie</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Email:</span> {salesRep?.email}</p>
                  <p><span className="font-medium">Aangenomen:</span> {new Date(salesRep?.hireDate).toLocaleDateString('nl-NL', { 
                    day: 'numeric', month: 'long', year: 'numeric' 
                  })}</p>
                  <p><span className="font-medium">Status:</span> 
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      salesRep?.isConnected ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {salesRep?.isConnected ? 'CRM Gekoppeld' : 'Niet Gekoppeld'}
                    </span>
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-4">Totale Prestaties</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="bg-green-50 rounded-xl p-4">
                    <p className="text-sm text-green-600 mb-1">Totale Omzet</p>
                    <p className="text-2xl font-bold text-green-700">{formatCurrency(totalRevenue)}</p>
                    <p className="text-xs text-green-600">Afgelopen 5 maanden</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-sm text-blue-600 mb-1">Deze Maand</p>
                    <p className="text-2xl font-bold text-blue-700">{formatCurrency(salesRep?.thisMonthRevenue || 0)}</p>
                    <p className="text-xs text-blue-600">September 2024</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-900">Maandelijkse Prestaties</h4>
              
              <div className="space-y-3">
                {historicalData.map((data, index) => {
                  const monthName = new Date(data.year, data.month - 1).toLocaleDateString('nl-NL', { 
                    month: 'long', 
                    year: 'numeric' 
                  });
                  const isCurrentMonth = data.month === new Date().getMonth() + 1 && data.year === new Date().getFullYear();
                  
                  return (
                    <div key={`${data.year}-${data.month}`} className={`p-4 rounded-xl border ${
                      isCurrentMonth ? 'border-green-200 bg-green-50' : 'border-gray-200 bg-gray-50'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-gray-900 capitalize">{monthName}</h5>
                        {isCurrentMonth && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            Huidige maand
                          </span>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Omzet</p>
                          <p className="font-bold text-lg">{formatCurrency(data.revenue)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Commissie</p>
                          <p className="font-bold text-lg">{formatCurrency(data.commission)}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              <div className="border-t pt-4 mt-6">
                <div className="bg-gray-800 text-white rounded-xl p-4">
                  <h5 className="font-medium mb-2">Totaal Overzicht</h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-300 text-sm">Totale Omzet</p>
                      <p className="font-bold text-xl">{formatCurrency(totalRevenue)}</p>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Gem. per Maand</p>
                      <p className="font-bold text-xl">{formatCurrency(totalRevenue / historicalData.length)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Team Management Component
const TeamManagement = ({ dashboardData, onSalesRepClick }) => {
  if (!dashboardData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Team data laden...</div>
      </div>
    );
  }

  const { salesReps } = dashboardData;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Team Management</h2>
        <p className="text-gray-600">Beheer je sales team en bekijk individuele performance</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Teamleden</h3>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>{salesReps.length} totaal</span>
            <span>•</span>
            <span>{salesReps.filter(r => r.isConnected).length} gekoppeld</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {salesReps.map((rep) => (
            <div 
              key={rep._id} 
              onClick={() => onSalesRepClick(rep)}
              className="p-6 border border-gray-200 rounded-xl hover:border-green-300 hover:shadow-sm transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-sm">
                      {rep.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{rep.name}</h4>
                    <p className="text-sm text-gray-600">{rep.email}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  rep.isConnected ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  {rep.isConnected ? 'Gekoppeld' : 'Niet gekoppeld'}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Aangenomen:</span>
                  <span className="font-medium">
                    {new Date(rep.hireDate).toLocaleDateString('nl-NL', { 
                      day: 'numeric', month: 'short', year: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Deze maand:</span>
                  <span className="font-medium">€{(rep.thisMonthRevenue || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Commissie:</span>
                  <span className="font-medium">€{(rep.thisMonthCommission || 0).toLocaleString()}</span>
                </div>
              </div>
              
              <div className="mt-4 pt-3 border-t border-gray-100">
                <p className="text-xs text-green-600 font-medium">Klik voor volledige geschiedenis →</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Updated CRM Settings Component met Real-time sync capabilities
const CRMSettings = ({ dashboardData, onRefresh }) => {
  const [availableCRMs, setAvailableCRMs] = useState([]);
  const [selectedCRM, setSelectedCRM] = useState('');
  const [loading, setLoading] = useState(false);
  const [client, setClient] = useState(null);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(false);

  useEffect(() => {
    if (dashboardData?.client) {
      setClient(dashboardData.client);
      setSelectedCRM(dashboardData.client.crmType || 'teamleader');
      setAutoSyncEnabled(dashboardData.client.autoSyncEnabled || false);
    }
    fetchAvailableCRMs();
    
    // Check for OAuth success callback
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('crm_connected') === 'success') {
      alert('🎉 CRM succesvol verbonden! Je kunt nu data synchroniseren.');
      // Remove the parameter from URL
      window.history.replaceState({}, document.title, window.location.pathname);
      onRefresh();
    }
  }, [dashboardData, onRefresh]);

  const fetchAvailableCRMs = async () => {
    try {
      const data = await apiCall('/crm/available');
      setAvailableCRMs(data);
    } catch (error) {
      console.error('Failed to fetch CRMs:', error);
    }
  };

  const handleCRMChange = async (crmType) => {
    setLoading(true);
    try {
      await apiCall('/client/crm/settings', {
        method: 'POST',
        body: JSON.stringify({ crmType })
      });
      
      setSelectedCRM(crmType);
      onRefresh();
      alert('CRM instellingen bijgewerkt!');
    } catch (error) {
      console.error('Failed to update CRM settings:', error);
      alert('Fout bij bijwerken CRM instellingen');
    } finally {
      setLoading(false);
    }
  };

  const handleCRMConnect = async () => {
    if (selectedCRM === 'hubspot') {
      // Real HubSpot OAuth flow
      try {
        setLoading(true);
        const response = await apiCall(`/client/crm/connect?type=${selectedCRM}`);
        // Redirect to HubSpot OAuth
        window.location.href = response.authUrl;
      } catch (error) {
        alert('❌ Fout bij verbinden met HubSpot: ' + error.message);
        setLoading(false);
      }
    } else if (selectedCRM === 'teamleader') {
      // Demo for Teamleader (awaiting approval)
      alert('🎯 Teamleader integratie aangevraagd en wacht op goedkeuring.\n\nVoor nu wordt demo functionaliteit gebruikt.');
      try {
        const response = await apiCall('/client/crm/sync', { method: 'POST' });
        alert(`✅ ${response.message}`);
        onRefresh();
      } catch (error) {
        alert('❌ Demo sync gefaald: ' + error.message);
      }
    } else {
      // Demo for other CRMs
      alert(`🎯 Demo: ${availableCRMs.find(c => c.id === selectedCRM)?.name} verbinding gesimuleerd!`);
    }
  };

  const handleRealTimeSync = async () => {
    try {
      setLoading(true);
      const response = await apiCall('/client/crm/sync-realtime', { method: 'POST' });
      alert(`✅ Real-time sync geactiveerd: ${response.message}`);
      setAutoSyncEnabled(true);
      onRefresh();
    } catch (error) {
      alert('❌ Real-time sync fout: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Check if HubSpot is connected
  const isHubSpotConnected = selectedCRM === 'hubspot' && client?.crmCredentials?.accessToken;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">CRM Instellingen</h2>
        <p className="text-gray-600">Beheer je CRM koppeling en synchronisatie instellingen</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">CRM Systeem Selectie</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {availableCRMs.map(crm => (
                <div 
                  key={crm.id}
                  className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                    selectedCRM === crm.id 
                      ? 'border-green-300 bg-green-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleCRMChange(crm.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      selectedCRM === crm.id ? 'bg-green-500' : 'bg-gray-400'
                    }`}>
                      <span className="text-white font-bold text-sm">
                        {crm.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{crm.name}</h4>
                      <p className="text-sm text-gray-600">{crm.description}</p>
                    </div>
                  </div>
                  {selectedCRM === crm.id && (
                    <div className="mt-3 text-xs text-green-600 font-medium">
                      ✓ Geselecteerd
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">CRM Verbinding</h3>
            
            {selectedCRM === 'hubspot' && (
              <div className="bg-green-50 rounded-xl p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">⏳</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-orange-900">Teamleader Integratie Aangevraagd</h4>
                    <p className="text-sm text-orange-800 mt-1">
                      Wachten op goedkeuring van Teamleader voor OAuth toegang. Demo functionaliteit beschikbaar met real-time sync simulatie.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedCRM === 'pipedrive' && (
              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs font-bold">i</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-blue-900">Pipedrive Demo Modus</h4>
                    <p className="text-sm text-blue-800 mt-1">
                      Demo functionaliteit beschikbaar. Neem contact op voor echte Pipedrive integratie.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900 mb-1">
                    Verbind met {availableCRMs.find(c => c.id === selectedCRM)?.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {selectedCRM === 'hubspot' ? 
                      'Echte OAuth verbinding met je HubSpot account om contacten te synchroniseren en real-time omzet te tracken.' :
                      selectedCRM === 'teamleader' ?
                      'Demo functionaliteit terwijl we wachten op Teamleader goedkeuring.' :
                      `Demo ${selectedCRM} account om sales rep data te simuleren.`
                    }
                  </p>
                </div>
                <button
                  onClick={handleCRMConnect}
                  disabled={loading}
                  className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                >
                  <LinkIcon />
                  <span>
                    {loading ? 'Bezig...' : 
                     selectedCRM === 'hubspot' ? 'Verbind HubSpot' :
                     selectedCRM === 'teamleader' ? 'Demo Teamleader' :
                     'Demo Verbinding'}
                  </span>
                </button>
              </div>

              {isHubSpotConnected && (
                <div className="mt-4 p-3 bg-green-100 rounded-lg">
                  <p className="text-sm text-green-800">
                    ✅ HubSpot verbinding actief - Data wordt automatisch gesynchroniseerd
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Real-time Data Synchronisatie</h3>
            
            <div className="bg-blue-50 rounded-xl p-6 mb-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xs font-bold">⚡</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-blue-900 mb-2">Automatische CRM Koppeling</h4>
                  <p className="text-sm text-blue-800 mb-3">
                    Wanneer je een nieuw teamlid toevoegt, zoekt het systeem automatisch in je CRM naar een gebruiker met dezelfde naam of e-mail. 
                    Nieuwe deals en omzet worden real-time gekoppeld aan de juiste teamleden.
                  </p>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={autoSyncEnabled}
                        onChange={(e) => setAutoSyncEnabled(e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-blue-900">Auto-sync activeren</span>
                    </label>
                    {autoSyncEnabled && (
                      <button
                        onClick={handleRealTimeSync}
                        disabled={loading}
                        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm transition-colors disabled:opacity-50"
                      >
                        <RefreshCwIcon />
                        <span>{loading ? 'Activeren...' : 'Start Real-time Sync'}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Handmatige Synchronisatie</h3>
            <div className="flex items-center justify-between bg-gray-50 rounded-xl p-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-1">
                  {selectedCRM === 'hubspot' && isHubSpotConnected ? 'HubSpot Sync' : 'Handmatige Sync'}
                </h4>
                <p className="text-sm text-gray-600">
                  {selectedCRM === 'hubspot' && isHubSpotConnected ? 
                    'Synchroniseer je contacten direct vanuit HubSpot CRM en koppel omzet aan teamleden.' :
                    'Synchroniseer je teamlid data vanuit je CRM systeem en koppel automatisch omzet.'
                  }
                </p>
              </div>
              <button
                onClick={async () => {
                  try {
                    setLoading(true);
                    const response = await apiCall('/client/crm/sync', { method: 'POST' });
                    alert(`✅ ${response.message}`);
                    onRefresh();
                  } catch (error) {
                    alert('❌ Sync gefaald: ' + error.message);
                  } finally {
                    setLoading(false);
                  }
                }}
                disabled={loading}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                <RefreshCwIcon />
                <span>{loading ? 'Syncing...' : 'Sync Nu'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced Admin Dashboard Component
const AdminDashboard = ({ clients, onAddClient, onRefresh }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showClientDetail, setShowClientDetail] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showAddTeamMember, setShowAddTeamMember] = useState(false);
  
  const handleAddClient = async (clientData) => {
    const result = await onAddClient(clientData);
    setSuccessData(result);
    setShowSuccessModal(true);
    onRefresh();
  };

  const handleEditClient = async (clientId, clientData) => {
    try {
      await apiCall(`/admin/clients/${clientId}`, {
        method: 'PUT',
        body: JSON.stringify(clientData)
      });
      onRefresh();
      alert('Klant succesvol bijgewerkt');
    } catch (error) {
      throw new Error(error.message || 'Failed to update client');
    }
  };

  const handleAddTeamMember = async (clientId, teamMemberData) => {
    try {
      await apiCall(`/admin/clients/${clientId}/salesreps`, {
        method: 'POST',
        body: JSON.stringify(teamMemberData)
      });
      onRefresh();
      return true;
    } catch (error) {
      throw new Error(error.message || 'Failed to add team member');
    }
  };

  const handleDeleteClient = async (clientId, clientName) => {
    if (!window.confirm(
      `⚠️ WAARSCHUWING: Dit zal PERMANENT alle data verwijderen!\n\n` +
      `Klant: "${clientName}"\n` +
      `Dit verwijdert:\n` +
      `• Het klant account en login toegang\n` +
      `• Alle teamleden\n` +
      `• Alle revenue records\n` +
      `• Alle facturen en bestanden\n\n` +
      `Deze actie kan NIET ongedaan gemaakt worden!\n\n` +
      `Typ "DELETE" om te bevestigen:`
    )) {
      return;
    }

    const confirmation = prompt(`Type "DELETE" om ${clientName} permanent te verwijderen:`);
    if (confirmation !== 'DELETE') {
      alert('Verwijdering geannuleerd - je moet exact "DELETE" typen om te bevestigen.');
      return;
    }
    
    try {
      const result = await apiCall(`/admin/clients/${clientId}`, {
        method: 'DELETE'
      });
      
      alert(`✅ ${result.deletedClient.name} en alle gerelateerde data zijn permanent verwijderd.\n\nDe klant kan niet meer inloggen.`);
      onRefresh();
    } catch (error) {
      console.error('Failed to delete client:', error);
      alert(`❌ Fout bij verwijderen klant: ${error.message}`);
    }
  };

  const handleClientClick = (client) => {
    setSelectedClient(client);
    setShowClientDetail(true);
  };

  const handleClientEdit = (client, e) => {
    e.stopPropagation();
    setSelectedClient(client);
    setShowEditModal(true);
  };

  const handleAddTeamMemberClick = (client, e) => {
    e.stopPropagation();
    setSelectedClient(client);
    setShowAddTeamMember(true);
  };

  // Filter out inactive clients from display
  const activeClients = clients?.filter(client => client.isActive !== false) || [];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
          <p className="text-gray-600 mt-1">Beheer klanten, teamleden en facturen</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition-all duration-200"
        >
          <PlusIcon />
          <span>Nieuwe Klant</span>
        </button>
      </div>

      {activeClients.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="text-gray-400 mb-4 flex justify-center">
            <Building2Icon />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Geen actieve klanten</h3>
          <p className="text-gray-600">Voeg je eerste klant toe om te beginnen.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeClients.map(client => (
            <div 
              key={client._id} 
              onClick={() => handleClientClick(client)}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 relative group hover:shadow-md hover:border-green-200 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                      <div className="text-green-600">
                        <Building2Icon />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">{client.name}</h3>
                      <p className="text-sm text-gray-600">{client.contactName}</p>
                      <p className="text-xs text-gray-500">{client.email}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Actief
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClient(client._id, client.name);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                    title="⚠️ PERMANENT VERWIJDEREN - Alle data wordt gewist!"
                  >
                    <TrashIcon />
                  </button>
                </div>
              </div>
              
              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Commissie:</span>
                  <span className="font-medium">{(client.commissionRate * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">CRM:</span>
                  <span className="font-medium capitalize">{client.crmType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Teamleden:</span>
                  <span className="font-medium">{client.connectedCount || 0}/{client.salesRepCount || 0}</span>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button
                  onClick={(e) => handleClientEdit(client, e)}
                  className="flex-1 px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                >
                  Bewerken
                </button>
                <button
                  onClick={(e) => handleAddTeamMemberClick(client, e)}
                  className="flex items-center space-x-1 px-3 py-2 text-sm bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors"
                >
                  <UserPlusIcon />
                  <span>+ Teamlid</span>
                </button>
              </div>
              
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-green-600 font-medium">Klik voor volledige details →</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* All Modals */}
      <AddClientModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddClient}
      />

      <EditClientModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        client={selectedClient}
        onSubmit={handleEditClient}
      />

      <AddTeamMemberModal
        isOpen={showAddTeamMember}
        onClose={() => setShowAddTeamMember(false)}
        clientId={selectedClient?._id}
        onSubmit={handleAddTeamMember}
      />

      <ClientDetailModal
        isOpen={showClientDetail}
        onClose={() => setShowClientDetail(false)}
        client={selectedClient}
        onRefresh={onRefresh}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        clientData={successData}
      />
    </div>
  );
};

// All Modal Components (simplified to save space)
const AddClientModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    contactName: '',
    email: '',
    commissionRate: '0.10',
    commissionCap: '50000',
    crmType: 'teamleader'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      await onSubmit({
        ...formData,
        commissionRate: parseFloat(formData.commissionRate),
        commissionCap: parseInt(formData.commissionCap)
      });
      setFormData({
        name: '',
        contactName: '',
        email: '',
        commissionRate: '0.10',
        commissionCap: '50000',
        crmType: 'teamleader'
      });
      onClose();
    } catch (error) {
      setError(error.message || 'Er ging iets mis bij het aanmaken van de klant');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Nieuwe Klant Toevoegen</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <XIcon />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bedrijfsnaam *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Acme Corporation"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Contactpersoon *</label>
            <input
              type="text"
              required
              value={formData.contactName}
              onChange={(e) => setFormData({...formData, contactName: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="John Doe"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="john@acmecorp.com"
              disabled={isLoading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Commissie %</label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={formData.commissionRate}
                onChange={(e) => setFormData({...formData, commissionRate: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={isLoading}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Max Commissie</label>
              <input
                type="number"
                min="0"
                value={formData.commissionCap}
                onChange={(e) => setFormData({...formData, commissionCap: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={isLoading}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CRM Type</label>
            <select
              value={formData.crmType}
              onChange={(e) => setFormData({...formData, crmType: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={isLoading}
            >
              <option value="teamleader">Teamleader</option>
              <option value="hubspot">HubSpot</option>
              <option value="pipedrive">Pipedrive</option>
            </select>
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isLoading}
            >
              Annuleren
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {isLoading ? 'Bezig...' : 'Klant Aanmaken'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Other modal components would be similar (EditClientModal, AddTeamMemberModal, etc.)
// Omitted for brevity but should follow the same pattern

const EditClientModal = ({ isOpen, onClose, client, onSubmit }) => {
  // Similar implementation as AddClientModal but for editing
  if (!isOpen) return null;
  return <div>Edit Modal Placeholder</div>;
};

const AddTeamMemberModal = ({ isOpen, onClose, clientId, onSubmit }) => {
  // Similar implementation for adding team members
  if (!isOpen) return null;
  return <div>Add Team Member Modal Placeholder</div>;
};

const ClientDetailModal = ({ isOpen, onClose, client, onRefresh }) => {
  // Implementation for client details with tabs
  if (!isOpen) return null;
  return <div>Client Detail Modal Placeholder</div>;
};

const SuccessModal = ({ isOpen, onClose, clientData }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="text-green-600">
              <CheckCircle2Icon />
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-gray-900 mb-2">Klant Succesvol Aangemaakt!</h3>
          
          <div className="bg-gray-50 rounded-xl p-4 mb-4 text-left">
            <p className="text-sm text-gray-600 mb-2">Login gegevens voor {clientData?.client?.name}:</p>
            <p className="font-mono text-sm bg-white p-2 rounded border">
              <strong>Email:</strong> {clientData?.client?.email}<br/>
              <strong>Wachtwoord:</strong> {clientData?.tempPassword}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Stuur deze gegevens veilig naar de klant. Het tijdelijke wachtwoord kan aangepast worden na eerste login.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Sluiten
          </button>
        </div>
      </div>
    </div>
  );
};

// Placeholder Components
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
  const [dashboardData, setDashboardData] = useState(null);
  const [clients, setClients] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [selectedSalesRep, setSelectedSalesRep] = useState(null);
  const [showSalesRepDetail, setShowSalesRepDetail] = useState(false);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('nl-NL', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Check for existing session
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const parsed = JSON.parse(userData);
        setUser(parsed);
        if (parsed.role === 'admin') {
          setActiveMenuItem('admin-dashboard');
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
    setDashboardData(null);
    setClients(null);
    setInvoices([]);
  };

  // Load dashboard data for clients
  useEffect(() => {
    if (user?.role === 'client' && (activeMenuItem === 'dashboard' || activeMenuItem === 'team' || activeMenuItem === 'settings')) {
      loadDashboardData();
    }
  }, [user, activeMenuItem]);

  // Load clients for admin
  useEffect(() => {
    if (user?.role === 'admin' && activeMenuItem === 'admin-dashboard') {
      loadClients();
    }
  }, [user, activeMenuItem]);

  // Load invoices for clients
  useEffect(() => {
    if (user?.role === 'client' && activeMenuItem === 'invoices') {
      loadInvoices();
    }
  }, [user, activeMenuItem]);

  const loadDashboardData = async () => {
    try {
      const data = await apiCall('/client/dashboard');
      setDashboardData(data);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const loadClients = async () => {
    try {
      const data = await apiCall('/admin/clients');
      setClients(data);
    } catch (error) {
      console.error('Failed to load clients:', error);
      setClients([]);
    }
  };

  const loadInvoices = async () => {
    try {
      const data = await apiCall('/client/invoices');
      setInvoices(data);
    } catch (error) {
      console.error('Failed to load invoices:', error);
      setInvoices([]);
    }
  };

  const handleAddClient = async (clientData) => {
    try {
      const response = await apiCall('/admin/clients', {
        method: 'POST',
        body: JSON.stringify(clientData)
      });
      return response;
    } catch (error) {
      throw new Error(error.message || 'Failed to create client');
    }
  };

  const handleSalesRepClick = (salesRep) => {
    setSelectedSalesRep(salesRep);
    setShowSalesRepDetail(true);
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
          {/* Client Dashboard */}
          {activeMenuItem === 'dashboard' && user.role === 'client' && (
            <ClientDashboard 
              dashboardData={dashboardData}
              formatCurrency={formatCurrency}
              onRefresh={loadDashboardData}
              onSalesRepClick={handleSalesRepClick}
            />
          )}

          {/* Enhanced Invoices Page */}
          {activeMenuItem === 'invoices' && user.role === 'client' && (
            <InvoicesPage 
              invoices={invoices}
              onRefresh={loadInvoices}
            />
          )}

          {/* Team Management */}
          {activeMenuItem === 'team' && user.role === 'client' && (
            <TeamManagement 
              dashboardData={dashboardData}
              onSalesRepClick={handleSalesRepClick}
            />
          )}

          {/* Settings with Real CRM Integration */}
          {activeMenuItem === 'settings' && user.role === 'client' && (
            <CRMSettings 
              dashboardData={dashboardData}
              onRefresh={loadDashboardData}
            />
          )}
          
          {/* Enhanced Admin Dashboard */}
          {activeMenuItem === 'admin-dashboard' && user.role === 'admin' && (
            <AdminDashboard 
              clients={clients}
              onAddClient={handleAddClient}
              onRefresh={loadClients}
            />
          )}
          
          {/* Other Pages - Placeholders for now */}
          {activeMenuItem === 'reports' && (
            <PlaceholderPage 
              title="Rapportages" 
              description="Geavanceerde rapportages en analytics komen hier beschikbaar."
            />
          )}

          {activeMenuItem === 'clients' && (
            <PlaceholderPage 
              title="Klanten Beheer" 
              description="Uitgebreide klant management tools komen hier beschikbaar."
            />
          )}
          
          {activeMenuItem === 'admin-settings' && (
            <PlaceholderPage 
              title="Admin Instellingen" 
              description="Systeem configuratie en beheer instellingen."
            />
          )}
        </div>
      </div>

      {/* Sales Rep Detail Modal */}
      <SalesRepDetailModal
        isOpen={showSalesRepDetail}
        onClose={() => setShowSalesRepDetail(false)}
        salesRep={selectedSalesRep}
      />
    </div>
  );
};

export default App;
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-green-900">HubSpot Integratie Actief</h4>
                    <p className="text-sm text-green-800 mt-1">
                      Echte HubSpot OAuth integratie geconfigureerd. Verbind je account om contacten automatisch te synchroniseren en real-time omzet bij te houden.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {selectedCRM === 'teamleader' && (
              <div className="bg-orange-50 rounded-xl p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6

