import { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { pageService } from '../../services/pageService';
import { Save, FileText } from 'lucide-react';

const ManagePages = () => {
    const [aboutContent, setAboutContent] = useState('');
    const [contactContent, setContactContent] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState({ about: false, contact: false });

    useEffect(() => {
        const loadPages = async () => {
            try {
                const [about, contact] = await Promise.all([
                    pageService.getPageContent('ABOUT'),
                    pageService.getPageContent('CONTACT')
                ]);
                setAboutContent(about.content || '');
                setContactContent(contact.content || '');
            } catch (error) {
                console.error("Failed to load page content", error);
            } finally {
                setLoading(false);
            }
        };
        loadPages();
    }, []);

    const handleSave = async (type, content) => {
        setSaving(prev => ({ ...prev, [type.toLowerCase()]: true }));
        try {
            await pageService.updatePageContent(type, content);
            alert(`${type} page updated successfully!`);
        } catch {
            alert(`Failed to update ${type} page.`);
        } finally {
            setSaving(prev => ({ ...prev, [type.toLowerCase()]: false }));
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />
            <div className="flex-1 flex flex-col">
                <AdminHeader />
                <main className="p-8 flex-1 overflow-auto">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Manage Pages (CMS)</h2>
                        <p className="text-gray-500 mt-1">Update the content shown on the public frontend website.</p>
                    </div>

                    {loading ? (
                        <div className="text-center py-12 text-gray-500">Loading editor...</div>
                    ) : (
                        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                            
                            {/* About Us Editor */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[600px]">
                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                    <div className="flex items-center space-x-2 text-indigo-700 font-semibold">
                                        <FileText size={20} />
                                        <h3>About Us Page</h3>
                                    </div>
                                    <button 
                                        onClick={() => handleSave('ABOUT', aboutContent)}
                                        disabled={saving.about}
                                        className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm disabled:opacity-70"
                                    >
                                        <Save size={16} />
                                        <span>{saving.about ? 'Saving...' : 'Save Changes'}</span>
                                    </button>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <p className="text-sm text-gray-500 mb-2">HTML tags like &lt;b&gt;, &lt;i&gt;, or basic text formatting are supported.</p>
                                    <textarea 
                                        className="w-full flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none font-mono text-sm leading-relaxed"
                                        value={aboutContent}
                                        onChange={(e) => setAboutContent(e.target.value)}
                                        placeholder="Enter the About Us content here..."
                                    ></textarea>
                                </div>
                            </div>

                            {/* Contact Us Editor */}
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-[600px]">
                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                                    <div className="flex items-center space-x-2 text-indigo-700 font-semibold">
                                        <FileText size={20} />
                                        <h3>Contact Information</h3>
                                    </div>
                                    <button 
                                        onClick={() => handleSave('CONTACT', contactContent)}
                                        disabled={saving.contact}
                                        className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm disabled:opacity-70"
                                    >
                                        <Save size={16} />
                                        <span>{saving.contact ? 'Saving...' : 'Save Changes'}</span>
                                    </button>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <p className="text-sm text-gray-500 mb-2">This content appears on the left side of the Contact form.</p>
                                    <textarea 
                                        className="w-full flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none font-mono text-sm leading-relaxed"
                                        value={contactContent}
                                        onChange={(e) => setContactContent(e.target.value)}
                                        placeholder="Enter address or extra contact details here..."
                                    ></textarea>
                                </div>
                            </div>

                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ManagePages;
