import { useState, useEffect, useCallback } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { classService } from '../../services/classService';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

const ManageClasses = () => {
    const [classes, setClasses] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingClass, setEditingClass] = useState(null);
    const [formData, setFormData] = useState({ title: '', description: '', schedule: '', capacity: 20, active: true });

    const loadClasses = useCallback(async () => {
        setLoading(true);
        try {
            const data = await classService.getAllClasses();
            setClasses(data);
        } catch (error) {
            console.error("Failed to load classes:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        loadClasses();
    }, [loadClasses]);

    const openModal = (yogaClass = null) => {
        if (yogaClass) {
            setEditingClass(yogaClass);
            setFormData({ ...yogaClass });
        } else {
            setEditingClass(null);
            setFormData({ title: '', description: '', schedule: '', capacity: 20, active: true });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingClass(null);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingClass) {
                await classService.updateClass(editingClass.id, formData);
            } else {
                await classService.createClass(formData);
            }
            closeModal();
            loadClasses();
        } catch (error) {
            console.error("Save failed:", error);
            alert("Failed to save class.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this class?")) {
            try {
                await classService.deleteClass(id);
                loadClasses();
            } catch (error) {
                console.error("Delete failed:", error);
                alert("Failed to delete class.");
            }
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />
            <div className="flex-1 flex flex-col">
                <AdminHeader />
                <main className="p-8 flex-1 overflow-auto">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Manage Classes</h2>
                        <button 
                            onClick={() => openModal()}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 shadow-sm"
                        >
                            <Plus size={18} />
                            <span>Add New Class</span>
                        </button>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm">
                                        <th className="px-6 py-4 font-semibold">Class Title</th>
                                        <th className="px-6 py-4 font-semibold">Schedule</th>
                                        <th className="px-6 py-4 font-semibold">Capacity</th>
                                        <th className="px-6 py-4 font-semibold">Status</th>
                                        <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr><td colSpan="5" className="text-center py-8 text-gray-500">Loading...</td></tr>
                                    ) : classes.length === 0 ? (
                                        <tr><td colSpan="5" className="text-center py-8 text-gray-500">No classes found.</td></tr>
                                    ) : (
                                        classes.map((cls) => (
                                            <tr key={cls.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 text-gray-800 font-medium">{cls.title}</td>
                                                <td className="px-6 py-4 text-gray-600">{cls.schedule}</td>
                                                <td className="px-6 py-4 text-gray-600">{cls.capacity}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${cls.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                        {cls.active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right space-x-3">
                                                    <button onClick={() => openModal(cls)} className="text-indigo-600 hover:text-indigo-900 transition-colors">
                                                        <Edit2 size={18} />
                                                    </button>
                                                    <button onClick={() => handleDelete(cls.id)} className="text-red-500 hover:text-red-700 transition-colors">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100">
                            <h3 className="text-xl font-bold text-gray-900">{editingClass ? 'Edit Class' : 'Add New Class'}</h3>
                            <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                <input type="text" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" 
                                    value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea required rows="3" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none resize-none"
                                    value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}></textarea>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Schedule</label>
                                    <input type="text" required placeholder="e.g. Mon/Wed 7:00 AM" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                        value={formData.schedule} onChange={e => setFormData({...formData, schedule: e.target.value})} />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                                    <input type="number" required min="1" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                                        value={formData.capacity} onChange={e => setFormData({...formData, capacity: parseInt(e.target.value)})} />
                                </div>
                            </div>
                            <div className="flex items-center space-x-2 pt-2">
                                <input type="checkbox" id="active" className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                                    checked={formData.active} onChange={e => setFormData({...formData, active: e.target.checked})} />
                                <label htmlFor="active" className="text-sm font-medium text-gray-700">Class is Active</label>
                            </div>
                            <div className="pt-6 flex justify-end space-x-3">
                                <button type="button" onClick={closeModal} className="px-5 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors">Cancel</button>
                                <button type="submit" className="px-5 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors">Save Class</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageClasses;
