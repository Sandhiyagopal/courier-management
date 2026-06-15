import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../../components/api/api-client';
import Loader from '../../components/load/Loader';

export default function CourierDetails() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const { data } = await API.get(`/staff/courier/${id}`);
        setData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <Loader />;
  if (!data) return <div>Not found</div>;

  const { courier, tracking } = data;

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Courier Details</h2>
        <Link to="/staff" className="text-blue-600">← Back</Link>
      </div>
      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div className="border p-3 rounded">
          <h3 className="font-bold">Sender</h3>
          <p>{courier.SenderName}, {courier.SenderCity}, {courier.SenderState}</p>
          <p>{courier.SenderAddress}, {courier.SenderPincode}</p>
          <p>📞 {courier.SenderContactnumber}</p>
        </div>
        <div className="border p-3 rounded">
          <h3 className="font-bold">Recipient</h3>
          <p>{courier.RecipientName}, {courier.RecipientCity}, {courier.RecipientState}</p>
          <p>{courier.RecipientAddress}, {courier.RecipientPincode}</p>
          <p>📞 {courier.RecipientContactnumber}</p>
        </div>
      </div>
      <div className="mb-4">
        <p><strong>Reference No:</strong> {courier.RefNumber}</p>
        <p><strong>Status:</strong> {courier.Status}</p>
        <p><strong>Price:</strong> ₹{courier.ParcelPrice}</p>
      </div>
      <h3 className="font-bold mb-2">Tracking History</h3>
      <div className="space-y-2">
        {tracking.map((t) => (
          <div key={t.ID} className="border-l-4 border-blue-500 pl-3">
            <p className="text-sm text-gray-500">{new Date(t.StatusDate).toLocaleString()}</p>
            <p><strong>{t.status}</strong> – {t.remark}</p>
          </div>
        ))}
      </div>
    </div>
  );
}