// src/components/StaffSidebar.jsx
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, Truck, Search, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const menuItems = [
  { path: '/staff', name: 'Dashboard', icon: LayoutDashboard },
  { path: '/staff/add-courier', name: 'Add Courier', icon: Package },
  { path: '/staff/update-status', name: 'Status', icon: Truck },
  { path: '/staff/search', name: 'Search Courier', icon: Search },
];

export default function StaffSidebar() {
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-lg h-full">
      <div className="p-4 text-2xl font-bold border-b border-gray-700 flex items-center gap-2">
        <Package className="w-6 h-6" />
        <span>Staff Panel</span>
      </div>
      <nav className="flex-1 mt-6">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-6 py-3 text-gray-300 hover:bg-gray-800 transition-colors ${
                isActive ? 'bg-gray-800 text-white border-r-4 border-blue-500' : ''
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        {/* <button
          onClick={logout}
          className="flex items-center gap-3 w-full px-4 py-2 text-red-400 hover:bg-gray-800 rounded transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button> */}
      </div>
    </aside>
  );
}