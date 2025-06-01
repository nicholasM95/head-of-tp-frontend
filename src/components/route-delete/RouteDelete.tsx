import { Button } from '@headlessui/react'
import type { RouteResponse } from "../../lib/route";

import {
    TrashIcon
} from '@heroicons/react/16/solid'

type RouteDeleteProps = {
    route: RouteResponse;
    onDelete: (data: { routeId: string; }) => void;
}

export default function RouteDelete({ route, onDelete }: RouteDeleteProps) {

    function handleSubmit() {
        onDelete({
            routeId: route.id
        });
    }

    return (
        <Button
            onClick={handleSubmit}
            className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white"
        >
            <TrashIcon className="h-4 w-4 fill-red-700" />
        </Button>
    )
}
