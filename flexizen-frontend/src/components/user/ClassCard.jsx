import { Link } from 'react-router-dom';
import { Calendar, Users, ArrowRight, BadgeCheck, Zap, MessageSquareMore, Sparkles } from 'lucide-react';

const IMAGE_MAP = {
    'Morning Flow Yoga': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=900',
    'Power Vinyasa': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=900',
    'Yin Yoga & Deep Meditation': 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=900',
    'Yin Yoga & Meditation': 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=900',
    'Beginner Hatha Yoga': 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=900',
    'Advanced Ashtanga Series': 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&q=80&w=900',
    'Advanced Ashtanga': 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&q=80&w=900',
};

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=900';

const ClassCard = ({ yogaClass, delay = 0 }) => {
    const classImage = yogaClass.image || IMAGE_MAP[yogaClass.title] || DEFAULT_IMAGE;
    const enquiryLink = `/enquiry/${yogaClass.id}`;

    return (
        <article
            className="group overflow-hidden rounded-[1.9rem] border border-white/10 bg-white/5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-indigo-400/30 hover:shadow-[0_28px_80px_-30px_rgba(15,23,42,0.8)]"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className="relative h-64 overflow-hidden">
                <img
                    src={classImage}
                    alt={yogaClass.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(129,140,248,0.22),transparent_30%),radial-gradient(circle_at_85%_15%,rgba(217,70,239,0.16),transparent_28%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.12),transparent_32%)] opacity-80 mix-blend-screen animate-glow" />
                <div className="absolute -left-8 bottom-0 h-20 w-20 rounded-full bg-indigo-500/25 blur-3xl animate-float-y" />
                <div className="absolute -right-4 top-16 h-16 w-16 rounded-full bg-fuchsia-500/20 blur-2xl animate-float-x" />
                <div className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                    <BadgeCheck className="h-4 w-4 text-emerald-300" />
                    Live Session
                </div>
                <div className="absolute right-4 top-4 rounded-full bg-slate-950/60 px-3 py-1 text-xs font-semibold text-slate-100 backdrop-blur-md">
                    {yogaClass.capacity} seats
                </div>
            </div>

            <div className="flex h-full flex-col p-6">
                <div className="mb-5">
                    <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-indigo-200">
                        <Zap className="h-4 w-4" />
                        FlexiZen Studio
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight text-white transition group-hover:text-indigo-200">
                        {yogaClass.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                        {yogaClass.description}
                    </p>
                </div>

                <div className="rounded-3xl border border-indigo-400/20 bg-indigo-500/10 p-4 shadow-[0_18px_45px_-28px_rgba(99,102,241,0.55)]">
                    <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-indigo-100">
                        <Sparkles className="h-3.5 w-3.5" />
                        Select this session
                    </p>
                    <Link
                        to={enquiryLink}
                        className="btn-primary w-full shadow-[0_16px_40px_-18px_rgba(99,102,241,0.65)]"
                        aria-label={`Book now for ${yogaClass.title}`}
                    >
                        <MessageSquareMore className="mr-2 h-4 w-4" />
                        Book Now
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                    <p className="mt-3 text-center text-xs leading-6 text-slate-300">
                        You&apos;ll land on the enquiry form with this session already selected.
                    </p>
                </div>

                <div className="mt-6 space-y-3 rounded-3xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center gap-3 text-sm text-slate-200">
                        <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-500/15 text-indigo-200">
                            <Calendar className="h-4 w-4" />
                        </span>
                        <span>{yogaClass.schedule}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-slate-200">
                        <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-200">
                            <Users className="h-4 w-4" />
                        </span>
                        <span>{yogaClass.capacity} spots available</span>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default ClassCard;
