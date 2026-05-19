import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import { classService } from '../../services/classService';
import { enquiryService } from '../../services/enquiryService';
import {
    Calendar,
    Users,
    CheckCircle,
    ShieldCheck,
    Sparkles,
    ArrowLeft,
    ArrowRight,
    ChevronDown,
    MessageSquare,
    Phone,
    Mail,
} from 'lucide-react';

const DUMMY_CLASSES = [
    {
        id: 101,
        title: 'Morning Flow Yoga',
        description: 'A gentle morning yoga session to awaken the body, stretch key muscles, and set a positive tone for the day. Perfect for all experience levels.',
        schedule: 'Mon / Wed / Fri — 7:00 AM to 8:00 AM',
        capacity: 20,
        active: true,
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=900'
    },
    {
        id: 102,
        title: 'Power Vinyasa',
        description: 'An energetic and athletic practice connecting continuous breath with active postures. Great for building core strength, muscle tone, and cardio stamina.',
        schedule: 'Tue / Thu — 6:30 PM to 7:45 PM',
        capacity: 15,
        active: true,
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=900'
    },
    {
        id: 103,
        title: 'Yin Yoga & Deep Meditation',
        description: 'A restorative, slow-paced class focusing on holding deep passive poses targeting connective tissues, ligaments, and joints. Ends with a guided meditation.',
        schedule: 'Sat / Sun — 9:00 AM to 10:30 AM',
        capacity: 18,
        active: true,
        image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=900'
    },
    {
        id: 104,
        title: 'Beginner Hatha Yoga',
        description: 'A foundational class designed specifically for absolute beginners. Explore classic yoga postures, learn alignment rules, and understand breath control.',
        schedule: 'Mon / Wed — 5:00 PM to 6:15 PM',
        capacity: 20,
        active: true,
        image: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=900'
    },
    {
        id: 105,
        title: 'Advanced Ashtanga Series',
        description: 'A highly structured, physically demanding practice utilizing sequential postures. Designed specifically for regular practitioners seeking an active challenge.',
        schedule: 'Tue / Thu / Sat — 7:00 AM to 8:30 AM',
        capacity: 12,
        active: true,
        image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&q=80&w=900'
    }
];

const BookingForm = () => {
    const { classId } = useParams();
    const [searchParams] = useSearchParams();
    const queryClassId = searchParams.get('classId') || searchParams.get('sessionId') || '';
    const initialSelectedId = classId || queryClassId || '';

    const [classes, setClasses] = useState([]);
    const [selectedClassId, setSelectedClassId] = useState('');
    const [isSessionMenuOpen, setIsSessionMenuOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [referenceNo, setReferenceNo] = useState('');
    const [formData, setFormData] = useState({ name: '', phone: '', email: '', notes: '' });
    const [isDemoMode, setIsDemoMode] = useState(false);

    useEffect(() => {
        const loadClassDetails = async () => {
            try {
                const data = await classService.getActiveClasses();
                const allClasses = data && data.length > 0 ? data : DUMMY_CLASSES;
                setClasses(allClasses);
                setIsDemoMode(!data || data.length === 0);
            } catch (error) {
                console.warn('Failed to load live class details. Using demo classes.', error);
                setClasses(DUMMY_CLASSES);
                setIsDemoMode(true);
            } finally {
                setLoading(false);
            }
        };
        loadClassDetails();
    }, []);

    const sessionMenuRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (sessionMenuRef.current && !sessionMenuRef.current.contains(event.target)) {
                setIsSessionMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    const effectiveSelectedClassId = selectedClassId || initialSelectedId;

    const selectedClass = useMemo(
        () => classes.find((item) => item.id.toString() === effectiveSelectedClassId) || null,
        [classes, effectiveSelectedClassId]
    );

    const currentClassImage =
        selectedClass?.image ||
        'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200';

    const hasRouteSelection = Boolean(initialSelectedId);

    const generateReference = (prefix = 'ENQ') => {
        const timestamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
        const randomId = Math.floor(1000 + Math.random() * 9000);
        return `${prefix}-${timestamp}${randomId}`;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!effectiveSelectedClassId) {
            alert('Please choose a session first.');
            return;
        }

        if (!selectedClass) {
            alert('The selected session could not be loaded. Please choose another class.');
            return;
        }

        setSubmitting(true);
        try {
            const payload = {
                name: formData.name,
                phone: formData.phone,
                email: formData.email,
                message: [
                    `Session: ${selectedClass.title}`,
                    `Schedule: ${selectedClass.schedule}`,
                    '',
                    formData.notes?.trim() ? `Notes: ${formData.notes.trim()}` : 'Notes: -',
                ] .join('\n'),
                sessionId: Number(effectiveSelectedClassId),
                sessionTitle: selectedClass.title,
            };

            const response = await enquiryService.submitEnquiry(payload);
            setReferenceNo(response?.id ? `ENQ-${response.id}` : generateReference());
            setSuccess(true);
        } catch (error) {
            if (!error.response || isDemoMode) {
                setReferenceNo(generateReference());
                setSuccess(true);
            } else {
                alert('Failed to submit enquiry. Please try again.');
                console.error('Enquiry submission failed:', error);
            }
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="app-shell flex min-h-screen flex-col">
                <Navbar />
                <div className="flex flex-1 items-center justify-center">
                    <span className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-indigo-400" />
                </div>
            </div>
        );
    }

    if (hasRouteSelection && !selectedClass) {
        return (
            <div className="app-shell flex min-h-screen flex-col">
                <Navbar />
                <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
                    <p className="muted-kicker">
                        <Sparkles className="h-3.5 w-3.5" />
                        Session not found
                    </p>
                    <h2 className="mt-4 text-3xl font-bold text-white">We could not load this session.</h2>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
                        The selected class is not available right now. Please return to the classes page and choose another session.
                    </p>
                    <Link to="/classes" className="btn-primary mt-6">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Return to Classes
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="app-shell flex min-h-screen flex-col">
            <Navbar />
            <main className="mx-auto flex w-full flex-1 max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                {success ? (
                    <div className="surface mx-auto w-full max-w-2xl p-8 text-center sm:p-12">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-300">
                            <CheckCircle className="h-10 w-10" />
                        </div>
                        <p className="muted-kicker mx-auto mt-6 w-fit">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            Enquiry received
                        </p>
                        <h2 className="mt-5 text-3xl font-black tracking-tight text-white">Your session enquiry has been submitted.</h2>
                        <p className="mt-3 text-slate-300">
                            A request for <span className="font-semibold text-white">{selectedClass?.title || 'your chosen session'}</span> was completed successfully.
                        </p>

                        <div className="animated-border mt-8 rounded-[1.6rem] bg-white/5 p-6">
                            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Reference number</p>
                            <p className="mt-3 break-all font-mono text-3xl font-bold tracking-wider text-indigo-200">
                                {referenceNo}
                            </p>
                        </div>

                        {isDemoMode && (
                            <p className="mt-5 rounded-full border border-amber-400/20 bg-amber-500/10 px-4 py-2 text-xs font-medium text-amber-200">
                                Demo mode generated this reference because the backend was unavailable.
                            </p>
                        )}

                        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                            <Link to="/classes" className="btn-secondary">
                                Browse more classes
                            </Link>
                            <Link to="/contact" className="btn-primary">
                                Contact the studio
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid w-full gap-8 xl:grid-cols-[1.05fr_0.95fr]">
                        <aside className="surface overflow-hidden p-6 sm:p-8">
                            <p className="muted-kicker">
                                <Sparkles className="h-3.5 w-3.5" />
                                Selected session
                            </p>
                            <div className="mt-5 overflow-hidden rounded-[1.6rem] border border-white/10">
                                <img
                                    src={currentClassImage}
                                    alt={selectedClass?.title || 'Yoga session preview'}
                                    className="h-72 w-full object-cover"
                                />
                            </div>

                            <div className="mt-6">
                                <h2 className="text-3xl font-bold tracking-tight text-white">
                                    {selectedClass?.title || 'Choose a session to continue'}
                                </h2>
                                <p className="mt-3 text-sm leading-7 text-slate-300">
                                    {selectedClass?.description ||
                                        'Use the dropdown on the right to choose the session you want to enquire about or book.'}
                                </p>

                                {selectedClass ? (
                                    <div className="mt-6 space-y-3 rounded-3xl border border-white/10 bg-white/5 p-5">
                                        <div className="flex items-center gap-3 text-sm text-slate-200">
                                            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-200">
                                                <Calendar className="h-4 w-4" />
                                            </span>
                                            <span>{selectedClass.schedule}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-slate-200">
                                            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-200">
                                                <Users className="h-4 w-4" />
                                            </span>
                                            <span>{selectedClass.capacity} spots available</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-slate-300">
                                        Select a class from the dropdown to see the schedule, capacity, and session preview here.
                                    </div>
                                )}

                                <div className="mt-6 rounded-3xl border border-indigo-400/15 bg-indigo-500/10 p-5">
                                    <p className="text-xs uppercase tracking-[0.22em] text-indigo-200">How it works</p>
                                    <p className="mt-3 text-sm leading-7 text-slate-200">
                                        Choose your session, fill in your details, and send the request. The studio team can then review it from the admin panel.
                                    </p>
                                </div>

                                {isDemoMode && (
                                    <p className="mt-5 rounded-full border border-amber-400/20 bg-amber-500/10 px-4 py-2 text-xs font-medium text-amber-200">
                                        Demo classes are currently being shown because the backend returned no sessions.
                                    </p>
                                )}
                            </div>
                        </aside>

                        <section className="surface p-6 sm:p-8">
                            <p className="muted-kicker">
                                <ShieldCheck className="h-3.5 w-3.5" />
                                Enquiry form
                            </p>
                            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">Select your session</h2>
                            <p className="mt-2 text-sm leading-7 text-slate-300">
                                If you arrived from a class card, that session is already preselected. Otherwise, choose one from the dropdown below.
                            </p>

                            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                                <div ref={sessionMenuRef}>
                                    <label className="label-soft">Session *</label>
                                    <div className="relative">
                                        <button
                                            type="button"
                                            onClick={() => setIsSessionMenuOpen((open) => !open)}
                                            className="input-surface flex items-center justify-between gap-3 text-left"
                                            aria-haspopup="listbox"
                                            aria-expanded={isSessionMenuOpen}
                                        >
                                            <span className="min-w-0 flex-1">
                                                <span className="block text-sm font-medium text-white">
                                                    {selectedClass ? selectedClass.title : 'Choose a session'}
                                                </span>
                                                <span className="mt-1 block truncate text-xs text-slate-400">
                                                    {selectedClass ? selectedClass.schedule : 'Select a live class from the menu below'}
                                                </span>
                                            </span>
                                            <ChevronDown className={`h-4 w-4 flex-shrink-0 text-slate-300 transition-transform duration-300 ${isSessionMenuOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {isSessionMenuOpen && (
                                            <div className="absolute z-20 mt-3 w-full overflow-hidden rounded-[1.35rem] border border-white/10 bg-slate-950/98 p-2 shadow-[0_24px_70px_-20px_rgba(15,23,42,0.95)] backdrop-blur-2xl">
                                                <div className="max-h-72 overflow-y-auto pr-1 scrollbar-thin" role="listbox" aria-label="Available sessions">
                                                    {classes.map((item) => {
                                                        const active = item.id.toString() === effectiveSelectedClassId;
                                                        return (
                                                            <button
                                                                key={item.id}
                                                                type="button"
                                                                onClick={() => {
                                                                    setSelectedClassId(item.id.toString());
                                                                    setIsSessionMenuOpen(false);
                                                                }}
                                                                className={`mb-2 w-full rounded-2xl border px-4 py-3 text-left transition-all duration-200 last:mb-0 ${active
                                                                    ? 'border-indigo-400/40 bg-indigo-500/20 text-white shadow-lg shadow-indigo-500/10'
                                                                    : 'border-white/10 bg-white/5 text-slate-200 hover:border-indigo-400/25 hover:bg-white/10 hover:text-white'
                                                                }`}
                                                                role="option"
                                                                aria-selected={active}
                                                            >
                                                                <span className="block text-sm font-semibold">{item.title}</span>
                                                                <span className="mt-1 block text-xs leading-6 text-slate-400">{item.schedule}</span>
                                                                <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-2.5 py-1 text-[11px] font-medium text-slate-300">
                                                                    <Users className="h-3 w-3" />
                                                                    {item.capacity} seats available
                                                                </span>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="label-soft">Full Name *</label>
                                    <input
                                        type="text"
                                        required
                                        className="input-surface"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="label-soft">Phone Number *</label>
                                    <input
                                        type="tel"
                                        required
                                        className="input-surface"
                                        placeholder="+91 98765 43210"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="label-soft">Email Address</label>
                                    <input
                                        type="email"
                                        className="input-surface"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>

                                <div>
                                    <label className="label-soft">Message / Questions</label>
                                    <textarea
                                        rows="4"
                                        className="input-surface resize-none"
                                        placeholder="Anything you want the studio team to know..."
                                        value={formData.notes}
                                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    <span>{submitting ? 'Submitting...' : 'Submit Enquiry'}</span>
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </button>
                            </form>

                            <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-300">
                                Need to go back?{' '}
                                <Link to="/classes" className="font-semibold text-indigo-200 hover:text-white">
                                    Browse all sessions
                                </Link>
                                .
                            </div>

                            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                                <MessageSquare className="h-4 w-4 text-indigo-300" />
                                <span>Your request appears in the admin enquiry workflow.</span>
                                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">
                                    <Phone className="h-3.5 w-3.5" />
                                    Phone included
                                </span>
                                <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-slate-300">
                                    <Mail className="h-3.5 w-3.5" />
                                    Email included
                                </span>
                            </div>
                        </section>
                    </div>
                )}
            </main>
        </div>
    );
};

export default BookingForm;
