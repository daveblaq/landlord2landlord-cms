import type { EpcData } from '@/lib/api/properties';

const EPC_BANDS = [
    { rating: 'A', label: '92-100', max: 100, color: '#008054' },
    { rating: 'B', label: '81-91',  max: 91,  color: '#19b459' },
    { rating: 'C', label: '69-80',  max: 80,  color: '#8dce46' },
    { rating: 'D', label: '55-68',  max: 68,  color: '#ffd500' },
    { rating: 'E', label: '39-54',  max: 54,  color: '#fcaa65' },
    { rating: 'F', label: '21-38',  max: 38,  color: '#ef8023' },
    { rating: 'G', label: '1-20',   max: 20,  color: '#e9153b' },
];

interface EpcChartProps {
    epc: EpcData;
}

export function EpcChart({ epc }: EpcChartProps) {
    const currentRating = epc.current.rating.toUpperCase();
    const potentialRating = epc.potential?.rating.toUpperCase();

    const certUrl = epc.certificateNumber
        ? `https://find-energy-certificate.service.gov.uk/energy-certificate/${epc.certificateNumber}`
        : null;

    const currentBand = EPC_BANDS.find(b => b.rating === currentRating);

    return (
        <div className="space-y-3">
            {/* Header */}
            <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-tertiary uppercase tracking-wider">
                    Energy Efficiency Rating
                </span>
                {currentBand && (
                    <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full border"
                        style={{ color: currentBand.color, borderColor: currentBand.color }}
                    >
                        Current Rating: {currentRating}
                    </span>
                )}
            </div>

            {/* Ladder */}
            <div className="space-y-0.5">
                {EPC_BANDS.map((band) => {
                    const isCurrent = band.rating === currentRating;
                    const isPotential = band.rating === potentialRating && potentialRating !== currentRating;
                    const barWidthPct = band.max;

                    return (
                        <div key={band.rating} className="relative flex items-center h-8">
                            {/* Coloured bar */}
                            <div
                                className="flex h-full items-center justify-between px-2 shrink-0"
                                style={{ width: `${barWidthPct}%`, backgroundColor: band.color }}
                            >
                                <span className="text-xs font-bold text-white">{band.rating}</span>
                                <span className="text-xs text-white/80">{band.label}</span>
                            </div>

                            {/* Markers */}
                            <div className="flex items-center gap-1.5 ml-1.5">
                                {isCurrent && (
                                    <span className="inline-flex items-center gap-1 rounded bg-fg-primary px-1.5 py-0.5 text-[10px] font-bold text-white leading-none whitespace-nowrap">
                                        ◄ CURRENT
                                    </span>
                                )}
                                {isPotential && (
                                    <span className="inline-flex items-center gap-1 rounded border border-fg-primary px-1.5 py-0.5 text-[10px] font-bold text-primary leading-none whitespace-nowrap">
                                        ◄ POTENTIAL
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Score line */}
            <p className="text-xs text-tertiary">
                Current: {epc.current.score} ({currentRating})
                {epc.potential && ` · Potential: ${epc.potential.score} (${potentialRating})`}
            </p>

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
