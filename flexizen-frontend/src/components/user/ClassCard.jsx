import { Link } from 'react-router-dom';
import { Calendar, Users } from 'lucide-react';

const ClassCard = ({ yogaClass }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 overflow-hidden transition-all duration-300 transform hover:-translate-y-1 flex flex-col">
            <div className="h-48 bg-indigo-100 flex items-center justify-center">
                <img 
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(yogaClass.title)}&background=e0e7ff&color=4f46e5&size=256&font-size=0.33`} 
                    alt={yogaClass.title} 
                    className="w-full h-full object-cover opacity-80 mix-blend-multiply" 
                />
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">{yogaClass.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">{yogaClass.description}</p>
                
                <div className="space-y-2 mb-6 text-sm text-gray-500 font-medium">
                    <div className="flex items-center space-x-2">
                        <Calendar size={16} className="text-indigo-500" />
                        <span>{yogaClass.schedule}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Users size={16} className="text-indigo-500" />
                        <span>{yogaClass.capacity} Spots Available</span>
                    </div>
                </div>
                
                <Link 
                    to={`/book/${yogaClass.id}`}
                    className="w-full py-2.5 bg-indigo-50 text-indigo-700 font-semibold rounded-xl hover:bg-indigo-600 hover:text-white transition-colors flex items-center justify-center space-x-2 group block text-center"
                >
                    <span>Book Session</span>
                </Link>
            </div>
        </div>
    );
};

export default ClassCard;
