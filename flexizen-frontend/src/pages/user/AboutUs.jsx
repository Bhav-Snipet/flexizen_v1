import { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import { pageService } from '../../services/pageService';

const AboutUs = () => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadContent = async () => {
            try {
                const data = await pageService.getPageContent('ABOUT');
                setContent(data.content);
            } catch (error) {
                console.error("Failed to load about page", error);
            } finally {
                setLoading(false);
            }
        };
        loadContent();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Navbar />
            <main className="flex-1 max-w-4xl mx-auto px-4 py-16 w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 tracking-tight">About FlexiZen</h1>
                    <div className="w-24 h-1 bg-indigo-600 mx-auto mt-6 rounded-full"></div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <span className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></span>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-12">
                        {content ? (
                            <div 
                                className="prose prose-indigo max-w-none text-gray-700 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }}
                            />
                        ) : (
                            <p className="text-center text-gray-500 italic">Content is currently being updated. Please check back later.</p>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
};

export default AboutUs;
