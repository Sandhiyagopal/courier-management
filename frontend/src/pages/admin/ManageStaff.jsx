import { useEffect, useState } from 'react';
import API from '../../components/api/api-client';
import toast from 'react-hot-toast';
import Loader from '../../components/load/Loader';

export default function ManageStaff() {
  const [staff, setStaff] = useState([]);
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ BranchName: '', StaffName: '', StaffMobilenumber: '', StaffEmail: '', StaffPassword: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    try {
      const [staffRes, branchRes] = await Promise.all([API.get('/admin/staff'), API.get('/admin/branches')]);
      setStaff(staffRes.data);
      setBranches(branchRes.data);
    } catch (err) {
      toast.error('Failed to load data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/admin/staff/${editingId}`, { BranchName: form.BranchName, StaffName: form.StaffName, StaffMobilenumber: form.StaffMobilenumber, StaffEmail: form.StaffEmail });
        toast.success('Staff updated');
      } else {
        await API.post('/admin/staff', form);
        toast.success('Staff added');
      }
      setForm({ BranchName: '', StaffName: '', StaffMobilenumber: '', StaffEmail: '', StaffPassword: '' });
      setEditingId(null);
      fetchData();
    } catch (err) {
        console.log(err)
      toast.error('Operation failed');
    }
  };

  const handleEdit = (s) => {
    setForm({ BranchName: s.BranchName, StaffName: s.StaffName, StaffMobilenumber: s.StaffMobilenumber, StaffEmail: s.StaffEmail, StaffPassword: '' });
    setEditingId(s.ID);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete staff?')) {
      await API.delete(`/admin/staff/${id}`);
      toast.success('Deleted');
      fetchData();
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Manage Staff</h1>
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-bold mb-2">{editingId ? 'Edit Staff' : 'Add Staff'}</h2>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-3">
          <select name="BranchName" value={form.BranchName} onChange={handleChange} className="border p-2 rounded" required>
            <option value="">Select Branch</option>
            {branches.map(b => <option key={b.ID} value={b.BranchName}>{b.BranchName}</option>)}
          </select>
          <input name="StaffName" placeholder="Staff Name" value={form.StaffName} onChange={handleChange} className="border p-2 rounded" required />
          <input name="StaffMobilenumber" placeholder="Mobile" value={form.StaffMobilenumber} onChange={handleChange} className="border p-2 rounded" required />
          <input name="StaffEmail" placeholder="Email" value={form.StaffEmail} onChange={handleChange} className="border p-2 rounded" required />
          {!editingId && <input name="StaffPassword" type="password" placeholder="Password" value={form.StaffPassword} onChange={handleChange} className="border p-2 rounded" required />}
          <div className="md:col-span-2 flex gap-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">{editingId ? 'Update' : 'Add'}</button>
            {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ BranchName: '', StaffName: '', StaffMobilenumber: '', StaffEmail: '', StaffPassword: '' }); }} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>}
          </div>
        </form>
      </div>
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-200"><tr><th>Name</th><th>Branch</th><th>Email</th><th>Mobile</th><th>Actions</th></tr></thead>
          <tbody>
            {staff.map(s => (
              <tr key={s.ID} className="border-b">
                <td className="p-2">{s.StaffName}</td><td>{s.BranchName}</td><td>{s.StaffEmail}</td><td>{s.StaffMobilenumber}</td>
                <td><button onClick={() => handleEdit(s)} className="text-blue-600 mr-2">Edit</button><button onClick={() => handleDelete(s.ID)} className="text-red-600">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}