import Navbar from '../../components/common/Navbar';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Heart, ArrowRight } from 'lucide-react';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans overflow-x-hidden">
            <Navbar />
            
            {/* Hero Section */}
            <main className="flex-1 flex flex-col">
                <div className="relative bg-gradient-to-r from-slate-900 to-indigo-950 text-white py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden flex items-center min-h-[75vh]">
                    {/* Background Graphic overlay */}
                    <div className="absolute inset-0 opacity-20 mix-blend-overlay">
                        <img 
                            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1920" 
                            alt="Yoga background" 
                            className="w-full h-full object-cover scale-105 filter blur-[2px]"
                        />
                    </div>
                    {/* Subtle warm ambient glow lights */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                    <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse delay-700"></div>

                    <div className="relative max-w-5xl mx-auto text-center z-10 space-y-8">
                        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-indigo-300 text-sm font-semibold tracking-wide uppercase animate-bounce">
                            <Sparkles size={16} />
                            <span>Discover Your Path to Harmony</span>
                        </div>
                        
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none text-white drop-shadow-sm">
                            Find Your Inner{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
                                Peace & Strength
                            </span>
                        </h1>
                        
                        <p className="text-lg sm:text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto leading-relaxed drop-shadow">
                            Join our expert-led yoga sessions designed to restore balance, build flexibility, and harmonize your entire mind, body, and spirit.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
                            <Link 
                                to="/classes" 
                                className="group inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-900 bg-white hover:bg-indigo-50 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 w-full sm:w-auto"
                            >
                                <span>Explore Classes</span>
                                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link 
                                to="/about" 
                                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/40 hover:border-white hover:bg-white/10 rounded-full transition-all duration-300 w-full sm:w-auto"
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Features / Benefits Grid */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Why Choose FlexiZen?</h2>
                        <div className="w-16 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                <Heart size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Holistic Wellness</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Our classes combine breathwork, postures, and active mindfulness to promote physical stability and mental tranquility.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                            <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                                <ShieldCheck size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Expert Guidance</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Practice with certified, passionate yoga instructors who personalize alignments to match all flexible levels.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                            <div className="w-14 h-14 bg-pink-50 text-pink-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-pink-600 group-hover:text-white transition-colors duration-300">
                                <Sparkles size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Flexible Scheduling</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Book your favorite morning or evening flow session instantly with no upfront mandatory profiles or complicated signups.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {/* Premium Footer */}
            <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
                    <h2 className="text-2xl font-bold text-indigo-400">FlexiZen</h2>
                    <p className="text-sm">© 2026 FlexiZen Yoga Studio. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
