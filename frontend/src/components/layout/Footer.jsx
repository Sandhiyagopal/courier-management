import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useEffect, useState } from 'react';
import API from '../../components/api/api-client';

const Footer = () => {
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const { data } = await API.get('/page/contactus');
        setContactInfo(data);
      } catch (err) {
        console.error('Failed to load contact info', err);
      }
    };
    fetchContact();
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Courier Management System</h3>
            <p className="text-sm">
              Fast, reliable, and real-time courier tracking across the country. 
              We ensure safe and timely delivery of your parcels.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/track" className="hover:text-white transition">Track a Courier</Link></li>
              <li><Link to="/branches" className="hover:text-white transition">Our Branches</Link></li>
              <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
              <li><Link to="/complaints" className="hover:text-white transition">Raise a Complaint</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Info</h3>
            {contactInfo ? (
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <MapPin size={16} className="mt-0.5 shrink-0" />
                  <span>{contactInfo.Address}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>{contactInfo.MobileNumber}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>{contactInfo.Email}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
                </li>
              </ul>
            ) : (
              <p className="text-sm">Loading contact info...</p>
            )}
          </div>

          {/* Social & Newsletter */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>
            {/* <div className="flex space-x-4 mb-6">
              <a href="#" className="hover:text-white transition"><Facebook size={20} /></a>
              <a href="#" className="hover:text-white transition"><Twitter size={20} /></a>
              <a href="#" className="hover:text-white transition"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white transition"><Linkedin size={20} /></a>
            </div> */}
            <div>
              <h4 className="text-white text-sm font-semibold mb-2">Newsletter</h4>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 rounded-l-md text-gray-800 w-full focus:outline-none"
                />
                <button className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700 transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Courier Management System. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;