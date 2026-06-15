import { useState } from 'react';
import { BarChart, Calendar, FileText, Package, TrendingUp } from 'lucide-react';
import API from '../../components/api/api-client';
import toast from 'react-hot-toast';

export default function Reports() {
  const [activeTab, setActiveTab] = useState('betweenDates'); // betweenDates, requestCount, sales
  
  // Between Dates Report state
  const [betweenDates, setBetweenDates] = useState({ fromDate: '', toDate: '' });
  const [courierReport, setCourierReport] = useState([]);
  
  // Request Count Report state
  const [requestCountFilter, setRequestCountFilter] = useState({ fromDate: '', toDate: '' });
  const [requestCountData, setRequestCountData] = useState(null);
  
  // Sales Report state
  const [salesFilter, setSalesFilter] = useState({ fromDate: '', toDate: '' });
  const [salesData, setSalesData] = useState(null);
  
  const [loading, setLoading] = useState(false);

  // ==================== Between Dates Report ====================
  const fetchCourierReport = async () => {
    if (!betweenDates.fromDate || !betweenDates.toDate) {
      toast.error('Please select both From Date and To Date');
      return;
    }
    setLoading(true);
    try {
      const { data } = await API.get(`/admin/reports/couriers?fromDate=${betweenDates.fromDate}&toDate=${betweenDates.toDate}`);
      setCourierReport(data);
      toast.success(`${data.length} couriers found`);
    } catch (err) {
      toast.error('Failed to fetch report');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ==================== Request Count Report ====================
  const fetchRequestCount = async () => {
    if (!requestCountFilter.fromDate || !requestCountFilter.toDate) {
      toast.error('Please select both From Date and To Date');
      return;
    }
    setLoading(true);
    try {
      // Assuming backend returns { totalCouriers, totalEnquiries, totalComplaints, ... }
      const { data } = await API.get(`/admin/reports/request-count?fromDate=${requestCountFilter.fromDate}&toDate=${requestCountFilter.toDate}`);
      setRequestCountData(data);
      toast.success('Request count fetched');
    } catch (err) {
      toast.error('Failed to fetch request count');
    } finally {
      setLoading(false);
    }
  };

  // ==================== Sales Report ====================
  const fetchSalesReport = async () => {
    if (!salesFilter.fromDate || !salesFilter.toDate) {
      toast.error('Please select both From Date and To Date');
      return;
    }
    setLoading(true);
    try {
      const { data } = await API.get(`/admin/reports/sales?fromDate=${salesFilter.fromDate}&toDate=${salesFilter.toDate}`);
      setSalesData(data);
      toast.success('Sales report generated');
    } catch (err) {
      toast.error('Failed to fetch sales report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Reports</h2>
      
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('betweenDates')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'betweenDates'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Calendar className="inline-block w-4 h-4 mr-1" /> Between Dates Report
          </button>
          <button
            onClick={() => setActiveTab('requestCount')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'requestCount'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <FileText className="inline-block w-4 h-4 mr-1" /> Request Count Report
          </button>
          <button
            onClick={() => setActiveTab('sales')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'sales'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <TrendingUp className="inline-block w-4 h-4 mr-1" /> Sales Report
          </button>
        </nav>
      </div>

      {/* Tab Panels */}
      <div className="bg-white rounded-lg shadow p-6">
        {/* Between Dates Report Panel */}
        {activeTab === 'betweenDates' && (
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-blue-500" /> Between Dates Report
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                <input
                  type="date"
                  value={betweenDates.fromDate}
                  onChange={(e) => setBetweenDates({ ...betweenDates, fromDate: e.target.value })}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                <input
                  type="date"
                  value={betweenDates.toDate}
                  onChange={(e) => setBetweenDates({ ...betweenDates, toDate: e.target.value })}
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>
            <button
              onClick={fetchCourierReport}
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'View Report'}
            </button>

            {/* Report Results Table */}
            {courierReport.length > 0 && (
              <div className="mt-6 overflow-x-auto">
                <h4 className="font-semibold mb-2">Courier Details</h4>
                <table className="min-w-full border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border p-2">Ref No</th>
                      <th className="border p-2">Sender</th>
                      <th className="border p-2">Recipient</th>
                      <th className="border p-2">Status</th>
                      <th className="border p-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courierReport.map((c) => (
                      <tr key={c.ID}>
                        <td className="border p-2">{c.RefNumber}</td>
                        <td className="border p-2">{c.SenderName}</td>
                        <td className="border p-2">{c.RecipientName}</td>
                        <td className="border p-2">{c.Status}</td>
                        <td className="border p-2">{new Date(c.CourierDate).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Request Count Report Panel */}
        {activeTab === 'requestCount' && (
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-green-500" /> Request Count Report
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                <input
                  type="date"
                  value={requestCountFilter.fromDate}
                  onChange={(e) => setRequestCountFilter({ ...requestCountFilter, fromDate: e.target.value })}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                <input
                  type="date"
                  value={requestCountFilter.toDate}
                  onChange={(e) => setRequestCountFilter({ ...requestCountFilter, toDate: e.target.value })}
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>
            <button
              onClick={fetchRequestCount}
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'View Report'}
            </button>

            {requestCountData && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-3">Request Summary</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded shadow text-center">
                    <p className="text-sm text-gray-500">Total Couriers</p>
                    <p className="text-2xl font-bold text-blue-600">{requestCountData.totalCouriers || 0}</p>
                  </div>
                  <div className="bg-white p-3 rounded shadow text-center">
                    <p className="text-sm text-gray-500">Total Enquiries</p>
                    <p className="text-2xl font-bold text-green-600">{requestCountData.totalEnquiries || 0}</p>
                  </div>
                  <div className="bg-white p-3 rounded shadow text-center">
                    <p className="text-sm text-gray-500">Total Complaints</p>
                    <p className="text-2xl font-bold text-red-600">{requestCountData.totalComplaints || 0}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Sales Report Panel */}
        {activeTab === 'sales' && (
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-500" /> Sales Report
            </h3>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                <input
                  type="date"
                  value={salesFilter.fromDate}
                  onChange={(e) => setSalesFilter({ ...salesFilter, fromDate: e.target.value })}
                  className="w-full border p-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                <input
                  type="date"
                  value={salesFilter.toDate}
                  onChange={(e) => setSalesFilter({ ...salesFilter, toDate: e.target.value })}
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>
            <button
              onClick={fetchSalesReport}
              disabled={loading}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
            >
              {loading ? 'Loading...' : 'View Report'}
            </button>

            {salesData && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold mb-3">Sales Summary</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded shadow text-center">
                    <p className="text-sm text-gray-500">Total Couriers</p>
                    <p className="text-3xl font-bold text-purple-600">{salesData.totalCouriers || 0}</p>
                  </div>
                  <div className="bg-white p-4 rounded shadow text-center">
                    <p className="text-sm text-gray-500">Total Revenue</p>
                    <p className="text-3xl font-bold text-green-600">₹{salesData.totalSales || 0}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}