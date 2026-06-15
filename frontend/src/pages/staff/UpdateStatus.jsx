import { useState } from 'react';
import API from '../../components/api/api-client';
import Loader from '../../components/load/Loader';
import toast from 'react-hot-toast';

export default function UpdateStatus() {
  const [courierId, setCourierId] = useState('');
  const [status, setStatus] = useState('');
  const [remark, setRemark] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!courierId || !status) return toast.error('Courier ID and Status required');
    setLoading(true);
    try {
      await API.put(`/staff/courier/${courierId}/status`, { status, remark });
      toast.success('Status updated');
      setCourierId(''); setStatus(''); setRemark('');
    } catch (err) {
      toast.error('Update failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Update Courier Status</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input type="text" placeholder="Courier ID (from table)" value={courierId} onChange={(e) => setCourierId(e.target.value)} className="w-full border p-2 rounded" required />
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full border p-2 rounded" required>
          <option value="">Select Status</option>
          <option>Booked</option><option>Courier Pickup</option><option>Shipped</option><option>In-Transit</option><option>Arrived at Destination</option><option>Out for Delivery</option><option>Delivered</option>
        </select>
        <textarea placeholder="Remark (optional)" value={remark} onChange={(e) => setRemark(e.target.value)} className="w-full border p-2 rounded" rows="2" />
        <button type="submit" disabled={loading} className="w-full bg-yellow-600 text-white py-2 rounded">Update</button>
      </form>
    </div>
  );
}