import { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { reportService } from '../../services/reportService';
import { FileBarChart, Calendar, Download } from 'lucide-react';

const Reports = () => {
    // Default to last 30 days
    const [startDate, setStartDate] = useState(() => {
        const d = new Date();
        d.setDate(d.getDate() - 30);
        return d.toISOString().split('T')[0];
    });
    const [endDate, setEndDate] = useState(() => new Date().toISOString().split('T')[0]);
    
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchReport = async () => {
        setLoading(true);
        try {
            const data = await reportService.getBookingsReport(startDate, endDate);
            setBookings(data);
        } catch (error) {
            console.error("Failed to load report", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchReport();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const exportToCSV = () => {
        const headers = ['Booking No,Student Name,Phone,Class Title,Status,Date'];
        const rows = bookings.map(b => 
            `${b.bookingNo},"${b.user.name}",${b.user.phone},"${b.yogaClass.title}",${b.status},${new Date(b.createdAt).toLocaleDateString()}`
        );
        const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `flexizen_report_${startDate}_to_${endDate}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />
            <div className="flex-1 flex flex-col">
                <AdminHeader />
                <main className="p-8 flex-1 overflow-auto">
                    <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 tracking-tight flex items-center">
                                <FileBarChart className="mr-2 text-indigo-600" />
                                Booking Reports
                            </h2>
                            <p className="text-gray-500 mt-1">Generate and export historical booking data.</p>
                        </div>
                        <button 
                            onClick={exportToCSV}
                            disabled={bookings.length === 0}
                            className="mt-4 md:mt-0 flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-medium transition-colors shadow-sm disabled:opacity-50"
                        >
                            <Download size={18} />
                            <span>Export CSV</span>
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-wrap items-end gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <Calendar size={16} className="mr-1 text-gray-400" /> Start Date
                            </label>
                            <input 
                                type="date" 
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                                <Calendar size={16} className="mr-1 text-gray-400" /> End Date
                            </label>
                            <input 
                                type="date" 
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                        <button 
                            onClick={fetchReport}
                            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg transition-colors"
                        >
                            Generate Report
                        </button>
                    </div>

                    {/* Table */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm">
                                        <th className="px-6 py-4 font-semibold">Date</th>
                                        <th className="px-6 py-4 font-semibold">Booking No.</th>
                                        <th className="px-6 py-4 font-semibold">Student Name</th>
                                        <th className="px-6 py-4 font-semibold">Class Title</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td colSpan="5" className="text-center py-12 text-gray-500">Loading report data...</td></tr>
                                    ) : bookings.length === 0 ? (
                                        <tr><td colSpan="5" className="text-center py-12 text-gray-500">No bookings found in this date range.</td></tr>
                                    ) : (
                                        bookings.map((booking) => (
                                            <tr key={booking.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 text-sm text-gray-600">
                                                    {new Date(booking.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 font-mono text-sm font-semibold text-indigo-600">
                                                    {booking.bookingNo}
                                                </td>
                                                <td className="px-6 py-4 text-gray-800 font-medium">
                                                    {booking.user.name}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-700">
                                                    {booking.yogaClass.title}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded text-xs font-bold ${
                                                        booking.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
                                                        booking.status === 'CANCELLED' ? 'bg-red-100 text-red-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                                    }`}>
                                                        {booking.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Reports;
