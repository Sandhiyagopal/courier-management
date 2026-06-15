import { useState } from 'react';
import API from '../../components/api/api-client';
import Loader from '../../components/load/Loader';

export default function TrackCourier() {
  const [ref, setRef] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!ref) return;
    setLoading(true);
    try {
      const { data } = await API.get(`/track/${ref}`);
      setResult(data);
    } catch (err) {
      console.error(err);
      alert('Courier not found');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Track Your Courier</h2>
      <div className="flex gap-2 mb-4">
        <input type="text" placeholder="Enter Reference Number" value={ref} onChange={(e) => setRef(e.target.value)} className="border p-2 flex-1 rounded" />
        <button onClick={handleSearch} className="bg-primary text-white px-4 rounded hover:bg-primary">Track</button>
      </div>
      {loading && <Loader />}
      {result && (
        <div className="mt-4 border-t pt-4">
          <h3 className="font-bold text-lg">Courier Details</h3>
          <p><strong>Reference:</strong> {result.courier.RefNumber}</p>
          <p><strong>Sender:</strong> {result.courier.SenderName} ({result.courier.SenderCity})</p>
          <p><strong>Recipient:</strong> {result.courier.RecipientName} ({result.courier.RecipientCity})</p>
          <p><strong>Current Status:</strong> <span className="text-green-600 font-bold">{result.courier.Status}</span></p>
          <h4 className="font-bold mt-3">Tracking History</h4>
          <div className="space-y-2">
            {result.tracking.map((t, i) => (
              <div key={i} className="border-l-4 border-primary pl-3">
                <p className="text-sm text-gray-500">{new Date(t.StatusDate).toLocaleString()}</p>
                <p><strong>{t.status}</strong> - {t.remark}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}