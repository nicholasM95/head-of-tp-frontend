import { Button, Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

import { useState } from 'react'

type RouteCreateProps = {
    onCreate: (data: { file: File; }) => void;
}

export default function RouteCreate({ onCreate }: RouteCreateProps) {
    const [isOpen, setIsOpen] = useState(false)

    const [gpxFile, setGpxFile] = useState<File | null>(null);

    function open() {
        setIsOpen(true)
    }

    function close() {
        setIsOpen(false)
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        close();

        if (!gpxFile) {
            alert('Please fill in all fields.');
            return;
        }

        onCreate({
            file: gpxFile
        });

        close();
    }

    return (
        <>
            <Button
                onClick={open}
                className="inline-flex items-center gap-2 rounded-md bg-gray-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-gray-600 data-open:bg-gray-700">
                Create Route
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
                            Create Route
                        </DialogTitle>
                        <form className="mt-4 space-y-6" onSubmit={ handleSubmit }>
                            <div>
                                <label
                                    htmlFor="route"
                                    className="block text-sm font-semibold text-white"
                                >
                                    Route
                                </label>
                                <input
                                    id="route"
                                    type="file"
                                    className="mt-1 w-full rounded-md border border-white/30 bg-gray-900 px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
                                    required
                                    accept="application/gpx+xml, application/xml, application/gpx, .gpx"
                                    onChange={e => {
                                        const files = e.target.files;
                                        if (files && files.length > 0) {
                                            setGpxFile(files[0]);
                                        }
                                    }}
                                />

                            </div>

                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-inner shadow-white/10 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white"
                                >
                                    Create Route
                                </Button>
                            </div>
                        </form>
                    </DialogPanel>
                </div>
            </Dialog>
        </>

    )
}
