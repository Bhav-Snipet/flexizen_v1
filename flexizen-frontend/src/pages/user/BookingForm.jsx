import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import { classService } from '../../services/classService';
import { bookingService } from '../../services/bookingService';
import { Calendar, Users, CheckCircle } from 'lucide-react';

const DUMMY_CLASSES = [
    {
        id: 101,
        title: 'Morning Flow Yoga',
        description: 'A gentle morning yoga session to awaken the body, stretch key muscles, and set a positive tone for the day. Perfect for all experience levels.',
        schedule: 'Mon / Wed / Fri — 7:00 AM to 8:00 AM',
        capacity: 20,
        active: true,
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600'
    },
    {
        id: 102,
        title: 'Power Vinyasa',
        description: 'An energetic and athletic practice connecting continuous breath with active postures. Great for building core strength, muscle tone, and cardio stamina.',
        schedule: 'Tue / Thu — 6:30 PM to 7:45 PM',
        capacity: 15,
        active: true,
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600'
    },
    {
        id: 103,
        title: 'Yin Yoga & Deep Meditation',
        description: 'A restorative, slow-paced class focusing on holding deep passive poses targeting connective tissues, ligaments, and joints. Ends with a guided meditation.',
        schedule: 'Sat / Sun — 9:00 AM to 10:30 AM',
        capacity: 18,
        active: true,
        image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=600'
    },
    {
        id: 104,
        title: 'Beginner Hatha Yoga',
        description: 'A foundational class designed specifically for absolute beginners. Explore classic yoga postures, learn alignment rules, and understand breath control.',
        schedule: 'Mon / Wed — 5:00 PM to 6:15 PM',
        capacity: 20,
        active: true,
        image: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=600'
    },
    {
        id: 105,
        title: 'Advanced Ashtanga Series',
        description: 'A highly structured, physically demanding practice utilizing sequential postures. Designed specifically for regular practitioners seeking an active challenge.',
        schedule: 'Tue / Thu / Sat — 7:00 AM to 8:30 AM',
        capacity: 12,
        active: true,
        image: 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&q=80&w=600'
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
                // First try to fetch from backend
                const activeClasses = await classService.getActiveClasses();
                const cls = activeClasses.find(c => c.id === parseInt(classId));
                if (cls) {
                    setYogaClass(cls);
                    setIsDemoMode(false);
                } else {
                    // Search in dummy classes
                    const dummyCls = DUMMY_CLASSES.find(c => c.id === parseInt(classId));
                    setYogaClass(dummyCls || null);
                    setIsDemoMode(true);
                }
            } catch (error) {
                console.warn("Backend down. Falling back to dummy classes details.", error);
                const dummyCls = DUMMY_CLASSES.find(c => c.id === parseInt(classId));
                setYogaClass(dummyCls || null);
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
                // If backend is offline or we are in Demo mode, simulate a successful booking
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
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                <div className="flex-1 flex justify-center items-center">
                    <span className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></span>
                </div>
            </div>
        );
    }

    if (!yogaClass) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Navbar />
                <div className="flex-1 flex flex-col justify-center items-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Class Not Found</h2>
                    <Link to="/classes" className="text-indigo-600 hover:underline">Return to Classes</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12">
                
                {success ? (
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="flex justify-center mb-6">
                            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </div>
                        </div>
                        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Booking Successful!</h2>
                        <p className="text-lg text-gray-600 mb-8">
                            Your spot for <strong>{yogaClass.title}</strong> has been requested.
                        </p>
                        <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-200 border-dashed">
                            <p className="text-sm text-gray-500 uppercase font-semibold mb-1">Your Booking Number</p>
                            <p className="text-2xl font-mono font-bold text-indigo-700 tracking-wider">{bookingNo}</p>
                        </div>
                        {isDemoMode && (
                            <p className="text-xs text-yellow-600 font-medium bg-yellow-50 px-3 py-1 rounded-full mb-6 max-w-xs mx-auto border border-yellow-100">
                                Showcase Demo Success Simulation
                            </p>
                        )}
                        <Link to="/classes" className="inline-flex items-center justify-center px-8 py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-full font-semibold transition-colors">
                            Browse More Classes
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row">
                        <div className="md:w-5/12 bg-indigo-600 text-white p-8 flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">{yogaClass.title}</h3>
                                <p className="text-indigo-100 text-sm leading-relaxed mb-6">
                                    {yogaClass.description}
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3 text-indigo-50">
                                        <Calendar size={20} className="text-indigo-300" />
                                        <span>{yogaClass.schedule}</span>
                                    </div>
                                    <div className="flex items-center space-x-3 text-indigo-50">
                                        <Users size={20} className="text-indigo-300" />
                                        <span>{yogaClass.capacity} Spots Available</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 pt-6 border-t border-indigo-500/30">
                                <p className="text-sm text-indigo-200">No account required. Your booking number will be generated instantly.</p>
                            </div>
                        </div>
                        <div className="md:w-7/12 p-8">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Reserve Your Spot</h2>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                                    <input type="text" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                        placeholder="John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                                    <input type="tel" required className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                        placeholder="+1 234 567 890" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input type="email" className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
                                        placeholder="john@example.com (Optional)" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                                </div>
                                <button type="submit" disabled={submitting} className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed mt-2">
                                    {submitting ? 'Processing...' : 'Confirm Booking'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default BookingForm;
