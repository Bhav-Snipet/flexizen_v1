import { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import ClassCard from '../../components/user/ClassCard';
import { classService } from '../../services/classService';
import { Sparkles } from 'lucide-react';

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

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isUsingDemoData, setIsUsingDemoData] = useState(false);

    useEffect(() => {
        const loadClasses = async () => {
            try {
                const data = await classService.getActiveClasses();
                if (data && data.length > 0) {
                    setClasses(data);
                    setIsUsingDemoData(false);
                } else {
                    // Fallback to high-quality dummy data if database is empty
                    setClasses(DUMMY_CLASSES);
                    setIsUsingDemoData(true);
                }
            } catch (error) {
                console.warn("Backend not running or empty. Loading elegant local dummy classes.", error);
                setClasses(DUMMY_CLASSES);
                setIsUsingDemoData(true);
            } finally {
                setLoading(false);
            }
        };

        loadClasses();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-16 relative">
                    <div className="inline-flex items-center space-x-2 bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-3">
                        <Sparkles size={14} className="animate-spin duration-3000" />
                        <span>Book Instantly</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                        Available Yoga Sessions
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Secure your spot in any class instantly with our zero-friction booking system. No upfront registration required.
                    </p>
                    
                    {isUsingDemoData && (
                        <div className="mt-4 inline-block text-xs bg-yellow-50 text-yellow-800 border border-yellow-100 rounded-full px-3 py-1 font-medium">
                            Displaying Showcase Demo Sessions
                        </div>
                    )}
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <span className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {classes.map((yogaClass, index) => (
                            <ClassCard 
                                key={yogaClass.id} 
                                yogaClass={yogaClass} 
                                delay={index * 100}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Classes;
