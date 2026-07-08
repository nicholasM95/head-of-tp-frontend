import { useState } from "react";
import { ChevronUp } from "lucide-react";
import type { RouteClimbResponse, RoutePointResponse, RouteResponse } from "../../lib/route";
import RouteElevationChart from "./RouteElevationChart";
import { climbColor } from "./climbColor";

type Props = {
    route: RouteResponse;
    points: RoutePointResponse[];
    climbs: RouteClimbResponse[];
};

export default function RouteElevationPanel({ route, points, climbs }: Props) {
    const [expanded, setExpanded] = useState(false);
    const [selectedClimbIndex, setSelectedClimbIndex] = useState<number | null>(null);

    const hasProfile = points.length >= 2;

    return (
        <div className="absolute bottom-0 left-0 right-0 z-50 flex justify-center pointer-events-none">
            <div
                className={`pointer-events-auto w-full max-w-md bg-white rounded-t-2xl shadow-[0_-4px_16px_rgba(0,0,0,0.15)] transition-transform duration-300 ease-out ${
                    expanded ? 'translate-y-0' : 'translate-y-[calc(100%-4.5rem)]'
                }`}
            >
                <button
                    type="button"
                    onClick={() => setExpanded(e => !e)}
                    aria-expanded={expanded}
                    className="w-full flex flex-col items-center pt-2 pb-3 px-4 cursor-pointer"
                >
                    <span className="h-1.5 w-10 rounded-full bg-gray-300 mb-2" />
                    <div className="flex w-full items-center justify-between">
                        <div className="text-left">
                            <div className="text-sm font-semibold text-gray-800">{route.name}</div>
                            <div className="text-xs text-gray-500">
                                {climbs.length > 0
                                    ? `${climbs.length} klim${climbs.length === 1 ? '' : 's'} · ${route.elevationGain} m D+`
                                    : `${route.elevationGain} m D+`}
                            </div>
                        </div>
                        <ChevronUp className={`h-5 w-5 text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                    </div>
                </button>

                <div className="overflow-y-auto px-4 pb-4" style={{ maxHeight: 'calc(60vh - 4.5rem)' }}>
                    {!hasProfile ? (
                        <div className="text-sm text-gray-500 py-6 text-center">Geen hoogteprofiel beschikbaar</div>
                    ) : (
                        <>
                            <RouteElevationChart
                                points={points}
                                climbs={climbs}
                                selectedClimbIndex={selectedClimbIndex}
                                onSelectClimb={setSelectedClimbIndex}
                            />
                            {climbs.length > 0 && (
                                <ul className="mt-3 space-y-2">
                                    {climbs.map((climb, i) => {
                                        const isSelected = selectedClimbIndex === i;
                                        return (
                                            <li key={i}>
                                                <button
                                                    type="button"
                                                    onClick={() => setSelectedClimbIndex(isSelected ? null : i)}
                                                    className={`w-full flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-left transition-colors cursor-pointer ${
                                                        isSelected ? 'bg-gray-100 ring-1 ring-gray-300' : 'hover:bg-gray-50'
                                                    }`}
                                                >
                                                    <span
                                                        className="h-3 w-3 shrink-0 rounded-full"
                                                        style={{ backgroundColor: climbColor(climb.averageGradient) }}
                                                    />
                                                    <span className="text-gray-700">
                                                        Klim {i + 1} · vanaf km {(climb.startDistanceInMeter / 1000).toFixed(1)} ·
                                                        {' '}{(climb.lengthInMeter / 1000).toFixed(1)} km ·
                                                        {' '}+{climb.elevationGainInMeter} m · {climb.averageGradient.toFixed(1)}%
                                                    </span>
                                                </button>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
