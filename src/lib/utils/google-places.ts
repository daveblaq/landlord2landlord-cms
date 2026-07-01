export interface PlaceSuggestion {
  placeId: string;
  displayName: string;
}

export interface ResolvedPlace {
  displayName: string;
  address: string;
  city: string;
  postcode: string;
  latitude: number | null;
  longitude: number | null;
}

interface GoogleAddressComponent {
  longText?: string;
  shortText?: string;
  types: string[];
}

function componentByType(components: GoogleAddressComponent[], type: string): string {
  return components.find((c) => c.types.includes(type))?.longText ?? "";
}

/**
 * Address/place-name suggestions via Google Places API (New) Autocomplete.
 * Restricted to GB; caller is expected to debounce and handle empty input.
 */
export async function searchPlaces(query: string, apiKey: string): Promise<PlaceSuggestion[]> {
  const res = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
    },
    body: JSON.stringify({
      input: query,
      includedRegionCodes: ["gb"],
      languageCode: "en",
    }),
  });
  if (res.status === 404) return [];
  if (!res.ok) throw new Error(`Google Places autocomplete error: ${res.status}`);

  const data: {
    suggestions?: {
      placePrediction?: {
        placeId?: string;
        text?: { text?: string };
      };
    }[];
  } = await res.json();

  return (data.suggestions ?? [])
    .map((s) => {
      const pred = s.placePrediction;
      if (!pred?.placeId || !pred.text?.text) return null;
      return { placeId: pred.placeId, displayName: pred.text.text };
    })
    .filter((v): v is PlaceSuggestion => Boolean(v));
}

/**
 * Resolves a placeId (from searchPlaces) to a structured address + lat/lng
 * via Google Places API (New) Place Details.
 */
export async function getPlaceDetails(placeId: string, apiKey: string): Promise<ResolvedPlace | null> {
  const res = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
    headers: {
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "addressComponents,location,formattedAddress",
    },
  });
  if (!res.ok) return null;

  const data: {
    addressComponents?: GoogleAddressComponent[];
    location?: { latitude?: number; longitude?: number };
    formattedAddress?: string;
  } = await res.json();

  const components = data.addressComponents ?? [];
  const houseNumber = componentByType(components, "street_number");
  const road = componentByType(components, "route");
  const city =
    componentByType(components, "postal_town") ||
    componentByType(components, "locality") ||
    componentByType(components, "sublocality") ||
    componentByType(components, "administrative_area_level_2");
  const postcode = componentByType(components, "postal_code");

  const street = [houseNumber, road].filter(Boolean).join(" ");
  const address = [street, city].filter(Boolean).join(", ") || data.formattedAddress || "";

  return {
    displayName: data.formattedAddress || address,
    address,
    city,
    postcode,
    latitude: data.location?.latitude ?? null,
    longitude: data.location?.longitude ?? null,
  };
}
