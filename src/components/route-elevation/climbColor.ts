// Sequential single-hue ramp (blue) — steeper average gradient maps to a darker step.
const GRADIENT_STEPS: { max: number; color: string }[] = [
    { max: 4, color: '#6da7ec' },
    { max: 6, color: '#3987e5' },
    { max: 8, color: '#2a78d6' },
    { max: 10, color: '#1c5cab' },
    { max: Infinity, color: '#104281' },
];

export function climbColor(averageGradient: number): string {
    return (GRADIENT_STEPS.find(step => averageGradient < step.max) ?? GRADIENT_STEPS[GRADIENT_STEPS.length - 1]).color;
}
