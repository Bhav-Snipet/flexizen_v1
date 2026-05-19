import { useState, useEffect, useCallback } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { enquiryService } from '../../services/enquiryService';
import { CheckCircle2, Trash2, Mail, MailOpen, CornerUpLeft, X } from 'lucide-react';

const Enquiry = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal state
    const [activeEnquiry, setActiveEnquiry] = useState(null);
    const [replyMessage, setReplyMessage] = useState('');
    const [replying, setReplying] = useState(false);

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

    const handleSendReply = async (e) => {
        e.preventDefault();
        if (!replyMessage.trim()) return;

        setReplying(true);
        try {
            await enquiryService.replyEnquiry(activeEnquiry.id, replyMessage);
            alert("Reply message sent successfully!");
            setActiveEnquiry(null);
            setReplyMessage('');
            loadEnquiries();
        } catch (error) {
            console.error("Failed to send reply", error);
            alert("Failed to dispatch email reply. Please try again.");
        } finally {
            setReplying(false);
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
                <main className="p-8 flex-1 overflow-auto animate-in fade-in duration-350">
                    <div className="mb-6 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">Inbox & Enquiries</h2>
                            <p className="text-gray-500 mt-1">Manage messages and dispatch email replies to users.</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                        {loading ? (
                            <div className="flex justify-center items-center py-24">
                                <span className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></span>
                            </div>
                        ) : enquiries.length === 0 ? (
                            <div className="text-center py-20 text-gray-400">
                                <MailOpen size={48} className="mx-auto mb-4 opacity-30 text-indigo-500" />
                                <p className="text-lg font-medium text-gray-600">Your inbox is empty</p>
                                <p className="text-sm text-gray-400 mt-1">All visitor queries have been cleared.</p>
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-100">
                                {enquiries.map((enquiry) => (
                                    <div key={enquiry.id} className={`p-6 transition-all hover:bg-slate-50/50 ${!enquiry.readStatus ? 'bg-indigo-50/30' : ''}`}>
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-start space-x-4">
                                                <div className={`p-2 rounded-xl mt-1 ${!enquiry.readStatus ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400'}`}>
                                                    {!enquiry.readStatus ? <Mail size={20} /> : <MailOpen size={20} />}
                                                </div>
                                                <div>
                                                    <h3 className={`text-base font-semibold ${!enquiry.readStatus ? 'text-gray-900 font-bold' : 'text-gray-700'}`}>
                                                        {enquiry.name}
                                                    </h3>
                                                    <a href={`mailto:${enquiry.email}`} className="text-sm text-indigo-600 hover:underline">{enquiry.email}</a>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end space-y-3">
                                                <span className="text-xs text-gray-400 font-semibold bg-gray-100 px-2.5 py-1 rounded-full">
                                                    {formatDate(enquiry.createdAt)}
                                                </span>
                                                <div className="flex space-x-2">
                                                    <button title="Reply Email" onClick={() => { setActiveEnquiry(enquiry); setReplyMessage(''); }} className="p-2 text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-all shadow-sm">
                                                        <CornerUpLeft size={16} />
                                                    </button>
                                                    {!enquiry.readStatus && (
                                                        <button title="Mark as Read" onClick={() => handleMarkAsRead(enquiry.id)} className="p-2 text-green-600 bg-green-50 rounded-xl hover:bg-green-100 transition-all shadow-sm">
                                                            <CheckCircle2 size={16} />
                                                        </button>
                                                    )}
                                                    <button title="Delete Message" onClick={() => handleDelete(enquiry.id)} className="p-2 text-red-600 bg-rose-50 rounded-xl hover:bg-rose-100 transition-all shadow-sm">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pl-14">
                                            <p className={`text-gray-700 leading-relaxed text-sm whitespace-pre-wrap ${!enquiry.readStatus ? 'font-medium text-gray-900' : ''}`}>
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

            {/* Email Reply Modal */}
            {activeEnquiry && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 bg-slate-950 text-white">
                            <h3 className="font-bold flex items-center space-x-2">
                                <CornerUpLeft size={18} className="text-indigo-400" />
                                <span>Reply to Enquiry</span>
                            </h3>
                            <button onClick={() => setActiveEnquiry(null)} className="text-slate-400 hover:text-white transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        <form onSubmit={handleSendReply} className="p-6 space-y-4">
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">To</label>
                                <div className="text-sm font-semibold text-gray-800 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-100">
                                    {activeEnquiry.name} &lt;{activeEnquiry.email}&gt;
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">Original Message</label>
                                <div className="text-xs text-gray-500 bg-slate-50/50 p-4 rounded-xl border border-slate-100 max-h-24 overflow-y-auto italic">
                                    "{activeEnquiry.message}"
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs uppercase tracking-wider text-gray-400 font-bold mb-1">Your Response *</label>
                                <textarea
                                    required
                                    rows="5"
                                    value={replyMessage}
                                    onChange={(e) => setReplyMessage(e.target.value)}
                                    placeholder="Type your message to the customer here..."
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none text-sm"
                                ></textarea>
                            </div>
                            <div className="flex space-x-3 pt-2">
                                <button type="button" onClick={() => setActiveEnquiry(null)} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-all text-sm">
                                    Cancel
                                </button>
                                <button type="submit" disabled={replying} className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-md text-sm disabled:opacity-75">
                                    {replying ? 'Sending reply...' : 'Send Email Reply'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Enquiry;
