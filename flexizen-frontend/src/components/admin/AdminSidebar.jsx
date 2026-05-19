import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, CalendarDays, MessageSquare, FileText, FileBarChart, Search, Settings, Leaf, Sparkles } from 'lucide-react';

const navItems = [
    { path: '/admin/dashboard', name: 'Dashboard', icon: LayoutDashboard },
    { path: '/admin/classes', name: 'Manage Classes', icon: Users },
    { path: '/admin/bookings', name: 'Manage Bookings', icon: CalendarDays },
    { path: '/admin/enquiries', name: 'Enquiries', icon: MessageSquare },
    { path: '/admin/pages', name: 'CMS Pages', icon: FileText },
    { path: '/admin/reports', name: 'Reports', icon: FileBarChart },
    { path: '/admin/search', name: 'Global Search', icon: Search },
    { path: '/admin/profile', name: 'Account Settings', icon: Settings },
];

const AdminSidebar = () => {
    return (
        <aside className="sticky top-0 hidden h-screen w-72 shrink-0 flex-col border-r border-white/10 bg-slate-950/95 px-4 py-5 text-white backdrop-blur-2xl lg:flex">
            <div className="mb-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/20">
                        <Leaf className="h-5 w-5" />
                    </span>
                    <div>
                        <h2 className="text-xl font-bold tracking-tight">FlexiZen</h2>
                        <p className="text-xs text-slate-400">Admin Portal</p>
                    </div>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-200">
                    <Sparkles className="h-3.5 w-3.5" />
                    Live Workspace
                </div>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto pr-1 scrollbar-thin">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                                    isActive
                                        ? 'bg-white/10 text-white shadow-lg shadow-black/10'
                                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                                }`
                            }
                        >
                            <Icon className="h-5 w-5 text-indigo-300 transition-transform duration-200 group-hover:scale-110" />
                            <span>{item.name}</span>
                        </NavLink>
                    );
                })}
            </nav>
        </aside>
    );
};

export default AdminSidebar;
