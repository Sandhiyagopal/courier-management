import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="text-center py-10">
      <h1 className="text-4xl font-bold text-primary mb-4">Welcome to Courier Management System</h1>
      <p className="text-lg text-gray-700 mb-8">Fast, reliable, and real-time courier tracking.</p>
      <div className="flex justify-center gap-4">
        <Link to="/track" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-blue-700">Track a Courier</Link>
        <Link to="/contact" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">Contact Us</Link>
      </div>
    </div>
  );
}