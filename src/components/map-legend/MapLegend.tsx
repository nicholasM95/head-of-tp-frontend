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
                                    <span className="w-4 h-4 rounded-full bg-green-700"></span>
                                    <span>Ghost</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <span className="w-4 h-4 rounded-full bg-blue-800"></span>
                                    <span>Car</span>
                                </li>
                                <li className="flex items-center space-x-3">
                                    <span className="w-4 h-4 rounded-full bg-black"></span>
                                    <span>Bike</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
