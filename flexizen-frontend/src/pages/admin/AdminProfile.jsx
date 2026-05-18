import { useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';
import { adminService } from '../../services/adminService';
import { useAuth } from '../../context/AuthContext';
import { User, Lock, Save, CheckCircle } from 'lucide-react';

const AdminProfile = () => {
    const { user, setUser } = useAuth();
    
    // Profile State
    const [profileData, setProfileData] = useState({ 
        name: user?.name || '', 
        email: user?.email || '' 
    });
    const [profileSaving, setProfileSaving] = useState(false);
    const [profileSuccess, setProfileSuccess] = useState(false);

    // Password State
    const [passwordData, setPasswordData] = useState({ 
        currentPassword: '', 
        newPassword: '', 
        confirmPassword: '' 
    });
    const [passwordSaving, setPasswordSaving] = useState(false);
    const [passwordSuccess, setPasswordSuccess] = useState(false);
    const [passwordError, setPasswordError] = useState('');

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        setProfileSaving(true);
        setProfileSuccess(false);
        try {
            await adminService.updateProfile(profileData);
            setUser({ ...user, name: profileData.name, email: profileData.email });
            setProfileSuccess(true);
            setTimeout(() => setProfileSuccess(false), 3000);
        } catch {
            alert("Failed to update profile.");
        } finally {
            setProfileSaving(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setPasswordError("New passwords do not match.");
            return;
        }
        if (passwordData.newPassword.length < 6) {
            setPasswordError("Password must be at least 6 characters.");
            return;
        }

        setPasswordSaving(true);
        setPasswordError('');
        setPasswordSuccess(false);

        try {
            await adminService.changePassword({
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });
            setPasswordSuccess(true);
            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
            setTimeout(() => setPasswordSuccess(false), 3000);
        } catch (error) {
            setPasswordError(error.response?.data?.error || "Failed to change password. Please check your current password.");
        } finally {
            setPasswordSaving(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />
            <div className="flex-1 flex flex-col">
                <AdminHeader />
                <main className="p-8 flex-1 overflow-auto">
                    <div className="mb-8">
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Account Settings</h2>
                        <p className="text-gray-500 mt-2">Manage your administrative profile and security preferences.</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">
                        
                        {/* Profile Settings */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center">
                                <User size={20} className="text-indigo-600 mr-2" />
                                <h3 className="font-bold text-gray-800">Public Profile</h3>
                            </div>
                            <form onSubmit={handleProfileSubmit} className="p-6 space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Display Name</label>
                                    <input 
                                        type="text" 
                                        required
                                        value={profileData.name}
                                        onChange={e => setProfileData({...profileData, name: e.target.value})}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input 
                                        type="email" 
                                        required
                                        value={profileData.email}
                                        onChange={e => setProfileData({...profileData, email: e.target.value})}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:bg-white outline-none transition-all"
                                    />
                                </div>
                                
                                {profileSuccess && (
                                    <div className="flex items-center text-sm text-green-600 font-medium bg-green-50 p-3 rounded-lg border border-green-100">
                                        <CheckCircle size={16} className="mr-2" /> Profile updated successfully.
                                    </div>
                                )}
                                
                                <div className="pt-2">
                                    <button 
                                        type="submit" 
                                        disabled={profileSaving}
                                        className="flex items-center justify-center w-full md:w-auto px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all shadow-sm disabled:opacity-70"
                                    >
                                        <Save size={18} className="mr-2" />
                                        {profileSaving ? 'Saving...' : 'Save Profile Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Security Settings */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 delay-100 fill-mode-both">
                            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center">
                                <Lock size={20} className="text-red-600 mr-2" />
                                <h3 className="font-bold text-gray-800">Security & Password</h3>
                            </div>
                            <form onSubmit={handlePasswordSubmit} className="p-6 space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                    <input 
                                        type="password" 
                                        required
                                        value={passwordData.currentPassword}
                                        onChange={e => setPasswordData({...passwordData, currentPassword: e.target.value})}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white outline-none transition-all"
                                    />
                                </div>
                                <div className="border-t border-gray-100 my-4 pt-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                    <input 
                                        type="password" 
                                        required
                                        value={passwordData.newPassword}
                                        onChange={e => setPasswordData({...passwordData, newPassword: e.target.value})}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white outline-none transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                    <input 
                                        type="password" 
                                        required
                                        value={passwordData.confirmPassword}
                                        onChange={e => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white outline-none transition-all"
                                    />
                                </div>

                                {passwordError && (
                                    <div className="text-sm text-red-600 font-medium bg-red-50 p-3 rounded-lg border border-red-100">
                                        {passwordError}
                                    </div>
                                )}
                                {passwordSuccess && (
                                    <div className="flex items-center text-sm text-green-600 font-medium bg-green-50 p-3 rounded-lg border border-green-100">
                                        <CheckCircle size={16} className="mr-2" /> Password changed successfully.
                                    </div>
                                )}

                                <div className="pt-2">
                                    <button 
                                        type="submit" 
                                        disabled={passwordSaving}
                                        className="flex items-center justify-center w-full md:w-auto px-6 py-3 bg-gray-900 hover:bg-black text-white font-medium rounded-xl transition-all shadow-sm disabled:opacity-70"
                                    >
                                        <Lock size={18} className="mr-2" />
                                        {passwordSaving ? 'Updating...' : 'Update Password'}
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminProfile;
