import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from "../../assets/Logo.png";
import Footer from './Footer';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center text-2xl font-bold text-primary">
            <img src={Logo} alt='logo' className='h-12 w-12' />
            Courier Management
          </Link>
          <div className="space-x-4">
            <Link to="/track" className="hover:text-blue-600">Track</Link>
            <Link to="/branches" className="hover:text-blue-600">Branches</Link>
            <Link to="/about" className="hover:text-blue-600">About</Link>
            <Link to="/complaints" className="hover:text-blue-600">Complaints</Link>
            <Link to="/contact" className="hover:text-blue-600">Contact</Link>
            {user?.role === 'admin' && <Link to="/admin" className="hover:text-blue-600">Admin</Link>}
            {user?.role === 'staff' && <Link to="/staff" className="hover:text-blue-600">Staff</Link>}
            {!user ? (
              <Link to="/login" className="bg-primary text-white px-3 py-1 rounded">Login</Link>
            ) : (
              <button onClick={handleLogout} className="bg-red-600 text-white px-3 py-1 rounded">Logout</button>
            )}
          </div>
        </div>
      </nav>
      <main className="grow p-5">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;