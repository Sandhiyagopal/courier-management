import { useEffect, useState } from 'react';
import API from '../../components/api/api-client';
import Loader from '../../components/load/Loader';

export default function Branches() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const { data } = await API.get('/branches');
        setBranches(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBranches();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Our Branches</h2>
      {branches.length === 0 ? 
        <div className="flex text-center w-fullALTER USER 'root'@'localhost' IDENTIFIED BY '';
FLUSH PRIVILEGES;">No branches found.</div>
      :
      <div className="grid md:grid-cols-2 gap-4">
        {branches.map((branch) => (
          <div key={branch.ID} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-bold">{branch.BranchName}</h3>
            <p>{branch.BranchAddress}, {branch.BranchCity}, {branch.BranchState} - {branch.BranchPincode}</p>
            <p>📞 {branch.BranchContactnumber} | ✉️ {branch.BranchEmail}</p>
          </div>
        ))}
      </div>
      }
    </div>
  );
}