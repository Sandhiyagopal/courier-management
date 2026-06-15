import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import API from '../../components/api/api-client';
import Loader from '../../components/load/Loader';

export default function ManageBranches() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ BranchName: '', BranchContactnumber: '', BranchEmail: '', BranchAddress: '', BranchCity: '', BranchState: '', BranchPincode: '', BranchCountry: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchBranches = async () => {
    try {
      const { data } = await API.get('/admin/branches');
      setBranches(data);
    } catch (err) {
      toast.error('Failed to load branches', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBranches(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/admin/branches/${editingId}`, form);
        toast.success('Branch updated');
      } else {
        await API.post('/admin/branches', form);
        toast.success('Branch added');
      }
      setForm({ BranchName: '', BranchContactnumber: '', BranchEmail: '', BranchAddress: '', BranchCity: '', BranchState: '', BranchPincode: '', BranchCountry: '' });
      setEditingId(null);
      fetchBranches();
    } catch (err) {
      toast.error('Operation failed', err);
    }
  };

  const handleEdit = (branch) => {
    setForm(branch);
    setEditingId(branch.ID);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete branch?')) {
      try {
        await API.delete(`/admin/branches/${id}`);
        toast.success('Deleted');
        fetchBranches();
      } catch (err) {
        console.log(err)
        toast.error('Delete failed', err);
      }
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Branches</h1>
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-bold mb-2">{editingId ? 'Edit Branch' : 'Add Branch'}</h2>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-3">
          <input name="BranchName" placeholder="Branch Name" value={form.BranchName} onChange={handleChange} className="border p-2 rounded" required />
          <input name="BranchContactnumber" placeholder="Contact Number" value={form.BranchContactnumber} onChange={handleChange} className="border p-2 rounded" required />
          <input name="BranchEmail" placeholder="Email" value={form.BranchEmail} onChange={handleChange} className="border p-2 rounded" required />
          <input name="BranchAddress" placeholder="Address" value={form.BranchAddress} onChange={handleChange} className="border p-2 rounded" required />
          <input name="BranchCity" placeholder="City" value={form.BranchCity} onChange={handleChange} className="border p-2 rounded" required />
          <input name="BranchState" placeholder="State" value={form.BranchState} onChange={handleChange} className="border p-2 rounded" required />
          <input name="BranchPincode" placeholder="Pincode" value={form.BranchPincode} onChange={handleChange} className="border p-2 rounded" required />
          <input name="BranchCountry" placeholder="Country" value={form.BranchCountry} onChange={handleChange} className="border p-2 rounded" required />
          <div className="md:col-span-2 flex gap-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{editingId ? 'Update' : 'Add'}</button>
            {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ BranchName: '', BranchContactnumber: '', BranchEmail: '', BranchAddress: '', BranchCity: '', BranchState: '', BranchPincode: '', BranchCountry: '' }); }} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>}
          </div>
        </form>
      </div>
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-200">
            <tr><th>Name</th><th>Contact</th><th>City</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {branches.map(b => (
              <tr key={b.ID} className="border-b">
                <td className="p-2">{b.BranchName}</td><td>{b.BranchContactnumber}</td><td>{b.BranchCity}</td>
                <td><button onClick={() => handleEdit(b)} className="text-blue-600 mr-2">Edit</button><button onClick={() => handleDelete(b.ID)} className="text-red-600">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}