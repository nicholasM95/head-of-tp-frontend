import RouteSelector from "../../components/route-selector";
import MapComponent from "../../components/map";
import { useEffect, useState } from "react";
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { getAllRoutePointsByRouteId, getAllRoutes } from "../../services/route.service.ts";
import type { RoutePointResponse, RouteResponse } from "../../lib/route";

type Location = {
    routeId: string;
    latitude: number;
    longitude: number;
    type: string;
};

function MapPage() {
    const [routes, setRoutes] = useState<RouteResponse[]>([]);
    const [selectedRouteIds, setSelectedRouteIds] = useState<string[]>(() => {
        const stored = sessionStorage.getItem('selectedRouteIds');
        return stored ? JSON.parse(stored) : [];
    });

    const [locations, setLocations] = useState<Location[]>([]);


    useEffect(() => {
        sessionStorage.setItem('selectedRouteIds', JSON.stringify(selectedRouteIds));
    }, [selectedRouteIds]);
    const [routePointsMap, setRoutePointsMap] = useState<Map<string, RoutePointResponse[]>>(new Map());

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const data = await getAllRoutes();
                setRoutes(data);
            } catch (err) {
                console.error("Can't get routes:", err);
            }
        };
        fetchRoutes();
    }, []);

    useEffect(() => {
        const updateRoutePoints = async () => {
            const filteredMap = new Map(
                [...routePointsMap].filter(([routeId]) => selectedRouteIds.includes(routeId))
            );

            const routesToFetch = selectedRouteIds.filter(routeId => !filteredMap.has(routeId));

            await Promise.all(
                routesToFetch.map(async (routeId) => {
                    try {
                        const points = await getAllRoutePointsByRouteId(routeId);
                        filteredMap.set(routeId, points);
                    } catch (error) {
                        console.error(`Error fetching points for route ${routeId}:`, error);
                    }
                })
            );

            setRoutePointsMap(filteredMap);
        };

        if (selectedRouteIds.length > 0) {
            updateRoutePoints().then(r => console.log(r));
        } else {
            setRoutePointsMap(new Map());
        }
    }, [selectedRouteIds]);


    useEffect(() => {
        const socket = new SockJS('https://api.headoftp.com/route-websocket');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                selectedRouteIds.forEach((routeId) => {
                    const ghostTopic = `/topic/route/${routeId}/ghost`;
                    stompClient.subscribe(ghostTopic, (message) => {
                        if (message.body) {
                            const parsed = JSON.parse(message.body);
                            const rawList = Array.isArray(parsed) ? parsed : [parsed];

                            const locationList: Location[] = rawList.map((loc) => ({
                                ...loc,
                                routeId: routeId,
                                type: 'GHOST',
                            }));

                            setLocations((prevLocations) => [
                                ...prevLocations.filter(l => !(l.routeId === routeId && l.type === 'GHOST')),
                                ...locationList,
                            ]);
                        }
                    });

                    const carTopic = `/topic/route/${routeId}/car`;
                    stompClient.subscribe(carTopic, (message) => {
                        if (message.body) {
                            const parsed = JSON.parse(message.body);
                            const rawList = Array.isArray(parsed) ? parsed : [parsed];

                            const locationList: Location[] = rawList.map((loc) => ({
                                ...loc,
                                routeId: routeId,
                                type: 'CAR',
                            }));

                            setLocations((prevLocations) => [
                                ...prevLocations.filter(l => !(l.routeId === routeId && l.type === 'CAR')),
                                ...locationList,
                            ]);
                        }
                    });

                    const bikeTopic = `/topic/route/${routeId}/bike`;
                    stompClient.subscribe(bikeTopic, (message) => {
                        if (message.body) {
                            const parsed = JSON.parse(message.body);
                            const rawList = Array.isArray(parsed) ? parsed : [parsed];

                            const locationList: Location[] = rawList.map((loc) => ({
                                ...loc,
                                routeId: routeId,
                                type: 'BIKE',
                            }));

                            setLocations((prevLocations) => [
                                ...prevLocations.filter(l => !(l.routeId === routeId && l.type === 'BIKE')),
                                ...locationList,
                            ]);
                        }
                    });
                });
            },
        });

        stompClient.activate();

        return () => {
            stompClient.deactivate().then(r => console.log(r));
        };
    }, [selectedRouteIds]);

    return (
        <div className="relative h-screen w-full">
            <div className="z-0 h-full w-full">
                <MapComponent locations={locations} routePointsMap={routePointsMap} />
            </div>
            <div className="absolute top-4 right-4 z-60">
                <RouteSelector
                    routes={routes}
                    selectedRouteIds={selectedRouteIds}
                    onChange={setSelectedRouteIds}
                />
            </div>
        </div>
    )
}

export default MapPage;
