import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import API from '../../components/api/api-client';
import Loader from '../../components/load/Loader';

export default function StaffDashboard() {
  const [newCouriers, setNewCouriers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNewCouriers = async () => {
    try {
      // Fetch couriers with status 'Booked' or 'New'
      const { data } = await API.get('/staff/new-couriers');
      setNewCouriers(data);
    } catch (err) {
      toast.error('Failed to load new couriers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewCouriers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Delete this courier record?')) {
      try {
        await API.delete(`/staff/courier/${id}`);
        toast.success('Courier deleted');
        fetchNewCouriers();
      } catch (err) {
        toast.error('Delete failed');
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">New Couriers</h2>
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-2 border">S.NO</th>
              <th className="p-2 border">Reference Number</th>
              <th className="p-2 border">Sender Name</th>
              <th className="p-2 border">Recipient Name</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Courier Date</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {newCouriers.map((c, idx) => (
              <tr key={c.ID} className="border-b">
                <td className="p-2 text-center">{idx + 1}</td>
                <td className="p-2">{c.RefNumber}</td>
                <td className="p-2">{c.SenderName}</td>
                <td className="p-2">{c.RecipientName}</td>
                <td className="p-2">
                  <span className="px-2 py-1 rounded bg-yellow-100 text-yellow-800">{c.Status}</span>
                </td>
                <td className="p-2">{new Date(c.CourierDate).toLocaleString()}</td>
                <td className="p-2">
                  <Link
                    to={`/staff/courier-details/${c.ID}`}
                    className="text-blue-600 mr-2 hover:underline"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleDelete(c.ID)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {newCouriers.length === 0 && (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No new couriers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}