import React, { useState, useEffect } from 'react';

// Icons
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
                  Ga naar Instellingen om je CRM te koppelen en sales rep data te synchroniseren.
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
            <p className="text-sm text-gray-600">Totaal sales reps ({connectedReps.length} gekoppeld)</p>
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
  };

  // Load dashboard data for clients
  useEffect(() => {
    if (user?.role === 'client' && (activeMenuItem === 'dashboard' || activeMenuItem === 'team')) {
      loadDashboardData();
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

  const handleSalesRepClick = (salesRep) => {
    // Simple modal functionality can be added here
    alert(`Sales Rep Details: ${salesRep.name} - €${(salesRep.thisMonthRevenue || 0).toLocaleString()} deze maand`);
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
          
          {/* Other Pages - Placeholders for now */}
          {activeMenuItem === 'invoices' && (
            <PlaceholderPage 
              title="Betalingen & Facturen" 
              description="Bekijk je factuurhistorie georganiseerd per maand"
            />
          )}

          {activeMenuItem === 'team' && (
            <PlaceholderPage 
              title="Team Management" 
              description="Beheer je sales team en bekijk individuele performance"
            />
          )}

          {activeMenuItem === 'settings' && user.role === 'client' && (
            <PlaceholderPage 
              title="Instellingen" 
              description="Beheer je account en CRM koppelingen"
            />
          )}
          
          {activeMenuItem === 'admin-dashboard' && user.role === 'admin' && (
            <PlaceholderPage 
              title="Admin Dashboard" 
              description="Beheer klanten en hun gegevens"
            />
          )}
          
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
    </div>
  );
};

export default App;
