import { MapContainer, Marker, TileLayer, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import type { RoutePointResponse } from "../../lib/route";
import { type JSX, useEffect, useRef } from "react";

type Location = {
    routeId: string;
    latitude: number;
    longitude: number;
};

const COLORS = ['red', 'blue', 'green', 'orange', 'purple', 'black', 'brown'];

function areCentersEqual(a: [number, number], b: [number, number]) {
    return a[0] === b[0] && a[1] === b[1];
}

function SetViewOnChange({ center }: { center: [number, number] }) {
    const map = useMap();
    const previousCenter = useRef<[number, number] | null>(null);

    useEffect(() => {
        if (center) {
            if (!previousCenter.current || !areCentersEqual(center, previousCenter.current)) {
                map.setView(center);
                previousCenter.current = center;
            }
        }
    }, [center, map]);

    return null;
}


function hashStringToIndex(str: string, max: number): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash) % max;
}

export default function Map({ locations, routePointsMap }: { locations: Location[], routePointsMap: Map<string, RoutePointResponse[]> }) {
    const polylines: JSX.Element[] = [];

    for (const [routeId, points] of routePointsMap.entries()) {
        if (points.length < 2) continue;

        const colorIndex = hashStringToIndex(routeId, COLORS.length);
        const color = COLORS[colorIndex];

        const positions = points.map(p => [p.latitude, p.longitude]) as [number, number][];

        polylines.push(
            <Polyline
                key={routeId}
                positions={positions}
                color={color}
                weight={3}
                opacity={0.8}
                renderer={L.canvas()}
            />
        );
    }

    const firstRoutePoints = routePointsMap.values().next().value;
    const center = firstRoutePoints && firstRoutePoints.length > 0
        ? [firstRoutePoints[0].latitude, firstRoutePoints[0].longitude]
        : [50.8467, 4.3499];

    return (
        <MapContainer
            center={center as L.LatLngExpression}
            zoom={11}
            scrollWheelZoom={true}
            style={{ height: '100vh', width: '100%' }}>

            <TileLayer
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                attribution='&copy; <a href="https://carto.com/">Carto</a>'
            />

            {polylines}

            {locations.map((loc, index) => (
                <Marker
                    key={index}
                    position={[loc.latitude, loc.longitude] as L.LatLngExpression}
                >
                </Marker>
            ))}
            <SetViewOnChange center={center as [number, number]} />
        </MapContainer>
    );
}
