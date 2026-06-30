import { Bike, Car, Ghost } from "lucide-react";

export default function MapLegend() {

    return (
        <div>
            <div className="relative bg-white rounded-2xl shadow-md p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">Map Legend</h2>
                        <div className="mt-2 text-sm text-gray-600 space-y-4">
                            <ul className="text-sm text-gray-700 space-y-3">
                                <li className="flex items-center space-x-3">
                                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white shadow">
                                        <Ghost className="w-4 h-4 text-green-700" />
                                    </span>
                                    <span>Ghost</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white shadow">
                                        <Car className="w-4 h-4 text-blue-800" />
                                    </span>
                                    <span>Car</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white shadow">
                                        <Bike className="w-4 h-4 text-black" />
                                    </span>
                                    <span>Bike</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <span className="flex items-center justify-center w-7 h-7 rounded-full bg-white shadow">
                                        <Car className="w-4 h-4 text-red-500" />
                                    </span>
                                    <span>Head Of TP</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
