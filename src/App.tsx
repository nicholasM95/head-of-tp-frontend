import { Routes, Route } from 'react-router-dom';
import MapPage from './pages/map';
import AdminPage from './pages/admin';
import Navbar from "./components/navbar";
import DashboardPage from "./pages/dashboard/DashboardPage.tsx";
import InfoPage from "./pages/info";

import { useEffect } from 'react';
import { registerSW } from 'virtual:pwa-register';

function App() {
    useEffect(() => {
        const updateSW = registerSW({
            onNeedRefresh() {
                if (confirm('A new version is available. Do you want to reload?')) {
                    updateSW(true);
                }
            },
            onOfflineReady() {
                console.log('App is klaar voor offline gebruik');
            },
        });
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
                <Route path="/" element={<MapPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/info" element={<InfoPage />} />
            </Routes>
        </div>
    );
}

export default App;
