import { useEffect, useState } from 'react';

const StatCard = ({ title, value, icon: Icon, colorClass, gradientClass, delay = 0 }) => {
    const [animatedValue, setAnimatedValue] = useState(0);

    useEffect(() => {
        let mounted = true;
        const duration = 1200;
        const frames = 45;
        const increment = Math.max(1, Math.ceil(value / frames));
        let current = 0;

        const timer = setTimeout(() => {
            const interval = setInterval(() => {
                if (!mounted) return;
                current += increment;
                if (current >= value) {
                    setAnimatedValue(value);
                    clearInterval(interval);
                } else {
                    setAnimatedValue(current);
                }
            }, duration / frames);
        }, delay);

        return () => {
            mounted = false;
            clearTimeout(timer);
        };
    }, [value, delay]);

    return (
        <div
            className="animated-border surface card-hover relative overflow-hidden p-6"
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl opacity-25 ${gradientClass}`} />
            <div className="relative z-10 flex items-start justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">{title}</p>
                    <h3 className="mt-4 text-4xl font-extrabold tracking-tight text-white">{animatedValue}</h3>
                </div>
                <div className={`rounded-2xl p-3 ${colorClass}`}>
                    <Icon size={22} />
                </div>
            </div>
        </div>
    );
};

export default StatCard;
