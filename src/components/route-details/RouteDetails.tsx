import { useState } from "react";
import RouteEdit from "../route-edit";
import type { RouteResponse } from "../../lib/route";
import RouteDelete from "../route-delete";
import { Button } from "@headlessui/react";
import type { ParticipantResponse } from "../../lib/participant";

function formatMinutes(totalMinutes: number): string {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}u ${minutes}min`;
}

function isValidDate(d: Date): boolean {
    return d.getFullYear() !== 1970;
}

type RouteDetailsProps = {
    route: RouteResponse;
    participants: ParticipantResponse[];
    onRouteChange: (updatedRoute: RouteResponse) => void;
    onRouteDelete: (id: string) => void;
};

export default function RouteDetails({ route: initialRoute, participants: participants, onRouteChange, onRouteDelete }: RouteDetailsProps) {
    const [route, setRoute] = useState<RouteResponse>(initialRoute);
    const [kilometer, setKilometers] = useState(1);
    const [tp, setTp] = useState<string>();


    function handleRouteUpdate(updated: { estimatedStartTime: string; estimatedAverageSpeed: number; pauseInMinutes: number }) {
        const newRoute = {
            ...route,
            estimatedStartTime: new Date(updated.estimatedStartTime),
            estimatedAverageSpeed: updated.estimatedAverageSpeed,
            pauseInMinutes: updated.pauseInMinutes,
        };
        setRoute(newRoute);
        onRouteChange(newRoute);
    }

    function handleRouteDelete(deleted: { routeId: string; }) {
        onRouteDelete(deleted.routeId);
    }

    function routeStarted(): boolean {
        if (!route?.startTime || !route?.estimatedEndTime) return false;

        const now = new Date();
        const start = new Date(route.startTime);
        const end = new Date(route.estimatedEndTime);

        return now >= start && now <= end;
    }

    return (
        <div>
            <div className="relative bg-white rounded-2xl shadow-md p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">{route.name}</h2>
                        <div className="mt-2 text-sm text-gray-600 space-y-1">
                            <div><strong>Distance:</strong> {route.distanceInMeters / 1000} km</div>
                            <div><strong>Elevation:</strong> {route.elevationGain} m</div>
                            <div><strong>Estimated departure:</strong> {route.estimatedStartTime.toLocaleString(undefined, {
                                hour: '2-digit',
                                minute: '2-digit',
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            })}</div>
                            <div><strong>Estimated speed:</strong> {route.estimatedAverageSpeed} km/h</div>
                            <div><strong>Estimated time:</strong> {formatMinutes(route.durationInMinutes)}</div>

                            <hr className="my-4 border-t border-gray-200" />

                            <div><strong>Average speed:</strong> {route.averageSpeed} km/h</div>
                            <div><strong>Pause:</strong> {route.pauseInMinutes} min</div>
                            {isValidDate(route.startTime) && (
                                <div><strong>Actual departure:</strong> {route.startTime.toLocaleString(undefined, {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                })}</div>
                            )}
                            <div><strong>Estimated arrival:</strong> {route.estimatedEndTime.toLocaleString(undefined, {
                                hour: '2-digit',
                                minute: '2-digit',
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            })}</div>

                            <hr className="my-4 border-t border-gray-200" />

                            <div><strong>Last modified date:</strong> {route.lastModifiedDate.toLocaleString(undefined, {
                                hour: '2-digit',
                                minute: '2-digit',
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            })}</div>
                            <div><strong>Create date:</strong> {route.createDate.toLocaleString(undefined, {
                                hour: '2-digit',
                                minute: '2-digit',
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            })}</div>

                            <hr className="my-4 border-t border-gray-200" />

                            <div className="mb-4">
                                <label htmlFor="kilometer" className="block text-sm font-medium text-gray-600 mb-1">
                                    <strong>Navigate to kilometer:</strong>
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        id="kilometer"
                                        type="number"
                                        step="1"
                                        min="0"
                                        className="w-32 rounded-md border border-white/30 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                                        required
                                        value={kilometer}
                                        onChange={e => setKilometers(Number(e.target.value))}
                                        placeholder="Bijv. 40"
                                    />
                                    <Button
                                        onClick={() => window.open(`https://api.headoftp.com/route/${route.id}/navigate?meters=${kilometer * 1000}`, '_blank')}
                                        className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none focus:ring-2 focus:ring-white hover:bg-gray-600"
                                    >
                                        Navigate
                                    </Button>
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="kilometer" className="block text-sm font-medium text-gray-600 mb-1">
                                    <strong>Navigate to meeting point with TP:</strong>
                                </label>
                                <div className="flex items-center gap-2">
                                    <select
                                        id="role"
                                        className="w-48 mt-1 rounded-md border border-white/30 bg-gray-700 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                                        required
                                        onChange={e => setTp(e.target.value)}
                                    >
                                        <option>Select TP</option>
                                        {participants.filter(p => p.role === 'TP').map(participant => (
                                            <option key={participant.id} value={participant.id}>
                                                {participant.name}
                                            </option>
                                        ))}
                                    </select>
                                    <Button
                                        disabled={!tp || tp === 'Select TP' || !routeStarted()}
                                        onClick={() => window.open(`https://api.headoftp.com/route/${route.id}/navigate?tp=${tp}`, '_blank')}
                                        className={`inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold shadow-inner shadow-white/10 focus:outline-none focus:ring-2 focus:ring-white ${
                                            !route?.id || !tp || tp === 'Select TP' || !routeStarted()
                                                ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                                                : 'bg-gray-700 text-white hover:bg-gray-600'
                                        }`}                                    >
                                        Navigate
                                    </Button>
                                </div>
                                {!routeStarted() && (
                                    <div className="text-xs text-gray-500">
                                        This functionality is only available during an active route.
                                    </div>
                                )}
                                {routeStarted() && (!tp || tp === 'Select TP') && (
                                    <div className="text-xs text-gray-500">
                                        This functionality is only available after selecting a TP.
                                    </div>
                                )}

                            </div>

                        </div>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <RouteEdit route={route} onSave={handleRouteUpdate}></RouteEdit>
                        <RouteDelete route={route} onDelete={handleRouteDelete}></RouteDelete>
                    </div>
                </div>
            </div>
        </div>
    );
}
