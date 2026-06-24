import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const certificateNumber = searchParams.get('certificateNumber');

    if (!certificateNumber) {
        return NextResponse.json({ error: 'certificateNumber is required' }, { status: 400 });
    }

    const token = process.env.EPC_API_TOKEN;
    if (!token) {
        return NextResponse.json({ error: 'EPC API not configured' }, { status: 500 });
    }

    let response: Response;
    try {
        response = await fetch(
            `https://api.get-energy-performance-data.communities.gov.uk/api/certificate?certificate_number=${encodeURIComponent(certificateNumber)}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            }
        );
    } catch {
        return NextResponse.json({ error: 'Failed to reach EPC service' }, { status: 502 });
    }

    if (response.status === 404) {
        return NextResponse.json({ error: 'Certificate not found' }, { status: 404 });
    }

    if (response.status === 429) {
        return NextResponse.json({ error: 'Rate limit reached — please try again shortly' }, { status: 429 });
    }

    if (!response.ok) {
        return NextResponse.json({ error: 'EPC lookup failed' }, { status: response.status });
    }

    const json = await response.json();
    const data = json.data ?? json;

    const addressParts = [data.address_line_1, data.address_line_2, data.post_town].filter(Boolean);

    // potential_energy_efficiency_band is the primary field; older schemas may
    // only have potential_energy_efficiency_rating (same thing, different key)
    const potentialBand =
        data.potential_energy_efficiency_band ??
        data.potential_energy_efficiency_rating ??
        null;

    const potentialScore = data.energy_rating_potential ?? null;

    return NextResponse.json({
        currentScore: data.energy_rating_current ?? null,
        currentBand: data.current_energy_efficiency_band ?? null,
        potentialScore,
        potentialBand,
        address: addressParts.join(', ') || null,
        postcode: data.postcode ?? null,
        certificateUrl: `https://find-energy-certificate.service.gov.uk/energy-certificate/${certificateNumber}`,
    });
}
