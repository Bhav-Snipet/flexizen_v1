import Navbar from '../../components/common/Navbar';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Heart, ArrowRight, CalendarDays, BadgeCheck, TimerReset, Star, PlayCircle } from 'lucide-react';

const highlights = [
    { label: 'Expert coaches', value: '15+' },
    { label: 'Monthly sessions', value: '120+' },
    { label: 'Flexible schedules', value: '7 days' },
];

const benefits = [
    {
        icon: ShieldCheck,
        title: 'Calm, secure booking',
        text: 'A simple booking flow with instant confirmation and clear class details.',
    },
    {
        icon: Heart,
        title: 'Welcoming for all levels',
        text: 'Beginner-friendly sessions, mindful pacing, and a studio atmosphere built for everyone.',
    },
    {
        icon: BadgeCheck,
        title: 'Professional class management',
        text: 'Admin-controlled class updates, enquiries, reports, and content in one system.',
    },
];

const classCards = [
    {
        title: 'Morning Flow Yoga',
        schedule: 'Mon / Wed / Fri — 7:00 AM',
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1200',
    },
    {
        title: 'Power Vinyasa',
        schedule: 'Tue / Thu — 6:30 PM',
        image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200',
    },
    {
        title: 'Yin Meditation',
        schedule: 'Weekend — Deep Reset',
        image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=1200',
    },
];

const Home = () => {
    return (
        <div className="app-shell flex min-h-screen flex-col">
            <Navbar />

            <main className="flex-1">
                <section className="relative overflow-hidden">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=2400"
                            alt="Yoga studio background"
                            className="h-full w-full object-cover opacity-20"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/90 to-indigo-950/95" />
                    </div>

                    <div className="hero-orb left-10 top-16 h-48 w-48 bg-indigo-500/25 animate-float-y" />
                    <div className="hero-orb right-10 top-28 h-64 w-64 bg-violet-500/20 animate-float-x" />
                    <div className="hero-orb bottom-0 left-1/3 h-64 w-64 bg-cyan-500/15 animate-glow" />

                    <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:px-8 lg:py-24">
                        <div className="animate-fade-up">
                            <div className="muted-kicker">
                                <Sparkles className="h-3.5 w-3.5" />
                                FlexiZen Yoga Studio
                            </div>

                            <h1 className="mt-6 max-w-4xl text-5xl font-black tracking-tight text-white md:text-7xl">
                                Find your rhythm.
                                <span className="mt-2 block bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                                    Move with purpose.
                                </span>
                            </h1>

                            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 md:text-xl">
                                A premium yoga registration and scheduling experience built to feel calm, modern, and effortless — from browsing classes to booking a spot in seconds.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-4">
                                <Link to="/classes" className="btn-primary">
                                    Explore Classes
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                                <Link to="/contact" className="btn-secondary">
                                    <PlayCircle className="mr-2 h-4 w-4" />
                                    Contact Studio
                                </Link>
                            </div>

                            <div className="mt-10 grid gap-4 sm:grid-cols-3">
                                {highlights.map((item) => (
                                    <div key={item.label} className="glass rounded-3xl p-5">
                                        <div className="text-3xl font-black text-white">{item.value}</div>
                                        <div className="mt-2 text-sm text-slate-300">{item.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="relative animate-fade-up lg:pt-8">
                            <div className="surface animated-border overflow-hidden p-4">
                                <div className="panel-grid rounded-[1.5rem] p-4">
                                    <div className="overflow-hidden rounded-[1.5rem]">
                                        <img
                                            src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1600"
                                            alt="Yoga practice"
                                            className="h-[420px] w-full object-cover transition duration-700 hover:scale-105"
                                        />
                                    </div>

                                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                        <div className="rounded-3xl border border-white/10 bg-slate-950/65 p-4">
                                            <CalendarDays className="h-5 w-5 text-indigo-300" />
                                            <p className="mt-3 text-sm font-semibold text-white">Flexible weekly schedules</p>
                                            <p className="mt-1 text-sm text-slate-300">Morning, evening, and restorative sessions.</p>
                                        </div>
                                        <div className="rounded-3xl border border-white/10 bg-slate-950/65 p-4">
                                            <TimerReset className="h-5 w-5 text-violet-300" />
                                            <p className="mt-3 text-sm font-semibold text-white">Quick booking flow</p>
                                            <p className="mt-1 text-sm text-slate-300">No account needed for guests.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="grid gap-6 md:grid-cols-3">
                        {benefits.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.title} className="surface card-hover p-6">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-indigo-200">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="mt-5 text-xl font-bold text-white">{item.title}</h3>
                                    <p className="mt-3 text-sm leading-7 text-slate-300">{item.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="mb-10 flex items-end justify-between gap-4">
                        <div>
                            <div className="muted-kicker">
                                <Star className="h-3.5 w-3.5" />
                                Featured classes
                            </div>
                            <h2 className="section-title mt-4">A few sessions from the studio</h2>
                            <p className="section-subtitle">
                                Designed to feel premium and inviting, with visual emphasis on calm, movement, and clarity.
                            </p>
                        </div>
                        <Link to="/classes" className="hidden text-sm font-semibold text-indigo-200 hover:text-white md:inline-flex">
                            View all classes
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div>

                    <div className="grid gap-6 lg:grid-cols-3">
                        {classCards.map((item) => (
                            <div key={item.title} className="surface card-hover overflow-hidden">
                                <div className="relative h-64 overflow-hidden">
                                    <img src={item.image} alt={item.title} className="h-full w-full object-cover transition duration-700 hover:scale-110" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
                                </div>
                                <div className="p-6">
                                    <p className="text-xs uppercase tracking-[0.25em] text-indigo-200">Signature session</p>
                                    <h3 className="mt-2 text-2xl font-bold text-white">{item.title}</h3>
                                    <p className="mt-3 text-sm text-slate-300">{item.schedule}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
