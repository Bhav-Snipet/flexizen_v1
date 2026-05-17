import { useState, useEffect, useCallback } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { enquiryService } from '../../services/enquiryService';
import { CheckCircle2, Trash2, Mail, MailOpen } from 'lucide-react';

const Enquiry = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadEnquiries = useCallback(async () => {
        setLoading(true);
        try {
            const data = await enquiryService.getAllEnquiries();
            setEnquiries(data);
        } catch (error) {
            console.error("Failed to load enquiries", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadEnquiries();
    }, [loadEnquiries]);

    const handleMarkAsRead = async (id) => {
        try {
            await enquiryService.markAsRead(id);
            loadEnquiries();
        } catch {
            alert("Failed to update status.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this message?")) {
            try {
                await enquiryService.deleteEnquiry(id);
                loadEnquiries();
            } catch {
                alert("Failed to delete message.");
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />
            <div className="flex-1 flex flex-col">
                <AdminHeader />
                <main className="p-8 flex-1 overflow-auto">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Inbox / Enquiries</h2>
                        <p className="text-gray-500 mt-1">Manage messages received from the Contact Us page.</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        {loading ? (
                            <div className="text-center py-12 text-gray-500">Loading inbox...</div>
                        ) : enquiries.length === 0 ? (
                            <div className="text-center py-16 text-gray-400">
                                <MailOpen size={48} className="mx-auto mb-4 opacity-20" />
                                <p className="text-lg">Your inbox is empty.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {enquiries.map((enquiry) => (
                                    <div key={enquiry.id} className={`p-6 transition-colors hover:bg-gray-50 ${!enquiry.readStatus ? 'bg-indigo-50/30' : ''}`}>
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center space-x-3">
                                                {!enquiry.readStatus ? (
                                                    <Mail size={20} className="text-indigo-600" />
                                                ) : (
                                                    <MailOpen size={20} className="text-gray-400" />
                                                )}
                                                <div>
                                                    <h3 className={`text-lg font-medium ${!enquiry.readStatus ? 'text-gray-900 font-bold' : 'text-gray-700'}`}>
                                                        {enquiry.name}
                                                    </h3>
                                                    <a href={`mailto:${enquiry.email}`} className="text-sm text-indigo-600 hover:underline">{enquiry.email}</a>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end space-y-3">
                                                <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-md">
                                                    {formatDate(enquiry.createdAt)}
                                                </span>
                                                <div className="flex space-x-2">
                                                    {!enquiry.readStatus && (
                                                        <button title="Mark as Read" onClick={() => handleMarkAsRead(enquiry.id)} className="p-1.5 text-green-600 bg-green-50 rounded hover:bg-green-100 transition-colors">
                                                            <CheckCircle2 size={18} />
                                                        </button>
                                                    )}
                                                    <button title="Delete Message" onClick={() => handleDelete(enquiry.id)} className="p-1.5 text-red-600 bg-red-50 rounded hover:bg-red-100 transition-colors">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pl-8">
                                            <p className={`text-gray-700 whitespace-pre-wrap ${!enquiry.readStatus ? 'font-medium' : ''}`}>
                                                {enquiry.message}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Enquiry;
