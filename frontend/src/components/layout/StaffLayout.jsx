import { Outlet } from 'react-router-dom';
import StaffSidebar from './StaffSidebar';
import { useAuth } from '../context/AuthContext';
import { LogOut } from 'lucide-react';

export default function StaffLayout() {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen bg-gray-100">
      <StaffSidebar />
      <div className="flex-1 flex flex-col overflow-auto">
        {/* Top Navbar */}
        <header className="bg-white shadow-sm px-6 py-3 flex justify-between items-center border-b">
          <h1 className="text-xl font-semibold text-gray-800">STAFF PANEL</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Welcome, {user?.name || 'Staff'}</span>
            <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center">
              {user?.name?.charAt(0) || 'S'}
            </div>
            <button onClick={logout} className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-transparent rounded transition-colors">
                <LogOut size={20} />
                <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}