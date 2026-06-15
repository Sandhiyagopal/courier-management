import { useEffect, useState } from 'react';
import API from '../../components/api/api-client';
import toast from 'react-hot-toast';

export default function UpdatePages() {
  const [about, setAbout] = useState({ PageTitle: '', PageDescription: '', Email: '', MobileNumber: '', Address: '' });
  const [contact, setContact] = useState({ PageTitle: '', PageDescription: '', Email: '', MobileNumber: '', Address: '' });

  useEffect(() => {
    const fetch = async () => {
      const aboutData = await API.get('/page/aboutus');
      const contactData = await API.get('/page/contactus');
      setAbout(aboutData.data);
      setContact(contactData.data);
    };
    fetch();
  }, []);

  const updatePage = async (type, data) => {
    try {
      await API.put(`/admin/page/${type}`, data);
      toast.success(`${type} page updated`);
    } catch (err) {
      toast.error('Update failed');
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-3">About Us Page</h2>
        <input className="w-full border p-2 mb-2" value={about.PageTitle} onChange={(e) => setAbout({ ...about, PageTitle: e.target.value })} placeholder="Title" />
        <textarea className="w-full border p-2 mb-2" rows="4" value={about.PageDescription} onChange={(e) => setAbout({ ...about, PageDescription: e.target.value })} placeholder="Description" />
        <input className="w-full border p-2 mb-2" value={about.Email} onChange={(e) => setAbout({ ...about, Email: e.target.value })} placeholder="Email" />
        <input className="w-full border p-2 mb-2" value={about.MobileNumber} onChange={(e) => setAbout({ ...about, MobileNumber: e.target.value })} placeholder="Phone" />
        <textarea className="w-full border p-2 mb-2" rows="2" value={about.Address} onChange={(e) => setAbout({ ...about, Address: e.target.value })} placeholder="Address" />
        <button onClick={() => updatePage('aboutus', about)} className="bg-blue-600 text-white px-4 py-2 rounded">Update About Us</button>
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-3">Contact Us Page</h2>
        <input className="w-full border p-2 mb-2" value={contact.PageTitle} onChange={(e) => setContact({ ...contact, PageTitle: e.target.value })} placeholder="Title" />
        <textarea className="w-full border p-2 mb-2" rows="4" value={contact.PageDescription} onChange={(e) => setContact({ ...contact, PageDescription: e.target.value })} placeholder="Description" />
        <input className="w-full border p-2 mb-2" value={contact.Email} onChange={(e) => setContact({ ...contact, Email: e.target.value })} placeholder="Email" />
        <input className="w-full border p-2 mb-2" value={contact.MobileNumber} onChange={(e) => setContact({ ...contact, MobileNumber: e.target.value })} placeholder="Phone" />
        <textarea className="w-full border p-2 mb-2" rows="2" value={contact.Address} onChange={(e) => setContact({ ...contact, Address: e.target.value })} placeholder="Address" />
        <button onClick={() => updatePage('contactus', contact)} className="bg-blue-600 text-white px-4 py-2 rounded">Update Contact Us</button>
      </div>
    </div>
  );
}