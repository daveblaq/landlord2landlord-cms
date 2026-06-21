import { getEpcColor } from '@/lib/utils/property';
import type { EpcData } from '@/lib/api/properties';

interface EpcBarProps {
    label: string;
    score: number;
    rating: string;
}

function EpcBar({ label, score, rating }: EpcBarProps) {
    const color = getEpcColor(rating);
    const pct = Math.min(100, Math.max(0, score));

    return (
        <div className="space-y-1.5">
            <div className="flex items-center justify-between">
                <span className="text-xs text-tertiary uppercase tracking-wider">{label}</span>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-primary">{score}</span>
                    <span
                        className="inline-flex h-5 w-5 items-center justify-center rounded text-xs font-bold text-white"
                        style={{ backgroundColor: color }}
                    >
                        {rating.toUpperCase()}
                    </span>
                </div>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-secondary">
                <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${pct}%`, backgroundColor: color }}
                />
            </div>
        </div>
    );
}

interface EpcChartProps {
    epc: EpcData;
}

export function EpcChart({ epc }: EpcChartProps) {
    const certUrl = epc.certificateNumber
        ? `https://find-energy-certificate.service.gov.uk/energy-certificate/${epc.certificateNumber}`
        : null;

    return (
        <div className="space-y-4">
            <EpcBar
                label="Current"
                score={epc.current.score}
                rating={epc.current.rating}
            />

            {epc.potential ? (
                <EpcBar
                    label="Potential"
                    score={epc.potential.score}
                    rating={epc.potential.rating}
                />
            ) : (
                <p className="text-xs text-tertiary italic">Potential rating not available</p>
            )}

            {certUrl && (
                <a
                    href={certUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-brand-600 hover:text-brand-700 hover:underline"
                >
                    View Certificate ↗
                </a>
            )}
        </div>
    );
}
