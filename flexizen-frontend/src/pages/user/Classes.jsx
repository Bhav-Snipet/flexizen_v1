import { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import ClassCard from '../../components/user/ClassCard';
import { classService } from '../../services/classService';

const Classes = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadClasses = async () => {
            try {
                const data = await classService.getActiveClasses();
                setClasses(data);
            } catch (error) {
                console.error("Failed to load classes:", error);
            } finally {
                setLoading(false);
            }
        };

        loadClasses();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Available Yoga Classes</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Explore our schedule and find the perfect session to align your body and mind. 
                        No registration required to book.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <span className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></span>
                    </div>
                ) : classes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {classes.map(yogaClass => (
                            <ClassCard key={yogaClass.id} yogaClass={yogaClass} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center bg-white p-12 rounded-2xl shadow-sm border border-gray-100">
                        <p className="text-gray-500 text-lg">There are currently no active classes scheduled.</p>
                        <p className="text-gray-400 mt-2">Please check back later.</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Classes;
