import { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import { pageService } from '../../services/pageService';
import { enquiryService } from '../../services/enquiryService';
import { Mail, Phone, MapPin, CheckCircle } from 'lucide-react';

const ContactUs = () => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    
    // Form state
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const loadContent = async () => {
            try {
                const data = await pageService.getPageContent('CONTACT');
                setContent(data.content);
            } catch (error) {
                console.error("Failed to load contact info", error);
            } finally {
                setLoading(false);
            }
        };
        loadContent();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await enquiryService.submitEnquiry(formData);
            setSuccess(true);
            setFormData({ name: '', email: '', message: '' });
        } catch {
            alert("Failed to send message. Please try again later.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Get in Touch</h1>
                    <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
                        Have a question about our classes or want to learn more? We'd love to hear from you.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Contact Info (CMS) */}
                    <div className="lg:w-1/3">
                        <div className="bg-indigo-600 text-white rounded-2xl p-8 shadow-xl h-full flex flex-col">
                            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                            
                            {loading ? (
                                <div className="flex-1 flex items-center justify-center">
                                    <span className="w-8 h-8 border-4 border-indigo-400 border-t-white rounded-full animate-spin"></span>
                                </div>
                            ) : (
                                <div 
                                    className="prose prose-invert mb-10 text-indigo-100 flex-1"
                                    dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }}
                                />
                            )}
                            
                            <div className="space-y-6 mt-8 pt-8 border-t border-indigo-500/50">
                                <div className="flex items-start space-x-4">
                                    <Mail className="w-6 h-6 text-indigo-300 mt-1" />
                                    <div>
                                        <p className="font-semibold text-white">Email Us</p>
                                        <p className="text-indigo-200">hello@flexizen.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <Phone className="w-6 h-6 text-indigo-300 mt-1" />
                                    <div>
                                        <p className="font-semibold text-white">Call Us</p>
                                        <p className="text-indigo-200">+1 (555) 123-4567</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <MapPin className="w-6 h-6 text-indigo-300 mt-1" />
                                    <div>
                                        <p className="font-semibold text-white">Visit Us</p>
                                        <p className="text-indigo-200">123 Serenity Lane, Wellness City, ST 12345</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enquiry Form */}
                    <div className="lg:w-2/3">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                            <h3 className="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h3>
                            
                            {success ? (
                                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                                    <div className="flex justify-center mb-4">
                                        <CheckCircle className="w-12 h-12 text-green-500" />
                                    </div>
                                    <h4 className="text-xl font-bold text-green-900 mb-2">Message Sent Successfully!</h4>
                                    <p className="text-green-700">Thank you for reaching out. Our team will get back to you shortly.</p>
                                    <button 
                                        onClick={() => setSuccess(false)}
                                        className="mt-6 px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Your Name *</label>
                                            <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                                placeholder="Jane Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                                            <input type="email" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                                placeholder="jane@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                                        <textarea required rows="5" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                                            placeholder="How can we help you?" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                                    </div>
                                    <button type="submit" disabled={submitting} className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-sm transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed">
                                        {submitting ? 'Sending Message...' : 'Send Message'}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ContactUs;
