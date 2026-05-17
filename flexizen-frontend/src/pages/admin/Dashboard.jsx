import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import AdminHeader from '../../components/admin/AdminHeader';

const Dashboard = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <AdminSidebar />
            <div className="flex-1 flex flex-col">
                <AdminHeader />
                <main className="p-8 flex-1 overflow-auto">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Welcome to Dashboard</h2>
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <p className="text-gray-600">You are successfully authenticated and logged into the FlexiZen admin portal.</p>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
