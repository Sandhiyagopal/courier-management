import { useEffect, useState } from 'react';
import API from '../../components/api/api-client';
import Loader from '../../components/load/Loader';

export default function AboutUs() {
  const [about, setAbout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const { data } = await API.get('/page/aboutus');
        setAbout(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();
  }, []);

  if (loading) return <Loader />;
  if (!about) return <div>No content found.</div>;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-3xl font-bold mb-4">{about.PageTitle}</h1>
      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: about.PageDescription }} />
      <div className="mt-6">
        <p><strong>Email:</strong> {about.Email}</p>
        <p><strong>Phone:</strong> {about.MobileNumber}</p>
        <p><strong>Address:</strong> {about.Address}</p>
      </div>
    </div>
  );
}