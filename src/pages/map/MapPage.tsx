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
            updateRoutePoints();
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
                stompClient.subscribe('/topic/route/ghost', (message) => {
                    if (message.body) {
                        const locationList: Location[] = JSON.parse(message.body);
                        const filtered = locationList.filter((loc: Location) =>
                            selectedRouteIds.includes(loc.routeId)
                        );
                        setLocations(filtered);
                    }
                });
            },
        });

        stompClient.activate();

        return () => {
            stompClient.deactivate();
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
