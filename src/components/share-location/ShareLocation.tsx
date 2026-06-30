export default function ShareLocation() {

    return (
        <div>
            <div className="relative bg-white rounded-2xl shadow-md p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">Guide: Share Your Live Location</h2>
                        <div className="mt-2 text-sm text-gray-600 space-y-4">
                            <div>
                                <strong>Step 1: Install the App</strong>
                                <ul className="list-disc ml-5 mt-1 space-y-1">
                                    <li>
                                        iOS: Open the App Store and search for <em>Traccar Client</em>.
                                    </li>
                                    <li>
                                        Android: Open Google Play Store and search for <em>Traccar Client</em>.
                                    </li>
                                </ul>
                            </div>

                            <div>
                                <strong>Step 2: Configure the Device ID</strong>
                                <p className="mt-1">
                                    Open the app, go to <em>Settings</em>, and set the device ID to:
                                </p>
                                <div className="text-xs text-gray-500">
                                    Enter your first name and a random number.
                                </div>
                                <code className="block bg-gray-100 rounded p-2 text-gray-800 mt-1">
                                    firstname2342
                                </code>
                            </div>

                            <div>
                                <strong>Step 3: Configure the Server URL</strong>
                                <p className="mt-1">
                                    Open the app, go to <em>Settings</em>, and set the server URL to:
                                </p>
                                <code className="block bg-gray-100 rounded p-2 text-gray-800 mt-1">
                                    https://api.headoftp.com/device
                                </code>
                            </div>

                            <div>
                                <strong>Step 4: Enable Location Sharing</strong>
                                <p className="mt-1">
                                    Tap the switch to start sharing your live location. Make sure the app has location
                                    permissions enabled.
                                </p>
                            </div>

                            <div>
                                <strong>Step 5: Keep the App Running</strong>
                                <p className="mt-1">
                                    On Android, make sure battery optimization is disabled for the Traccar Client app to
                                    avoid interruptions.
                                </p>
                            </div>

                            <hr className="my-4 border-t border-gray-200" />

                            <div className="text-xs text-gray-500">
                                📍 Your location will be updated in real-time as long as the route is active.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
