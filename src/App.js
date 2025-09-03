};

// Client Team Dashboard - WITH PDF DOWNLOADS + INVOICE APPROVAL
const ClientTeamDashboard = ({ user }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedRep, setSelectedRep] = useState(null);
  const [showRepModal, setShowRepModal] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    fetchDashboardData();
    fetchInvoices();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await apiCall('/client/dashboard');
      setDashboardData(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchInvoices = async () => {
    try {
      const response = await apiCall('/client/invoices');
      setInvoices(response);
    } catch (err) {
      console.error('Error fetching invoices:', err);
    }
  };

  const approveInvoice = async (invoiceId) => {
    try {
      setActionLoading(true);
      await apiCall(`/client/invoices/${invoiceId}/approve`, { method: 'PUT' });
      setSuccess('Factuur goedgekeurd!');
      await fetchInvoices();
      await fetchDashboardData();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const requestRevision = async (invoiceId, reason) => {
    try {
      setActionLoading(true);
      await apiCall(`/client/invoices/${invoiceId}/revision`, {
        method: 'PUT',
        body: JSON.stringify({ reason })
      });
      setSuccess('Wijziging aangevraagd');
      await fetchInvoices();
      await fetchDashboardData();
    } catch (err) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const downloadInvoicePDF = async (invoice) => {
    try {
      console.log('🔥 CLIENT DOWNLOADING INVOICE PDF:', invoice);
      
      const clientDetails = dashboardData?.client || {};
      const companyDetails = invoice.invoiceData?.companyDetails || {};

      await generateInvoicePDF(invoice, companyDetails, clientDetails);
      setSuccess('PDF wordt gedownload...');
    } catch (err) {
      console.error('PDF download error:', err);
      setError('Kon PDF niet genereren');
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

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">🔥 Team Dashboard</h2>
            <p className="text-gray-600">Overzicht van je sales team en hun prestaties</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Welkom terug,</p>
            <p className="text-lg font-semibold text-gray-900">{user?.name}</p>
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

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <icons.DollarSign />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Deze Maand</p>
              <p className="text-2xl font-bold text-gray-900">€{(dashboardData?.totals?.thisMonthRevenue || 0).toLocaleString('nl-NL')}</p>
              <p className="text-xs text-gray-500">Omzet</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <icons.TrendingUp />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Commissies</p>
              <p className="text-2xl font-bold text-gray-900">€{(dashboardData?.totals?.thisMonthCommission || 0).toLocaleString('nl-NL')}</p>
              <p className="text-xs text-gray-500">Deze maand</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <icons.FileText />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Facturen</p>
              <p className="text-2xl font-bold text-gray-900">{invoices.filter(inv => inv.status === 'pending').length}</p>
              <p className="text-xs text-gray-500">Te beoordelen</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <icons.Users />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Team</p>
              <p className="text-2xl font-bold text-gray-900">{dashboardData?.salesReps?.length || 0}</p>
              <p className="text-xs text-gray-500">Actieve reps</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sales Reps Overview */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Sales Representatives</h3>
        
        {!dashboardData?.salesReps || dashboardData.salesReps.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <icons.Users />
            </div>
            <h4 className="text-lg font-medium text-gray-900">Nog geen sales reps</h4>
            <p className="text-gray-600 mt-2">Neem contact op met de admin om sales reps toe te voegen</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dashboardData.salesReps.map((rep) => {
              const pendingInvoices = invoices.filter(inv => inv.salesRepId && inv.salesRepId._id === rep._id && inv.status === 'pending');
              const approvedInvoices = invoices.filter(inv => inv.salesRepId && inv.salesRepId._id === rep._id && inv.status === 'approved');
              
              return (
                <div 
                  key={rep._id} 
                  className="border border-gray-200 rounded-xl p-6 hover:shadow-sm transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedRep(rep);
                    setShowRepModal(true);
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-600 font-semibold text-sm">
                            {rep.name.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-3">
                          <h4 className="font-semibold text-gray-900">{rep.name}</h4>
                          <p className="text-xs text-gray-500">{rep.position}</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-500 text-sm">Deze maand:</span>
                          <span className="font-semibold text-gray-900">€{(rep.thisMonthRevenue || 0).toLocaleString('nl-NL')}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500 text-sm">Commissie:</span>
                          <span className="font-semibold text-gray-900">€{(rep.thisMonthCommission || 0).toLocaleString('nl-NL')}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        {pendingInvoices.length > 0 ? (
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-1 bg-yellow-100 text-yellow-600 rounded-full text-xs font-medium">
                              ⏳ Te beoordelen ({pendingInvoices.length})
                            </span>
                            <div className="flex space-x-1">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  approveInvoice(pendingInvoices[0]._id);
                                }}
                                disabled={actionLoading}
                                className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs transition-colors disabled:opacity-50"
                              >
                                Goedkeuren
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const reason = prompt('Reden voor wijziging:');
                                  if (reason) requestRevision(pendingInvoices[0]._id, reason);
                                }}
                                disabled={actionLoading}
                                className="bg-orange-600 hover:bg-orange-700 text-white px-2 py-1 rounded text-xs transition-colors disabled:opacity-50"
                              >
                                Wijziging
                              </button>
                            </div>
                          </div>
                        ) : approvedInvoices.length > 0 ? (
                          <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs font-medium">
                            ✅ Goedgekeurd
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                            📋 Geen facturen
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Sales Rep Detail Modal */}
      {showRepModal && selectedRep && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-semibold">
                      {selectedRep.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-semibold text-gray-900">{selectedRep.name}</h3>
                    <p className="text-gray-600">{selectedRep.position}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setShowRepModal(false);
                    setSelectedRep(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <icons.X />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <span className="text-gray-600">Positie:</span>
                  <p className="font-medium">{selectedRep.position}</p>
                </div>
                <div>
                  <span className="text-gray-600">Start datum:</span>
                  <p className="font-medium">{new Date(selectedRep.hireDate).toLocaleDateString('nl-NL')}</p>
                </div>
                <div>
                  <span className="text-gray-600">Commissie rate:</span>
                  <p className="font-medium">{((selectedRep.commissionRate || 0.1) * 100).toFixed(1)}%</p>
                </div>
                <div>
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    selectedRep.isConnected 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {selectedRep.isConnected ? '🟢 Actief' : '🔴 Inactief'}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-4">Factuur Geschiedenis</h4>
                
                {invoices.filter(inv => inv.salesRepId && inv.salesRepId._id === selectedRep._id).length === 0 ? (
                  <p className="text-gray-500 text-center py-4">Nog geen facturen ingediend</p>
                ) : (
                  <div className="space-y-3">
                    {invoices
                      .filter(inv => inv.salesRepId && inv.salesRepId._id === selectedRep._id)
                      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                      .map((invoice) => (
                        <div key={invoice._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-gray-900">#{invoice.invoiceNumber}</p>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                invoice.status === 'paid' 
                                  ? 'bg-green-100 text-green-600' 
                                  : invoice.status === 'approved'
                                  ? 'bg-blue-100 text-blue-600'
                                  : invoice.status === 'revision_requested'
                                  ? 'bg-yellow-100 text-yellow-600'
                                  : 'bg-gray-100 text-gray-600'
                              }`}>
                                {invoice.status === 'paid' ? '💰 Betaald' : 
                                 invoice.status === 'approved' ? '✅ Goedgekeurd' :
                                 invoice.status === 'revision_requested' ? '🔄 Herzien' :
                                 '⏳ Te beoordelen'}
                              </span>
                            </div>
                            <p className="text-sm text-gray-600">€{invoice.amount.toLocaleString('nl-NL', {minimumFractionDigits: 2})}</p>
                            <p className="text-xs text-gray-500">
                              {new Date(0, invoice.month - 1).toLocaleDateString('nl-NL', {month: 'long'})} {invoice.year}
                            </p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => downloadInvoicePDF(invoice)}
                              className="bg-blue-600 hover:bg-blue-700 text-white px-2 py-1 rounded text-xs transition-colors"
                            >
                              PDF
                            </button>
                            {invoice.status === 'pending' && (
                              <>
                                <button
                                  onClick={() => approveInvoice(invoice._id)}
                                  disabled={actionLoading}
                                  className="bg-green-600 hover:bg-green-700 text-white px-2 py-1 rounded text-xs transition-colors disabled:opacity-50"
                                >
                                  Goedkeuren
                                </button>
                                <button
                                  onClick={() => {
                                    const reason = prompt('Reden voor wijziging:');
                                    if (reason) requestRevision(invoice._id, reason);
                                  }}
                                  disabled={actionLoading}
                                  className="bg-orange-600 hover:bg-orange-700 text-white px-2 py-1 rounded text-xs transition-colors disabled:opacity-50"
                                >
                                  Wijziging
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Admin Network Commissions - WITH PDF DOWNLOADS
const AdminNetworkCommissions = () => {
  const [commissions, setCommissions] = useState([]);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  console.log('🔥 AdminNetworkCommissions COMPONENT LOADED');

  useEffect(() => {
    fetchNetworkCommissions();
    fetchClients();
  }, []);

  const fetchNetworkCommissions = async () => {
    try {
      setIsLoading(true);
      const response = await apiCall('/admin/network-commissions');
      setCommissions(response);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchClients = async () => {
    try {
      const response = await apiCall('/admin/clients');
      setClients(response);
    } catch (err) {
      console.error('Error fetching clients:', err);
    }
  };

  const generateNetworkInvoice = async () => {
    if (!selectedClient) {
      setError('Selecteer een client');
      return;
    }

    try {
      setIsLoading(true);
      setError('');
      const response = await apiCall('/admin/generate-network-invoice', {
        method: 'POST',
        body: JSON.stringify({
          clientId: selectedClient,
          month: selectedMonth,
          year: selectedYear
        })
      });
      
      setSuccess('Network factuur succesvol gegenereerd!');
      await fetchNetworkCommissions();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadNetworkInvoicePDF = async (commission) => {
    try {
      console.log('🔥 ADMIN DOWNLOADING NETWORK INVOICE PDF:', commission);
      
      const companyDetails = {
        companyName: 'Recruiters Network B.V.',
        contactName: 'Admin Team',
        address: 'Herengracht 123, 1015 BG Amsterdam',
        city: 'Amsterdam',
        postalCode: '1015 BG',
        email: 'admin@recruitersnetwork.nl',
        phone: '+31 20 123 4567',
        kvkNumber: '87654321',
        vatNumber: 'NL987654321B01',
        bankAccount: 'NL12 RABO 0123 4567 89'
      };

      const clientDetails = clients.find(c => c.name === commission.clientName) || {
        name: commission.clientName
      };

      const networkInvoice = {
        _id: commission._id,
        invoiceNumber: commission.invoiceNumber,
        month: commission.month,
        year: commission.year,
        amount: commission.networkAmount,
        type: 'network',
        invoiceData: {
          networkAmount: commission.totalSalesRepCommission * commission.networkRate,
          vatRate: 21,
          vatAmount: (commission.totalSalesRepCommission * commission.networkRate) * 0.21,
          totalAmount: commission.networkAmount,
          totalSalesRepCommission: commission.totalSalesRepCommission,
          networkRate: commission.networkRate
        }
      };

      await generateInvoicePDF(networkInvoice, companyDetails, clientDetails);
      setSuccess('PDF wordt gedownload...');
    } catch (err) {
      console.error('PDF download error:', err);
      setError('Kon PDF niet genereren');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">🔥 Network Facturen</h2>
            <p className="text-gray-600">Genereer en beheer network commissie facturen</p>
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

      {/* Network Invoice Generator */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Network Factuur Genereren</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Client</label>
            <select
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
            >
              <option value="">Selecteer client...</option>
              {clients.map((client) => (
                <option key={client._id} value={client._id}>
                  {client.name} - {((client.networkCommissionRate || 0.1) * 100).toFixed(1)}%
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Maand</label>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
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
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div className="flex items-end">
            <button
              onClick={generateNetworkInvoice}
              disabled={isLoading || !selectedClient}
              className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Genereren...' : 'Network Factuur Genereren'}
            </button>
          </div>
        </div>
      </div>

      {/* Network Commissions List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">🔥 Network Commissie Facturen ({commissions.length})</h3>
        
        {commissions.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <icons.FileText />
            </div>
            <h4 className="text-lg font-medium text-gray-900">Nog geen network facturen</h4>
            <p className="text-gray-600 mt-2">Genereer je eerste network factuur</p>
          </div>
        ) : (
          <div className="space-y-4">
            {commissions.map((commission) => (
              <div key={commission._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-sm transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <icons.FileText />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">#{commission.invoiceNumber}</h4>
                    <p className="text-gray-600">{commission.clientName}</p>
                    <p className="text-sm text-gray-500">
                      {commission.monthName} {commission.year}
                    </p>
                    <p className="text-xs text-gray-500">
                      Sales Rep Commissie: €{commission.totalSalesRepCommission.toLocaleString('nl-NL', {minimumFractionDigits: 2})} × {(commission.networkRate * 100).toFixed(1)}%
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">€{commission.networkAmount.toLocaleString('nl-NL', {minimumFractionDigits: 2})}</p>
                    <p className="text-xs text-gray-500">excl. BTW</p>
                  </div>

                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    commission.status === 'paid' 
                      ? 'bg-green-100 text-green-600' 
                      : commission.status === 'approved'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {commission.status === 'paid' ? '💰 Betaald' : 
                     commission.status === 'approved' ? '✅ Goedgekeurd' :
                     '⏳ Te beoordelen'}
                  </span>

                  <button
                    onClick={() => downloadNetworkInvoicePDF(commission)}
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

// Simple Dashboard Components for placeholder pages
const SimpleDashboard = ({ title }) => (
  <div className="space-y-6">
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-2">{title}</h2>
      <p className="text-gray-600">Dit onderdeel wordt nog verder uitgewerkt...</p>
    </div>
  </div>
);

// FIXED SIDEBAR - ONLY LOGOUT BUTTON WORKS IN SIDEBAR
const FixedSidebar = ({ user, currentPage, setCurrentPage, onLogout }) => {
  console.log('🔥 RENDERING FIXED SIDEBAR');
  
  const menuItems = user && user.role === 'admin' ? [
    { id: 'admin-dashboard', label: '🔥 Admin Dashboard', icon: icons.Home },
    { id: 'clients', label: '🔥 Klanten Beheer', icon: icons.Users },
    { id: 'network-commissions', label: '🔥 Network Facturen', icon: icons.CreditCard },
    { id: 'admin-settings', label: '🔥 Instellingen', icon: icons.Settings }
  ] : user && user.role === 'salesrep' ? [
    { id: 'salesrep-dashboard', label: '🔥 Mijn Dashboard', icon: icons.Home },
    { id: 'salesrep-invoices', label: '🔥 Mijn Facturen', icon: icons.CreditCard },
    { id: 'salesrep-reports', label: '🔥 Mijn Prestaties', icon: icons.Users },
    { id: 'salesrep-settings', label: '🔥 Instellingen', icon: icons.Settings }
  ] : [
    { id: 'dashboard', label: '🔥 Team Dashboard', icon: icons.Home },
    { id: 'invoices', label: '🔥 Betalingen & Facturen', icon: icons.CreditCard },
    { id: 'reports', label: '🔥 Rapportages', icon: icons.Users },
    { id: 'settings', label: '🔥 Instellingen', icon: icons.Settings }
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
      {/* Header */}
      <div className="p-6 border-b border-gray-100" style={{flexShrink: 0}}>
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
            <div className="text-white"><icons.Building2 /></div>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">Recruiters Network</h1>
            <p className="text-xs text-gray-500">
              {user?.role === 'admin' ? '🔥 Admin Panel' : user?.role === 'salesrep' ? '🔥 Sales Portal' : '🔥 Klantportaal'}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
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

      {/* Footer with User Info and Logout */}
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

// Main App Component
const App = () => {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load html2pdf library for PDF generation
    if (!document.querySelector('script[src*="html2pdf"]')) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
      document.head.appendChild(script);
      console.log('🔥 HTML2PDF LIBRARY LOADING...');
    }

    // Check for existing session
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const parsed = JSON.parse(userData);
        setUser(parsed);
        
        // Set appropriate default page based on role
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
      
      // Navigate to appropriate page based on role
      if (response.user.role === 'admin') {
        setCurrentPage('admin-dashboard');
      } else if (response.user.role === 'salesrep') {
        setCurrentPage('salesrep-invoices');
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
          {/* Admin Pages */}
          {user.role === 'admin' && (
            <div>
              {currentPage === 'admin-dashboard' && <AdminDashboard />}
              {currentPage === 'clients' && <AdminDashboard />}
              {currentPage === 'network-commissions' && <AdminNetworkCommissions />}
              {currentPage === 'admin-settings' && <SimpleDashboard title="🔥 Admin Instellingen" />}
            </div>
          )}

          {/* Sales Rep Pages */}
          {user.role === 'salesrep' && (
            <div>
              {currentPage === 'salesrep-dashboard' && <SimpleDashboard title="🔥 Sales Rep Dashboard" />}
              {currentPage === 'salesrep-invoices' && <SalesRepInvoices user={user} />}
              {currentPage === 'salesrep-reports' && <SimpleDashboard title="🔥 Sales Rep Reports" />}
              {currentPage === 'salesrep-settings' && <SimpleDashboard title="🔥 Sales Rep Settings" />}
            </div>
          )}

          {/* Client Pages */}
          {user.role === 'client' && (
            <div>
              {currentPage === 'dashboard' && <ClientTeamDashboard user={user} />}
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
                import React, { useState, useEffect } from 'react';

console.log('🔥 COMPLETE APP.JS - ALL FEATURES + PDF DOWNLOADS 🔥');

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
  ),
  Eye: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  )
};

// PDF Generation utility - COMPLETE IMPLEMENTATION
const generateInvoicePDF = (invoice, companyDetails, clientDetails = {}) => {
  console.log('🔥 GENERATING PDF FOR INVOICE:', invoice);
  
  return new Promise((resolve) => {
    const pdfContent = `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; color: #333;">
        <div style="border-bottom: 2px solid #16a34a; padding-bottom: 20px; margin-bottom: 30px;">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div>
              <h1 style="color: #16a34a; margin: 0; font-size: 28px;">FACTUUR</h1>
              <p style="margin: 5px 0; font-size: 18px; font-weight: bold;">#${invoice.invoiceNumber}</p>
              <p style="margin: 5px 0; color: #666;">Datum: ${new Date().toLocaleDateString('nl-NL')}</p>
            </div>
            <div style="text-align: right;">
              <h2 style="color: #16a34a; margin: 0; font-size: 20px;">${companyDetails.companyName || 'Uw Bedrijf'}</h2>
              <p style="margin: 2px 0;">${companyDetails.contactName || ''}</p>
              <p style="margin: 2px 0;">${companyDetails.address || ''}</p>
              <p style="margin: 2px 0;">${companyDetails.city || ''} ${companyDetails.postalCode || ''}</p>
              <p style="margin: 2px 0;">${companyDetails.email || ''}</p>
              <p style="margin: 2px 0;">${companyDetails.phone || ''}</p>
            </div>
          </div>
        </div>

        <div style="margin-bottom: 30px;">
          <h3 style="color: #16a34a; border-bottom: 1px solid #e5e5e5; padding-bottom: 10px;">Factuur Naar:</h3>
          <div style="margin-top: 15px;">
            <p style="margin: 2px 0; font-weight: bold; font-size: 16px;">${clientDetails.clientCompanyName || clientDetails.name || 'Client'}</p>
            <p style="margin: 2px 0;">${clientDetails.clientContactName || clientDetails.contactName || ''}</p>
            <p style="margin: 2px 0;">${clientDetails.clientAddress || clientDetails.address || ''}</p>
            ${clientDetails.clientKvk || clientDetails.kvkNumber ? `<p style="margin: 2px 0;">KVK: ${clientDetails.clientKvk || clientDetails.kvkNumber}</p>` : ''}
            ${clientDetails.clientVat || clientDetails.vatNumber ? `<p style="margin: 2px 0;">BTW: ${clientDetails.clientVat || clientDetails.vatNumber}</p>` : ''}
          </div>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
          <thead>
            <tr style="background-color: #f8f9fa;">
              <th style="border: 1px solid #dee2e6; padding: 12px; text-align: left;">Omschrijving</th>
              <th style="border: 1px solid #dee2e6; padding: 12px; text-align: right; width: 120px;">Bedrag</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="border: 1px solid #dee2e6; padding: 12px;">
                ${invoice.type === 'network' ? 'Recruiters Network Commissie' : 'Commissie'} ${new Date(0, invoice.month - 1).toLocaleDateString('nl-NL', {month: 'long'})} ${invoice.year}
                ${invoice.invoiceData?.thisMonthRevenue ? `<br><small style="color: #666;">Omzet deze maand: €${(invoice.invoiceData.thisMonthRevenue || 0).toLocaleString('nl-NL')}</small>` : ''}
              </td>
              <td style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">
                €${(invoice.invoiceData?.commissionExcl || invoice.invoiceData?.networkAmount || 0).toLocaleString('nl-NL', {minimumFractionDigits: 2})}
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid #dee2e6; padding: 12px;">BTW ${(invoice.invoiceData?.vatRate || 21)}%</td>
              <td style="border: 1px solid #dee2e6; padding: 12px; text-align: right;">
                €${(invoice.invoiceData?.vatAmount || 0).toLocaleString('nl-NL', {minimumFractionDigits: 2})}
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr style="background-color: #16a34a; color: white; font-weight: bold;">
              <td style="border: 1px solid #16a34a; padding: 12px;">TOTAAL</td>
              <td style="border: 1px solid #16a34a; padding: 12px; text-align: right;">
                €${(invoice.amount || 0).toLocaleString('nl-NL', {minimumFractionDigits: 2})}
              </td>
            </tr>
          </tfoot>
        </table>

        <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e5e5;">
          <h4 style="color: #16a34a;">Betalingsgegevens</h4>
          <p><strong>Rekeningnummer:</strong> ${companyDetails.bankAccount || 'NL91 ABNA 0417 1643 00'}</p>
          <p><strong>Ten name van:</strong> ${companyDetails.companyName || 'Recruiters Network'}</p>
          ${companyDetails.kvkNumber ? `<p><strong>KVK:</strong> ${companyDetails.kvkNumber}</p>` : ''}
          ${companyDetails.vatNumber ? `<p><strong>BTW-nummer:</strong> ${companyDetails.vatNumber}</p>` : ''}
          <p style="margin-top: 15px; font-size: 14px; color: #666;">
            Gelieve het factuurnummer te vermelden bij uw betaling.
          </p>
        </div>
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
        console.log('🔥 PDF GENERATED SUCCESSFULLY');
        resolve(true);
      });
    } else {
      console.log('🔥 PDF LIBRARY NOT LOADED - USING PRINT FALLBACK');
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>Factuur ${invoice.invoiceNumber}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              @media print { body { margin: 0; } }
            </style>
          </head>
          <body>
            ${pdfContent}
            <script>
              window.onload = function() { 
                window.print(); 
                setTimeout(function() { window.close(); }, 1000);
              };
            </script>
          </body>
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
            <p>🔥 Admin: admin@recruitersnetwork.nl / admin123</p>
            <p>🔥 Client: demo@acmecorp.com / demo123</p>
            <p>🔥 Sales Rep: sarah@acmecorp.com / demo123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sales Rep Invoices - WITH CLIENT KVK & BTW + PDF DOWNLOAD
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
    bankAccount: '',
    clientCompanyName: '',
    clientContactName: '',
    clientAddress: '',
    clientPhone: '',
    clientKvk: '',
    clientVat: '',
    clientBankAccount: ''
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
      console.error('🔥 ERROR LOADING COMPANY DETAILS:', err);
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
    if (window.confirm('Weet je zeker dat je factuur #' + invoiceNumber + ' wilt verwijderen?')) {
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

  const downloadInvoicePDF = async (invoice) => {
    try {
      console.log('🔥 SALES REP DOWNLOADING INVOICE PDF:', invoice);
      
      const clientDetails = {
        clientCompanyName: companyDetails.clientCompanyName,
        clientContactName: companyDetails.clientContactName,
        clientAddress: companyDetails.clientAddress,
        clientKvk: companyDetails.clientKvk,
        clientVat: companyDetails.clientVat
      };

      await generateInvoicePDF(invoice, companyDetails, clientDetails);
      setSuccess('PDF wordt gedownload...');
    } catch (err) {
      console.error('PDF download error:', err);
      setError('Kon PDF niet genereren');
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
            <p className="text-gray-600">Genereer en download professionele facturen voor je commissies</p>
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
          
          {/* Company Details Section */}
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

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
                <input
                  type="text"
                  value={companyDetails.address}
                  onChange={(e) => setCompanyDetails({...companyDetails, address: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Straat 123"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stad</label>
                <input
                  type="text"
                  value={companyDetails.city}
                  onChange={(e) => setCompanyDetails({...companyDetails, city: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="Amsterdam"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
                <input
                  type="text"
                  value={companyDetails.postalCode}
                  onChange={(e) => setCompanyDetails({...companyDetails, postalCode: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="1000 AA"
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
                  type="text"
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

          {/* Client Information Section - READ ONLY */}
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client KVK</label>
                <input
                  type="text"
                  value={companyDetails.clientKvk || 'GEEN KVK DATA'}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-100"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Client BTW</label>
                <input
                  type="text"
                  value={companyDetails.clientVat || 'GEEN BTW DATA'}
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

          {/* Invoice Data Section */}
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Omschrijving (optioneel)</label>
                  <textarea
                    value={invoiceData.description}
                    onChange={(e) => setInvoiceData({...invoiceData, description: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                    rows="2"
                    placeholder="Extra omschrijving voor de factuur..."
                  />
                </div>
              </div>

              {/* Live Preview */}
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
                    {companyDetails.clientKvk && (
                      <p className="text-xs">KVK: {companyDetails.clientKvk}</p>
                    )}
                    {companyDetails.clientVat && (
                      <p className="text-xs">BTW: {companyDetails.clientVat}</p>
                    )}
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

      {/* Invoices List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Mijn Facturen ({invoices.length})</h3>
        
        {invoices.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <icons.FileText />
            </div>
            <h4 className="text-lg font-medium text-gray-900">Nog geen facturen</h4>
            <p className="text-gray-600 mt-2">Genereer je eerste factuur om te beginnen</p>
          </div>
        ) : (
          <div className="space-y-4">
            {invoices.map((invoice) => (
              <div key={invoice._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:shadow-sm transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <icons.FileText />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Factuur #{invoice.invoiceNumber}</h4>
                    <p className="text-gray-600">€{invoice.amount.toLocaleString('nl-NL', {minimumFractionDigits: 2})}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(0, invoice.month - 1).toLocaleDateString('nl-NL', {month: 'long'})} {invoice.year}
                    </p>
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
                    {invoice.status === 'paid' ? '✅ Betaald' : 
                     invoice.status === 'approved' ? '✅ Goedgekeurd' :
                     invoice.status === 'revision_requested' ? '🔄 Herzien' :
                     '⏳ Te beoordelen'}
                  </span>

                  <button
                    onClick={() => downloadInvoicePDF(invoice)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors text-sm flex items-center"
                  >
                    <icons.Download />
                    <span className="ml-1">PDF</span>
                  </button>
                  
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

// Admin Dashboard - COMPLETE WITH CLIENT MANAGEMENT
const AdminDashboard = () => {
  const [clients, setClients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showAddClient, setShowAddClient] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [showClientModal, setShowClientModal] = useState(false);
  const [clientDetails, setClientDetails] = useState(null);
  const [editingClient, setEditingClient] = useState(false);

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

  const addClient = async () => {
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
      
      setSuccess(`Client toegevoegd! Tijdelijk wachtwoord: ${response.tempPassword}`);
      setNewClient({
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
      setShowAddClient(false);
      await fetchClients();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchClientDetails = async (clientId) => {
    try {
      setIsLoading(true);
      const response = await apiCall(`/admin/clients/${clientId}`);
      setClientDetails(response);
      setSelectedClient(response.client);
      setShowClientModal(true);
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
        body: JSON.stringify(selectedClient)
      });
      setSuccess('Client bijgewerkt!');
      setEditingClient(false);
      await fetchClients();
      await fetchClientDetails(selectedClient._id);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const addSalesRep = async () => {
    if (!selectedClient) return;
    
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
        name: '',
        email: '',
        phone: '',
        position: 'Sales Representative',
        hireDate: new Date().toISOString().split('T')[0],
        commissionRate: '10'
      });
      await fetchClientDetails(selectedClient._id);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteSalesRep = async (salesRepId, salesRepName) => {
    if (window.confirm(`Weet je zeker dat je ${salesRepName} wilt verwijderen?`)) {
      try {
        setIsLoading(true);
        await apiCall(`/admin/salesreps/${salesRepId}`, { method: 'DELETE' });
        setSuccess('Sales rep verwijderd');
        await fetchClientDetails(selectedClient._id);
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
            <p className="text-gray-600">Beheer klanten, sales reps en facturen</p>
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

      {/* Add Client Form */}
      {showAddClient && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Nieuwe Klant Toevoegen</h3>
          
          <div className="space-y-6">
            {/* Basic Information */}
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">Basis Informatie</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bedrijfsnaam *</label>
                  <input
                    type="text"
                    value={newClient.name}
                    onChange={(e) => setNewClient({...newClient, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
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
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
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
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="john@acmecorp.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Telefoon</label>
                  <input
                    type="text"
                    value={newClient.phone}
                    onChange={(e) => setNewClient({...newClient, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500"
                    placeholder="+31 20 123 4567"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adres</label>
                  <input
                    type="text"
                    value={newClient.address}
                    onChange={(
