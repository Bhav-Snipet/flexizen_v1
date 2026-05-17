import { Link } from 'react-router-dom';
import { Leaf } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="bg-white shadow-sm border-b border-indigo-50 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 transition-colors">
                        <Leaf className="h-8 w-8" />
                        <span className="font-bold text-2xl tracking-tight text-gray-900">FlexiZen</span>
                    </Link>
                    
                    <div className="flex space-x-8 items-center">
                        <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Home</Link>
                        <Link to="/classes" className="text-gray-600 hover:text-indigo-600 font-medium transition-colors">Classes</Link>
                        {/* More links added in future phases */}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
