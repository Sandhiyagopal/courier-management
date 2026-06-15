import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import API from '../../components/api/api-client';
import Loader from '../../components/load/Loader';

export default function ManageComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [remark, setRemark] = useState({});

  const fetchComplaints = async () => {
    try {
      const { data } = await API.get('/admin/complaints');
      setComplaints(data);
    } catch (err) {
        console.log(err)
      toast.error('Failed to load');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchComplaints(); }, []);

  const resolve = async (id) => {
    if (!remark[id]) return toast.error('Enter remark');
    await API.put(`/admin/complaints/${id}/resolve`, { Remark: remark[id] });
    toast.success('Resolved');
    fetchComplaints();
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Complaints</h1>
      <div className="space-y-4">
        {complaints.map(c => (
          <div key={c.ID} className="bg-white p-4 rounded shadow">
            <p><strong>Ticket:</strong> {c.TicketNumber} | <strong>Tracking:</strong> {c.TrackingNumber}</p>
            <p><strong>Nature:</strong> {c.NatureOfComplain}</p>
            <p><strong>Issue:</strong> {c.IssuesDesc}</p>
            <p><strong>Status:</strong> <span className={c.Status === 'Closed' ? 'text-green-600' : 'text-red-600'}>{c.Status}</span></p>
            {c.Status === 'Open' && (
              <div className="mt-2 flex gap-2">
                <input type="text" placeholder="Resolution Remark" className="border p-1 flex-1" value={remark[c.ID] || ''} onChange={(e) => setRemark({ ...remark, [c.ID]: e.target.value })} />
                <button onClick={() => resolve(c.ID)} className="bg-green-600 text-white px-3 py-1 rounded">Resolve</button>
              </div>
            )}
            {c.Status === 'Closed' && <p><strong>Remark:</strong> {c.Remark}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}