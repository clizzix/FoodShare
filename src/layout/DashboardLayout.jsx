import React from 'react';
import { Link, Outlet } from 'react-router';

const DashboardLayout = () => {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>
            <div className="flex space-x-4 mb-4">
                <Link to="/dashboard" className="text-primary hover:underline">
                    Overview
                </Link>
                <Link
                    to="/dashboard/settings"
                    className="text-primary hover:underline"
                >
                    Settings
                </Link>
            </div>
            <Outlet />
        </div>
    );
};

export default DashboardLayout;
