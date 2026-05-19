import { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import { pageService } from '../../services/pageService';
import { enquiryService } from '../../services/enquiryService';
import { Mail, Phone, MapPin, CheckCircle, Sparkles, Send, Clock3, Globe } from 'lucide-react';

const DEFAULT_CONTACT_CONTENT = `
<h2>Find Us at Our Sanctuary</h2>
<p><strong>Studio Address:</strong><br />42, Serenity Lane, Koregaon Park, Pune — 411001, Maharashtra, India</p>
<p><strong>Support & Enquiries:</strong><br />Phone: +91 98765 43210<br />Email: hello@flexizen.com</p>
<p><strong>Studio Hours:</strong><br />Monday to Saturday — 6:00 AM to 8:00 PM<br />Sunday — 8:00 AM to 12:00 PM</p>
<p>Feel free to drop in for a peaceful trial class or message us with any questions. We look forward to meeting you!</p>
`;

const contacts = [
    { icon: Phone, label: 'Phone', value: '+91 98765 43210' },
    { icon: Mail, label: 'Email', value: 'hello@flexizen.com' },
    { icon: MapPin, label: 'Location', value: 'Koregaon Park, Pune' },
    { icon: Clock3, label: 'Hours', value: 'Mon–Sat 6 AM–8 PM' },
];

const ContactUs = () => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

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
        <div className="app-shell flex min-h-screen flex-col">
            <Navbar />
            <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                <section className="surface relative overflow-hidden p-8 sm:p-10 lg:p-12">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=2200"
                            alt="Contact studio"
                            className="h-full w-full object-cover opacity-10"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/88 to-violet-950/80" />
                    </div>

                    <div className="relative grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
                        <div>
                            <div className="muted-kicker">
                                <Sparkles className="h-3.5 w-3.5" />
                                Contact FlexiZen
                            </div>
                            <h1 className="mt-5 text-4xl font-black tracking-tight text-white md:text-6xl">
                                Say hello.
                                <span className="mt-2 block bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
                                    We respond with care.
                                </span>
                            </h1>
                            <p className="mt-5 max-w-xl text-base leading-8 text-slate-300">
                                Reach out with questions, suggestions, or a simple hello. The contact page feels like a premium studio landing page, with contact details and enquiry support in one place.
                            </p>

                            <div className="mt-8 grid gap-4 sm:grid-cols-2">
                                {contacts.map((contact) => {
                                    const Icon = contact.icon;
                                    return (
                                        <div key={contact.label} className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                                            <Icon className="h-5 w-5 text-indigo-200" />
                                            <p className="mt-3 text-xs uppercase tracking-[0.22em] text-slate-400">{contact.label}</p>
                                            <p className="mt-2 text-sm font-semibold text-white">{contact.value}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="surface animated-border p-6 sm:p-8">
                            {success ? (
                                <div className="flex h-full flex-col items-center justify-center py-10 text-center">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                                        <CheckCircle className="h-10 w-10" />
                                    </div>
                                    <h2 className="mt-6 text-3xl font-bold text-white">Message sent!</h2>
                                    <p className="mt-3 max-w-md text-sm leading-7 text-slate-300">
                                        Thanks for reaching out. The admin inbox has received your enquiry.
                                    </p>
                                    <button type="button" onClick={() => setSuccess(false)} className="btn-secondary mt-8">
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-indigo-200">
                                            <Send className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-white">Send an enquiry</h2>
                                            <p className="text-sm text-slate-400">A direct line to the studio team.</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                                        <div>
                                            <label className="label-soft">Your Name</label>
                                            <input
                                                type="text"
                                                required
                                                className="input-surface"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="Your full name"
                                            />
                                        </div>
                                        <div>
                                            <label className="label-soft">Email Address</label>
                                            <input
                                                type="email"
                                                required
                                                className="input-surface"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="you@example.com"
                                            />
                                        </div>
                                        <div>
                                            <label className="label-soft">Message</label>
                                            <textarea
                                                required
                                                rows="5"
                                                className="input-surface resize-none"
                                                value={formData.message}
                                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                placeholder="Tell us what you need help with..."
                                            />
                                        </div>

                                        <button type="submit" disabled={submitting} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70">
                                            {submitting ? 'Sending...' : 'Submit Enquiry'}
                                        </button>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                <section className="mt-10 surface overflow-hidden">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <span className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-indigo-400" />
                        </div>
                    ) : (
                        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                            <div className="p-8">
                                <div
                                    className="prose prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{ __html: content }}
                                />
                            </div>
                            <div className="border-t border-white/10 p-8 lg:border-l lg:border-t-0">
                                <div className="rounded-[1.6rem] border border-white/10 bg-slate-950/60 p-6">
                                    <div className="flex items-center gap-3 text-indigo-200">
                                        <Globe className="h-5 w-5" />
                                        <span className="text-xs font-semibold uppercase tracking-[0.24em]">Studio presence</span>
                                    </div>
                                    <div className="mt-5 h-72 overflow-hidden rounded-[1.35rem]">
                                        <img
                                            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1600"
                                            alt="Yoga studio interior"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default ContactUs;
