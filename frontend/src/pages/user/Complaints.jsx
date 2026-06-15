import { useState } from 'react';
import API from '../../components/api/api-client';
import Loader from '../../components/load/Loader';
import toast from 'react-hot-toast';

export default function Complaints() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [nature, setNature] = useState('');
  const [issue, setIssue] = useState('');
  const [statusTicket, setStatusTicket] = useState('');
  const [complaintStatus, setComplaintStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/complaint', { TrackingNumber: trackingNumber, NatureOfComplain: nature, IssuesDesc: issue });
      toast.success(`Complaint raised. Ticket No: ${data.TicketNumber}`);
      setTrackingNumber(''); setNature(''); setIssue('');
    } catch (err) {
      toast.error('Failed to raise complaint', err);
    }
  };

  const checkStatus = async () => {
    if (!statusTicket) return;
    try {
      const { data } = await API.get(`/complaint-status/${statusTicket}`);
      setComplaintStatus(data);
    } catch (err) {
      toast.error('Ticket not found', err);
      setComplaintStatus(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Raise a Complaint</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" placeholder="Tracking Reference Number" value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} className="w-full border p-2 rounded" required />
          <input type="text" placeholder="Nature of Complaint" value={nature} onChange={(e) => setNature(e.target.value)} className="w-full border p-2 rounded" required />
          <textarea placeholder="Describe the issue" value={issue} onChange={(e) => setIssue(e.target.value)} className="w-full border p-2 rounded" rows="3" required />
          <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Submit Complaint</button>
        </form>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Check Complaint Status</h2>
        <div className="flex gap-2">
          <input type="text" placeholder="Enter Ticket Number" value={statusTicket} onChange={(e) => setStatusTicket(e.target.value)} className="border p-2 flex-1 rounded" />
          <button onClick={checkStatus} className="bg-primary text-white px-4 rounded">Check</button>
        </div>
        {complaintStatus && (
          <div className="mt-3 p-3 bg-gray-100 rounded">
            <p><strong>Ticket:</strong> {complaintStatus.TicketNumber}</p>
            <p><strong>Tracking:</strong> {complaintStatus.TrackingNumber}</p>
            <p><strong>Status:</strong> <span className={`font-bold ${complaintStatus.Status === 'Closed' ? 'text-green-600' : 'text-yellow-600'}`}>{complaintStatus.Status}</span></p>
            <p><strong>Remark:</strong> {complaintStatus.Remark || 'Pending'}</p>
          </div>
        )}
      </div>
    </div>
  );
}