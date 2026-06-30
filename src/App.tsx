import { useEffect, useRef, useState, Fragment } from 'react';
import { registerSW } from 'virtual:pwa-register';
import { Dialog, Transition } from '@headlessui/react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import MapPage from './pages/map';
import AdminPage from './pages/admin';
import DashboardPage from './pages/dashboard/DashboardPage.tsx';
import InfoPage from './pages/info';

function App() {
    const updateSW = useRef<(() => void) | null>(null);
    const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);

    useEffect(() => {
        updateSW.current = registerSW({
            onNeedRefresh() {
                setIsUpdateAvailable(true);
            },
            onOfflineReady() {
                console.log('App is klaar voor offline gebruik');
            },
        });
    }, []);

    function handleReload() {
        if (updateSW.current) {
            updateSW.current();
        }
    }

    function handleClose() {
        setIsUpdateAvailable(false);
    }

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<MapPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/info" element={<InfoPage />} />
            </Routes>

            <Transition appear show={isUpdateAvailable} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={handleClose}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-70"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-70"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Update Available
                                    </Dialog.Title>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            A new version of this app is available. Would you like to reload to get the latest updates?
                                        </p>
                                    </div>

                                    <div className="mt-4 flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300 focus:outline-none"
                                            onClick={handleClose}
                                        >
                                            Later
                                        </button>
                                        <button
                                            type="button"
                                            className="cursor-pointer inline-flex justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none"
                                            onClick={handleReload}
                                        >
                                            Reload
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
}

export default App;
