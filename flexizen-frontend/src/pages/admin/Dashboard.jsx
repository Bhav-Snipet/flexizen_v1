import { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import StatCard from '../../components/admin/StatCard';
import { adminService } from '../../services/adminService';
import { LayoutDashboard, Users, CalendarDays, CheckCircle, MailWarning } from 'lucide-react';

const Dashboard = () => {
    const [kpis, setKpis] = useState({
        activeClasses: 0,
        newBookings: 0,
        approvedBookings: 0,
        unreadEnquiries: 0
    });
    const [loading, setLoading] = useState(true);
    const [isDemoData, setIsDemoData] = useState(false);

    useEffect(() => {
        const fetchKPIs = async () => {
            try {
                const data = await adminService.getDashboardKPIs();
                if (data && Object.keys(data).length > 0) {
                    setKpis(data);
                    setIsDemoData(false);
                } else {
                    // Fallback to active mock data if database is empty
                    setKpis({
                        activeClasses: 5,
                        newBookings: 12,
                        approvedBookings: 34,
                        unreadEnquiries: 4
                    });
                    setIsDemoData(true);
                }
            } catch (error) {
                console.warn("Failed to load backend KPIs. Displaying elegant demo statistics.", error);
                setKpis({
                    activeClasses: 5,
                    newBookings: 12,
                    approvedBookings: 34,
                    unreadEnquiries: 4
                });
                setIsDemoData(true);
            } finally {
                setLoading(false);
            }
        };
        fetchKPIs();
    }, []);

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />
            
            <div className="flex-1 flex flex-col">
                <AdminHeader />
                
                <main className="p-8 flex-1 overflow-auto">
                    <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center">
                                <LayoutDashboard className="mr-3 text-indigo-600" />
                                Dashboard Overview
                            </h2>
                            <p className="text-gray-500 mt-2 text-lg font-medium">Welcome back! Here's what's happening today.</p>
                        </div>
                        {isDemoData && (
                            <div className="mt-4 md:mt-0 inline-block text-xs bg-yellow-50 text-yellow-800 border border-yellow-100 rounded-full px-3 py-1 font-semibold self-start md:self-center">
                                Running in Presentation Demo Mode
                            </div>
                        )}
                    </div>

                    {loading ? (
                        <div className="flex items-center justify-center h-64">
                            <span className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <StatCard 
                                title="Active Classes" 
                                value={kpis.activeClasses} 
                                icon={Users} 
                                colorClass="bg-blue-50 text-blue-600"
                                gradientClass="bg-blue-400"
                                delay={100}
                            />
                            <StatCard 
                                title="New Bookings" 
                                value={kpis.newBookings} 
                                icon={CalendarDays} 
                                colorClass="bg-yellow-50 text-yellow-600"
                                gradientClass="bg-yellow-400"
                                delay={200}
                            />
                            <StatCard 
                                title="Approved Bookings" 
                                value={kpis.approvedBookings} 
                                icon={CheckCircle} 
                                colorClass="bg-green-50 text-green-600"
                                gradientClass="bg-green-400"
                                delay={300}
                            />
                            <StatCard 
                                title="Unread Messages" 
                                value={kpis.unreadEnquiries} 
                                icon={MailWarning} 
                                colorClass="bg-red-50 text-red-600"
                                gradientClass="bg-red-400"
                                delay={400}
                            />
                        </div>
                    )}

                    <div className="mt-12 bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900">Need to find a specific booking?</h3>
                            <p className="text-gray-500 mt-1">Use the quick search tool to locate reservations instantly.</p>
                        </div>
                        <a href="/admin/search" className="mt-4 md:mt-0 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                            Search Bookings
                        </a>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
