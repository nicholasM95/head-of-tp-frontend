import { Button } from '@headlessui/react'
import type { ParticipantResponse } from "../../lib/participant";

import {
    TrashIcon
} from '@heroicons/react/16/solid'

type ParticipantDeleteProps = {
    participant: ParticipantResponse;
    onDelete: (data: { participantId: string; }) => void;
}

export default function ParticipantDelete({ participant, onDelete }: ParticipantDeleteProps) {

    function handleSubmit() {
        onDelete({
            participantId: participant.id
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
