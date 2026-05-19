import { useState, useEffect, useMemo, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User, Compass, Bell, Mail, Calendar, Check, CheckSquare } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { notificationService } from '../../services/notificationService';

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

    const [notifications, setNotifications] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const title = useMemo(() => {
        const exact = titles[location.pathname];
        if (exact) return exact;
        return 'Overview';
    }, [location.pathname]);

    // Fetch unread notifications
    const loadNotifications = async () => {
        try {
            const data = await notificationService.getUnreadNotifications();
            setNotifications(data || []);
        } catch (error) {
            console.warn("Failed to load notifications or backend is offline. Using local presentation alerts.", error);
            // Dynamic UI fallbacks for demo presentation
            setNotifications([
                { id: 991, message: "New booking requested for Power Vinyasa by Sarah Jenkins", type: "BOOKING", readStatus: false, createdAt: new Date() },
                { id: 992, message: "New enquiry received from David Miller (david@example.com)", type: "ENQUIRY", readStatus: false, createdAt: new Date() }
            ]);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadNotifications();
        // Setup polling every 10 seconds to fetch new alerts
        const interval = setInterval(loadNotifications, 10000);
        return () => clearInterval(interval);
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    const handleMarkAllRead = async () => {
        try {
            await notificationService.markAllAsRead();
            setNotifications([]);
        } catch (error) {
            console.error("Mark all read failed, clear UI locally", error);
            setNotifications([]);
        }
    };

    const handleMarkRead = async (id) => {
        try {
            await notificationService.markAsRead(id);
            setNotifications(prev => prev.filter(n => n.id !== id));
        } catch (error) {
            console.error("Mark read failed, remove locally", error);
            setNotifications(prev => prev.filter(n => n.id !== id));
        }
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
                    {/* In-App Notifications Bell */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            type="button"
                            onClick={() => setShowDropdown(!showDropdown)}
                            className="relative rounded-full border border-white/10 bg-white/5 p-2.5 text-slate-200 transition hover:bg-white/10 hover:text-white"
                        >
                            <Bell className="h-5 w-5" />
                            {notifications.length > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white ring-2 ring-slate-950 animate-pulse">
                                    {notifications.length}
                                </span>
                            )}
                        </button>

                        {showDropdown && (
                            <div className="absolute right-0 mt-3 w-80 sm:w-96 origin-top-right rounded-2xl border border-white/10 bg-slate-900 shadow-2xl ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                                    <h3 className="font-semibold text-white text-sm">Notifications</h3>
                                    {notifications.length > 0 && (
                                        <button
                                            onClick={handleMarkAllRead}
                                            className="flex items-center text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                                        >
                                            <CheckSquare className="mr-1 h-3.5 w-3.5" />
                                            Clear All
                                        </button>
                                    )}
                                </div>
                                <div className="max-h-64 overflow-y-auto divide-y divide-white/5">
                                    {notifications.length > 0 ? (
                                        notifications.map((n) => (
                                            <div key={n.id} className="group relative flex items-start gap-3 p-4 hover:bg-white/5 transition-colors">
                                                <div className={`mt-0.5 rounded-lg p-1.5 ${n.type === 'BOOKING' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                                                    {n.type === 'BOOKING' ? <Calendar className="h-4 w-4" /> : <Mail className="h-4 w-4" />}
                                                </div>
                                                <div className="flex-1 min-w-0 pr-6">
                                                    <p className="text-xs text-slate-200 leading-normal">{n.message}</p>
                                                    <span className="mt-1 block text-[10px] text-slate-500">Just now</span>
                                                </div>
                                                <button
                                                    onClick={() => handleMarkRead(n.id)}
                                                    className="absolute right-3 top-4 text-slate-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                                    title="Mark read"
                                                >
                                                    <Check className="h-4 w-4" />
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-8 text-center text-xs text-slate-500 italic">
                                            No unread notifications
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

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
