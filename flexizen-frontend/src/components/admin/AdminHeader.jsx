import { useMemo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, Compass } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const titles = {
    '/admin/dashboard': 'Dashboard Overview',
    '/admin/classes': 'Classes Studio',
    '/admin/bookings': 'Booking Control',
    '/admin/enquiries': 'Inbox',
    '/admin/pages': 'CMS Editor',
    '/admin/reports': 'Insights',
    '/admin/search': 'Search',
    '/admin/profile': 'Account Settings',
};

const AdminHeader = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const title = useMemo(() => {
        const exact = titles[location.pathname];
        if (exact) return exact;
        return 'Overview';
    }, [location.pathname]);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur-2xl">
            <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
                <div>
                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.28em] text-slate-400">
                        <Compass className="h-3.5 w-3.5 text-indigo-300" />
                        Admin workspace
                    </div>
                    <h1 className="mt-1 text-xl font-semibold tracking-tight text-white sm:text-2xl">{title}</h1>
                </div>

                <div className="flex items-center gap-3">
                    <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 md:flex">
                        <User className="h-4 w-4 text-indigo-300" />
                        <span className="font-medium">{user?.name || user?.username || 'Admin'}</span>
                    </div>
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-rose-500/15 hover:text-rose-200 hover:border-rose-400/30"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </button>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
