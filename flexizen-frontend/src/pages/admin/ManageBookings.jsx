import { useState, useEffect, useCallback } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { bookingService } from '../../services/bookingService';
import { Check, X, MessageSquare, AlertCircle } from 'lucide-react';

const ManageBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('NEW'); // 'NEW', 'APPROVED', 'CANCELLED'
    
    // Remark modal state
    const [isRemarkModalOpen, setIsRemarkModalOpen] = useState(false);
    const [activeBookingId, setActiveBookingId] = useState(null);
    const [remarkInput, setRemarkInput] = useState('');

    const loadBookings = useCallback(async (status) => {
        setLoading(true);
        try {
            const data = await bookingService.getAllBookings(status);
            setBookings(data);
        } catch (error) {
            console.error("Failed to load bookings:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadBookings(activeTab);
    }, [activeTab, loadBookings]);

    const handleStatusUpdate = async (id, newStatus) => {
        if (window.confirm(`Are you sure you want to mark this booking as ${newStatus}?`)) {
            try {
                await bookingService.updateStatus(id, newStatus);
                loadBookings(activeTab);
            } catch {
                alert("Failed to update status.");
            }
        }
    };

    const openRemarkModal = (id, currentRemark) => {
        setActiveBookingId(id);
        setRemarkInput(currentRemark || '');
        setIsRemarkModalOpen(true);
    };

    const handleRemarkSubmit = async (e) => {
        e.preventDefault();
        try {
            await bookingService.updateRemark(activeBookingId, remarkInput);
            setIsRemarkModalOpen(false);
            loadBookings(activeTab);
        } catch {
            alert("Failed to save remark.");
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'NEW': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
            case 'APPROVED': return 'bg-green-100 text-green-700 border-green-200';
            case 'CANCELLED': return 'bg-red-100 text-red-700 border-red-200';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />
            <div className="flex-1 flex flex-col">
                <AdminHeader />
                <main className="p-8 flex-1 overflow-auto">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Manage Bookings</h2>
                        <p className="text-gray-500 mt-1">Review and action class reservations.</p>
                    </div>

                    {/* Tabs */}
                    <div className="flex space-x-1 bg-gray-200/50 p-1 rounded-xl mb-6 w-max border border-gray-200">
                        {['NEW', 'APPROVED', 'CANCELLED'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-lg font-medium text-sm transition-all ${
                                    activeTab === tab 
                                    ? 'bg-white text-indigo-700 shadow-sm' 
                                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm">
                                        <th className="px-6 py-4 font-semibold">Booking No.</th>
                                        <th className="px-6 py-4 font-semibold">Student Name</th>
                                        <th className="px-6 py-4 font-semibold">Contact Info</th>
                                        <th className="px-6 py-4 font-semibold">Class Details</th>
                                        <th className="px-6 py-4 font-semibold">Status / Remark</th>
                                        <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td colSpan="6" className="text-center py-12 text-gray-500">Loading bookings...</td></tr>
                                    ) : bookings.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className="text-center py-12">
                                                <div className="flex flex-col items-center justify-center text-gray-400">
                                                    <AlertCircle size={40} className="mb-3 opacity-20" />
                                                    <p>No bookings found with status '{activeTab}'.</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : (
                                        bookings.map((booking) => (
                                            <tr key={booking.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <span className="font-mono text-sm font-semibold text-indigo-600">{booking.bookingNo}</span>
                                                </td>
                                                <td className="px-6 py-4 text-gray-800 font-medium">{booking.user.name}</td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-700">{booking.user.phone}</div>
                                                    {booking.user.email && <div className="text-xs text-gray-500 mt-1">{booking.user.email}</div>}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm font-medium text-gray-800">{booking.yogaClass.title}</div>
                                                    <div className="text-xs text-gray-500 mt-1">{booking.yogaClass.schedule}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(booking.status)}`}>
                                                        {booking.status}
                                                    </span>
                                                    {booking.remark && (
                                                        <div className="mt-2 text-xs text-gray-600 bg-gray-100 p-2 rounded border border-gray-200">
                                                            <span className="font-semibold text-gray-500 block mb-0.5">Remark:</span>
                                                            {booking.remark}
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right space-x-2">
                                                    {booking.status === 'NEW' && (
                                                        <>
                                                            <button title="Approve" onClick={() => handleStatusUpdate(booking.id, 'APPROVED')} className="p-2 text-green-600 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                                                                <Check size={18} />
                                                            </button>
                                                            <button title="Cancel" onClick={() => handleStatusUpdate(booking.id, 'CANCELLED')} className="p-2 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                                                                <X size={18} />
                                                            </button>
                                                        </>
                                                    )}
                                                    <button title="Add/Edit Remark" onClick={() => openRemarkModal(booking.id, booking.remark)} className="p-2 text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                                                        <MessageSquare size={18} />
                                                    </button>
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

            {/* Remark Modal */}
            {isRemarkModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h3 className="text-lg font-bold text-gray-900">Add Remark</h3>
                            <button onClick={() => setIsRemarkModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleRemarkSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Admin Note / Reason</label>
                                <textarea rows="4" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none text-sm"
                                    placeholder="Enter remark here..." value={remarkInput} onChange={e => setRemarkInput(e.target.value)}></textarea>
                            </div>
                            <div className="pt-2 flex justify-end space-x-3">
                                <button type="button" onClick={() => setIsRemarkModalOpen(false)} className="px-5 py-2.5 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl font-medium transition-colors text-sm">Cancel</button>
                                <button type="submit" className="px-5 py-2.5 text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl font-medium transition-colors text-sm">Save Remark</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageBookings;
