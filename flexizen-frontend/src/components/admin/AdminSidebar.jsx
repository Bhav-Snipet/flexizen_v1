
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, CalendarDays, MessageSquare, FileText } from 'lucide-react';

const AdminSidebar = () => {
    const navItems = [
        { path: '/admin/dashboard', name: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin/classes', name: 'Manage Classes', icon: Users },
        { path: '/admin/bookings', name: 'Manage Bookings', icon: CalendarDays },
        { path: '/admin/enquiries', name: 'Enquiries', icon: MessageSquare },
        { path: '/admin/pages', name: 'CMS Pages', icon: FileText },
    ];

    return (
        <aside className="w-64 bg-gray-900 text-white flex flex-col min-h-screen">
            <div className="p-6">
                <h2 className="text-2xl font-bold tracking-tight text-indigo-400">FlexiZen</h2>
                <p className="text-gray-400 text-xs mt-1">Admin Portal</p>
            </div>
            
            <nav className="flex-1 px-4 space-y-2 mt-4">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                                    isActive 
                                    ? 'bg-indigo-600 text-white' 
                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                }`
                            }
                        >
                            <Icon size={20} />
                            <span className="font-medium">{item.name}</span>
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
};

export default AdminSidebar;
