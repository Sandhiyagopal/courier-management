import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Package, Shield, Truck, Headphones } from 'lucide-react';
import { useEffect, useState } from 'react';
import API from '../components/api/api-client';

export default function Home() {
  const [branches, setBranches] = useState([]);
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [branchesRes, contactRes] = await Promise.all([
          API.get('/branches'),
          API.get('/page/contactus')
        ]);
        setBranches(branchesRes.data.slice(0, 4));
        setContactInfo(contactRes.data);
      } catch (err) {
        console.error('Failed to load homepage data', err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen min-w-screen">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-blue-500 to-blue-400 text-white py-20 px-4 m-0">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Courier Management System</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Fast, reliable, and real-time courier tracking across the country.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/track"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
            >
              Track a Courier
            </Link>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Package className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Time-critical deliveries across India.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Secure Handling</h3>
              <p className="text-gray-600">Your parcels are safe with us.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Truck className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
              <p className="text-gray-600">Live updates from pickup to delivery.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Headphones className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">We're always here to help.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Branches Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Branches</h2>
          {branches.length === 0 ? (
            <p className="text-center text-gray-500">Loading branches...</p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {branches.map((branch) => (
                <div key={branch.ID} className="bg-white border rounded-lg shadow-sm p-5 hover:shadow-md transition">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-600 mt-1 shrink-0" />
                    <div>
                      <h3 className="font-bold text-lg">{branch.BranchName}</h3>
                      <p className="text-gray-600 text-sm mt-1">{branch.BranchAddress}</p>
                      <p className="text-gray-600 text-sm">{branch.BranchCity}, {branch.BranchState} - {branch.BranchPincode}</p>
                      <p className="text-gray-600 text-sm mt-2">📞 {branch.BranchContactnumber}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="text-center mt-8">
            <Link to="/branches" className="text-blue-600 font-semibold hover:underline">View All Branches →</Link>
          </div>
        </div>
      </section>

      {/* Contact Info & Call to Action */}
      <section className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Need Assistance?</h2>
              <p className="text-gray-300 mb-6">
                Our customer support team is available 24/7. Reach out to us for any queries, complaints, or tracking help.
              </p>
              <div className="space-y-3">
                {contactInfo && (
                  <>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-blue-400" />
                      <span>{contactInfo.MobileNumber}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5 text-blue-400" />
                      <span>{contactInfo.Email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-blue-400" />
                      <span>{contactInfo.Address}</span>
                    </div>
                  </>
                )}
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
                </div>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3">Quick Actions</h3>
              <div className="flex flex-col gap-3">
                <Link
                  to="/track"
                  className="bg-blue-600 text-white text-center px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Track Your Parcel
                </Link>
                <Link
                  to="/complaints"
                  className="border border-white text-center px-4 py-2 rounded hover:bg-white hover:text-gray-800 transition"
                >
                  Raise a Complaint
                </Link>
                <Link
                  to="/contact"
                  className="border border-white text-center px-4 py-2 rounded hover:bg-white hover:text-gray-800 transition"
                >
                  Send an Enquiry
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Courier Management System. All rights reserved.</p>
          <p className="text-sm mt-2">Developed with ❤️ for fast, secure deliveries.</p>
        </div>
      </footer> */}
    </div>
  );
}