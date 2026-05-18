import { useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { reportService } from '../../services/reportService';
import { Search, AlertCircle, Calendar, Users, FileText } from 'lucide-react';

const SearchBooking = () => {
    const [query, setQuery] = useState('');
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError('');
        setBooking(null);

        try {
            const data = await reportService.searchBooking(query.trim());
            setBooking(data);
        } catch {
            setError('No booking found matching that number.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />
            <div className="flex-1 flex flex-col">
                <AdminHeader />
                <main className="p-8 flex-1 flex flex-col items-center pt-20">
                    
                    <div className="w-full max-w-2xl text-center mb-8">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-6">
                            <Search size={32} className="text-indigo-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Global Search</h2>
                        <p className="text-gray-500 mt-2">Enter a unique Booking Number (e.g., FZ-2024...) to locate it instantly.</p>
                    </div>

                    <div className="w-full max-w-2xl bg-white p-4 rounded-2xl shadow-lg border border-gray-100 mb-10">
                        <form onSubmit={handleSearch} className="flex space-x-4">
                            <input 
                                type="text"
                                placeholder="Search FZ-..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="flex-1 px-6 py-4 bg-gray-50 border-none rounded-xl font-mono text-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                            <button 
                                type="submit"
                                disabled={loading}
                                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70"
                            >
                                {loading ? 'Searching...' : 'Search'}
                            </button>
                        </form>
                    </div>

                    {error && (
                        <div className="w-full max-w-2xl bg-red-50 text-red-600 p-6 rounded-2xl flex items-center border border-red-100 animate-in fade-in slide-in-from-top-4">
                            <AlertCircle className="mr-3" />
                            <span className="font-medium">{error}</span>
                        </div>
                    )}

                    {booking && (
                        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-300">
                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white flex justify-between items-center">
                                <div>
                                    <p className="text-indigo-200 text-sm font-semibold uppercase tracking-wider mb-1">Booking Confirmed</p>
                                    <h3 className="text-3xl font-mono font-bold">{booking.bookingNo}</h3>
                                </div>
                                <span className={`px-4 py-2 rounded-full text-sm font-bold bg-white/20 backdrop-blur-md`}>
                                    {booking.status}
                                </span>
                            </div>
                            <div className="p-8">
                                <div className="grid grid-cols-2 gap-8">
                                    <div>
                                        <div className="flex items-center text-gray-500 mb-2">
                                            <Users size={16} className="mr-2" />
                                            <span className="font-semibold text-sm uppercase">Student Info</span>
                                        </div>
                                        <p className="text-lg font-bold text-gray-900">{booking.user.name}</p>
                                        <p className="text-gray-600">{booking.user.phone}</p>
                                        {booking.user.email && <p className="text-gray-600">{booking.user.email}</p>}
                                    </div>
                                    <div>
                                        <div className="flex items-center text-gray-500 mb-2">
                                            <Calendar size={16} className="mr-2" />
                                            <span className="font-semibold text-sm uppercase">Class Info</span>
                                        </div>
                                        <p className="text-lg font-bold text-gray-900">{booking.yogaClass.title}</p>
                                        <p className="text-gray-600">{booking.yogaClass.schedule}</p>
                                    </div>
                                </div>
                                
                                <div className="mt-8 pt-8 border-t border-gray-100">
                                    <div className="flex items-center text-gray-500 mb-2">
                                        <FileText size={16} className="mr-2" />
                                        <span className="font-semibold text-sm uppercase">Registration Date</span>
                                    </div>
                                    <p className="text-gray-900 font-medium">{new Date(booking.createdAt).toLocaleString()}</p>
                                </div>

                                {booking.remark && (
                                    <div className="mt-6 bg-yellow-50 border border-yellow-100 p-4 rounded-xl">
                                        <p className="text-yellow-800 text-sm font-medium">
                                            <strong>Admin Remark:</strong> {booking.remark}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                </main>
            </div>
        </div>
    );
};

export default SearchBooking;
