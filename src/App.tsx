import { Routes, Route } from 'react-router-dom';
import MapPage from './pages/map';
import AdminPage from './pages/admin';
import Navbar from "./components/navbar";
import DashboardPage from "./pages/dashboard/DashboardPage.tsx";

function App() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
                <Route path="/" element={<MapPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/admin" element={<AdminPage />} />
            </Routes>
        </div>
    );
}

export default App;
