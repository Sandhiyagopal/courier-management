import { useEffect, useState } from 'react';
import API from '../../components/api/api-client';
import Loader from '../../components/load/Loader';

export default function ViewEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await API.get('/admin/enquiries');
      setEnquiries(data);
      setLoading(false);
    };
    fetch();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Enquiries</h1>
      <div className="space-y-3">
        {enquiries.map(e => (
          <div key={e.ID} className="bg-white p-4 rounded shadow">
            <p><strong>{e.Name}</strong> ({e.Email}) - {new Date(e.MsgDate).toLocaleString()}</p>
            <p>{e.Message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}