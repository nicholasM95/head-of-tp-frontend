import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

import { useState } from 'react'
import type { RoleType, VehicleType } from "../../lib/participant";

type ParticipantCreateProps = {
    onCreate: (data: { name: string; deviceId: string, vehicle: VehicleType, role: RoleType }) => void;
}

export default function ParticipantCreate({ onCreate }: ParticipantCreateProps) {
    const [isOpen, setIsOpen] = useState(false)

    const [name, setName] = useState<string>();
    const [deviceId, setDeviceId] = useState<string>();
    const [vehicle, setVehicle] = useState<VehicleType>('BIKE');
    const [role, setRole] = useState<RoleType>('RIDER');

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        close();

        if (!name || !deviceId || !vehicle || !role) {
            alert('Please fill in all fields.');
            return;
        }

        onCreate({
            name: name,
            deviceId: deviceId,
            vehicle: vehicle,
            role: role
        });

        close();
    }

    return (
        <>
            <Button
                onClick={open}
                className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700">
                Add Team Member
            </Button>

            <Dialog
                open={isOpen}
                as="div"
                className="relative z-10"
                onClose={close}
            >
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
                <div className="fixed inset-0 z-10 flex items-center justify-center p-4">
                    <DialogPanel
                        transition
                        className="w-full max-w-md rounded-xl bg-gray-800 p-6 backdrop-blur-2xl shadow-lg duration-300 ease-out data-closed:transform-[scale(95%)] data-closed:opacity-0"
                    >
                        <DialogTitle as="h3" className="text-lg font-medium text-white">
                            {name}
                        </DialogTitle>
                        <form className="mt-4 space-y-6" onSubmit={ handleSubmit }>
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-semibold text-white"
                                >
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="input"
                                    className="mt-1 w-full rounded-md border border-white/30 bg-gray-900 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                                    placeholder="Enter name"
                                    required
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="deviceId"
                                    className="block text-sm font-semibold text-white"
                                >
                                    Device Id
                                </label>
                                <input
                                    id="deviceId"
                                    type="input"
                                    className="mt-1 w-full rounded-md border border-white/30 bg-gray-900 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                                    placeholder="Enter device id"
                                    required
                                    onChange={e => setDeviceId(e.target.value)}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="vehicle"
                                    className="block text-sm font-semibold text-white"
                                >
                                    Vehicle
                                </label>
                                <select
                                    id="vehicle"
                                    className="mt-1 w-full rounded-md border border-white/30 bg-gray-900 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                                    required
                                    value={vehicle}
                                    onChange={e => setVehicle(e.target.value as VehicleType)}
                                >
                                    <option value="BIKE">BIKE</option>
                                    <option value="CAR">CAR</option>
                                </select>
                            </div>

                            <div>
                                <label
                                    htmlFor="role"
                                    className="block text-sm font-semibold text-white"
                                >
                                    Role
                                </label>
                                <select
                                    id="role"
                                    className="mt-1 w-full rounded-md border border-white/30 bg-gray-900 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                                    required
                                    value={role}
                                    onChange={e => setRole(e.target.value as RoleType)}
                                >
                                    <option value="RIDER">RIDER</option>
                                    <option value="TP">TP</option>
                                </select>
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-inner shadow-white/10 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
                                >
                                    Create Team Member
                                </Button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>
        </>

    )
}
