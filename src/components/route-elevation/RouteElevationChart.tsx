import { useMemo } from "react";
import type { RouteClimbResponse, RoutePointResponse } from "../../lib/route";
import { climbColor } from "./climbColor";

const VIEW_WIDTH = 1000;
const VIEW_HEIGHT = 380;
const PLOT_TOP = 50;
const PLOT_BOTTOM = 320;
const LABEL_Y = 360;
const FONT = "system-ui, -apple-system, 'Segoe UI', sans-serif";

type Point = { x: number; y: number };

type Props = {
    points: RoutePointResponse[];
    climbs: RouteClimbResponse[];
    selectedClimbIndex: number | null;
    onSelectClimb: (index: number | null) => void;
};

function pathFromPoints(points: Point[]): string {
    return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
}

function areaFromLine(line: string, points: Point[]): string {
    const first = points[0];
    const last = points[points.length - 1];
    return `${line} L${last.x.toFixed(1)},${PLOT_BOTTOM} L${first.x.toFixed(1)},${PLOT_BOTTOM} Z`;
}

export default function RouteElevationChart({ points, climbs, selectedClimbIndex, onSelectClimb }: Props) {
    const chart = useMemo(() => {
        if (points.length < 2) return null;

        const totalDistance = points[points.length - 1].distanceFromStartInMeter || 1;
        const altitudes = points.map(p => p.altitude);
        const minAlt = Math.min(...altitudes);
        const maxAlt = Math.max(...altitudes);
        const pad = Math.max((maxAlt - minAlt) * 0.15, 5);
        const yMin = minAlt - pad;
        const yMax = maxAlt + pad;

        const xScale = (d: number) => (d / totalDistance) * VIEW_WIDTH;
        const yScale = (a: number) => PLOT_BOTTOM - ((a - yMin) / (yMax - yMin)) * (PLOT_BOTTOM - PLOT_TOP);

        const plotted = points.map(p => ({ x: xScale(p.distanceFromStartInMeter), y: yScale(p.altitude) }));
        const linePath = pathFromPoints(plotted);
        const areaPath = areaFromLine(linePath, plotted);

        const peak = points.reduce((max, p) => (p.altitude > max.altitude ? p : max), points[0]);

        const climbPaths = climbs.map(climb => {
            const segment = points
                .filter(p => p.distanceFromStartInMeter >= climb.startDistanceInMeter && p.distanceFromStartInMeter <= climb.endDistanceInMeter)
                .map(p => ({ x: xScale(p.distanceFromStartInMeter), y: yScale(p.altitude) }));

            if (segment.length < 2) return null;

            const line = pathFromPoints(segment);
            return { line, area: areaFromLine(line, segment), color: climbColor(climb.averageGradient) };
        });

        return {
            totalDistance,
            linePath,
            areaPath,
            peakX: xScale(peak.distanceFromStartInMeter),
            peakY: yScale(peak.altitude),
            peakAltitude: peak.altitude,
            climbPaths,
        };
    }, [points, climbs]);

    if (!chart) return null;

    return (
        <svg
            viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
            className="w-full h-auto"
            role="img"
            aria-label="Hoogteprofiel met klims"
        >
            <line x1={0} y1={PLOT_BOTTOM} x2={VIEW_WIDTH} y2={PLOT_BOTTOM} stroke="#c3c2b7" strokeWidth={2.5} />

            <path d={chart.areaPath} fill="#e1e0d9" />
            <path d={chart.linePath} fill="none" stroke="#898781" strokeWidth={5} strokeLinejoin="round" strokeLinecap="round" />

            {chart.climbPaths.map((climb, i) => {
                if (!climb) return null;
                const isSelected = selectedClimbIndex === i;
                const isDimmed = selectedClimbIndex !== null && !isSelected;
                return (
                    <g
                        key={i}
                        onClick={() => onSelectClimb(isSelected ? null : i)}
                        className="cursor-pointer"
                        opacity={isDimmed ? 0.35 : 1}
                    >
                        <path d={climb.area} fill={climb.color} opacity={isSelected ? 0.26 : 0.14} />
                        <path
                            d={climb.line}
                            fill="none"
                            stroke={climb.color}
                            strokeWidth={isSelected ? 8 : 6}
                            strokeLinejoin="round"
                            strokeLinecap="round"
                        />
                    </g>
                );
            })}

            <circle cx={chart.peakX} cy={chart.peakY} r={10} fill="#fcfcfb" stroke="#52514e" strokeWidth={5} />
            <text x={chart.peakX} y={chart.peakY - 20} textAnchor="middle" fontSize={42} fill="#52514e" fontFamily={FONT}>
                {Math.round(chart.peakAltitude)} m
            </text>

            <text x={0} y={LABEL_Y} fontSize={36} fill="#898781" fontFamily={FONT}>0 km</text>
            <text x={VIEW_WIDTH} y={LABEL_Y} textAnchor="end" fontSize={36} fill="#898781" fontFamily={FONT}>
                {(chart.totalDistance / 1000).toFixed(1)} km
            </text>
        </svg>
    );
}
