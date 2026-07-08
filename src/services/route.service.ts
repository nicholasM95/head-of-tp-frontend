import { Configuration, RouteApi, type RouteClimbResponse, type RoutePointResponse, type RouteResponse, type PatchRouteRequest } from "../lib/route";


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

export const getAllRouteClimbsByRouteId = async (routeId: string): Promise<RouteClimbResponse[]> => {
    return await routeApi.getRouteClimbByRouteId({ routeId });
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

export const createRoute = async (
    body: File
): Promise<void> => {
    return await routeApi.createRoute({
        body
    });
};

export const deleteRoute = async (
    routeId: string
): Promise<void> => {
    return await routeApi.deleteRouteByRouteId({
        routeId
    });
};

