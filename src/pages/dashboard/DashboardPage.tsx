import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import RouteDetails from "../../components/route-details";

import { useEffect, useState } from "react";
import { createRoute, deleteRoute, getAllRoutes, patchRouteByRouteId } from "../../services/route.service.ts";
import type { RouteResponse } from "../../lib/route";
import { createParticipant, deleteParticipant, getAllParticipants, patchParticipantById } from "../../services/participant.service.ts";
import type { CreateParticipantRequest, ParticipantResponse } from "../../lib/participant";
import ParticipantDetails from "../../components/participant-details";
import ParticipantCreate from "../../components/participant-create";
import RouteCreate from "../../components/route-create";

function DashboardPage() {

    const [routes, setRoutes] = useState<RouteResponse[]>([]);
    const [participants, setParticipants] = useState<ParticipantResponse[]>([]);

    const [loadingCreateRoute, setLoadingCreateRoute] = useState(false);
    const [loadingDeleteRoute, setLoadingDeleteRoute] = useState(false);


    async function fetchRoutes() {
        return getAllRoutes();
    }

    async function fetchParticipants() {
        return getAllParticipants();
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [routesData, participantsData] = await Promise.all([
                    fetchRoutes(),
                    fetchParticipants(),
                ]);
                setRoutes(routesData);
                setParticipants(participantsData);
            } catch (err) {
                console.error('Failed to fetch data:', err);
            }
        };
        fetchData();
    }, []);

    function handleRouteUpdate(updatedRoute: RouteResponse) {
        setRoutes(prevRoutes =>
            prevRoutes.map(route =>
                route.id === updatedRoute.id ? updatedRoute : route
            )
        );
        patchRouteByRouteId(updatedRoute.id, updatedRoute);
    }

    function handleParticipantUpdate(updatedParticipant: ParticipantResponse) {
        setParticipants(prevParticipants =>
            prevParticipants.map(participant =>
                participant.id === updatedParticipant.id ? updatedParticipant : participant
            )
        );
        patchParticipantById(updatedParticipant.id, updatedParticipant);
    }

    function handleRouteDelete(id: string) {
        setLoadingDeleteRoute(true);
        deleteRoute(id)
            .then(() => getAllRoutes())
            .then(updatedRoutes => setRoutes(updatedRoutes))
            .catch(error => {
                console.error('Failed to delete route or fetch routes:', error);
            })
            .finally(() => {
                setLoadingDeleteRoute(false);
            });
    }

    function handleParticipantDelete(id: string) {
        deleteParticipant(id)
            .then(() => getAllParticipants())
            .then(updatedParticipants => setParticipants(updatedParticipants))
            .catch(error => {
                console.error('Failed to delete participant or fetch participants:', error);
            })
    }

    function handleOnCreateParticipant(createParticipantRequest: CreateParticipantRequest) {
        createParticipant(createParticipantRequest)
            .then(() => getAllParticipants())
            .then(updatedParticipants => setParticipants(updatedParticipants))
            .catch(error => {
                console.error('Failed to create participant or fetch participants:', error);
            });
    }

    function handleOnCreateRoute({file}: { file: File }) {
        setLoadingCreateRoute(true);
        createRoute(file)
            .then(() => getAllRoutes())
            .then(updatedRoutes => setRoutes(updatedRoutes))
            .catch(error => {
                console.error('Failed to create route or fetch routes:', error);
            })
            .finally(() => {
                setLoadingCreateRoute(false);
            });
    }

    return (
        <>
            {loadingCreateRoute && (
                <div className="flex items-center justify-center mt-4">
                    <svg
                        className="animate-spin h-6 w-6 text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                    </svg>
                    <span className="ml-2 text-black">Creating route...</span>
                </div>
            )}

            {loadingDeleteRoute && (
                <div className="flex items-center justify-center mt-4">
                    <svg
                        className="animate-spin h-6 w-6 text-black"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        ></circle>
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                        ></path>
                    </svg>
                    <span className="ml-2 text-black">Deleting route...</span>
                </div>
            )}

            <div className="flex h-screen w-full justify-center px-4 pt-4">
                <div className="w-full max-w-md">
                    <TabGroup>
                        <TabList className="flex gap-4">
                            <Tab
                                key="routes"
                                className="rounded-full px-3 py-1 text-sm/6 font-semibold text-black focus:not-data-focus:outline-none data-focus:outline data-focus:outline-black data-hover:bg-black/5 data-selected:bg-black/10 data-selected:data-hover:bg-black/10"
                            >
                                Routes
                            </Tab>
                            <Tab
                                key="team"
                                className="rounded-full px-3 py-1 text-sm/6 font-semibold text-black focus:not-data-focus:outline-none data-focus:outline data-focus:outline-black data-hover:bg-black/5 data-selected:bg-black/10 data-selected:data-hover:bg-black/10"
                            >
                                Team
                            </Tab>
                        </TabList>
                        <TabPanels className="mt-3">
                            <TabPanel key="routes">
                                <div className="pt-4">
                                    <div className="max-w-md mx-auto space-y-4">
                                        <RouteCreate onCreate={handleOnCreateRoute}></RouteCreate>
                                    </div>
                                    <div className="max-w-md mx-auto space-y-4 mt-8">
                                        {routes.map((route) => (
                                            <RouteDetails
                                                key={route.id}
                                                route={route}
                                                participants={participants}
                                                onRouteChange={handleRouteUpdate}
                                                onRouteDelete={handleRouteDelete}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel key="team">
                                <div className="pt-4">
                                    <div className="max-w-md mx-auto space-y-4">
                                        <ParticipantCreate onCreate={handleOnCreateParticipant}></ParticipantCreate>
                                    </div>
                                    <div className="max-w-md mx-auto space-y-4 mt-8">
                                        {participants.map((participant) => (
                                            <ParticipantDetails
                                                key={participant.id}
                                                participant={participant}
                                                onParticipantChange={handleParticipantUpdate}
                                                onParticipantDelete={handleParticipantDelete}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </TabPanel>
                        </TabPanels>
                    </TabGroup>
                </div>
            </div>
        </>
    )
}

export default DashboardPage;

