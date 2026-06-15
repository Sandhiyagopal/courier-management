import { useEffect, useState } from 'react';
import API from '../../components/api/api-client';
import Loader from '../../components/load/Loader';
import toast from 'react-hot-toast';

export default function Contact() {
  const [contact, setContact] = useState(null);
  const [form, setForm] = useState({ Name: '', MobileNumber: '', Email: '', Message: '' });

  useEffect(() => {
    const fetchContact = async () => {
      const { data } = await API.get('/page/contactus');
      setContact(data);
    };
    fetchContact();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/enquiry', form);
      toast.success('Enquiry sent successfully');
      setForm({ Name: '', MobileNumber: '', Email: '', Message: '' });
    } catch (err) {
      toast.error('Failed to send enquiry', err);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
        {contact && (
          <>
            <p><strong>📞 Phone:</strong> {contact.MobileNumber}</p>
            <p><strong>✉️ Email:</strong> {contact.Email}</p>
            <p><strong>📍 Address:</strong> {contact.Address}</p>
          </>
        )}
      </div>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Send an Enquiry</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input type="text" name="Name" placeholder="Your Name" value={form.Name} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input type="tel" name="MobileNumber" placeholder="Mobile Number" value={form.MobileNumber} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input type="email" name="Email" placeholder="Email" value={form.Email} onChange={handleChange} className="w-full border p-2 rounded" required />
          <textarea name="Message" placeholder="Your Message" value={form.Message} onChange={handleChange} className="w-full border p-2 rounded" rows="3" required />
          <button type="submit" className="bg-primary text-white px-4 py-2 rounded">Send</button>
        </form>
      </div>
    </div>
  );
}