import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminHeader = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    return (
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-8 shadow-sm">
            <h1 className="text-xl font-semibold text-gray-800">Overview</h1>
            
            <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-gray-600">
                    <User size={18} />
                    <span className="font-medium text-sm">{user?.username || 'Admin'}</span>
                </div>
                
                <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-gray-500 hover:text-red-600 transition-colors text-sm font-medium"
                >
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </header>
    );
};

export default AdminHeader;
