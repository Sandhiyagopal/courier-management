import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../components/api/api-client';
import Loader from '../../components/load/Loader';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await API.get('/admin/stats');
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <Loader />;

  const cards = [
    { title: 'Total Couriers', value: stats.totalCourier, color: 'bg-blue-500', link: '/admin/couriers' },
    { title: 'Total Staff', value: stats.totalStaff, color: 'bg-green-500', link: '/admin/staff' },
    { title: 'Total Branches', value: stats.totalBranches, color: 'bg-yellow-500', link: '/admin/branches' },
    { title: 'Open Complaints', value: stats.openComplaints, color: 'bg-red-500', link: '/admin/complaints' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card, i) => (
          <Link to={card.link} key={i} className={`${card.color} text-white p-4 rounded shadow hover:opacity-90 transition`}>
            <h3 className="text-lg">{card.title}</h3>
            <p className="text-3xl font-bold">{card.value}</p>
          </Link>
        ))}
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">Quick Actions</h2>
        <div className="flex flex-wrap gap-2">
          <Link to="/admin/staff" className="bg-gray-200 px-3 py-1 rounded">Manage Staff</Link>
          <Link to="/admin/branches" className="bg-gray-200 px-3 py-1 rounded">Manage Branches</Link>
          <Link to="/admin/reports" className="bg-gray-200 px-3 py-1 rounded">View Reports</Link>
          <Link to="/admin/pages" className="bg-gray-200 px-3 py-1 rounded">Update Pages</Link>
        </div>
      </div>
    </div>
  );
}