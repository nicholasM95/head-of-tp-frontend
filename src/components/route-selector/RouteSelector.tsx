import { Menu } from '@headlessui/react'
import type { RouteResponse } from "../../lib/route";

type RouteSelectorProps = {
    routes: RouteResponse[];
    selectedRouteIds: string[];
    onChange: (selectedRouteIds: string[]) => void;
};

export default function RouteSelector({ routes, selectedRouteIds, onChange }: RouteSelectorProps) {

    function toggleRoute(id: string) {
        const newSelection = selectedRouteIds.includes(id)
            ? selectedRouteIds.filter((r) => r !== id)
            : [...selectedRouteIds, id];

        onChange(newSelection);
    }

    const selectedNames =
        selectedRouteIds.length > 0
            ? routes.filter((r) => selectedRouteIds.includes(r.id)).map((r) => r.name).join(', ')
            : 'Select a route'

    return (
        <div className="w-56">
            <Menu as="div" className="relative inline-block text-left w-full">
                <Menu.Button
                    className="inline-flex justify-center w-full rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    {selectedNames}
                </Menu.Button>

                <Menu.Items
                    className="absolute right-0 z-10 mt-2 max-h-60 w-full origin-top-right overflow-auto rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    {routes.map((route) => {
                        const isSelected = selectedRouteIds.includes(route.id)
                        return (
                            <Menu.Item key={route.id}>
                                {({active}) => (
                                    <button
                                        onClick={() => toggleRoute(route.id)}
                                        className={`${
                                            active ? 'bg-indigo-600 text-white' : 'text-gray-900'
                                        } group flex w-full items-center rounded-md px-4 py-2 text-sm`}
                                    >
                                        <input
                                            type="checkbox"
                                            checked={isSelected}
                                            readOnly
                                            className="mr-2 h-4 w-4 cursor-pointer rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        {route.name}
                                    </button>
                                )}
                            </Menu.Item>
                        )
                    })}
                </Menu.Items>
            </Menu>
        </div>
    )
}
