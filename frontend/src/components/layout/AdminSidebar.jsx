import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Building2, 
  Package, 
  MessageSquare, 
  Mail, 
  BarChart3,
  LogOut
} from 'lucide-react';

const menuItems = [
  { path: '/admin', name: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/branches', name: 'Branches', icon: Building2 },
  { path: '/admin/cms-staff', name: 'CMS Staff', icon: Package },
  { path: '/admin/couriers', name: 'Courier', icon: Package },
  { path: '/admin/complaints', name: 'Complaints', icon: MessageSquare },
  { path: '/admin/pages', name: 'Pages', icon: Mail },
  { path: '/admin/enquiries', name: 'Enquiry', icon: Mail },
  { path: '/admin/reports', name: 'Reports', icon: BarChart3 },
];

export default function AdminSidebar() {

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col shadow-lg h-full">
      <div className="p-4 text-2xl font-bold border-b border-gray-700 flex items-center gap-2">
        <Package className="w-6 h-6" />
        <span>CMS Admin</span>
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
    </aside>
  );
}