import React, { useState, useEffect } from 'react';

// Icons - using simple SVG icons since we can't import lucide-react without proper setup
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

// Add Client Modal Component
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
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
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

// Client Detail Modal Component
const ClientDetailModal = ({ isOpen, onClose, client, onAddSalesRep, onUploadInvoice }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [salesReps, setSalesReps] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [showAddRepForm, setShowAddRepForm] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);

  // Load client data when modal opens
  useEffect(() => {
    if (isOpen && client) {
      loadClientData();
    }
  }, [isOpen, client]);

  const loadClientData = async () => {
    // Mock data loading - in real app this would be API calls
    setSalesReps([
      { id: 1, name: 'Sarah Johnson', email: 'sarah@acmecorp.com', hireDate: '2024-01-15', isConnected: true },
      { id: 2, name: 'Mike Chen', email: 'mike@acmecorp.com', hireDate: '2024-03-01', isConnected: false }
    ]);
    setInvoices([
      { id: 1, number: 'INV-001', amount: 15000, month: 8, year: 2024, status: 'paid', uploadDate: '2024-09-01' }
    ]);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-900">{client?.name}</h3>
              <p className="text-gray-600">{client?.contactName} • {client?.email}</p>
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
              { id: 'salesreps', label: 'Sales Reps' },
              { id: 'invoices', label: 'Facturen' }
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
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Bedrijfsinfo</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">CRM:</span> {client?.crmType}</p>
                    <p><span className="font-medium">Commissie:</span> {((client?.commissionRate || 0) * 100).toFixed(1)}%</p>
                    <p><span className="font-medium">Max Commissie:</span> €{client?.commissionCap?.toLocaleString()}</p>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Statistieken</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Sales Reps:</span> {salesReps.length}</p>
                    <p><span className="font-medium">Gekoppeld:</span> {salesReps.filter(r => r.isConnected).length}</p>
                    <p><span className="font-medium">Facturen:</span> {invoices.length}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'salesreps' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">Sales Representatives</h4>
                <button
                  onClick={() => setShowAddRepForm(true)}
                  className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
                >
                  <PlusIcon />
                  <span>Sales Rep Toevoegen</span>
                </button>
              </div>
              
              <div className="space-y-3">
                {salesReps.map(rep => (
                  <div key={rep.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{rep.name}</p>
                      <p className="text-sm text-gray-600">{rep.email} • Aangenomen: {new Date(rep.hireDate).toLocaleDateString('nl-NL')}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      rep.isConnected ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {rep.isConnected ? 'Gekoppeld' : 'Niet gekoppeld'}
                    </span>
                  </div>
                ))}
              </div>

              {showAddRepForm && (
                <AddSalesRepForm 
                  onClose={() => setShowAddRepForm(false)}
                  onSubmit={(data) => {
                    setSalesReps([...salesReps, { ...data, id: Date.now(), isConnected: false }]);
                    setShowAddRepForm(false);
                  }}
                />
              )}
            </div>
          )}

          {activeTab === 'invoices' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-900">Facturen</h4>
                <button
                  onClick={() => setShowUploadForm(true)}
                  className="flex items-center space-x-2 bg-green-600 text-white px-3 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
                >
                  <UploadIcon />
                  <span>Factuur Uploaden</span>
                </button>
              </div>
              
              <div className="space-y-3">
                {invoices.map(invoice => (
                  <div key={invoice.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">Factuur #{invoice.number}</p>
                      <p className="text-sm text-gray-600">
                        €{invoice.amount.toLocaleString()} • {new Date(0, invoice.month - 1).toLocaleDateString('nl-NL', { month: 'long' })} {invoice.year}
                        <span className="ml-2">Geüpload: {new Date(invoice.uploadDate).toLocaleDateString('nl-NL')}</span>
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {invoice.status === 'paid' ? 'Betaald' : 'Openstaand'}
                    </span>
                  </div>
                ))}
              </div>

              {showUploadForm && (
                <InvoiceUploadForm 
                  onClose={() => setShowUploadForm(false)}
                  onSubmit={(data) => {
                    setInvoices([...invoices, { ...data, id: Date.now(), uploadDate: new Date().toISOString() }]);
                    setShowUploadForm(false);
                  }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Add Sales Rep Form
const AddSalesRepForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    hireDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <h5 className="font-medium text-gray-900 mb-4">Sales Rep Toevoegen</h5>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Naam *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Aangenomen op *</label>
          <input
            type="date"
            required
            value={formData.hireDate}
            onChange={(e) => setFormData({...formData, hireDate: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Annuleren
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Toevoegen
          </button>
        </div>
      </form>
    </div>
  );
};

// Invoice Upload Form
const InvoiceUploadForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    number: '',
    amount: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    status: 'pending'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount)
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      <h5 className="font-medium text-gray-900 mb-4">Factuur Uploaden</h5>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Factuurnummer *</label>
          <input
            type="text"
            required
            value={formData.number}
            onChange={(e) => setFormData({...formData, number: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="INV-2024-001"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bedrag *</label>
          <input
            type="number"
            required
            min="0"
            step="0.01"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Maand *</label>
            <select
              value={formData.month}
              onChange={(e) => setFormData({...formData, month: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {Array.from({length: 12}, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleDateString('nl-NL', { month: 'long' })}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Jaar *</label>
            <input
              type="number"
              required
              value={formData.year}
              onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({...formData, status: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="pending">Openstaand</option>
            <option value="paid">Betaald</option>
          </select>
        </div>
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Annuleren
          </button>
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Uploaden
          </button>
        </div>
      </form>
    </div>
  );
};

// Success Modal Component
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

// Sales Rep Detail Modal
const SalesRepDetailModal = ({ isOpen, onClose, salesRep }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">{salesRep?.name}</h3>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XIcon />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Contact Informatie</h4>
            <p className="text-sm text-gray-600">Email: {salesRep?.email}</p>
            <p className="text-sm text-gray-600">
              Aangenomen: {new Date(salesRep?.hireDate).toLocaleDateString('nl-NL', { 
                day: 'numeric', month: 'long', year: 'numeric' 
              })}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Performance</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600">Deze Maand</p>
                <p className="font-bold text-lg">€{(salesRep?.thisMonthRevenue || 0).toLocaleString()}</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-3">
                <p className="text-sm text-gray-600">Commissie</p>
                <p className="font-bold text-lg">€{(salesRep?.thisMonthCommission || 0).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">CRM Status</h4>
            <div className={`flex items-center space-x-2 p-3 rounded-lg ${
              salesRep?.isConnected ? 'bg-green-50' : 'bg-orange-50'
            }`}>
              <div className={`w-3 h-3 rounded-full ${
                salesRep?.isConnected ? 'bg-green-500' : 'bg-orange-500'
              }`}></div>
              <span className={`text-sm font-medium ${
                salesRep?.isConnected ? 'text-green-800' : 'text-orange-800'
              }`}>
                {salesRep?.isConnected ? 'Gekoppeld aan CRM' : 'Nog niet gekoppeld'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Welkom terug, {client?.contactName}!</h2>
          <p className="text-gray-600 mt-1">Bekijk je recruitment performance en team overzicht</p>
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
            <span className="text-sm text-gray-500">Actief</span>
          </div>
          <div>
            <p className="text-2xl font-bold text-gray-900 mb-1">{connectedReps.length}</p>
            <p className="text-sm text-gray-600">Gekoppelde sales reps</p>
          </div>
        </div>
      </div>

      {connectedReps.length > 0 && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Team Performance</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <EyeIcon />
              <span>Realtime data</span>
            </div>
          </div>
          
          <div className="space-y-6">
            {connectedReps
              .sort((a, b) => (b.thisMonthRevenue || 0) - (a.thisMonthRevenue || 0))
              .map((rep, index) => {
                const maxRevenue = Math.max(...connectedReps.map(r => r.thisMonthRevenue || 0));
                const barWidth = maxRevenue > 0 ? ((rep.thisMonthRevenue || 0) / maxRevenue) * 100 : 0;
                
                return (
                  <div key={rep._id} className="relative">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white ${
                          index === 0 ? 'bg-green-500' : 
                          index === 1 ? 'bg-blue-500' : 
                          'bg-gray-400'
                        }`}>
                          #{index + 1}
                        </div>
                        <div>
                          <button 
                            onClick={() => onSalesRepClick(rep)}
                            className="font-medium text-gray-900 hover:text-green-600 transition-colors text-left"
                          >
                            {rep.name}
                          </button>
                          <p className="text-sm text-gray-500">
                            Aangenomen: {new Date(rep.hireDate).toLocaleDateString('nl-NL', { 
                              month: 'short', 
                              year: 'numeric' 
                            })}
                          </p>
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
                          index === 0 ? 'bg-gradient-to-r from-green-400 to-green-600' : 
                          index === 1 ? 'bg-gradient-to-r from-blue-400 to-blue-600' : 
                          'bg-gradient-to-r from-gray-400 to-gray-500'
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
          <h3 className="text-xl font-bold text-gray-900">Sales Representatives</h3>
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Settings Component
const SettingsPage = ({ user, dashboardData, onCRMConnect }) => {
  const [showCRMConnect, setShowCRMConnect] = useState(false);
  
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Instellingen</h2>
        <p className="text-gray-600">Beheer je account en CRM koppelingen</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Account Information */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Account Informatie</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Naam</label>
              <input
                type="text"
                value={user?.name || ''}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bedrijf</label>
              <input
                type="text"
                value={user?.client?.name || ''}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
              />
            </div>
          </div>
        </div>

        {/* CRM Integration */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">CRM Koppeling</h3>
          
          {dashboardData?.salesReps?.some(rep => !rep.isConnected) ? (
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-orange-50 rounded-xl">
                <div className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5">
                  <AlertCircleIcon />
                </div>
                <div>
                  <p className="font-medium text-orange-900 mb-1">CRM koppeling vereist</p>
                  <p className="text-sm text-orange-700">
                    Sommige sales reps zijn nog niet gekoppeld aan je CRM systeem. 
                    Verbind je CRM om data te synchroniseren.
                  </p>
                </div>
              </div>
              
              <button
                onClick={() => setShowCRMConnect(true)}
                className="w-full flex items-center justify-center space-x-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors"
              >
                <LinkIcon />
                <span>CRM Verbinden</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-xl">
                <div className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5">
                  <CheckCircle2Icon />
                </div>
                <div>
                  <p className="font-medium text-green-900 mb-1">CRM succesvol gekoppeld</p>
                  <p className="text-sm text-green-700">
                    Alle sales reps zijn verbonden met je CRM systeem.
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">CRM Type:</span>
                  <span className="font-medium capitalize">{user?.client?.crmType || 'Teamleader'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="font-medium text-green-600">Actief</span>
                </div>
              </div>
              
              <button
                onClick={() => setShowCRMConnect(true)}
                className="w-full flex items-center justify-center space-x-2 bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <RefreshCwIcon />
                <span>Opnieuw Synchroniseren</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CRM Connect Modal */}
      {showCRMConnect && (
        <CRMConnectModal 
          isOpen={showCRMConnect} 
          onClose={() => setShowCRMConnect(false)}
          onConnect={onCRMConnect}
        />
      )}
    </div>
  );
};

// CRM Connect Modal
const CRMConnectModal = ({ isOpen, onClose, onConnect }) => {
  const [selectedCRM, setSelectedCRM] = useState('teamleader');
  const [isConnecting, setIsConnecting] = useState(false);

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      await onConnect(selectedCRM);
      onClose();
    } catch (error) {
      console.error('CRM connection failed:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">CRM Verbinden</h3>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XIcon />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Selecteer je CRM systeem:</label>
            <div className="space-y-3">
              {[
                { id: 'teamleader', name: 'Teamleader', desc: 'Populair CRM voor sales teams' },
                { id: 'hubspot', name: 'HubSpot', desc: 'All-in-one marketing & sales platform' },
                { id: 'pipedrive', name: 'Pipedrive', desc: 'Sales-focused CRM tool' }
              ].map(crm => (
                <label key={crm.id} className="flex items-start space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="crm"
                    value={crm.id}
                    checked={selectedCRM === crm.id}
                    onChange={(e) => setSelectedCRM(e.target.value)}
                    className="mt-1"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{crm.name}</p>
                    <p className="text-sm text-gray-600">{crm.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-sm text-blue-700">
              Je wordt doorgestuurd naar {selectedCRM} om de koppeling te autoriseren. 
              Na goedkeuring komen je sales rep gegevens automatisch beschikbaar.
            </p>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              disabled={isConnecting}
            >
              Annuleren
            </button>
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors"
            >
              {isConnecting ? 'Verbinden...' : 'Verbinden'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Invoices Component
const InvoicesPage = ({ invoices, formatCurrency, onDownload }) => {
  if (!invoices) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Facturen laden...</div>
      </div>
    );
  }

  // Group invoices by month/year
  const groupedInvoices = invoices.reduce((groups, invoice) => {
    const key = `${invoice.year}-${String(invoice.month).padStart(2, '0')}`;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(invoice);
    return groups;
  }, {});

  const sortedGroups = Object.keys(groupedInvoices).sort().reverse();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Betalingen & Facturen</h2>
        <p className="text-gray-600">Bekijk je factuurhistorie georganiseerd per maand</p>
      </div>

      <div className="space-y-6">
        {sortedGroups.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4 flex justify-center">
                <FileTextIcon />
              </div>
              <p className="text-gray-500">Geen facturen gevonden</p>
            </div>
          </div>
        ) : (
          sortedGroups.map(monthKey => {
            const [year, month] = monthKey.split('-');
            const monthInvoices = groupedInvoices[monthKey];
            const monthName = new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('nl-NL', { 
              month: 'long', 
              year: 'numeric' 
            });

            return (
              <div key={monthKey} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 capitalize">{monthName}</h3>
                  <span className="text-sm text-gray-500">{monthInvoices.length} factuur(en)</span>
                </div>
                
                <div className="space-y-3">
                  {monthInvoices.map((invoice) => (
                    <div key={invoice._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <div className="text-green-600">
                            <FileTextIcon />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">Factuur #{invoice.invoiceNumber}</p>
                          <div className="flex items-center space-x-3">
                            <p className="text-sm text-gray-600">{formatCurrency(invoice.amount)}</p>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              invoice.status === 'paid' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-orange-100 text-orange-800'
                            }`}>
                              {invoice.status === 'paid' ? 'Betaald' : 'Openstaand'}
                            </span>
                            <span className="text-xs text-gray-500">
                              Geüpload: {new Date(invoice.createdAt).toLocaleDateString('nl-NL')}
                            </span>
                          </div>
                        </div>
                      </div>
                      {invoice.filePath && (
                        <button 
                          onClick={() => onDownload(invoice._id)}
                          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition-colors"
                        >
                          <DownloadIcon />
                          <span>Download</span>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

// Admin Dashboard Component
const AdminDashboard = ({ clients, onAddClient, onRefresh, onClientClick }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successData, setSuccessData] = useState(null);
  
  const handleAddClient = async (clientData) => {
    const result = await onAddClient(clientData);
    setSuccessData(result);
    setShowSuccessModal(true);
    onRefresh(); // Refresh client list
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Admin Dashboard</h2>
          <p className="text-gray-600 mt-1">Beheer klanten en hun gegevens</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition-all duration-200"
        >
          <PlusIcon />
          <span>Nieuwe Klant</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients && clients.map(client => (
          <div 
            key={client._id} 
            onClick={() => onClientClick(client)}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 cursor-pointer hover:border-green-300 hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <div className="text-green-600">
                  <Building2Icon />
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                client.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {client.isActive ? 'Actief' : 'Inactief'}
              </span>
            </div>
            
            <h3 className="font-bold text-gray-900 mb-1">{client.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{client.contactName} • {client.email}</p>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Commissie:</span>
                <span className="font-medium">{(client.commissionRate * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">CRM:</span>
                <span className="font-medium capitalize">{client.crmType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Sales Reps:</span>
                <span className="font-medium">{client.connectedCount || 0}/{client.salesRepCount || 0}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddClientModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddClient}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        clientData={successData}
      />
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
  const [invoices, setInvoices] = useState(null);
  const [clients, setClients] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedSalesRep, setSelectedSalesRep] = useState(null);
  const [showClientDetail, setShowClientDetail] = useState(false);
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
    setInvoices(null);
    setClients(null);
  };

  // Load dashboard data for clients
  useEffect(() => {
    if (user?.role === 'client' && (activeMenuItem === 'dashboard' || activeMenuItem === 'team')) {
      loadDashboardData();
    }
  }, [user, activeMenuItem]);

  // Load invoices for clients
  useEffect(() => {
    if (user?.role === 'client' && activeMenuItem === 'invoices') {
      loadInvoices();
    }
  }, [user, activeMenuItem]);

  // Load clients for admin
  useEffect(() => {
    if (user?.role === 'admin' && activeMenuItem === 'admin-dashboard') {
      loadClients();
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

  const loadInvoices = async () => {
    try {
      const data = await apiCall('/client/invoices');
      setInvoices(data);
    } catch (error) {
      console.error('Failed to load invoices:', error);
      setInvoices([]);
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

  const handleInvoiceDownload = async (invoiceId) => {
    try {
      const response = await fetch(`${API_BASE}/client/invoices/${invoiceId}/download`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`
        }
      });
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `factuur-${invoiceId}.pdf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  const handleClientClick = (client) => {
    setSelectedClient(client);
    setShowClientDetail(true);
  };

  const handleSalesRepClick = (salesRep) => {
    setSelectedSalesRep(salesRep);
    setShowSalesRepDetail(true);
  };

  const handleCRMConnect = async (crmType) => {
    try {
      // Redirect to CRM OAuth - this is a mock implementation
      const response = await apiCall(`/client/crm/connect?type=${crmType}`);
      if (response.authUrl) {
        window.location.href = response.authUrl;
      }
    } catch (error) {
      console.error('CRM connection failed:', error);
      alert('CRM verbinding mislukt. Probeer het later opnieuw.');
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
          {/* Client Dashboard */}
          {activeMenuItem === 'dashboard' && user.role === 'client' && (
            <ClientDashboard 
              dashboardData={dashboardData}
              formatCurrency={formatCurrency}
              onRefresh={loadDashboardData}
              onSalesRepClick={handleSalesRepClick}
            />
          )}
          
          {/* Client Team Management */}
          {activeMenuItem === 'team' && user.role === 'client' && (
            <TeamManagement 
              dashboardData={dashboardData}
              onSalesRepClick={handleSalesRepClick}
            />
          )}
          
          {/* Client Invoices */}
          {activeMenuItem === 'invoices' && (
            <InvoicesPage 
              invoices={invoices}
              formatCurrency={formatCurrency}
              onDownload={handleInvoiceDownload}
            />
          )}

          {/* Client Settings */}
          {activeMenuItem === 'settings' && user.role === 'client' && (
            <SettingsPage 
              user={user}
              dashboardData={dashboardData}
              onCRMConnect={handleCRMConnect}
            />
          )}
          
          {/* Admin Dashboard */}
          {activeMenuItem === 'admin-dashboard' && user.role === 'admin' && (
            <AdminDashboard 
              clients={clients}
              onAddClient={handleAddClient}
              onRefresh={loadClients}
              onClientClick={handleClientClick}
            />
          )}
          
          {/* Other Pages */}
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

      {/* Modals */}
      <ClientDetailModal
        isOpen={showClientDetail}
        onClose={() => setShowClientDetail(false)}
        client={selectedClient}
      />

      <SalesRepDetailModal
        isOpen={showSalesRepDetail}
        onClose={() => setShowSalesRepDetail(false)}
        salesRep={selectedSalesRep}
      />
    </div>
  );
};

export default App;
