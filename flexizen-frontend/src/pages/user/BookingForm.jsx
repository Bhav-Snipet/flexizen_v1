import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import { classService } from '../../services/classService';
import { bookingService } from '../../services/bookingService';
import { Calendar, Users, CheckCircle, ShieldCheck, Sparkles, ArrowLeft } from 'lucide-react';

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
    const [yogaClass, setYogaClass] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [bookingNo, setBookingNo] = useState('');
    const [formData, setFormData] = useState({ name: '', phone: '', email: '' });
    const [isDemoMode, setIsDemoMode] = useState(false);

    useEffect(() => {
        const loadClassDetails = async () => {
            try {
                const data = await classService.getActiveClasses();
                const allClasses = data && data.length > 0 ? data : DUMMY_CLASSES;
                const foundClass = allClasses.find(c => c.id.toString() === classId);
                if (foundClass) {
                    setYogaClass(foundClass);
                    setIsDemoMode(!data || data.length === 0);
                }
            } catch (error) {
                console.warn("Failed to load live class details. Using demo class.", error);
                const foundClass = DUMMY_CLASSES.find(c => c.id.toString() === classId);
                setYogaClass(foundClass || DUMMY_CLASSES[0]);
                setIsDemoMode(true);
            } finally {
                setLoading(false);
            }
        };
        loadClassDetails();
    }, [classId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const payload = {
                user: formData,
                classId: classId
            };
            const response = await bookingService.createBooking(payload);
            setBookingNo(response.bookingNo);
            setSuccess(true);
        } catch (error) {
            if (!error.response || isDemoMode) {
                const timestamp = new Date().toISOString().replace(/[-:T]/g, '').slice(0, 14);
                const randomId = Math.floor(1000 + Math.random() * 9000);
                const simulatedBookingNo = `FZ-${timestamp}${randomId}`;
                setBookingNo(simulatedBookingNo);
                setSuccess(true);
            } else {
                alert("Failed to submit booking. Please try again.");
                console.error("Booking failed:", error);
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

    if (!yogaClass) {
        return (
            <div className="app-shell flex min-h-screen flex-col">
                <Navbar />
                <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
                    <p className="muted-kicker">
                        <Sparkles className="h-3.5 w-3.5" />
                        Class not found
                    </p>
                    <h2 className="mt-4 text-3xl font-bold text-white">We could not load this session.</h2>
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
                            Booking confirmed
                        </p>
                        <h2 className="mt-5 text-3xl font-black tracking-tight text-white">Your spot has been reserved.</h2>
                        <p className="mt-3 text-slate-300">
                            A booking request for <span className="font-semibold text-white">{yogaClass.title}</span> was completed successfully.
                        </p>

                        <div className="animated-border mt-8 rounded-[1.6rem] bg-white/5 p-6">
                            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">Booking number</p>
                            <p className="mt-3 break-all font-mono text-3xl font-bold tracking-wider text-indigo-200">{bookingNo}</p>
                        </div>

                        {isDemoMode && (
                            <p className="mt-5 rounded-full border border-amber-400/20 bg-amber-500/10 px-4 py-2 text-xs font-medium text-amber-200">
                                Demo mode generated this reference because the backend was unavailable.
                            </p>
                        )}

                        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                            <Link to="/classes" className="btn-primary">
                                Browse More Classes
                            </Link>
                            <Link to="/" className="btn-secondary">
                                Back to Home
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="grid w-full gap-8 lg:grid-cols-[0.92fr_1.08fr]">
                        <aside className="surface overflow-hidden">
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={yogaClass.image || 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200'}
                                    alt={yogaClass.title}
                                    className="h-full w-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                                <div className="absolute left-4 top-4 muted-kicker">
                                    <Sparkles className="h-3.5 w-3.5" />
                                    Session preview
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-3xl font-bold tracking-tight text-white">{yogaClass.title}</h3>
                                <p className="mt-4 text-sm leading-7 text-slate-300">{yogaClass.description}</p>

                                <div className="mt-6 space-y-4 rounded-3xl border border-white/10 bg-white/5 p-5">
                                    <div className="flex items-center gap-3 text-sm text-slate-200">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-200">
                                            <Calendar className="h-4 w-4" />
                                        </span>
                                        <span>{yogaClass.schedule}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-slate-200">
                                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-200">
                                            <Users className="h-4 w-4" />
                                        </span>
                                        <span>{yogaClass.capacity} spots available</span>
                                    </div>
                                </div>

                                <p className="mt-6 text-sm text-slate-400">
                                    No account required. Booking number is generated instantly after confirmation.
                                </p>
                            </div>
                        </aside>

                        <section className="surface p-6 sm:p-8">
                            <p className="muted-kicker">
                                <ShieldCheck className="h-3.5 w-3.5" />
                                Reserve your spot
                            </p>
                            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white">Booking details</h2>
                            <p className="mt-2 text-sm leading-7 text-slate-300">
                                Fill in a few details to hold your place in this session.
                            </p>

                            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                                <div>
                                    <label className="label-soft">Full Name *</label>
                                    <input
                                        type="text"
                                        required
                                        className="input-surface"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
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
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="label-soft">Email Address</label>
                                    <input
                                        type="email"
                                        className="input-surface"
                                        placeholder="john@example.com (optional)"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-70"
                                >
                                    {submitting ? 'Processing...' : 'Confirm Booking'}
                                </button>
                            </form>
                        </section>
                    </div>
                )}
            </main>
        </div>
    );
};

export default BookingForm;
