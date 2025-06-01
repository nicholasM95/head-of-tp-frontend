import { Button, Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import RouteDetails from "../../components/route-details";

import { useEffect, useState } from "react";
import { getAllRoutes, patchRouteByRouteId } from "../../services/route.service.ts";
import type { RouteResponse } from "../../lib/route";
import { getAllParticipants, patchParticipantById } from "../../services/participant.service.ts";
import type { ParticipantResponse } from "../../lib/participant";
import ParticipantDetails from "../../components/participant-details";

function DashboardPage() {

    const [routes, setRoutes] = useState<RouteResponse[]>([]);
    const [participants, setParticipants] = useState<ParticipantResponse[]>([]);

    useEffect(() => {
        const fetchRoutes = async () => {
            try {
                const data = await getAllRoutes();
                setRoutes(data);
            } catch (err) {
                console.error("Can't get routes:", err);
            }
        };
        const fetchParticipants = async () => {
            try {
                const data = await getAllParticipants();
                setParticipants(data);
            } catch (err) {
                console.error("Can't get participants:", err);
            }
        };
        fetchRoutes();
        fetchParticipants();
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


    return (
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
                            <div className=" p-4">
                                <div className="max-w-md mx-auto space-y-4">
                                    <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700">
                                        Add Route
                                    </Button>
                                </div>
                                <div className="max-w-md mx-auto space-y-4 mt-8">
                                    {routes.map((route) => (
                                        <RouteDetails
                                            key={route.id}
                                            route={route}
                                            onRouteChange={handleRouteUpdate}
                                        />
                                    ))}
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel key="team">
                            <div className=" p-4">
                                <div className="max-w-md mx-auto space-y-4">
                                    <Button className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700">
                                        Add Team Member
                                    </Button>
                                </div>
                                <div className="max-w-md mx-auto space-y-4 mt-8">
                                    {participants.map((participant) => (
                                        <ParticipantDetails
                                            key={participant.id}
                                            participant={participant}
                                            onParticipantChange={handleParticipantUpdate}
                                        />
                                    ))}
                                </div>
                            </div>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </div>
        </div>
    )
}

export default DashboardPage;

