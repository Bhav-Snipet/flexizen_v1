import { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import { pageService } from '../../services/pageService';
import { Sparkles, HeartHandshake, Leaf, Users, Medal, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const DEFAULT_ABOUT_CONTENT = `
<h2>About FlexiZen Studio</h2>
<p>Welcome to FlexiZen — a contemporary sanctuary dedicated to mind, body, and spirit wellness. Established with a passion for holistic health, we provide a warm and inviting community space for everyone from absolute beginners to long-time yoga practitioners.</p>
<p>Our handpicked, fully certified instructors bring a wealth of diverse lineage styles, offering gentle adjustments and customized postures. We believe that true health starts from within, and we are committed to providing the guidance you need to develop a steady, strong, and flexible practice.</p>
<h3>Our Core Pillars</h3>
<ul>
    <li><strong>Mindfulness:</strong> Intentionally syncing breath with movement to build deeper somatic awareness.</li>
    <li><strong>Accessibility:</strong> Offering diverse class types designed to be comfortable and welcoming for every body shape, age, and experience tier.</li>
    <li><strong>Growth:</strong> Empowering you to expand your physical strength, mental resilience, and spiritual tranquility day by day.</li>
</ul>
<p>Whether you seek to release daily muscle tension, build solid physical conditioning, or establish a calming meditative breathing routine, FlexiZen is here to welcome you home.</p>
`;

const pillars = [
    { icon: HeartHandshake, title: 'Warm community', text: 'A friendly environment where every visitor feels supported from the first class.' },
    { icon: Leaf, title: 'Mindful movement', text: 'Practice-focused teaching that connects breath, posture, and calm energy.' },
    { icon: Users, title: 'Inclusive studio', text: 'Classes for newcomers, regulars, and everyone in between.' },
    { icon: Medal, title: 'Quality guidance', text: 'Clear instruction and a polished experience across the whole platform.' },
];

const AboutUs = () => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadContent = async () => {
            try {
                const data = await pageService.getPageContent('ABOUT');
                if (data && data.content) {
                    setContent(data.content);
                } else {
                    setContent(DEFAULT_ABOUT_CONTENT);
                }
            } catch (error) {
                console.warn("Backend not running or empty. Loading elegant local fallback about content.", error);
                setContent(DEFAULT_ABOUT_CONTENT);
            } finally {
                setLoading(false);
            }
        };
        loadContent();
    }, []);

    return (
        <div className="app-shell flex min-h-screen flex-col">
            <Navbar />
            <main className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
                <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-soft sm:p-10 lg:p-12">
                    <div className="absolute inset-0">
                        <img
                            src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80&w=2200"
                            alt="Studio"
                            className="h-full w-full object-cover opacity-10"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-950/85 to-indigo-950/85" />
                    </div>

                    <div className="relative">
                        <div className="muted-kicker">
                            <Sparkles className="h-3.5 w-3.5" />
                            About the studio
                        </div>
                        <div className="mt-5 grid gap-10 lg:grid-cols-[1fr_0.9fr]">
                            <div>
                                <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl">A calmer way to run wellness.</h1>
                                <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
                                    FlexiZen is built around clarity, balance, and simplicity — both in the yoga experience and in the way the studio is managed.
                                </p>
                            </div>
                            <div className="surface p-6">
                                <p className="text-sm leading-7 text-slate-300">
                                    The About page content below can be managed from the admin CMS. When the backend is offline, a polished fallback story appears so the site still feels complete.
                                </p>
                                <div className="mt-6 flex flex-wrap gap-3">
                                    <Link to="/classes" className="btn-primary">
                                        Explore Classes
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                    <Link to="/contact" className="btn-secondary">
                                        Contact Studio
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                    {pillars.map((pillar) => {
                        const Icon = pillar.icon;
                        return (
                            <div key={pillar.title} className="surface card-hover p-6">
                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-indigo-200">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <h3 className="mt-5 text-xl font-bold text-white">{pillar.title}</h3>
                                <p className="mt-3 text-sm leading-7 text-slate-300">{pillar.text}</p>
                            </div>
                        );
                    })}
                </section>

                <section className="mt-10 surface overflow-hidden">
                    {loading ? (
                        <div className="flex justify-center py-20">
                            <span className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-indigo-400" />
                        </div>
                    ) : (
                        <div
                            className="rich-copy max-w-none p-8 sm:p-10"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    )}
                </section>
            </main>
        </div>
    );
};

export default AboutUs;
