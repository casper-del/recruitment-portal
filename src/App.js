import React, { useState, useEffect } from 'react';

console.log('APP.JS LOADED - WORKING VERSION');

// Icon components
const icons = {
  Building2: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>
    </svg>
  ),
  Home: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9l9-7 9v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
    </svg>
  ),
  CreditCard: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect width="20" height="14" x="2" y="5" rx="2"/>
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
    </svg>
  ),
  FileText: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
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
    </svg>
  ),
  Eye: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  Printer: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="6,9 6,2 18,2 18,9"/>
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
    </svg>
  ),
  Calendar: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
      <line x1="16" x2="16" y1="2" y2="6"/>
      <line x1="8" x2="8" y1="2" y2="6"/>
      <line x1="3" x2="21" y1="10" y2="10"/>
    </svg>
  ),
  CheckCircle: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22,4 12,14.01 9,11.01"/>
    </svg>
  ),
  Clock: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <polyline points="12,6 12,12 16,14"/>
    </svg>
  ),
  AlertTriangle: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
      <line x1="12" x2="12" y1="9" y2="13"/>
      <line x1="12" x2="12.01" y1="17" y2="17"/>
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

// Admin Dashboard - WITH ADD CLIENT FUNCTIONALITY
const AdminDashboard = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddClient, setShowAddClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [newClient, setNewClient] = useState({
    name: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    kvkNumber: '',
    vatNumber: '',
    bankAccount: '',
    networkCommissionRate: 0.10,
    billingDay: 15
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
        body: JSON.stringify(newClient)
      });
      setSuccess(`Client toegevoegd! Login: ${newClient.email} / ${response.tempPassword}`);
      setNewClient({
        name: '',
        contactName: '',
        email: '',
        phone: '',
        address: '',
        kvkNumber: '',
        vatNumber: '',
        bankAccount: '',
        networkCommissionRate: 0.10,
        billingDay: 15
      });
      setShowAddClient(false);
      await fetchClients();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClientClick = (client) => {
    console.log('CLICKING CLIENT:', client.name);
    setSelectedClient(client);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedClient(null);
  };

  if (isLoading && clients.length === 0) {
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
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h2>
            <p className="text-gray-600">Beheer klanten en teams</p>
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

      {showAddClient && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Nieuwe Klant Toevoegen</h3>
          
          <div className="space-y-6">
            {/* Basis Informatie */}
            <div className="p-6 bg-gray-50 rounded-lg">
              <h5 className="font-semibold mb-4">Basis Informatie</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bedrijfsnaam *</label>
                  <input
                    type="text"
                    value={newClient.name}
                    onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                    placeholder="Acme Corporation"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contactpersoon *</label>
                  <input
                    type="text"
                    value={newClient.contactName}
                    onChange={(e) => setNewClient({...newClient, contactName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">E-mail *</label>
                  <input
                    type="email"
                    value={newClient.email}
                    onChange={(e) => setNewClient({...newClient, email: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                    placeholder="contact@acme.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefoon</label>
                  <input
                    type="tel"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                    placeholder="+31 20 123 4567"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
                  <input
                    type="text"
                    value={newClient.address}
                    onChange={(e) => setNewClient({...newClient, address: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                    placeholder="Damrak 70, 1012 LM Amsterdam"
                  />
                </div>
              </div>
            </div>

            {/* Bedrijfsregistratie */}
            <div className="p-6 bg-blue-50 rounded-lg">
              <h5 className="font-semibold mb-4">Bedrijfsregistratie</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">KVK Nummer</label>
                  <input
                    type="text"
                    value={newClient.kvkNumber}
                    onChange={(e) => setNewClient({...newClient, kvkNumber: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                    placeholder="12345678"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">BTW Nummer</label>
                  <input
                    type="text"
                    value={newClient.vatNumber}
                    onChange={(e) => setNewClient({...newClient, vatNumber: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                    placeholder="NL123456789B01"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">IBAN Bankrekeningnummer</label>
                  <input
                    type="text"
                    value={newClient.bankAccount}
                    onChange={(e) => setNewClient({...newClient, bankAccount: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                    placeholder="NL91 ABNA 0417 1643 00"
                  />
                </div>
              </div>
            </div>

            {/* Network Commissie */}
            <div className="p-6 bg-green-50 rounded-lg">
              <h5 className="font-semibold mb-4">Network Commissie & Facturatie</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Network Commissie %</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="1"
                    value={newClient.networkCommissionRate}
                    onChange={(e) => setNewClient({...newClient, networkCommissionRate: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                    placeholder="0.10"
                  />
                  <p className="text-xs text-gray-500 mt-1">Percentage van sales rep commissie (bijv. 0.10 = 10%)</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Facturatie Dag van de Maand</label>
                  <select
                    value={newClient.billingDay}
                    onChange={(e) => setNewClient({...newClient, billingDay: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                  >
                    {Array.from({length: 28}, (_, i) => (
                      <option key={i+1} value={i+1}>{i+1}e van de maand</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">Dag waarop facturen verwacht worden</p>
                </div>
              </div>

              <div className="mt-4 p-4 bg-white border border-green-200 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Voorbeeld berekening:</strong> Als een sales rep €2.500 commissie excl. BTW factureert 
                  en de network commissie is 10%, dan kan Recruiters Network €250 excl. BTW factureren.
                </p>
              </div>
            </div>
          </div>

          <div className="flex space-x-4 mt-6">
            <button
              onClick={addClient}
              disabled={isLoading || !newClient.name || !newClient.contactName || !newClient.email}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Toevoegen...' : 'Klant Toevoegen'}
            </button>
            
            <button
              onClick={() => setShowAddClient(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Annuleren
            </button>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Klanten ({clients.length})</h3>
        
        {clients.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Nog geen klanten toegevoegd</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client) => (
              <div key={client._id} className="border border-gray-200 rounded-xl p-6">
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
                    <span className="text-gray-600">Network Commissie:</span>
                    <span className="text-gray-900">{((client.networkCommissionRate || 0.10) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Facturatie dag:</span>
                    <span className="text-gray-900">{client.billingDay || 15}e</span>
                  </div>
                  {client.kvkNumber && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">KVK:</span>
                      <span className="text-gray-900">{client.kvkNumber}</span>
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => handleClientClick(client)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                >
                  Beheren
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && selectedClient && (
        <ClientManagementModal 
          client={selectedClient} 
          onClose={closeModal}
          onRefresh={fetchClients}
        />
      )}
    </div>
  );
};

// Working Client Management Modal - WITH ALL REQUIRED FIELDS
const ClientManagementModal = ({ client, onClose, onRefresh }) => {
  const [clientDetails, setClientDetails] = useState(null);
  const [salesReps, setSalesReps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showAddRep, setShowAddRep] = useState(false);
  const [editingClient, setEditingClient] = useState(false);

  const [newRep, setNewRep] = useState({
    name: '',
    email: '',
    phone: '',
    position: 'Sales Representative',
    hireDate: new Date().toISOString().split('T')[0],
    commissionRate: 0.10
  });

  const [editData, setEditData] = useState({
    name: '',
    contactName: '',
    email: '',
    phone: '',
    address: '',
    kvkNumber: '',
    vatNumber: '',
    bankAccount: '',
    networkCommissionRate: 0.10,
    billingDay: 15,
    commissionRate: 0.10,
    commissionCap: 50000
  });

  useEffect(() => {
    if (client) {
      fetchClientDetails();
    }
  }, [client]);

  const fetchClientDetails = async () => {
    try {
      setIsLoading(true);
      const response = await apiCall('/admin/clients/' + client._id);
      setClientDetails(response.client);
      setSalesReps(response.salesReps || []);
      
      // Set edit data with ALL fields including new ones
      setEditData({
        name: response.client.name || '',
        contactName: response.client.contactName || '',
        email: response.client.email || '',
        phone: response.client.phone || '',
        address: response.client.address || '',
        kvkNumber: response.client.kvkNumber || '',
        vatNumber: response.client.vatNumber || '',
        bankAccount: response.client.bankAccount || '',
        networkCommissionRate: response.client.networkCommissionRate || 0.10,
        billingDay: response.client.billingDay || 15,
        commissionRate: response.client.commissionRate || 0.10,
        commissionCap: response.client.commissionCap || 50000
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateClient = async () => {
    try {
      setIsLoading(true);
      await apiCall('/admin/clients/' + client._id, {
        method: 'PUT',
        body: JSON.stringify(editData)
      });
      setSuccess('Client succesvol bijgewerkt!');
      setEditingClient(false);
      await fetchClientDetails();
      if (onRefresh) onRefresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addSalesRep = async () => {
    try {
      setIsLoading(true);
      const response = await apiCall('/admin/clients/' + client._id + '/salesreps', {
        method: 'POST',
        body: JSON.stringify(newRep)
      });
      setSuccess('Sales rep toegevoegd! Login: ' + newRep.email + ' / ' + response.tempPassword);
      setNewRep({
        name: '',
        email: '',
        phone: '',
        position: 'Sales Representative',
        hireDate: new Date().toISOString().split('T')[0],
        commissionRate: 0.10
      });
      setShowAddRep(false);
      await fetchClientDetails();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSalesRep = async (repId, repName) => {
    if (confirm('Weet je zeker dat je ' + repName + ' wilt verwijderen?')) {
      try {
        setIsLoading(true);
        await apiCall('/admin/salesreps/' + repId, { method: 'DELETE' });
        setSuccess('Sales rep succesvol verwijderd');
        await fetchClientDetails();
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl p-8 max-w-6xl w-full max-h-[90vh] overflow-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            {client.name} - Beheer
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg"
          >
            <icons.X />
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
            <p className="text-red-700 text-sm">{error}</p>
            <button onClick={() => setError('')} className="text-red-600 text-xs mt-1">Sluiten</button>
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
            <p className="text-green-700 text-sm">{success}</p>
            <button onClick={() => setSuccess('')} className="text-green-600 text-xs mt-1">Sluiten</button>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-8">
            <p>Laden...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Client Info */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold">Client Gegevens</h4>
                <button
                  onClick={() => setEditingClient(!editingClient)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingClient ? 'Annuleren' : 'Bewerken'}
                </button>
              </div>

              {editingClient ? (
                <div className="space-y-6">
                  <div className="p-6 bg-gray-50 rounded-lg">
                    <h5 className="font-semibold mb-4">Basis Informatie</h5>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Bedrijfsnaam</label>
                        <input
                          type="text"
                          value={editData.name}
                          onChange={(e) => setEditData({...editData, name: e.target.value})}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Contactpersoon</label>
                        <input
                          type="text"
                          value={editData.contactName}
                          onChange={(e) => setEditData({...editData, contactName: e.target.value})}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">E-mail</label>
                        <input
                          type="email"
                          value={editData.email}
                          onChange={(e) => setEditData({...editData, email: e.target.value})}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Telefoon</label>
                        <input
                          type="tel"
                          value={editData.phone}
                          onChange={(e) => setEditData({...editData, phone: e.target.value})}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium mb-1">Adres</label>
                        <input
                          type="text"
                          value={editData.address}
                          onChange={(e) => setEditData({...editData, address: e.target.value})}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-blue-50 rounded-lg">
                    <h5 className="font-semibold mb-4">Bedrijfsregistratie</h5>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">KVK Nummer</label>
                        <input
                          type="text"
                          value={editData.kvkNumber}
                          onChange={(e) => setEditData({...editData, kvkNumber: e.target.value})}
                          className="w-full px-3 py-2 border rounded-lg"
                          placeholder="12345678"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">BTW Nummer</label>
                        <input
                          type="text"
                          value={editData.vatNumber}
                          onChange={(e) => setEditData({...editData, vatNumber: e.target.value})}
                          className="w-full px-3 py-2 border rounded-lg"
                          placeholder="NL123456789B01"
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-sm font-medium mb-1">IBAN Bankrekeningnummer</label>
                        <input
                          type="text"
                          value={editData.bankAccount}
                          onChange={(e) => setEditData({...editData, bankAccount: e.target.value})}
                          className="w-full px-3 py-2 border rounded-lg"
                          placeholder="NL91 ABNA 0417 1643 00"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-green-50 rounded-lg">
                    <h5 className="font-semibold mb-4">Network Commissie & Facturatie</h5>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Network Commissie %</label>
                        <input
                          type="number"
                          step="0.01"
                          min="0"
                          max="1"
                          value={editData.networkCommissionRate}
                          onChange={(e) => setEditData({...editData, networkCommissionRate: parseFloat(e.target.value) || 0})}
                          className="w-full px-3 py-2 border rounded-lg"
                        />
                        <p className="text-xs text-gray-500 mt-1">Wat Recruiters Network krijgt van sales rep commissie</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Facturatie Dag</label>
                        <select
                          value={editData.billingDay}
                          onChange={(e) => setEditData({...editData, billingDay: parseInt(e.target.value)})}
                          className="w-full px-3 py-2 border rounded-lg"
                        >
                          {Array.from({length: 28}, (_, i) => (
                            <option key={i+1} value={i+1}>{i+1}e van de maand</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={updateClient}
                      className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 mr-4"
                    >
                      Opslaan
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div><span className="text-gray-600">Bedrijf: </span>{clientDetails?.name}</div>
                    <div><span className="text-gray-600">Contact: </span>{clientDetails?.contactName}</div>
                    <div><span className="text-gray-600">E-mail: </span>{clientDetails?.email}</div>
                    <div><span className="text-gray-600">Telefoon: </span>{clientDetails?.phone || '-'}</div>
                    <div><span className="text-gray-600">KVK: </span>{clientDetails?.kvkNumber || '-'}</div>
                    <div><span className="text-gray-600">BTW: </span>{clientDetails?.vatNumber || '-'}</div>
                    <div><span className="text-gray-600">IBAN: </span>{clientDetails?.bankAccount || '-'}</div>
                    <div><span className="text-gray-600">Network Commissie: </span>{((clientDetails?.networkCommissionRate || 0.10) * 100).toFixed(1)}%</div>
                    <div><span className="text-gray-600">Facturatie dag: </span>{clientDetails?.billingDay || 15}e</div>
                    <div className="col-span-2"><span className="text-gray-600">Adres: </span>{clientDetails?.address || '-'}</div>
                  </div>
                </div>
              )}
            </div>

            {/* Sales Reps Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold">Sales Reps ({salesReps.length})</h4>
                <button
                  onClick={() => setShowAddRep(!showAddRep)}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
                >
                  <icons.Plus />
                  <span className="ml-2">Toevoegen</span>
                </button>
              </div>

              {showAddRep && (
                <div className="p-4 bg-gray-50 rounded-lg mb-4">
                  <h5 className="font-semibold mb-3">Nieuwe Sales Rep</h5>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-1">Naam *</label>
                      <input
                        type="text"
                        value={newRep.name}
                        onChange={(e) => setNewRep({...newRep, name: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">E-mail *</label>
                      <input
                        type="email"
                        value={newRep.email}
                        onChange={(e) => setNewRep({...newRep, email: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="john@company.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Telefoon</label>
                      <input
                        type="tel"
                        value={newRep.phone}
                        onChange={(e) => setNewRep({...newRep, phone: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg"
                        placeholder="+31 6 12345678"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Start Datum</label>
                      <input
                        type="date"
                        value={newRep.hireDate}
                        onChange={(e) => setNewRep({...newRep, hireDate: e.target.value})}
                        className="w-full px-3 py-2 border rounded-lg"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <button
                      onClick={addSalesRep}
                      disabled={!newRep.name || !newRep.email}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 mr-2"
                    >
                      Toevoegen
                    </button>
                    <button
                      onClick={() => setShowAddRep(false)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                      Annuleren
                    </button>
                  </div>
                </div>
              )}

              {salesReps.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <p className="text-gray-500">Nog geen sales reps toegevoegd</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {salesReps.map((rep) => (
                    <div key={rep._id} className="flex justify-between items-center p-4 border rounded-lg">
                      <div>
                        <p className="font-semibold">{rep.name}</p>
                        <p className="text-sm text-gray-600">{rep.email} • {rep.position}</p>
                        <p className="text-xs text-gray-500">
                          Start: {rep.hireDate ? new Date(rep.hireDate).toLocaleDateString('nl-NL') : 'Onbekend'}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteSalesRep(rep._id, rep.name)}
                        className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                      >
                        Verwijderen
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Sales Rep Invoices Component with Generator - FIXED VERSION
const SalesRepInvoices = ({ user }) => {
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showGenerator, setShowGenerator] = useState(false);

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
    vatNumber: '',
    bankAccount: ''
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
      const response = await apiCall('/salesrep/company-details');
      if (response.companyDetails) {
        setCompanyDetails(response.companyDetails);
      } else if (user && user.salesRep) {
        setCompanyDetails(prev => ({
          ...prev,
          contactName: user.name,
          email: user.email,
          phone: user.salesRep.phone || ''
        }));
      }
    } catch (err) {
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

  const downloadInvoice = async (invoiceId, fileName) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(API_BASE + '/salesrep/invoices/' + invoiceId + '/download', {
        headers: { Authorization: 'Bearer ' + token }
      });

      if (!response.ok) throw new Error('Download failed');

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
      setError('Download mislukt');
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Mijn Facturen</h2>
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
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Factuur Generator</h3>
          
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
                  <p className="text-xs text-gray-500 mt-1">Wordt niet gefactureerd, maar helpt bij tracking</p>
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
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder={`Commissie van ${new Date(0, invoiceData.month - 1).toLocaleDateString('nl-NL', {month: 'long'})}`}
                  />
                </div>
              </div>

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
                </div>

                {companyDetails.bankAccount && (
                  <div className="mt-4 pt-4 border-t border-gray-300">
                    <p className="text-xs text-gray-600">Betaling op rekening:</p>
                    <p className="text-xs font-mono">{companyDetails.bankAccount}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                onClick={generateInvoice}
                disabled={isLoading || !invoiceData.thisMonthRevenue || !invoiceData.commissionExcl || !companyDetails.companyName || !companyDetails.email || !companyDetails.bankAccount}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <icons.Printer />
                <span className="ml-2">{isLoading ? 'Genereren...' : 'Factuur Genereren'}</span>
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
            <icons.FileText />
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
                    <icons.FileText />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Factuur #{invoice.invoiceNumber}</h4>
                    <p className="text-gray-600">
                      €{invoice.amount.toLocaleString('nl-NL', {minimumFractionDigits: 2})}
                    </p>
                    <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                      <span>
                        {new Date(0, invoice.month - 1).toLocaleDateString('nl-NL', {month: 'long'})} {invoice.year}
                      </span>
                      {invoice.description && <span>• {invoice.description}</span>}
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
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors flex items-center text-sm"
                  >
                    <icons.Download />
                    <span className="ml-1">Download</span>
                  </button>

                  {invoice.status !== 'paid' && (
                    <button
                      onClick={() => deleteInvoice(invoice._id, invoice.invoiceNumber)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg transition-colors flex items-center text-sm"
                    >
                      <icons.X />
                      <span className="ml-1">Verwijder</span>
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

// Improved Client Dashboard - TEAM MANAGEMENT FOCUS
const ClientDashboard = ({ user }) => {
  const [teamData, setTeamData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
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
      await apiCall(`/client/invoices/${invoiceId}/approve`, { method: 'PUT' });
      await fetchTeamData();
    } catch (err) {
      setError(err.message);
    }
  };

  const requestRevision = async (invoiceId, reason) => {
    try {
      await apiCall(`/client/invoices/${invoiceId}/revision`, { 
        method: 'PUT',
        body: JSON.stringify({ reason })
      });
      await fetchTeamData();
    } catch (err) {
      setError(err.message);
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Team Management</h2>
            <p className="text-gray-600">
              Beheer je recruitment team • Facturatie deadline: {billingDay}e van de maand
            </p>
          </div>
          <div className="text-right">
            <div className="flex items-center space-x-2 mb-2">
              <icons.Calendar />
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
          <p className="text-red-700 text-sm">{error}</p>
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
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-2 rounded-lg transition-colors flex items-center justify-center"
                      >
                        <icons.CheckCircle />
                        <span className="ml-1">Goedkeuren</span>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const reason = prompt('Reden voor wijziging:');
                          if (reason) requestRevision(rep.currentMonthInvoice._id, reason);
                        }}
                        className="flex-1 bg-yellow-600 hover:bg-yellow-700 text-white text-xs px-3 py-2 rounded-lg transition-colors flex items-center justify-center"
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

// Simple Dashboard Components
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
          Welkom terug, {user && user.name}!
        </h2>
        <p className="text-gray-600">
          {dashboardData && dashboardData.salesRep && dashboardData.salesRep.position} bij {dashboardData && dashboardData.salesRep && dashboardData.salesRep.clientId && dashboardData.salesRep.clientId.name}
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
                €{((dashboardData && dashboardData.currentRevenue && dashboardData.currentRevenue.revenue) || 0).toLocaleString('nl-NL')}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <icons.DollarSign />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Deze Maand Commissie</p>
              <p className="text-3xl font-bold text-gray-900">
                €{((dashboardData && dashboardData.currentRevenue && dashboardData.currentRevenue.commission) || 0).toLocaleString('nl-NL')}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <icons.TrendingUp />
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
              <icons.FileText />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Placeholder Component
const PlaceholderPage = ({ title, description }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

// Sidebar Component
const Sidebar = ({ user, currentPage, setCurrentPage, onLogout }) => {
  const menuItems = user && user.role === 'admin' ? [
    { id: 'admin-dashboard', label: 'Admin Dashboard', icon: icons.Home },
    { id: 'clients', label: 'Klanten Beheer', icon: icons.Users },
    { id: 'admin-settings', label: 'Instellingen', icon: icons.Settings }
  ] : user && user.role === 'salesrep' ? [
    { id: 'salesrep-dashboard', label: 'Mijn Dashboard', icon: icons.Home },
    { id: 'salesrep-invoices', label: 'Mijn Facturen', icon: icons.CreditCard },
    { id: 'salesrep-reports', label: 'Mijn Prestaties', icon: icons.Users },
    { id: 'salesrep-settings', label: 'Instellingen', icon: icons.Settings }
  ] : [
    { id: 'dashboard', label: 'Team Dashboard', icon: icons.Home },
    { id: 'invoices', label: 'Betalingen & Facturen', icon: icons.CreditCard },
    { id: 'team', label: 'Team Management', icon: icons.Users },
    { id: 'reports', label: 'Rapportages', icon: icons.Users },
    { id: 'settings', label: 'Instellingen', icon: icons.Settings }
  ];

  return (
    <div className="bg-white shadow-xl w-72 border-r border-gray-200">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
            <div className="text-white"><icons.Building2 /></div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Recruiters Network</h1>
            <p className="text-xs text-gray-500">
              {user?.role === 'admin' ? 'Admin Panel' : user?.role === 'salesrep' ? 'Sales Portal' : 'Klantportaal'}
            </p>
          </div>
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
              <span className="ml-3 font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
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
        onLogout={logout}
      />

      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto px-8 py-8">
          {user.role === 'admin' && (
            <div>
              {currentPage === 'admin-dashboard' && <AdminDashboard />}
              {currentPage === 'clients' && <PlaceholderPage title="Klanten Beheer" description="Beheer alle klanten" />}
              {currentPage === 'admin-settings' && <PlaceholderPage title="Admin Instellingen" description="Systeemconfiguratie" />}
            </div>
          )}

          {user.role === 'salesrep' && (
            <div>
              {currentPage === 'salesrep-dashboard' && <SalesRepDashboard user={user} />}
              {currentPage === 'salesrep-invoices' && <SalesRepInvoices user={user} />}
              {currentPage === 'salesrep-reports' && <PlaceholderPage title="Mijn Prestaties" description="Performance metrics" />}
              {currentPage === 'salesrep-settings' && <PlaceholderPage title="Mijn Instellingen" description="Account beheer" />}
            </div>
          )}

          {user.role === 'client' && (
            <div>
              {currentPage === 'dashboard' && <ClientDashboard user={user} />}
              {currentPage === 'invoices' && <PlaceholderPage title="Betalingen & Facturen" description="Overzicht van facturen" />}
              {currentPage === 'team' && <ClientDashboard user={user} />}
              {currentPage === 'reports' && <PlaceholderPage title="Rapportages" description="Analytics en rapportages" />}
              {currentPage === 'settings' && <PlaceholderPage title="Instellingen" description="CRM koppelingen" />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
