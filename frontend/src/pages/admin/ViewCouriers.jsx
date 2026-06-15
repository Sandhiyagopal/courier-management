import { useEffect, useState } from 'react';
import API from '../../components/api/api-client';
import Loader from '../../components/load/Loader';

export default function ViewCouriers() {
  const [couriers, setCouriers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await API.get('/admin/couriers');
        setCouriers(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Couriers</h1>
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr><th>Ref No</th><th>Sender</th><th>Recipient</th><th>Status</th><th>Date</th></tr>
          </thead>
          <tbody>
            {couriers.map(c => (
              <tr key={c.ID} className="border-b">
                <td className="p-2">{c.RefNumber}</td><td>{c.SenderName}</td><td>{c.RecipientName}</td>
                <td><span className="px-2 py-1 rounded text-white bg-blue-500">{c.Status}</span></td>
                <td>{new Date(c.CourierDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}