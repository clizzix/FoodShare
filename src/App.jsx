import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Recipes from './pages/Recipes';
import Search from './pages/Search';
import DashboardLayout from './layout/DashboardLayout';
import DashboardOverview from './pages/DashboardOverview';
import DashboardSettings from './pages/DashboardSettings';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setIsLoggedIn(true);
    };

    if (!isLoggedIn) {
        return (
            <div className="flex items-center justify-center h-screen bg-background">
                <form
                    onSubmit={handleLogin}
                    className="flex flex-col gap-4 p-8 bg-white rounded-lg shadow-xl border"
                >
                    <h2 className="text-2xl font-bold text-center">Login</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <button
                        type="submit"
                        className="bg-primary text-white p-2 rounded hover:bg-hover font-bold cursor-pointer"
                    >
                        Log In
                    </button>
                </form>
            </div>
        );
    }

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/search" element={<Search />} />
                <Route path="/dashboard" element={<DashboardLayout />}>
                    <Route index element={<DashboardOverview />} />
                    <Route path="settings" element={<DashboardSettings />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
