import Navbar from '../../components/common/Navbar';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col">
            <Navbar />
            <main className="flex-1 flex items-center justify-center text-center px-4">
                <div className="max-w-3xl">
                    <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
                        Find Your Inner <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Peace</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Join our expert-led yoga classes designed to harmonize your body, mind, and spirit. Begin your journey to wellness today.
                    </p>
                    <Link 
                        to="/classes" 
                        className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
                    >
                        Explore Classes
                    </Link>
                </div>
            </main>
        </div>
    );
};

export default Home;
