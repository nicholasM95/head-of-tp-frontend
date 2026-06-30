import ShareLocation from "../../components/share-location";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import MapLegend from "../../components/map-legend";

function InfoPage() {

    return (
        <div className="flex h-screen w-full justify-center px-4 pt-4">
            <div className="w-full max-w-md">
                <TabGroup>
                    <TabList className="flex gap-4">
                        <Tab
                            key="share-location"
                            className="rounded-full px-3 py-1 text-sm/6 font-semibold text-black focus:not-data-focus:outline-none data-focus:outline data-focus:outline-black data-hover:bg-black/5 data-selected:bg-black/10 data-selected:data-hover:bg-black/10"
                        >
                            Share Location
                        </Tab>
                        <Tab
                            key="map-legend"
                            className="rounded-full px-3 py-1 text-sm/6 font-semibold text-black focus:not-data-focus:outline-none data-focus:outline data-focus:outline-black data-hover:bg-black/5 data-selected:bg-black/10 data-selected:data-hover:bg-black/10"
                        >
                            Map Legend
                        </Tab>
                    </TabList>
                    <TabPanels className="mt-3">
                        <TabPanel key="share-location">
                            <div className="pt-4">
                                <div className="max-w-md mx-auto space-y-4">
                                    <ShareLocation></ShareLocation>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel key="map-legend">
                            <div className="pt-4">
                                <div className="max-w-md mx-auto space-y-4">
                                    <MapLegend></MapLegend>
                                </div>
                            </div>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </div>
        </div>
    )
}

export default InfoPage;
