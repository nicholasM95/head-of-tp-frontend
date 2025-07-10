import { useState } from "react";
import type { ParticipantResponse, RoleType, VehicleType } from "../../lib/participant";
import ParticipantEdit from "../participant-edit";
import ParticipantDelete from "../participant-delete";
import type { DeviceResponse } from "../../lib/device";

type ParticipantDetailsProps = {
    devices: DeviceResponse[];
    participant: ParticipantResponse;
    onParticipantChange: (updatedParticipant: ParticipantResponse) => void;
    onParticipantDelete: (id: string) => void;
};

export default function ParticipantDetails({ devices, participant: initialParticipant, onParticipantChange, onParticipantDelete }: ParticipantDetailsProps) {
    const [participant, setParticipant] = useState<ParticipantResponse>(initialParticipant);

    function handleParticipantUpdate(updated: { name: string; deviceId: string; vehicle: VehicleType; role: RoleType }) {
        const newParticipant = {
            ...participant,
            name: updated.name,
            deviceId: updated.deviceId,
            vehicle: updated.vehicle,
            role: updated.role
        };
        setParticipant(newParticipant);
        onParticipantChange(newParticipant);
    }

    function handleParticipantDelete(deleted: { participantId: string; }) {
        onParticipantDelete(deleted.participantId);
    }

    return (
        <div>
            <div className="relative bg-white rounded-2xl shadow-md p-4">
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800">{participant.name}</h2>
                        <div className="mt-2 text-sm text-gray-600 space-y-1">
                            <div><strong>Device Id:</strong> {participant.deviceId}</div>
                            <div><strong>Vehicle:</strong> {participant.vehicle}</div>
                            <div><strong>Role:</strong> {participant.role}</div>

                            <div><strong>Location update:</strong> {participant.lastModifiedDateLocation.toLocaleString(undefined, {
                                hour: '2-digit',
                                minute: '2-digit',
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            })}</div>

                            <hr className="my-4 border-t border-gray-200" />

                            <div><strong>Last modified date:</strong> {participant.lastModifiedDate.toLocaleString(undefined, {
                                hour: '2-digit',
                                minute: '2-digit',
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            })}</div>
                            <div><strong>Create date:</strong> {participant.createDate.toLocaleString(undefined, {
                                hour: '2-digit',
                                minute: '2-digit',
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric'
                            })}</div>
                        </div>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <ParticipantEdit devices={devices} participant={participant} onSave={handleParticipantUpdate}></ParticipantEdit>
                        <ParticipantDelete participant={participant} onDelete={handleParticipantDelete}></ParticipantDelete>
                    </div>
                </div>
            </div>
        </div>
    );
}
