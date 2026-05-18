import { Link } from 'react-router-dom';
import { Calendar, Users, ArrowRight } from 'lucide-react';

const IMAGE_MAP = {
    'Morning Flow Yoga': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=600',
    'Power Vinyasa': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600',
    'Yin Yoga & Deep Meditation': 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=600',
    'Yin Yoga & Meditation': 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&q=80&w=600',
    'Beginner Hatha Yoga': 'https://images.unsplash.com/photo-1508962914676-134849a727f0?auto=format&fit=crop&q=80&w=600',
    'Advanced Ashtanga Series': 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&q=80&w=600',
    'Advanced Ashtanga': 'https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&q=80&w=600',
};

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=600';

const ClassCard = ({ yogaClass, delay = 0 }) => {
    // Determine the image to display
    const classImage = yogaClass.image || IMAGE_MAP[yogaClass.title] || DEFAULT_IMAGE;

    return (
        <div 
            className="bg-white rounded-3xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col group animate-in fade-in slide-in-from-bottom-6 fill-mode-both"
            style={{ animationDelay: `${delay}ms` }}
        >
            {/* Class Image Container */}
            <div className="h-56 overflow-hidden relative">
                <div className="absolute inset-0 bg-slate-900/10 z-10 transition-opacity group-hover:bg-slate-900/0"></div>
                <img 
                    src={classImage} 
                    alt={yogaClass.title} 
                    className="w-full h-full object-cover transition-transform duration-500 scale-100 group-hover:scale-105" 
                />
                
                {/* Visual badge for dynamic class */}
                <div className="absolute top-4 right-4 z-20 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-indigo-700 shadow-sm">
                    Active Session
                </div>
            </div>
            
            {/* Details and Description */}
            <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors duration-200">
                        {yogaClass.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed line-clamp-3">
                        {yogaClass.description}
                    </p>
                </div>
                
                <div>
                    {/* Details Rows */}
                    <div className="space-y-3 mb-6 text-sm text-gray-500 font-semibold border-t border-gray-50 pt-4">
                        <div className="flex items-center space-x-3">
                            <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                                <Calendar size={16} />
                            </div>
                            <span className="text-gray-700">{yogaClass.schedule}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
                                <Users size={16} />
                            </div>
                            <span className="text-gray-700">{yogaClass.capacity} Spots Available</span>
                        </div>
                    </div>
                    
                    {/* Call to action button */}
                    <Link 
                        to={`/book/${yogaClass.id}`}
                        className="w-full py-3.5 bg-slate-950 text-white font-bold rounded-2xl hover:bg-indigo-600 transition-all duration-300 flex items-center justify-center space-x-2 shadow-sm hover:shadow-md"
                    >
                        <span>Book Session</span>
                        <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ClassCard;
