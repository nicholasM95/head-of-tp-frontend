import RouteDetails from "../../components/route-details";

import { useEffect, useState } from "react";
import { getAllRoutes, patchRouteByRouteId } from "../../services/route.service.ts";
import type { RouteResponse } from "../../lib/route";

function DashboardPage() {

    const [routes, setRoutes] = useState<RouteResponse[]>([]);

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

    function handleRouteUpdate(updatedRoute: RouteResponse) {
        setRoutes(prevRoutes =>
            prevRoutes.map(route =>
                route.id === updatedRoute.id ? updatedRoute : route
            )
        );

        patchRouteByRouteId(updatedRoute.id, updatedRoute);
    }


    return (
        <div className=" p-4">
            <div className="max-w-md mx-auto space-y-4">
                {routes.map((route) => (
                    <RouteDetails
                        key={route.id}
                        route={route}
                        onRouteChange={handleRouteUpdate}
                    />
                ))}
            </div>
        </div>
    )
}

export default DashboardPage;

