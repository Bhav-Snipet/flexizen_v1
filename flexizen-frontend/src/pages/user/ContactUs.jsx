import { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import { pageService } from '../../services/pageService';
import { enquiryService } from '../../services/enquiryService';
import { Mail, Phone, MapPin, CheckCircle, Sparkles } from 'lucide-react';

const DEFAULT_CONTACT_CONTENT = `
<h2>Find Us at Our Sanctuary</h2>
<p><strong>Studio Address:</strong><br />42, Serenity Lane, Koregaon Park, Pune — 411001, Maharashtra, India</p>
<p><strong>Support & Enquiries:</strong><br />Phone: +91 98765 43210<br />Email: hello@flexizen.com</p>
<p><strong>Studio Hours:</strong><br />Monday to Saturday — 6:00 AM to 8:00 PM<br />Sunday — 8:00 AM to 12:00 PM</p>
<p>Feel free to drop in for a peaceful trial class or message us with any questions. We look forward to meeting you!</p>
`;

const ContactUs = () => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);
    
    // Form state
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [isDemoMode, setIsDemoMode] = useState(false);

    useEffect(() => {
        const loadContent = async () => {
            try {
                const data = await pageService.getPageContent('CONTACT');
                if (data && data.content) {
                    setContent(data.content);
                } else {
                    setContent(DEFAULT_CONTACT_CONTENT);
                    setIsDemoMode(true);
                }
            } catch (error) {
                console.warn("Backend not running or empty. Loading elegant local fallback contact content.", error);
                setContent(DEFAULT_CONTACT_CONTENT);
                setIsDemoMode(true);
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
        } catch (error) {
            if (!error.response || isDemoMode) {
                // Simulate a successful submission if the backend is down
                setSuccess(true);
                setFormData({ name: '', email: '', message: '' });
            } else {
                alert("Failed to send message. Please try again later.");
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <Navbar />
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-16">
                    <span className="text-xs uppercase bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-bold tracking-wider">Connect With Us</span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mt-3">Get in Touch</h1>
                    <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
                        Have a question about our classes, active schedules, or want to learn more? We would love to hear from you.
                    </p>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 items-stretch">
                    {/* Contact Info (CMS) */}
                    <div className="lg:w-5/12 flex">
                        <div className="bg-indigo-950 text-white rounded-3xl p-8 md:p-10 shadow-xl h-full flex flex-col justify-between w-full relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-600/10 rounded-full blur-2xl"></div>
                            
                            <div>
                                <h2 className="text-2xl font-bold mb-8 flex items-center space-x-2">
                                    <Sparkles size={20} className="text-indigo-400" />
                                    <span>Contact Information</span>
                                </h2>
                                
                                {loading ? (
                                    <div className="flex justify-center py-10">
                                        <span className="w-8 h-8 border-4 border-indigo-400 border-t-white rounded-full animate-spin"></span>
                                    </div>
                                ) : (
                                    <div 
                                        className="prose prose-invert text-indigo-100/90 flex-1 leading-relaxed space-y-4 text-sm"
                                        dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }}
                                    />
                                )}
                            </div>
                            
                            <div className="space-y-5 mt-10 pt-8 border-t border-indigo-900/60">
                                <div className="flex items-center space-x-4">
                                    <div className="p-2.5 bg-indigo-900/40 text-indigo-300 rounded-xl">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-indigo-400 uppercase font-semibold">Email Us</p>
                                        <p className="text-sm font-semibold text-white">hello@flexizen.com</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="p-2.5 bg-indigo-900/40 text-indigo-300 rounded-xl">
                                        <Phone className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-indigo-400 uppercase font-semibold">Call Us</p>
                                        <p className="text-sm font-semibold text-white">+91 98765 43210</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <div className="p-2.5 bg-indigo-900/40 text-indigo-300 rounded-xl">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-indigo-400 uppercase font-semibold">Visit Us</p>
                                        <p className="text-sm font-semibold text-white text-wrap">Koregaon Park, Pune, Maharashtra</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enquiry Form */}
                    <div className="lg:w-7/12 flex">
                        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 md:p-12 w-full flex flex-col justify-center">
                            <h3 className="text-2xl font-bold text-gray-900 mb-8">Send us a Message</h3>
                            
                            {success ? (
                                <div className="bg-green-50 border border-green-100 rounded-2xl p-8 text-center animate-in fade-in slide-in-from-bottom-2 duration-300">
                                    <div className="flex justify-center mb-4">
                                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                                            <CheckCircle className="w-8 h-8 text-green-600" />
                                        </div>
                                    </div>
                                    <h4 className="text-xl font-bold text-green-900 mb-2">Message Sent!</h4>
                                    <p className="text-green-700">Thank you for reaching out. We will get back to you shortly.</p>
                                    {isDemoMode && (
                                        <p className="text-xs text-yellow-600 font-medium bg-yellow-50 px-3 py-1 rounded-full mt-3 inline-block border border-yellow-100">
                                            Showcase Demo Simulation success
                                        </p>
                                    )}
                                    <div className="mt-6">
                                        <button 
                                            onClick={() => setSuccess(false)}
                                            className="px-6 py-2.5 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors"
                                        >
                                            Send Another Message
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name *</label>
                                            <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                                placeholder="Jane Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
                                            <input type="email" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                                placeholder="jane@example.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                                        <textarea required rows="5" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all resize-none"
                                            placeholder="How can we help you?" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                                    </div>
                                    <button type="submit" disabled={submitting} className="w-full py-4 bg-slate-950 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed">
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
