import { useEffect, useMemo, useState } from 'react';
import Navbar from '../../components/common/Navbar';
import ClassCard from '../../components/user/ClassCard';
import { classService } from '../../services/classService';
import { Sparkles, Search, Filter, Waves, Flame, MoonStar } from 'lucide-react';

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

const FILTERS = [
    { key: 'all', label: 'All classes', icon: Filter },
    { key: 'flow', label: 'Flow', icon: Waves },
    { key: 'power', label: 'Power', icon: Flame },
    { key: 'restorative', label: 'Restore', icon: MoonStar },
];

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isUsingDemoData, setIsUsingDemoData] = useState(false);
    const [query, setQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');

    useEffect(() => {
        const loadClasses = async () => {
            try {
                const data = await classService.getActiveClasses();
                if (data && data.length > 0) {
                    setClasses(data);
                    setIsUsingDemoData(false);
                } else {
                    setClasses(DUMMY_CLASSES);
                    setIsUsingDemoData(true);
                }
            } catch (error) {
                console.warn("Could not fetch classes. Loading curated demo data.", error);
                setClasses(DUMMY_CLASSES);
                setIsUsingDemoData(true);
            } finally {
                setLoading(false);
            }
        };
        loadClasses();
    }, []);

    const visibleClasses = useMemo(() => {
        const filtered = classes.filter((item) => {
            const text = `${item.title} ${item.description} ${item.schedule}`.toLowerCase();
            const searchMatch = text.includes(query.toLowerCase().trim());
            if (!searchMatch) return false;

            if (activeFilter === 'flow') return /flow|hatha|beginner/i.test(text);
            if (activeFilter === 'power') return /power|ashtanga/i.test(text);
            if (activeFilter === 'restorative') return /yin|meditation|restore|restorative/i.test(text);
            return true;
        });

        return filtered;
    }, [classes, query, activeFilter]);

    return (
        <div className="app-shell flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1">
                <section className="relative overflow-hidden border-b border-white/10">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2200"
                            alt="Yoga classes"
                            className="h-full w-full object-cover opacity-15"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/95 to-indigo-950/90" />
                    </div>

                    <div className="hero-orb left-6 top-12 h-56 w-56 bg-indigo-500/20 animate-glow" />
                    <div className="hero-orb right-10 top-14 h-72 w-72 bg-violet-500/15 animate-float-y" />

                    <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
                        <div className="max-w-3xl">
                            <div className="muted-kicker">
                                <Sparkles className="h-3.5 w-3.5" />
                                Explore the schedule
                            </div>
                            <h1 className="mt-5 text-4xl font-black tracking-tight text-white md:text-6xl">
                                Classes designed for focus, strength, and recovery.
                            </h1>
                            <p className="mt-5 text-base leading-8 text-slate-300 md:text-lg">
                                Browse the studio’s class lineup, filter by practice style, and book your ideal session in a clean, premium interface.
                            </p>
                        </div>

                        <div className="mt-10 grid gap-4 md:grid-cols-[1.3fr_0.7fr]">
                            <label className="surface flex items-center gap-3 px-5 py-4">
                                <Search className="h-5 w-5 text-indigo-300" />
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Search by class name, schedule, or focus..."
                                    className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-400"
                                />
                            </label>

                            <div className="surface flex items-center justify-center gap-2 p-2">
                                {FILTERS.map((filter) => {
                                    const Icon = filter.icon;
                                    const active = activeFilter === filter.key;
                                    return (
                                        <button
                                            key={filter.key}
                                            type="button"
                                            onClick={() => setActiveFilter(filter.key)}
                                            className={`inline-flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                                                active ? 'bg-white/10 text-white shadow-sm' : 'text-slate-300 hover:bg-white/10 hover:text-white'
                                            }`}
                                        >
                                            <Icon className="h-4 w-4" />
                                            {filter.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <h2 className="section-title">Session lineup</h2>
                            <p className="section-subtitle">
                                {isUsingDemoData
                                    ? 'Demo content is displayed because the backend returned no classes.'
                                    : 'Live classes loaded from the backend are shown below.'}
                            </p>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300">
                            <Filter className="h-4 w-4 text-indigo-300" />
                            {visibleClasses.length} class{visibleClasses.length === 1 ? '' : 'es'}
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex min-h-[320px] items-center justify-center">
                            <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-indigo-400" />
                        </div>
                    ) : visibleClasses.length === 0 ? (
                        <div className="surface mx-auto max-w-xl p-10 text-center">
                            <p className="text-lg font-semibold text-white">No classes match your search.</p>
                            <p className="mt-2 text-sm text-slate-400">Try a different keyword or reset the filter.</p>
                            <button
                                type="button"
                                onClick={() => { setQuery(''); setActiveFilter('all'); }}
                                className="btn-primary mt-6"
                            >
                                Clear Filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {visibleClasses.map((yogaClass, index) => (
                                <ClassCard key={yogaClass.id} yogaClass={yogaClass} delay={index * 70} />
                            ))}
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
};

export default Classes;
