import React, { useState, useEffect } from 'react';

console.log('APP.JS LOADED - VERSION FIXED');

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

  return React.createElement('div', {
    className: 'min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 flex items-center justify-center p-4'
  }, 
    React.createElement('div', { className: 'w-full max-w-md' },
      React.createElement('div', { className: 'text-center mb-8' },
        React.createElement('div', {
          className: 'inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-4'
        },
          React.createElement('div', { className: 'text-white' }, React.createElement(Building2Icon))
        ),
        React.createElement('h1', {
          className: 'text-3xl font-bold text-gray-900 mb-2'
        }, 'Recruiters Network'),
        React.createElement('p', { className: 'text-gray-600' }, 'Log in op je portaal')
      ),
      React.createElement('div', {
        className: 'bg-white rounded-3xl shadow-xl border border-gray-100 p-8'
      },
        React.createElement('form', { onSubmit: handleSubmit, className: 'space-y-6' },
          error && React.createElement('div', {
            className: 'bg-red-50 border border-red-200 rounded-xl p-4'
          },
            React.createElement('p', { className: 'text-red-700 text-sm' }, error)
          ),
          React.createElement('div', null,
            React.createElement('label', {
              className: 'block text-sm font-medium text-gray-700 mb-2'
            }, 'E-mailadres'),
            React.createElement('input', {
              type: 'email',
              placeholder: 'jouw@email.nl',
              value: email,
              onChange: (e) => setEmail(e.target.value),
              className: 'w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200',
              required: true,
              disabled: isLoading
            })
          ),
          React.createElement('div', null,
            React.createElement('label', {
              className: 'block text-sm font-medium text-gray-700 mb-2'
            }, 'Wachtwoord'),
            React.createElement('input', {
              type: 'password',
              placeholder: '••••••••',
              value: password,
              onChange: (e) => setPassword(e.target.value),
              className: 'w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200',
              required: true,
              disabled: isLoading
            })
          ),
          React.createElement('button', {
            type: 'submit',
            disabled: isLoading,
            className: 'w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:transform-none'
          }, isLoading ? 'Inloggen...' : 'Inloggen')
        ),
        React.createElement('div', { className: 'mt-6 text-center' },
          React.createElement('p', { className: 'text-sm text-gray-500 mb-2' }, 'Demo accounts:'),
          React.createElement('div', { className: 'space-y-1 text-xs text-gray-400' },
            React.createElement('p', null, 'Admin: admin@recruitersnetwork.nl / admin123'),
            React.createElement('p', null, 'Client: demo@acmecorp.com / demo123'),
            React.createElement('p', null, 'Sales Rep: sarah@acmecorp.com / demo123')
          )
        )
      ),
      React.createElement('div', { className: 'text-center mt-8 text-sm text-gray-500' },
        React.createElement('p', null, '© 2024 Recruiters Network. Alle rechten voorbehouden.')
      )
    )
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

  return React.createElement('div', {
    className: 'bg-white shadow-xl transition-all duration-300 border-r border-gray-200 ' + (sidebarCollapsed ? 'w-20' : 'w-72')
  },
    React.createElement('div', { className: 'p-6 border-b border-gray-100' },
      React.createElement('div', { className: 'flex items-center justify-between' },
        !sidebarCollapsed && React.createElement('div', { className: 'flex items-center space-x-3' },
          React.createElement('div', {
            className: 'w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center'
          },
            React.createElement('div', { className: 'text-white' }, React.createElement(Building2Icon))
          ),
          React.createElement('div', null,
            React.createElement('h1', {
              className: 'text-xl font-bold text-gray-900'
            }, 'Recruiters Network'),
            React.createElement('p', { className: 'text-xs text-gray-500' }, getRoleLabel())
          )
        ),
        React.createElement('button', {
          onClick: () => setSidebarCollapsed(!sidebarCollapsed),
          className: 'p-2 rounded-lg hover:bg-gray-100 transition-colors'
        }, sidebarCollapsed ? React.createElement(ChevronRightIcon) : React.createElement(ChevronLeftIcon))
      )
    ),
    React.createElement('nav', { className: 'px-4 py-6 space-y-2' },
      menuItems.map((item) => {
        const IconComponent = item.icon;
        const isActive = currentPage === item.id;
        return React.createElement('button', {
          key: item.id,
          onClick: () => setCurrentPage(item.id),
          className: 'w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-200 ' + (
            isActive 
              ? 'bg-green-50 text-green-600 shadow-sm border border-green-100' 
              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
          )
        },
          React.createElement('div', {
            className: 'flex-shrink-0 ' + (isActive ? 'text-green-600' : 'text-gray-400')
          }, React.createElement(IconComponent)),
          !sidebarCollapsed && React.createElement('span', {
            className: 'ml-3 font-medium'
          }, item.label)
        );
      })
    ),
    React.createElement('div', {
      className: 'absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100'
    },
      React.createElement('div', {
        className: 'flex items-center mb-4 ' + (sidebarCollapsed ? 'justify-center' : 'justify-between')
      },
        !sidebarCollapsed && React.createElement('div', { className: 'flex items-center space-x-3' },
          React.createElement('div', {
            className: 'w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center'
          },
            React.createElement('span', {
              className: 'text-green-600 font-semibold text-sm'
            }, (user && user.name && user.name.charAt(0)) || 'U')
          ),
          React.createElement('div', null,
            React.createElement('p', { className: 'font-medium text-gray-900' }, user && user.name),
            React.createElement('p', { className: 'text-xs text-gray-500' },
              user && user.role === 'salesrep' 
                ? ((user.salesRep && user.salesRep.clientId && user.salesRep.clientId.name) || 'Sales Rep')
                : ((user.client && user.client.name) || (user && user.email))
            )
          )
        )
      ),
      React.createElement('button', {
        onClick: onLogout,
        className: 'w-full flex items-center px-4 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors ' + (sidebarCollapsed ? 'justify-center' : '')
      },
        React.createElement(LogOutIcon),
        !sidebarCollapsed && React.createElement('span', {
          className: 'ml-3 font-medium'
        }, 'Uitloggen')
      )
    )
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
    return React.createElement('div', { className: 'space-y-6' },
      React.createElement('div', {
        className: 'bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center'
      },
        React.createElement('p', { className: 'text-gray-600' }, 'Dashboard laden...')
      )
    );
  }

  const totalClients = clients.length;
  const totalSalesReps = clients.reduce((sum, client) => sum + (client.salesRepCount || 0), 0);
  const connectedClients = clients.filter(client => (client.connectedCount || 0) > 0).length;
  const totalInvoices = clients.reduce((sum, client) => sum + (client.invoiceCount || 0), 0);

  return React.createElement('div', { className: 'space-y-6' },
    React.createElement('div', {
      className: 'bg-white rounded-2xl shadow-sm border border-gray-100 p-8'
    },
      React.createElement('h2', {
        className: 'text-3xl font-bold text-gray-900 mb-2'
      }, 'Admin Dashboard'),
      React.createElement('p', { className: 'text-gray-600' }, 'Beheer klanten, teams en facturatie')
    ),
    error && React.createElement('div', {
      className: 'bg-red-50 border border-red-200 rounded-xl p-4'
    },
      React.createElement('p', { className: 'text-red-700 text-sm' }, error)
    ),
    React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-4 gap-6' },
      React.createElement('div', {
        className: 'bg-white rounded-xl shadow-sm border border-gray-100 p-6'
      },
        React.createElement('div', { className: 'flex items-center justify-between' },
          React.createElement('div', null,
            React.createElement('p', { className: 'text-sm text-gray-600' }, 'Totaal Klanten'),
            React.createElement('p', { className: 'text-3xl font-bold text-gray-900' }, totalClients)
          ),
          React.createElement('div', {
            className: 'w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center'
          }, React.createElement(UsersIcon))
        )
      ),
      React.createElement('div', {
        className: 'bg-white rounded-xl shadow-sm border border-gray-100 p-6'
      },
        React.createElement('div', { className: 'flex items-center justify-between' },
          React.createElement('div', null,
            React.createElement('p', { className: 'text-sm text-gray-600' }, 'Sales Reps'),
            React.createElement('p', { className: 'text-3xl font-bold text-gray-900' }, totalSalesReps)
          ),
          React.createElement('div', {
            className: 'w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center'
          }, React.createElement(UsersIcon))
        )
      ),
      React.createElement('div', {
        className: 'bg-white rounded-xl shadow-sm border border-gray-100 p-6'
      },
        React.createElement('div', { className: 'flex items-center justify-between' },
          React.createElement('div', null,
            React.createElement('p', { className: 'text-sm text-gray-600' }, 'CRM Connected'),
            React.createElement('p', { className: 'text-3xl font-bold text-gray-900' }, connectedClients)
          ),
          React.createElement('div', {
            className: 'w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center'
          }, React.createElement(SettingsIcon))
        )
      ),
      React.createElement('div', {
        className: 'bg-white rounded-xl shadow-sm border border-gray-100 p-6'
      },
        React.createElement('div', { className: 'flex items-center justify-between' },
          React.createElement('div', null,
            React.createElement('p', { className: 'text-sm text-gray-600' }, 'Facturen'),
            React.createElement('p', { className: 'text-3xl font-bold text-gray-900' }, totalInvoices)
          ),
          React.createElement('div', {
            className: 'w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center'
          }, React.createElement(FileTextIcon))
        )
      )
    ),
    React.createElement('div', {
      className: 'bg-white rounded-2xl shadow-sm border border-gray-100 p-8'
    },
      React.createElement('h3', {
        className: 'text-xl font-semibold text-gray-900 mb-6'
      }, 'Klanten Overzicht'),
      clients.length === 0 ? React.createElement('div', {
        className: 'text-center py-8'
      },
        React.createElement('p', { className: 'text-gray-500' }, 'Nog geen klanten toegevoegd')
      ) : React.createElement('div', {
        className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
      },
        clients.map((client) => React.createElement('div', {
          key: client._id,
          className: 'border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow'
        },
          React.createElement('div', { className: 'flex items-center space-x-3 mb-4' },
            React.createElement('div', {
              className: 'w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center'
            },
              React.createElement('span', {
                className: 'text-blue-600 font-semibold text-lg'
              }, client.name.charAt(0))
            ),
            React.createElement('div', { className: 'flex-1' },
              React.createElement('h4', {
                className: 'font-semibold text-gray-900'
              }, client.name),
              React.createElement('p', { className: 'text-sm text-gray-500' }, client.email)
            )
          ),
          React.createElement('div', { className: 'space-y-2 mb-4' },
            React.createElement('div', { className: 'flex justify-between text-sm' },
              React.createElement('span', { className: 'text-gray-600' }, 'Contact:'),
              React.createElement('span', { className: 'text-gray-900' }, client.contactName)
            ),
            React.createElement('div', { className: 'flex justify-between text-sm' },
              React.createElement('span', { className: 'text-gray-600' }, 'CRM:'),
              React.createElement('span', { className: 'text-gray-900 capitalize' }, client.crmType)
            )
          ),
          React.createElement('div', { className: 'bg-green-100 px-4 py-2 rounded-lg mb-4' },
            React.createElement('span', { className: 'text-green-600 font-medium text-sm' },
              (client.salesRepCount || 0) + ' team • ' + (client.invoiceCount || 0) + ' facturen'
            )
          ),
          React.createElement('button', {
            onClick: () => {
              console.log('Button clicked', client);
              onClientClick && onClientClick(client);
            },
            className: 'w-full bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors'
          }, 'Beheren')
        ))
      )
    )
  );
};
