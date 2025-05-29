import { Configuration, RouteApi, type RoutePointResponse, type RouteResponse, type PatchRouteRequest } from "../lib/route";


const apiConfig = new Configuration({
    basePath: "https://api.headoftp.com",
});

const routeApi = new RouteApi(apiConfig);

export const getAllRoutes = async (): Promise<RouteResponse[]> => {
    return await routeApi.getRoutes();
};

export const getAllRoutePointsByRouteId = async (routeId: string): Promise<RoutePointResponse[]> => {
    return await routeApi.getRoutePointByRouteId({ routeId });
};

export const patchRouteByRouteId = async (
    routeId: string,
    patchRouteRequest: PatchRouteRequest
): Promise<void> => {
    return await routeApi.patchRouteByRouteId({
        routeId,
        patchRouteRequest
    });
};

