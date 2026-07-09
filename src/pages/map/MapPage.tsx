import RouteSelector from "../../components/route-selector";
import MapComponent from "../../components/map";
import RouteElevationPanel from "../../components/route-elevation";
import { useEffect, useState } from "react";
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { getAllRouteClimbsByRouteId, getAllRoutePointsByRouteId, getAllRoutes } from "../../services/route.service.ts";
import type { RouteClimbResponse, RoutePointResponse, RouteResponse } from "../../lib/route";
import type { DeviceResponse } from "../../lib/device";
import { getAllDevices } from "../../services/device.service.ts";

type Location = {
    routeId: string;
    latitude: number;
    longitude: number;
    type: string;
    deviceId: string;
};

function MapPage() {
    const [routes, setRoutes] = useState<RouteResponse[]>([]);
    const [devices, setDevices] = useState<DeviceResponse[]>([]);

    const [selectedRouteIds, setSelectedRouteIds] = useState<string[]>(() => {
        const stored = sessionStorage.getItem('selectedRouteIds');
        return stored ? JSON.parse(stored) : [];
    });

    const [locations, setLocations] = useState<Location[]>([]);

    async function fetchRoutes() {
        return getAllRoutes();
    }

    async function fetchDevice() {
        return getAllDevices();
    }


    useEffect(() => {
        sessionStorage.setItem('selectedRouteIds', JSON.stringify(selectedRouteIds));
    }, [selectedRouteIds]);
    const [routePointsMap, setRoutePointsMap] = useState<Map<string, RoutePointResponse[]>>(new Map());

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [routesData, devicesData] = await Promise.all([
                    fetchRoutes(),
                    fetchDevice()
                ]);
                setRoutes(routesData);
                setDevices(devicesData);
            } catch (err) {
                console.error('Failed to fetch data:', err);
            }
        };
        fetchData();
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

    const singleSelectedRouteId = selectedRouteIds.length === 1 ? selectedRouteIds[0] : null;
    const [climbs, setClimbs] = useState<RouteClimbResponse[]>([]);

    useEffect(() => {
        if (!singleSelectedRouteId) {
            setClimbs([]);
            return;
        }

        getAllRouteClimbsByRouteId(singleSelectedRouteId)
            .then(setClimbs)
            .catch(error => {
                console.error(`Error fetching climbs for route ${singleSelectedRouteId}:`, error);
                setClimbs([]);
            });
    }, [singleSelectedRouteId]);

    const selectedRoute = routes.find(route => route.id === singleSelectedRouteId);


    useEffect(() => {
        const socket = new SockJS('https://api.headoftp.com/route-websocket');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            onConnect: () => {
                selectedRouteIds.forEach((routeId) => {
                    const ghostTopic = `/topic/route/${routeId}/ghost/GHOST_DEVICE_ID`;
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

                    devices.forEach((device) => {
                        const headOfTpTopic = `/topic/route/${routeId}/head_of_tp/${device.id.toUpperCase()}`;
                        stompClient.subscribe(headOfTpTopic, (message) => {
                            if (message.body) {
                                const parsed = JSON.parse(message.body);
                                const rawList = Array.isArray(parsed) ? parsed : [parsed];

                                const locationList: Location[] = rawList.map((loc) => ({
                                    ...loc,
                                    routeId: routeId,
                                    type: 'HEAD_OF_TP',
                                    deviceId: device.id
                                }));

                                setLocations((prevLocations) => [
                                    ...prevLocations.filter(l => !(l.routeId === routeId && l.type === 'HEAD_OF_TP' && l.deviceId === device.id)),
                                    ...locationList,
                                ]);
                            }
                        });

                        const carTopic = `/topic/route/${routeId}/car/${device.id.toUpperCase()}`;
                        stompClient.subscribe(carTopic, (message) => {
                            if (message.body) {
                                const parsed = JSON.parse(message.body);
                                const rawList = Array.isArray(parsed) ? parsed : [parsed];

                                const locationList: Location[] = rawList.map((loc) => ({
                                    ...loc,
                                    routeId: routeId,
                                    type: 'CAR',
                                    deviceId: device.id
                                }));

                                setLocations((prevLocations) => [
                                    ...prevLocations.filter(l => !(l.routeId === routeId && l.type === 'CAR' && l.deviceId === device.id)),
                                    ...locationList,
                                ]);
                            }
                        });

                        const bikeTopic = `/topic/route/${routeId}/bike/${device.id.toUpperCase()}`;
                        stompClient.subscribe(bikeTopic, (message) => {
                            if (message.body) {
                                const parsed = JSON.parse(message.body);
                                console.log(parsed);
                                console.log(bikeTopic);
                                const rawList = Array.isArray(parsed) ? parsed : [parsed];

                                const locationList: Location[] = rawList.map((loc) => ({
                                    ...loc,
                                    routeId: routeId,
                                    type: 'BIKE',
                                    deviceId: device.id
                                }));

                                setLocations((prevLocations) => [
                                    ...prevLocations.filter(l => !(l.routeId === routeId && l.type === 'BIKE' && l.deviceId === device.id)),
                                    ...locationList,
                                ]);
                            }
                        });
                    });

                });
            },
        });

        stompClient.activate();

        return () => {
            stompClient.deactivate().then(r => console.log(r));
        };
    }, [selectedRouteIds, devices]);

    return (
        <div className="relative h-full w-full overflow-hidden">
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
            {selectedRoute && (
                <RouteElevationPanel
                    key={selectedRoute.id}
                    route={selectedRoute}
                    points={routePointsMap.get(selectedRoute.id) ?? []}
                    climbs={climbs}
                />
            )}
        </div>
    )
}

export default MapPage;
