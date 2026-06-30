import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import type { RouteResponse } from "../../lib/route";

import {
    PencilIcon
} from '@heroicons/react/16/solid'

import { useState } from 'react'

type RouteEditProps = {
    route: RouteResponse;
    onSave: (data: { estimatedStartTime: string; estimatedAverageSpeed: number, pauseInMinutes: number }) => void;
}

export default function RouteEdit({ route, onSave }: RouteEditProps) {
    const [isOpen, setIsOpen] = useState(false)

    const [estimatedStartDate, setEstimatedStartDate] = useState(() => {
        const date = new Date(route.estimatedStartTime);
        return toLocalISOString(date);
    })

    const [estimatedSpeed, setEstimatedSpeed] = useState<number | ''>(route.estimatedAverageSpeed ?? '');
    const [pauseInMinutes, setPauseInMinutes] = useState<number | ''>(route.pauseInMinutes ?? '');

    function toLocalISOString(date: Date) {
        const pad = (n: number) => n.toString().padStart(2, '0');
        return date.getFullYear() + '-' +
            pad(date.getMonth() + 1) + '-' +
            pad(date.getDate()) + 'T' +
            pad(date.getHours()) + ':' +
            pad(date.getMinutes());
    }

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    function handleCancel(e: React.FormEvent) {
        e.preventDefault();
        close();
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        close();

        if (!estimatedSpeed) return;
        if (!pauseInMinutes && pauseInMinutes != 0) return;
        
        onSave({
            estimatedStartTime: estimatedStartDate,
            estimatedAverageSpeed: estimatedSpeed,
            pauseInMinutes: pauseInMinutes
        });

        close();
    }

    return (
        <>
            <Button
                onClick={open}
                className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white"
            >
                <PencilIcon className="h-4 w-4 fill-black" />
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
                            {route.name}
                        </DialogTitle>
                        <form className="mt-4 space-y-6" onSubmit={ handleSubmit }>
                            <div>
                                <label
                                    htmlFor="estimatedStartDate"
                                    className="block text-sm font-semibold text-white"
                                >
                                    Estimated Start Date
                                </label>
                                <input
                                    id="estimatedStartDate"
                                    type="datetime-local"
                                    className="mt-1 w-full rounded-md border border-white/30 bg-gray-900 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                                    placeholder="Select date and time"
                                    required
                                    value={estimatedStartDate}
                                    onChange={e => setEstimatedStartDate(e.target.value)}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="estimatedSpeed"
                                    className="block text-sm font-semibold text-white"
                                >
                                    Estimated Speed (km/h)
                                </label>
                                <input
                                    id="estimatedSpeed"
                                    type="number"
                                    step="0.1"
                                    min="0"
                                    className="mt-1 w-full rounded-md border border-white/30 bg-gray-900 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                                    placeholder="Enter estimated speed"
                                    required
                                    value={estimatedSpeed}
                                    onChange={e => {
                                        const value = e.target.value;
                                        setEstimatedSpeed(value === '' ? '' : parseFloat(value));
                                    }}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="pauseInMinutes"
                                    className="block text-sm font-semibold text-white"
                                >
                                    Pause (minutes)
                                </label>
                                <input
                                    id="pauseInMinutes"
                                    type="number"
                                    step="1"
                                    min="0"
                                    className="mt-1 w-full rounded-md border border-white/30 bg-gray-900 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                                    placeholder="Enter pause"
                                    required
                                    value={pauseInMinutes}
                                    onChange={e => {
                                        const value = e.target.value;
                                        setPauseInMinutes(value === '' ? '' : parseFloat(value));
                                    }}
                                />
                            </div>

                            <div className="flex justify-end">
                                <Button
                                    type="button"
                                    onClick={ handleCancel }
                                    className="mr-3 inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-inner shadow-white/10 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-inner shadow-white/10 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
                                >
                                    Save
                                </Button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>
        </>

    )
}
