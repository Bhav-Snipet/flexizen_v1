import { useState, useEffect } from 'react';
import Navbar from '../../components/common/Navbar';
import { pageService } from '../../services/pageService';

const DEFAULT_ABOUT_CONTENT = `
<h2>About FlexiZen Studio</h2>
<p>Welcome to FlexiZen — a contemporary sanctuary dedicated to mind, body, and spirit wellness. Established with a passion for holistic health, we provide a warm and inviting community space for everyone from absolute beginners to long-time yoga practitioners.</p>
<p>Our handpicked, fully certified instructors bring a wealth of diverse lineage styles, offering gentle adjustments and customized postures. We believe that true health starts from within, and we are committed to providing the guidance you need to develop a steady, strong, and flexible practice.</p>
<h3>Our Core Pillars</h3>
<ul>
    <li><strong>Mindfulness:</strong> Intentionally syncing breath with movement to build deeper somatic awareness.</li>
    <li><strong>Accessibility:</strong> Offering diverse class types designed to be comfortable and welcoming for every body shape, age, and experience tier.</li>
    <li><strong>Growth:</strong> Empowering you to expand your physical strength, mental resilience, and spiritual tranquility day by day.</li>
</ul>
<p>Whether you seek to release daily muscle tension, build solid physical conditioning, or establish a calming meditative breathing routine, FlexiZen is here to welcome you home.</p>
`;

const AboutUs = () => {
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadContent = async () => {
            try {
                const data = await pageService.getPageContent('ABOUT');
                if (data && data.content) {
                    setContent(data.content);
                } else {
                    setContent(DEFAULT_ABOUT_CONTENT);
                }
            } catch (error) {
                console.warn("Backend not running or empty. Loading elegant local fallback about content.", error);
                setContent(DEFAULT_ABOUT_CONTENT);
            } finally {
                setLoading(false);
            }
        };
        loadContent();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
            <Navbar />
            <main className="flex-1 max-w-4xl mx-auto px-4 py-16 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center mb-12">
                    <span className="text-xs uppercase bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-bold tracking-wider">Our Story</span>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mt-3">About FlexiZen</h1>
                    <div className="w-16 h-1 bg-indigo-600 mx-auto mt-6 rounded-full"></div>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <span className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></span>
                    </div>
                ) : (
                    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-14 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                        <div 
                            className="prose prose-indigo max-w-none text-gray-700 leading-relaxed space-y-6"
                            dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }}
                        />
                    </div>
                )}
            </main>
        </div>
    );
};

export default AboutUs;
