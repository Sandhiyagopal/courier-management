import { useEffect, useState } from 'react';
import API from '../../components/api/api-client';
import Loader from '../../components/load/Loader';
import toast from 'react-hot-toast';

export default function AddCourier() {
  const [branches, setBranches] = useState([]);
  const [form, setForm] = useState({
    SenderBranch: '', SenderName: '', SenderContactnumber: '', SenderAddress: '', SenderCity: '', SenderState: '', SenderPincode: '', SenderCountry: '',
    RecipientName: '', RecipientContactnumber: '', RecipientAddress: '', RecipientCity: '', RecipientState: '', RecipientPincode: '', RecipientCountry: '',
    CourierDesv: '', ParcelWeight: '', ParcelDimensionlon: '', ParcelDimensionwidth: '', ParcelDimensionheight: '', ParcelPrice: ''
  });

  useEffect(() => {
    const fetchBranches = async () => {
      const { data } = await API.get('/branches');
      setBranches(data);
    };
    fetchBranches();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/staff/courier', form);
      toast.success('Courier booked successfully');
      setForm({
        SenderBranch: '', SenderName: '', SenderContactnumber: '', SenderAddress: '', SenderCity: '', SenderState: '', SenderPincode: '', SenderCountry: '',
        RecipientName: '', RecipientContactnumber: '', RecipientAddress: '', RecipientCity: '', RecipientState: '', RecipientPincode: '', RecipientCountry: '',
        CourierDesv: '', ParcelWeight: '', ParcelDimensionlon: '', ParcelDimensionwidth: '', ParcelDimensionheight: '', ParcelPrice: ''
      });
    } catch (err) {
      toast.error('Booking failed');
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Courier</h2>
      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-3">
        <select name="SenderBranch" value={form.SenderBranch} onChange={handleChange} className="border p-2 rounded" required>
          <option value="">Select Branch</option>
          {branches.map(b => <option key={b.ID} value={b.BranchName}>{b.BranchName}</option>)}
        </select>
        <input name="SenderName" placeholder="Sender Name" value={form.SenderName} onChange={handleChange} required />
        <input name="SenderContactnumber" placeholder="Sender Contact" value={form.SenderContactnumber} onChange={handleChange} required />
        <input name="SenderAddress" placeholder="Sender Address" value={form.SenderAddress} onChange={handleChange} required />
        <input name="SenderCity" placeholder="Sender City" value={form.SenderCity} onChange={handleChange} required />
        <input name="SenderState" placeholder="Sender State" value={form.SenderState} onChange={handleChange} required />
        <input name="SenderPincode" placeholder="Sender Pincode" value={form.SenderPincode} onChange={handleChange} required />
        <input name="SenderCountry" placeholder="Sender Country" value={form.SenderCountry} onChange={handleChange} required />
        <input name="RecipientName" placeholder="Recipient Name" value={form.RecipientName} onChange={handleChange} required />
        <input name="RecipientContactnumber" placeholder="Recipient Contact" value={form.RecipientContactnumber} onChange={handleChange} required />
        <input name="RecipientAddress" placeholder="Recipient Address" value={form.RecipientAddress} onChange={handleChange} required />
        <input name="RecipientCity" placeholder="Recipient City" value={form.RecipientCity} onChange={handleChange} required />
        <input name="RecipientState" placeholder="Recipient State" value={form.RecipientState} onChange={handleChange} required />
        <input name="RecipientPincode" placeholder="Recipient Pincode" value={form.RecipientPincode} onChange={handleChange} required />
        <input name="RecipientCountry" placeholder="Recipient Country" value={form.RecipientCountry} onChange={handleChange} required />
        <input name="CourierDesv" placeholder="Description" value={form.CourierDesv} onChange={handleChange} required />
        <input name="ParcelWeight" placeholder="Weight (kg)" value={form.ParcelWeight} onChange={handleChange} required />
        <input name="ParcelDimensionlon" placeholder="Length (cm)" value={form.ParcelDimensionlon} onChange={handleChange} />
        <input name="ParcelDimensionwidth" placeholder="Width (cm)" value={form.ParcelDimensionwidth} onChange={handleChange} />
        <input name="ParcelDimensionheight" placeholder="Height (cm)" value={form.ParcelDimensionheight} onChange={handleChange} />
        <input name="ParcelPrice" placeholder="Price (₹)" value={form.ParcelPrice} onChange={handleChange} required />
        <div className="md:col-span-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Book Courier</button>
        </div>
      </form>
    </div>
  );
}