// Admin Network Commissions - COMPLETE WITH ALL FUNCTIONALITY
const AdminNetworkCommissions = () => {
  const [commissions, setCommissions] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  console.log('🔥 AdminNetworkCommissions COMPONENT LOADED');

  useEffect(() => {
    fetchClients();
    fetchCommissions();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await apiCall('/admin/clients');
      setClients(response);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchCommissions = async () => {
    try {
      const response = await apiCall('/admin/network-commissions');
      setCommissions(response);
    } catch (err) {
      setError(err.message);
    }
  };

  const generateNetworkInvoice = async () => {
    if (!selectedClient) {
      setError('Selecteer een client');
      return;
    }

    try {
      setIsLoading(true);
      const response = await apiCall('/admin/generate-network-invoice', {
        method: 'POST',
        body: JSON.stringify({
          clientId: selectedClient,
          month: selectedMonth,
          year: selectedYear
        })
      });
      
      setSuccess(`Network factuur gegenereerd: €${response.networkAmount.toFixed(2)}`);
      await fetchCommissions();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">🔥 Network Commissie Facturen</h2>
        <p className="text-gray-600">Genereer facturen voor Recruiters Network commissies</p>
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

      {/* Network Invoice Generator */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Nieuwe Network Factuur Genereren</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
            <select
              value={selectedClient || ''}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="">Selecteer client...</option>
              {clients.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.name} ({((client.networkCommissionRate || 0.1) * 100).toFixed(1)}%)
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Maand</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
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
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div className="flex items-end">
            <button
              onClick={generateNetworkInvoice}
              disabled={isLoading || !selectedClient}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              <icons.Plus />
              <span className="ml-2">{isLoading ? 'Genereren...' : 'Network Factuur Genereren'}</span>
            </button>
          </div>
        </div>
        
        <div className="text-sm text-gray-600">
          <p><strong>Uitleg:</strong> Network facturen worden berekend over goedgekeurde sales rep commissies.</p>
          <p>Voorbeeld: Sales rep factureert €2.500 commissie excl. BTW → bij 10% network commissie = €250 voor Recruiters Network</p>
        </div>
      </div>

      {/* Generated Network Invoices */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          Gegenereerde Network Facturen ({commissions.length})
        </h3>
        
        {commissions.length === 0 ? (
          <div className="text-center py-8">
            <h4 className="text-lg font-medium text-gray-900 mt-4">Nog geen network facturen</h4>
            <p className="text-gray-600 mt-2">Genereer je eerste network factuur om te beginnen</p>
          </div>
        ) : (
          <div className="space-y-4">
            {commissions.map((commission) => (
              <div key={commission._id} className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <icons.FileText />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Factuur #{commission.invoiceNumber}
                      </h4>
                      <p className="text-gray-600">
                        {commission.clientName} • {commission.monthName} {commission.year}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <span>Sales Rep Commissie: €{commission.totalSalesRepCommission.toLocaleString('nl-NL', {minimumFractionDigits: 2})}</span>
                        <span>Network Rate: {commission.networkRate * 100}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        €{commission.networkAmount.toLocaleString('nl-NL', {minimumFractionDigits: 2})}
                      </p>
                      <p className="text-sm text-gray-500">excl. BTW</p>
                    </div>
                    
                    <span className={'px-3 py-1 rounded-full text-sm font-medium ' + (
                      commission.status === 'paid' ? 'bg-green-100 text-green-600' :
                      commission.status === 'sent' ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-600'
                    )}>
                      {commission.status === 'paid' ? 'Betaald' :
                       commission.status === 'sent' ? 'Verstuurd' :
                       'Concept'}
                    </span>
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

// 🔥 NEW Admin Sales Rep Overview Component
const AdminSalesRepOverview = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [overviewData, setOverviewData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await apiCall('/admin/clients');
      setClients(response);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchSalesRepOverview = async (clientId) => {
    try {
      setIsLoading(true);
      const response = await apiCall(`/admin/clients/${clientId}/salesrep-overview`);
      setOverviewData(response);
      setSelectedClient(clientId);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (rep) => {
    if (rep.hasSubmittedThisMonth) {
      const status = rep.currentMonthStatus;
      if (status === 'paid') return { text: '💰 Betaald', color: 'bg-green-100 text-green-600' };
      if (status === 'approved') return { text: '✅ Goedgekeurd', color: 'bg-blue-100 text-blue-600' };
      if (status === 'revision_requested') return { text: '🔄 Herzien', color: 'bg-yellow-100 text-yellow-600' };
      return { text: '⏳ Te beoordelen', color: 'bg-orange-100 text-orange-600' };
    }
    return overviewData?.isAfterBillingDay 
      ? { text: '🔴 Te laat', color: 'bg-red-100 text-red-600' }
      : { text: '❌ Nog niet ingediend', color: 'bg-gray-100 text-gray-600' };
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">🔥 Sales Rep Facturatie Overzicht</h2>
        <p className="text-gray-600">Bekijk de facturatie status van sales representatives per client</p>
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

      {/* Client Selection */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Selecteer Client</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {clients.map((client) => (
            <button
              key={client._id}
              onClick={() => fetchSalesRepOverview(client._id)}
              className="text-left p-6 border border-gray-200 rounded-xl hover:shadow-md transition-shadow hover:border-green-300"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900">{client.name}</h4>
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                  {client.salesRepCount} reps
                </span>
              </div>
              <p className="text-gray-600 text-sm">{client.contactName}</p>
              <p className="textimport React, { useState, useEffect } from 'react';

console.log('🔥 COMPLETE APP.JS WITH ALL FEATURES LOADED 🔥');

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
      <path d="m22 21-2-2"/>
      <path d="m16 11 2 2 4-4"/>
    </svg>
  ),
  Settings: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="3"/>
      <path d="m12 1 0 6m0 6 0 6"/>
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
  )
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-4">
            <div className="text-white"><icons.Building2 /></div>
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

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Demo: admin@recruitersnetwork.nl / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Admin Dashboard - COMPLETE WITH ALL FEATURES
const AdminDashboard = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showNewClientForm, setShowNewClientForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editMode, setEditMode] = useState(false);

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

  const handleClientClick = async (client) => {
    try {
      setIsLoading(true);
      const response = await apiCall(`/admin/clients/${client._id}`);
      setSelectedClient({
        ...response.client,
        salesReps: response.salesReps || [],
        invoices: response.invoices || []
      });
      setShowModal(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const createClient = async () => {
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
      
      setSuccess(`Client aangemaakt! Tijdelijk wachtwoord: ${response.tempPassword}`);
      setNewClient({
        name: '', contactName: '', email: '', phone: '', address: '',
        kvkNumber: '', vatNumber: '', bankAccount: '',
        networkCommissionRate: '10', billingDay: '15',
        commissionRate: '10', commissionCap: '50000'
      });
      setShowNewClientForm(false);
      await fetchClients();
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
        body: JSON.stringify({
          ...selectedClient,
          networkCommissionRate: parseFloat(selectedClient.networkCommissionRate),
          billingDay: parseInt(selectedClient.billingDay),
          commissionRate: parseFloat(selectedClient.commissionRate),
          commissionCap: parseFloat(selectedClient.commissionCap)
        })
      });
      
      setSuccess('Client bijgewerkt!');
      setEditMode(false);
      await fetchClients();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addSalesRep = async () => {
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
        name: '', email: '', phone: '', position: 'Sales Representative',
        hireDate: new Date().toISOString().split('T')[0], commissionRate: '10'
      });
      
      // Refresh client data
      await handleClientClick(selectedClient);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSalesRep = async (salesRepId, salesRepName) => {
    if (confirm(`Weet je zeker dat je ${salesRepName} wilt verwijderen?`)) {
      try {
        setIsLoading(true);
        await apiCall(`/admin/salesreps/${salesRepId}`, { method: 'DELETE' });
        setSuccess('Sales rep verwijderd!');
        await handleClientClick(selectedClient);
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">🔥 Admin Dashboard</h2>
            <p className="text-gray-600">Beheer alle klanten en sales representatives</p>
          </div>
          <button
            onClick={() => setShowNewClientForm(true)}
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

      {/* New Client Form */}
      {showNewClientForm && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Nieuwe Klant Toevoegen</h3>
            <button
              onClick={() => setShowNewClientForm(false)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <icons.X />
            </button>
          </div>

          <div className="space-y-6">
            {/* Basis Informatie */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Basis Informatie</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bedrijfsnaam *</label>
                  <input
                    type="text"
                    value={newClient.name}
                    onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contactpersoon *</label>
                  <input
                    type="text"
                    value={newClient.contactName}
                    onChange={(e) => setNewClient({...newClient, contactName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
                  <input
                    type="email"
                    value={newClient.email}
                    onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefoon</label>
                  <input
                    type="tel"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
                  <input
                    type="text"
                    value={newClient.address}
                    onChange={(e) => setNewClient({...newClient, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>

            {/* Bedrijfsregistratie */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Bedrijfsregistratie</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">KVK Nummer</label>
                  <input
                    type="text"
                    value={newClient.kvkNumber}
                    onChange={(e) => setNewClient({...newClient, kvkNumber: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">BTW Nummer</label>
                  <input
                    type="text"
                    value={newClient.vatNumber}
                    onChange={(e) => setNewClient({...newClient, vatNumber: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">IBAN</label>
                  <input
                    type="text"
                    value={newClient.bankAccount}
                    onChange={(e) => setNewClient({...newClient, bankAccount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>

            {/* Network Commissie */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Network Commissie</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Network Commissie (%)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={newClient.networkCommissionRate}
                    onChange={(e) => setNewClient({...newClient, networkCommissionRate: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Percentage van sales rep commissie dat Recruiters Network krijgt
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Facturatie Dag</label>
                  <input
                    type="number"
                    min="1"
                    max="31"
                    value={newClient.billingDay}
                    onChange={(e) => setNewClient({...newClient, billingDay: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Dag van de maand wanneer facturen verwacht worden
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={createClient}
                disabled={isLoading || !newClient.name || !newClient.contactName || !newClient.email}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Bezig...' : 'Klant Toevoegen'}
              </button>
              <button
                onClick={() => setShowNewClientForm(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Annuleren
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clients Grid */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Klanten ({clients.length})</h3>
        
        {isLoading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Laden...</p>
          </div>
        ) : clients.length === 0 ? (
          <div className="text-center py-8">
            <h4 className="text-lg font-medium text-gray-900 mt-4">Nog geen klanten</h4>
            <p className="text-gray-600 mt-2">Voeg je eerste klant toe om te beginnen</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client) => (
              <div key={client._id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-bold text-gray-900">{client.name}</h4>
                  <div className="flex items-center space-x-2">
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs font-medium">
                      {((client.networkCommissionRate || 0.1) * 100).toFixed(1)}%
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Contact:</span>
                    <span className="font-medium">{client.contactName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium">{client.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sales Reps:</span>
                    <span className="font-medium">{client.salesRepCount || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Facturatie:</span>
                    <span className="font-medium">{client.billingDay || 15}e</span>
                  </div>
                </div>

                <button
                  onClick={() => handleClientClick(client)}
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm flex items-center justify-center"
                >
                  <icons.Edit />
                  <span className="ml-2">Beheren</span>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Client Detail Modal */}
      {showModal && selectedClient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 max-w-6xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{selectedClient.name}</h3>
                <p className="text-gray-600">{selectedClient.email}</p>
              </div>
              <div className="flex items-center space-x-3">
                {!editMode ? (
                  <button
                    onClick={() => setEditMode(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                  >
                    <icons.Edit />
                    <span className="ml-2">Bewerken</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={updateClient}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
                    >
                      <icons.Save />
                      <span className="ml-2">Opslaan</span>
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Annuleren
                    </button>
                  </div>
                )}
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <icons.X />
                </button>
              </div>
            </div>

            {editMode ? (
              <div className="space-y-6 mb-8">
                <h4 className="text-lg font-semibold text-gray-900">Client Gegevens Bewerken</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bedrijfsnaam</label>
                    <input
                      type="text"
                      value={selectedClient.name}
                      onChange={(e) => setSelectedClient({...selectedClient, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Contactpersoon</label>
                    <input
                      type="text"
                      value={selectedClient.contactName}
                      onChange={(e) => setSelectedClient({...selectedClient, contactName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-mail</label>
                    <input
                      type="email"
                      value={selectedClient.email}
                      onChange={(e) => setSelectedClient({...selectedClient, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefoon</label>
                    <input
                      type="tel"
                      value={selectedClient.phone || ''}
                      onChange={(e) => setSelectedClient({...selectedClient, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
                    <input
                      type="text"
                      value={selectedClient.address || ''}
                      onChange={(e) => setSelectedClient({...selectedClient, address: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">KVK Nummer</label>
                    <input
                      type="text"
                      value={selectedClient.kvkNumber || ''}
                      onChange={(e) => setSelectedClient({...selectedClient, kvkNumber: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">BTW Nummer</label>
                    <input
                      type="text"
                      value={selectedClient.vatNumber || ''}
                      onChange={(e) => setSelectedClient({...selectedClient, vatNumber: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">IBAN</label>
                    <input
                      type="text"
                      value={selectedClient.bankAccount || ''}
                      onChange={(e) => setSelectedClient({...selectedClient, bankAccount: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Network Commissie (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={(selectedClient.networkCommissionRate || 0.1) * 100}
                      onChange={(e) => setSelectedClient({...selectedClient, networkCommissionRate: parseFloat(e.target.value) / 100})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Facturatie Dag</label>
                    <input
                      type="number"
                      min="1"
                      max="31"
                      value={selectedClient.billingDay || 15}
                      onChange={(e) => setSelectedClient({...selectedClient, billingDay: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">KVK</p>
                  <p className="font-semibold">{selectedClient.kvkNumber || '-'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">BTW</p>
                  <p className="font-semibold">{selectedClient.vatNumber || '-'}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Network Commissie</p>
                  <p className="font-semibold">{((selectedClient.networkCommissionRate || 0.1) * 100).toFixed(1)}%</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Facturatie Dag</p>
                  <p className="font-semibold">{selectedClient.billingDay || 15}e</p>
                </div>
              </div>
            )}

            {/* Sales Reps Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xl font-semibold text-gray-900">
                  Sales Representatives ({selectedClient.salesReps?.length || 0})
                </h4>
              </div>

              {/* Add Sales Rep Form */}
              <div className="bg-gray-50 p-6 rounded-lg mb-6">
                <h5 className="font-semibold text-gray-900 mb-4">Nieuwe Sales Rep Toevoegen</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Naam *</label>
                    <input
                      type="text"
                      value={newSalesRep.name}
                      onChange={(e) => setNewSalesRep({...newSalesRep, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
                    <input
                      type="email"
                      value={newSalesRep.email}
                      onChange={(e) => setNewSalesRep({...newSalesRep, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefoon</label>
                    <input
                      type="tel"
                      value={newSalesRep.phone}
                      onChange={(e) => setNewSalesRep({...newSalesRep, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Positie</label>
                    <input
                      type="text"
                      value={newSalesRep.position}
                      onChange={(e) => setNewSalesRep({...newSalesRep, position: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Datum</label>
                    <input
                      type="date"
                      value={newSalesRep.hireDate}
                      onChange={(e) => setNewSalesRep({...newSalesRep, hireDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Commissie (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={newSalesRep.commissionRate}
                      onChange={(e) => setNewSalesRep({...newSalesRep, commissionRate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
                
                <button
                  onClick={addSalesRep}
                  disabled={isLoading || !newSalesRep.name || !newSalesRep.email}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center"
                >
                  <icons.Plus />
                  <span className="ml-2">{isLoading ? 'Bezig...' : 'Toevoegen'}</span>
                </button>
              </div>

              {/* Sales Reps List */}
              {selectedClient.salesReps && selectedClient.salesReps.length > 0 ? (
                <div className="space-y-4">
                  {selectedClient.salesReps.map((rep) => (
                    <div key={rep._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-semibold text-sm">
                              {rep.name.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <h5 className="font-semibold text-gray-900">{rep.name}</h5>
                            <p className="text-gray-600 text-sm">{rep.email}</p>
                            <p className="text-gray-500 text-xs">{rep.position}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-right text-sm">
                            <p className="text-gray-600">Commissie: {((rep.commissionRate || 0.1) * 100).toFixed(1)}%</p>
                            <p className="text-gray-600">
                              Start: {rep.hireDate ? new Date(rep.hireDate).toLocaleDateString('nl-NL') : '-'}
                            </p>
                          </div>
                          <button
                            onClick={() => deleteSalesRep(rep._id, rep.name)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center"
                          >
                            <icons.Trash2 />
                            <span className="ml-1">Verwijder</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Nog geen sales representatives toegevoegd</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Client Dashboard - RESTORED WITH ALL TEAM MANAGEMENT FEATURES
const ClientDashboard = ({ user }) => {
  const [teamData, setTeamData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedRep, setSelectedRep] = useState(null);
  const [showRepModal, setShowRepModal] = useState(false);

  useEffect(() => {
    fetchTeamData();
  }, []);

  const fetchTeamData = async () => {
    try {
      setIsLoading(true);
      console.log('Fetching team data for user:', user);
      
      const dashboardResponse = await apiCall('/client/dashboard');
      console.log('Dashboard response:', dashboardResponse);
      
      const invoicesResponse = await apiCall('/client/invoices');
      console.log('Invoices response:', invoicesResponse);

      // Process sales reps with invoice data
      const salesRepsWithInvoices = (dashboardResponse.salesReps || []).map((rep) => {
        const currentMonth = new Date().getMonth() + 1;
        const currentYear = new Date().getFullYear();
        
        const repInvoices = invoicesResponse.filter(invoice => 
          invoice.salesRepId && invoice.salesRepId._id === rep._id
        );
        
        const currentMonthInvoice = repInvoices.find(inv => 
          inv.month === currentMonth && inv.year === currentYear
        );
        
        return {
          ...rep,
          invoices: repInvoices,
          currentMonthInvoice,
          hasSubmittedThisMonth: !!currentMonthInvoice,
          totalCommissionPaid: repInvoices
            .filter(inv => inv.status === 'paid')
            .reduce((sum, inv) => sum + (inv.amount || 0), 0),
          pendingInvoices: repInvoices.filter(inv => inv.status === 'pending').length,
          approvedInvoices: repInvoices.filter(inv => inv.status === 'approved').length
        };
      });

      console.log('Processed sales reps:', salesRepsWithInvoices);

      setTeamData({
        ...dashboardResponse,
        salesReps: salesRepsWithInvoices,
        stats: {
          totalRevenue: salesRepsWithInvoices.reduce((sum, rep) => sum + (rep.thisMonthRevenue || 0), 0),
          totalCommission: salesRepsWithInvoices.reduce((sum, rep) => sum + (rep.thisMonthCommission || 0), 0),
          submittedInvoices: salesRepsWithInvoices.filter(rep => rep.hasSubmittedThisMonth).length,
          totalTeamMembers: salesRepsWithInvoices.length
        }
      });
    } catch (err) {
      console.error('Team data fetch error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRepClick = (rep) => {
    setSelectedRep(rep);
    setShowRepModal(true);
  };

  const approveInvoice = async (invoiceId) => {
    try {
      setIsLoading(true);
      await apiCall(`/client/invoices/${invoiceId}/approve`, { method: 'PUT' });
      setSuccess('Factuur goedgekeurd!');
      await fetchTeamData();
    } catch (err) {
      console.error('Approve error:', err);
      setError(err.message || 'Kon factuur niet goedkeuren');
    } finally {
      setIsLoading(false);
    }
  };

  const requestRevision = async (invoiceId, reason) => {
    try {
      setIsLoading(true);
      await apiCall(`/client/invoices/${invoiceId}/revision`, { 
        method: 'PUT',
        body: JSON.stringify({ reason })
      });
      setSuccess('Wijziging aangevraagd!');
      await fetchTeamData();
    } catch (err) {
      console.error('Request revision error:', err);
      setError(err.message || 'Kon wijziging niet aanvragen');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <p className="text-gray-600">Team dashboard laden...</p>
        </div>
      </div>
    );
  }

  const currentDate = new Date();
  const billingDay = teamData?.client?.billingDay || 15;
  const isAfterBillingDay = currentDate.getDate() > billingDay;

  return (
    <div className="space-y-6">
      {/* Header with statistics */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">🔥 Team Dashboard</h2>
            <p className="text-gray-600">
              Beheer je recruitment team • Facturatie deadline: {billingDay}e van de maand
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm text-gray-500">
                {isAfterBillingDay ? '🔴 Na deadline' : '🟢 Voor deadline'}
              </span>
            </div>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-xl border border-green-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <icons.DollarSign />
              </div>
              <div>
                <p className="text-sm text-green-600">Deze Maand Omzet</p>
                <p className="text-xl font-bold text-green-900">
                  €{(teamData?.stats?.totalRevenue || 0).toLocaleString('nl-NL')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-xl border border-blue-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <icons.TrendingUp />
              </div>
              <div>
                <p className="text-sm text-blue-600">Deze Maand Commissie</p>
                <p className="text-xl font-bold text-blue-900">
                  €{(teamData?.stats?.totalCommission || 0).toLocaleString('nl-NL')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-xl border border-purple-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <icons.FileText />
              </div>
              <div>
                <p className="text-sm text-purple-600">Facturen Ingediend</p>
                <p className="text-xl font-bold text-purple-900">
                  {teamData?.stats?.submittedInvoices || 0}/{teamData?.stats?.totalTeamMembers || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-orange-50 p-4 rounded-xl border border-orange-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                <icons.Users />
              </div>
              <div>
                <p className="text-sm text-orange-600">Actieve Reps</p>
                <p className="text-xl font-bold text-orange-900">
                  {teamData?.salesReps?.filter(rep => rep.isConnected).length || 0}
                </p>
              </div>
            </div>
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

      {/* Team Members Grid */}
      {(!teamData || !teamData.salesReps || teamData.salesReps.length === 0) ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <icons.Users />
          <h3 className="text-lg font-semibold text-gray-900 mt-4">Nog geen team leden</h3>
          <p className="text-gray-600 mt-2">Je sales reps verschijnen hier zodra ze zijn toegevoegd door een admin</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamData.salesReps.map((rep) => {
            const getStatusInfo = () => {
              if (rep.hasSubmittedThisMonth) {
                const invoice = rep.currentMonthInvoice;
                if (invoice.status === 'paid') return { text: '💰 Betaald', color: 'green' };
                if (invoice.status === 'approved') return { text: '✅ Goedgekeurd', color: 'blue' };
                if (invoice.status === 'revision_requested') return { text: '🔄 Herzien', color: 'yellow' };
                return { text: '⏳ Te beoordelen', color: 'yellow' };
              }
              return isAfterBillingDay 
                ? { text: '🔴 Te laat', color: 'red' }
                : { text: '❌ Nog niet ingediend', color: 'gray' };
            };

            const status = getStatusInfo();
            
            return (
              <div 
                key={rep._id} 
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handleRepClick(rep)}
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-xl">
                      {rep.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900">{rep.name}</h3>
                    <p className="text-sm text-gray-600">{rep.email}</p>
                    <p className="text-xs text-gray-500">{rep.position || 'Sales Representative'}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Status Badge */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Status:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      status.color === 'green' ? 'bg-green-100 text-green-600' :
                      status.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                      status.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                      status.color === 'red' ? 'bg-red-100 text-red-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {status.text}
                    </span>
                  </div>

                  {/* Performance Stats */}
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-gray-500">Deze maand:</span>
                      <p className="font-semibold text-gray-900">
                        €{(rep.thisMonthRevenue || 0).toLocaleString('nl-NL', { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Commissie:</span>
                      <p className="font-semibold text-gray-900">
                        €{(rep.thisMonthCommission || 0).toLocaleString('nl-NL', { maximumFractionDigits: 0 })}
                      </p>
                    </div>
                    <div>
                      <span className="text-gray-500">Facturen:</span>
                      <p className="font-semibold text-gray-900">{rep.invoices.length}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Start:</span>
                      <p className="font-semibold text-gray-900">
                        {rep.hireDate ? new Date(rep.hireDate).toLocaleDateString('nl-NL', {
                          month: 'short', year: '2-digit'
                        }) : '-'}
                      </p>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  {rep.hasSubmittedThisMonth && rep.currentMonthInvoice.status === 'pending' && (
                    <div className="flex space-x-2 mt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          approveInvoice(rep.currentMonthInvoice._id);
                        }}
                        disabled={isLoading}
                        className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white text-xs px-3 py-2 rounded-lg transition-colors flex items-center justify-center"
                      >
                        <icons.CheckCircle />
                        <span className="ml-1">{isLoading ? 'Bezig...' : 'Goedkeuren'}</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const reason = prompt('Reden voor wijziging:');
                          if (reason) requestRevision(rep.currentMonthInvoice._id, reason);
                        }}
                        disabled={isLoading}
                        className="flex-1 bg-yellow-600 hover:bg-yellow-700 disabled:bg-yellow-400 text-white text-xs px-3 py-2 rounded-lg transition-colors flex items-center justify-center"
                      >
                        <icons.AlertTriangle />
                        <span className="ml-1">Wijziging</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Sales Rep Detail Modal */}
      {showRepModal && selectedRep && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{selectedRep.name}</h3>
                <p className="text-gray-600">{selectedRep.email}</p>
              </div>
              <button
                onClick={() => setShowRepModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <icons.X />
              </button>
            </div>

            {/* Rep Details */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Positie</p>
                <p className="font-semibold">{selectedRep.position}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Start Datum</p>
                <p className="font-semibold">
                  {selectedRep.hireDate ? new Date(selectedRep.hireDate).toLocaleDateString('nl-NL') : '-'}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Commissie Rate</p>
                <p className="font-semibold">{((selectedRep.commissionRate || 0.1) * 100).toFixed(1)}%</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Status</p>
                <p className="font-semibold">
                  {selectedRep.isConnected ? '🟢 Actief' : '🔴 Offline'}
                </p>
              </div>
            </div>

            {/* Invoice History */}
            <div>
              <h4 className="text-xl font-semibold text-gray-900 mb-4">
                Factuur Geschiedenis ({selectedRep.invoices.length})
              </h4>
              
              {selectedRep.invoices.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Nog geen facturen ingediend</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {selectedRep.invoices
                    .sort((a, b) => b.year - a.year || b.month - a.month)
                    .map((invoice) => (
                    <div key={invoice._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="font-semibold text-gray-900">
                            #{invoice.invoiceNumber}
                          </h5>
                          <p className="text-sm text-gray-600">
                            {new Date(0, invoice.month - 1).toLocaleDateString('nl-NL', {month: 'long'})} {invoice.year}
                          </p>
                          <p className="text-lg font-bold text-gray-900">
                            €{invoice.amount.toLocaleString('nl-NL', {minimumFractionDigits: 2})}
                          </p>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <span className={'px-3 py-1 rounded-full text-sm font-medium ' + (
                            invoice.status === 'paid' ? 'bg-green-100 text-green-600' :
                            invoice.status === 'approved' ? 'bg-blue-100 text-blue-600' :
                            invoice.status === 'revision_requested' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-gray-100 text-gray-600'
                          )}>
                            {invoice.status === 'paid' ? 'Betaald' :
                             invoice.status === 'approved' ? 'Goedgekeurd' :
                             invoice.status === 'revision_requested' ? 'Herzien' :
                             'Te beoordelen'}
                          </span>
                          
                          {invoice.status === 'pending' && (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => approveInvoice(invoice._id)}
                                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm flex items-center"
                              >
                                <icons.CheckCircle />
                                <span className="ml-1">Goedkeuren</span>
                              </button>
                              <button
                                onClick={() => {
                                  const reason = prompt('Reden voor wijziging:');
                                  if (reason) requestRevision(invoice._id, reason);
                                }}
                                className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm flex items-center"
                              >
                                <icons.AlertTriangle />
                                <span className="ml-1">Wijziging</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Sales Rep Invoices - WITH CLIENT INFO
const SalesRepInvoices = ({ user }) => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showGenerator, setShowGenerator] = useState(false);

  const [companyDetails, setCompanyDetails] = useState({
    // Sales rep company (FROM)
    companyName: '',
    contactName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Nederland',
    phone: '',
    email: '',
    kvkNumber: '',
    vatNumber: '',
    bankAccount: '',
    // Client info (TO)
    clientCompanyName: '',
    clientContactName: '',
    clientAddress: '',
    clientPhone: '',
    clientKvk: '',
    clientVat: ''
  });

  const [invoiceData, setInvoiceData] = useState({
    thisMonthRevenue: '',
    commissionExcl: '',
    vatRate: '21',
    description: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  });

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
      console.log('🔥 LOADING COMPANY DETAILS WITH CLIENT INFO');
      const response = await apiCall('/salesrep/company-details');
      console.log('🔥 API RESPONSE:', response);
      
      if (response.companyDetails) {
        console.log('🔥 SETTING COMPANY DETAILS:', response.companyDetails);
        setCompanyDetails(response.companyDetails);
      }
    } catch (err) {
      console.error('🔥 ERROR:', err);
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
      
      const commissionAmount = parseFloat(invoiceData.commissionExcl) || 0;
      const vatRate = parseFloat(invoiceData.vatRate) / 100;
      const vatAmount = commissionAmount * vatRate;
      const totalAmount = commissionAmount + vatAmount;
      
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
        description: invoiceData.description || `Commissie van ${new Date(0, invoiceData.month - 1).toLocaleDateString('nl-NL', {month: 'long'})}`,
        companyDetails
      };
      
      await apiCall('/salesrep/generate-invoice', {
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
      setShowGenerator(false);
      await fetchInvoices();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteInvoice = async (invoiceId, invoiceNumber) => {
    if (confirm('Weet je zeker dat je factuur #' + invoiceNumber + ' wilt verwijderen?')) {
      try {
        setIsLoading(true);
        await apiCall('/salesrep/invoices/' + invoiceId, { method: 'DELETE' });
        setSuccess('Factuur succesvol verwijderd');
        await fetchInvoices();
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const commissionAmount = parseFloat(invoiceData.commissionExcl) || 0;
  const vatRate = parseFloat(invoiceData.vatRate) / 100;
  const vatAmount = commissionAmount * vatRate;
  const totalAmount = commissionAmount + vatAmount;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">🔥 Mijn Facturen</h2>
            <p className="text-gray-600">Genereer professionele facturen voor je commissies</p>
          </div>
          <button
            onClick={() => setShowGenerator(!showGenerator)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors flex items-center"
          >
            <icons.Plus />
            <span className="ml-2">Nieuwe Factuur</span>
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

      {showGenerator && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">🔥 Factuur Generator</h3>
          
          {/* Your Company Details */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">Jouw Bedrijfsgegevens (VAN)</h4>
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
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
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
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Je naam"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
                <input
                  type="email"
                  value={companyDetails.email}
                  onChange={(e) => setCompanyDetails({...companyDetails, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="jouw@email.nl"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Telefoon</label>
                <input
                  type="tel"
                  value={companyDetails.phone}
                  onChange={(e) => setCompanyDetails({...companyDetails, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="+31 6 12345678"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">KVK Nummer</label>
                <input
                  type="text"
                  value={companyDetails.kvkNumber}
                  onChange={(e) => setCompanyDetails({...companyDetails, kvkNumber: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="12345678"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">BTW Nummer</label>
                <input
                  type="text"
                  value={companyDetails.vatNumber}
                  onChange={(e) => setCompanyDetails({...companyDetails, vatNumber: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="NL123456789B01"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Bankrekeningnummer (IBAN) *</label>
                <input
                  type="text"
                  value={companyDetails.bankAccount}
                  onChange={(e) => setCompanyDetails({...companyDetails, bankAccount: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="NL91 ABNA 0417 1643 00"
                  required
                />
              </div>
            </div>
          </div>

          {/* Client Information Section - NAAR WIE JE FACTUREERT */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">🔥 Factuur Naar (Client Gegevens)</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-blue-50 rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Bedrijf</label>
                <input
                  type="text"
                  value={companyDetails.clientCompanyName || 'GEEN CLIENT DATA GEVONDEN'}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Contact</label>
                <input
                  type="text"
                  value={companyDetails.clientContactName || 'GEEN CLIENT DATA'}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100"
                  readOnly
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Client Adres</label>
                <input
                  type="text"
                  value={companyDetails.clientAddress || 'GEEN CLIENT ADRES'}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100"
                  readOnly
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Factuur Gegevens</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Omzet deze maand (ter info) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={invoiceData.thisMonthRevenue}
                    onChange={(e) => setInvoiceData({...invoiceData, thisMonthRevenue: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="25000.00"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mijn commissie excl. BTW *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={invoiceData.commissionExcl}
                    onChange={(e) => setInvoiceData({...invoiceData, commissionExcl: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="2500.00"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">BTW Tarief</label>
                  <select
                    value={invoiceData.vatRate}
                    onChange={(e) => setInvoiceData({...invoiceData, vatRate: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
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
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
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
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl">
                <h5 className="font-semibold text-gray-900 mb-4">🔥 Live Preview</h5>
                
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Commissie excl. BTW:</span>
                    <span className="font-medium">€{commissionAmount.toLocaleString('nl-NL', {minimumFractionDigits: 2})}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">BTW {invoiceData.vatRate}%:</span>
                    <span className="font-medium">€{vatAmount.toLocaleString('nl-NL', {minimumFractionDigits: 2})}</span>
                  </div>
                  
                  <div className="border-t border-gray-300 pt-2">
                    <div className="flex justify-between font-bold">
                      <span>Totaal:</span>
                      <span>€{totalAmount.toLocaleString('nl-NL', {minimumFractionDigits: 2})}</span>
                    </div>
                  </div>
                </div>

                {companyDetails.bankAccount && (
                  <div className="mt-4 pt-4 border-t border-gray-300">
                    <p className="text-xs text-gray-600">Betaling op rekening:</p>
                    <p className="text-xs font-mono">{companyDetails.bankAccount}</p>
                  </div>
                )}

                {companyDetails.clientCompanyName && (
                  <div className="mt-4 pt-4 border-t border-gray-300">
                    <p className="text-xs text-gray-600 font-semibold">🔥 Factuur naar:</p>
                    <p className="text-xs font-semibold">{companyDetails.clientCompanyName}</p>
                    <p className="text-xs">{companyDetails.clientContactName}</p>
                    <p className="text-xs">{companyDetails.clientAddress}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={generateInvoice}
                disabled={isLoading || !invoiceData.thisMonthRevenue || !invoiceData.commissionExcl || !companyDetails.companyName || !companyDetails.email || !companyDetails.bankAccount}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Genereren...' : 'Factuur Genereren'}
              </button>
              
              <button
                onClick={() => setShowGenerator(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Annuleren
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Mijn Facturen ({invoices.length})</h3>
        
        {invoices.length === 0 ? (
          <div className="text-center py-8">
            <h4 className="text-lg font-medium text-gray-900 mt-4">Nog geen facturen</h4>
            <p className="text-gray-600 mt-2">Genereer je eerste factuur om te beginnen</p>
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
                  <span className={'px-3 py-1 rounded-full text-sm font-medium ' + (
                    invoice.status === 'paid' 
                      ? 'bg-green-100 text-green-600' 
                      : invoice.status === 'approved'
                      ? 'bg-blue-100 text-blue-600'
                      : invoice.status === 'revision_requested'
                      ? 'bg-yellow-100 text-yellow-600'
                      : 'bg-gray-100 text-gray-600'
                  )}>
                    {invoice.status === 'paid' ? 'Betaald' : 
                     invoice.status === 'approved' ? 'Goedgekeurd' :
                     invoice.status === 'revision_requested' ? 'Herzien' :
                     'Te beoordelen'}
                  </span>
                  
                  {invoice.status !== 'paid' && invoice.status !== 'approved' && (
                    <button
                      onClick={() => deleteInvoice(invoice._id, invoice.invoiceNumber)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors text-sm"
                    >
                      Verwijder
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Admin Network Commissions - COMPLETE WITH ALL FUNCTIONALITY
const AdminNetworkCommissions = () => {
  const [commissions, setCommissions] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  console.log('🔥 AdminNetworkCommissions COMPONENT LOADED');

  useEffect(() => {
    fetchClients();
    fetchCommissions();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await apiCall('/admin/clients');
      setClients(response);
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchCommissions = async () => {
    try {
      const response = await apiCall('/admin/network-commissions');
      setCommissions(response);
    } catch (err) {
      setError(err.message);
    }
  };

  const generateNetworkInvoice = async () => {
    if (!selectedClient) {
      setError('Selecteer een client');
      return;
    }

    try {
      setIsLoading(true);
      const response = await apiCall('/admin/generate-network-invoice', {
        method: 'POST',
        body: JSON.stringify({
          clientId: selectedClient,
          month: selectedMonth,
          year: selectedYear
        })
      });
      
      setSuccess(`Network factuur gegenereerd: €${response.networkAmount.toFixed(2)}`);
      await fetchCommissions();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">🔥 Network Commissie Facturen</h2>
        <p className="text-gray-600">Genereer facturen voor Recruiters Network commissies</p>
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

      {/* Network Invoice Generator */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Nieuwe Network Factuur Genereren</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
            <select
              value={selectedClient || ''}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="">Selecteer client...</option>
              {clients.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.name} ({((client.networkCommissionRate || 0.1) * 100).toFixed(1)}%)
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Maand</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
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
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div className="flex items-end">
            <button
              onClick={generateNetworkInvoice}
              disabled={isLoading || !selectedClient}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              <icons.Plus />
              <span className="ml-2">{isLoading ? 'Genereren...' : 'Network Factuur Genereren'}</span>
            </button>
          </div>
        </div>
        
        <div className="text-sm text-gray-600">
          <p><strong>Uitleg:</strong> Network facturen worden berekend over goedgekeurde sales rep commissies.</p>
          <p>Voorbeeld: Sales rep factureert €2.500 commissie excl. BTW → bij 10% network commissie = €250 voor Recruiters Network</p>
        </div>
      </div>

      {/* Generated Network Invoices */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">
          Gegenereerde Network Facturen ({commissions.length})
        </h3>
        
        {commissions.length === 0 ? (
          <div className="text-center py-8">
            <h4 className="text-lg font-medium text-gray-900 mt-4">Nog geen network facturen</h4>
            <p className="text-gray-600 mt-2">Genereer je eerste network factuur om te beginnen</p>
          </div>
        ) : (
          <div className="space-y-4">
            {commissions.map((commission) => (
              <div key={commission._id} className="border border-gray-200 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <icons.FileText />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Factuur #{commission.invoiceNumber}
                      </h4>
                      <p className="text-gray-600">
                        {commission.clientName} • {commission.monthName} {commission.year}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                        <span>Sales Rep Commissie: €{commission.totalSalesRepCommission.toLocaleString('nl-NL', {minimumFractionDigits: 2})}</span>
                        <span>Network Rate: {commission.networkRate * 100}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        €{commission.networkAmount.toLocaleString('nl-NL', {minimumFractionDigits: 2})}
                      </p>
                      <p className="text-sm text-gray-500">excl. BTW</p>
                    </div>
                    
                    <span className={'px-3 py-1 rounded-full text-sm font-medium ' + (
                      commission.status === 'paid' ? 'bg-green-100 text-green-600' :
                      commission.status === 'sent' ? 'bg-blue-100 text-blue-600' :
                      'bg-gray-100 text-gray-600'
                    )}>
                      {commission.status === 'paid' ? 'Betaald' :
                       commission.status === 'sent' ? 'Verstuurd' :
                       'Concept'}
                    </span>
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

// FIXED SIDEBAR - NO MORE LOGOUT ISSUES
const FixedSidebar = ({ user, currentPage, setCurrentPage, onLogout }) => {
  console.log('🔥 RENDERING FIXED SIDEBAR');
  
  const menuItems = user && user.role === 'admin' ? [
    { id: 'admin-dashboard', label: 'Admin Dashboard', icon: icons.Home },
    { id: 'clients', label: 'Klanten Beheer', icon: icons.Users },
    { id: 'network-commissions', label: '🔥 Network Facturen', icon: icons.CreditCard },
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
      {/* Header - Fixed */}
      <div className="p-6 border-b border-gray-100" style={{flexShrink: 0}}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
            <div className="text-white"><icons.Building2 /></div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Recruiters Network</h1>
            <p className="text-xs text-gray-500">
              {user?.role === 'admin' ? '🔥 Admin Panel' : user?.role === 'salesrep' ? 'Sales Portal' : 'Klantportaal'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation - Flexible */}
      <nav className="px-4 py-6 space-y-2" style={{flex: 1, overflowY: 'auto'}}>
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                console.log('🔥 MENU CLICKED:', item.id);
                setCurrentPage(item.id);
              }}
              className={'w-full flex items-center px-4 py-3 rounded-xl text-left transition-all duration-200 ' + (
                isActive 
                  ? 'bg-green-50 text-green-600 shadow-sm border border-green-100' 
                  : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
              )}
            >
              <div className={'flex-shrink-0 ' + (isActive ? 'text-green-600' : 'text-gray-400')}>
                <IconComponent />
              </div>
              <span className="ml-3 font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Section - Fixed at Bottom */}
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
        
        <div 
          style={{
            width: '100%',
            maxWidth: '240px'
          }}
        >
          <button 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('🔥 LOGOUT CLICKED - ONLY IN SIDEBAR');
              onLogout();
            }}
            className="w-full flex items-center px-4 py-3 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
            style={{
              maxWidth: '240px'
            }}
          >
            <icons.LogOut />
            <span className="ml-3 font-medium">🔥 Uitloggen</span>
          </button>
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

// Main App Component
const App = () => {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);

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
    console.log('🔥 LOGGING OUT');
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
              {currentPage === 'salesrep-overview' && <AdminSalesRepOverview />}
              {currentPage === 'network-commissions' && <AdminNetworkCommissions />}
              {currentPage === 'admin-settings' && <SimpleDashboard title="🔥 Admin Instellingen" />}
            </div>
          )}

          {user.role === 'salesrep' && (
            <div>
              {currentPage === 'salesrep-dashboard' && <SimpleDashboard title="🔥 Sales Rep Dashboard" />}
              {currentPage === 'salesrep-invoices' && <SalesRepInvoices user={user} />}
              {currentPage === 'salesrep-reports' && <SimpleDashboard title="🔥 Sales Rep Reports" />}
              {currentPage === 'salesrep-settings' && <SimpleDashboard title="🔥 Sales Rep Settings" />}
            </div>
          )}

          {user.role === 'client' && (
            <div>
              {currentPage === 'dashboard' && <ClientDashboard user={user} />}
              {currentPage === 'invoices' && <SimpleDashboard title="🔥 Client Invoices" />}
              {currentPage === 'reports' && <SimpleDashboard title="🔥 Client Reports" />}
              {currentPage === 'settings' && <SimpleDashboard title="🔥 Client Settings" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
