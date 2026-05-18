import { useState, useEffect } from 'react';

const StatCard = ({ title, value, icon: Icon, colorClass, gradientClass, delay = 0 }) => {
    const [animatedValue, setAnimatedValue] = useState(0);

    // Simple number count-up animation
    useEffect(() => {
        let start = 0;
        const duration = 1500; // ms
        const incrementTime = 30; // ms
        const steps = duration / incrementTime;
        const increment = Math.ceil(value / steps);

        const timer = setTimeout(() => {
            const counter = setInterval(() => {
                start += increment;
                if (start >= value) {
                    setAnimatedValue(value);
                    clearInterval(counter);
                } else {
                    setAnimatedValue(start);
                }
            }, incrementTime);
            return () => clearInterval(counter);
        }, delay);

        return () => clearTimeout(timer);
    }, [value, delay]);

    return (
        <div 
            className={`relative overflow-hidden rounded-2xl shadow-sm border border-gray-100 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md animate-in fade-in zoom-in-95 fill-mode-both`}
            style={{ animationDelay: `${delay}ms` }}
        >
            <div className={`absolute top-0 right-0 w-32 h-32 -mr-8 -mt-8 rounded-full opacity-10 ${gradientClass} blur-2xl`}></div>
            
            <div className="flex items-center justify-between mb-4 relative z-10">
                <div className={`p-3 rounded-xl ${colorClass}`}>
                    <Icon size={24} />
                </div>
                <h3 className="text-gray-500 font-medium text-sm tracking-wide uppercase">{title}</h3>
            </div>
            
            <div className="relative z-10">
                <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                    {animatedValue}
                </h2>
            </div>
        </div>
    );
};

export default StatCard;
