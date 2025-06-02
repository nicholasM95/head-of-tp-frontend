import { useState } from "react";
import RouteEdit from "../route-edit";
import type { RouteResponse } from "../../lib/route";
import RouteDelete from "../route-delete";

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
    onRouteChange: (updatedRoute: RouteResponse) => void;
    onRouteDelete: (id: string) => void;
};

export default function RouteDetails({ route: initialRoute, onRouteChange, onRouteDelete }: RouteDetailsProps) {
    const [route, setRoute] = useState<RouteResponse>(initialRoute);

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

                        </div>
                    </div>
                    <RouteEdit route={route} onSave={handleRouteUpdate}></RouteEdit>
                    <RouteDelete route={route} onDelete={handleRouteDelete}></RouteDelete>
                </div>
            </div>
        </div>
    );
}
