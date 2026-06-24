import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import apiClient from './client';
import { API_ENDPOINTS, ApiResponse } from './endpoints';

// ============================================
// PROPERTY TYPES
// ============================================

export type PropertyStatus = 'draft' | 'pending-review' | 'published' | 'under-offer' | 'sold' | 'archived';

export interface InvestmentMetrics {
    askingPrice: number;
    monthlyRent: number;
    annualRent: number;
    grossYield: number;
    leaseYearsRemaining?: number;
}

export interface ComplianceDoc {
    available: boolean;
    url?: string;
}

export interface PropertyCompliance {
    epc?: ComplianceDoc;
}

export interface Property {
    _id: string;
    id: string;
    title: string;
    slug: string;
    description: any;
    propertyType: string;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    address: string;
    location: string;
    postcode: string;
    tenure: string;
    heroImage: string;
    gallery: any[];
    floorplans?: { url: string; alt: string }[];
    mediaFiles?: { url: string; alt: string }[];
    investmentMetrics: InvestmentMetrics;
    priceType?: 'guide-price' | 'fixed-price' | 'offers-over';
    serviceCharge?: number;
    groundRent?: number;
    councilTaxBand?: string;
    tenented: boolean;
    tenancyStartDate?: string;
    tenancyType?: string;
    fixedTermEndDate?: string;
    rentPaymentStatus?: 'up-to-date' | 'partially-paid' | 'overdue';
    rentCollectionStatus?: string;
    arrearsStatus?: string;
    depositProtected?: boolean;
    noticeServed?: boolean;
    tenantWantsToStay?: 'yes' | 'no' | 'unknown';
    viewingArrangements?: 'vacant-access' | 'accompanied' | 'tenant-notify-24h' | 'tenant-notify-48h';
    rentReviewDate?: string;
    tenancyNotes?: string;
    epc?: string;
    potentialEpc?: string;
    compliance?: PropertyCompliance;
    status: PropertyStatus;
    displayOnHomepage: boolean;
    isFeatured: boolean;
    isHighYield?: boolean;
    latitude?: number;
    longitude?: number;
    createdBy?: string;
    createdAt: string;
    updatedAt: string;
}

export interface PropertyQueryParams {
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    minRent?: number;
    maxRent?: number;
    propertyType?: string;
    bedrooms?: number;
    status?: string;
    sortBy?: 'Newest' | 'Highest Yield' | 'Lowest Price' | 'Highest Price';
    limit?: number;
    page?: number;
    createdBy?: string;
}

export interface PropertiesResponse {
    results: Property[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
}

// ============================================
// QUERY KEYS
// ============================================

export const propertyKeys = {
    all: ['properties'] as const,
    lists: () => [...propertyKeys.all, 'list'] as const,
    list: (params: PropertyQueryParams) => [...propertyKeys.lists(), params] as const,
    stats: () => [...propertyKeys.all, 'stats'] as const,
    stat: (params: PropertyQueryParams) => [...propertyKeys.stats(), params] as const,
    detail: (id: string) => [...propertyKeys.all, 'detail', id] as const,
};

// ============================================
// QUERIES
// ============================================

/**
 * Fetch paginated/filtered list of properties
 */
export const useProperties = (
    params: PropertyQueryParams = {},
    options?: Partial<UseQueryOptions<PropertiesResponse, Error>>
) => {
    return useQuery<PropertiesResponse, Error>({
        queryKey: propertyKeys.list(params),
        queryFn: async () => {
            const response = await apiClient.get<ApiResponse<PropertiesResponse>>(
                API_ENDPOINTS.PROPERTIES.BASE,
                { params }
            );
            return response.data.data;
        },
        ...options,
    });
};

/**
 * Fetch status counts/statistics for properties
 */
export const usePropertyStats = (
    params: PropertyQueryParams = {},
    options?: Partial<UseQueryOptions<Record<PropertyStatus, number>, Error>>
) => {
    return useQuery<Record<PropertyStatus, number>, Error>({
        queryKey: propertyKeys.stat(params),
        queryFn: async () => {
            const response = await apiClient.get<ApiResponse<Record<PropertyStatus, number>>>(
                `${API_ENDPOINTS.PROPERTIES.BASE}/stats`,
                { params }
            );
            return response.data.data;
        },
        ...options,
    });
};

/**
 * Fetch a single property by ID or slug
 */
export const useProperty = (
    idOrSlug: string,
    options?: Partial<UseQueryOptions<Property, Error>>
) => {
    return useQuery<Property, Error>({
        queryKey: propertyKeys.detail(idOrSlug),
        queryFn: async () => {
            const response = await apiClient.get<ApiResponse<Property>>(
                `${API_ENDPOINTS.PROPERTIES.BASE}/${idOrSlug}`
            );
            return response.data.data;
        },
        enabled: !!idOrSlug,
        ...options,
    });
};

/**
 * Lookup EPC Rating via backend proxy
 */
export interface EpcLookupResponse {
    rating: string | null;
    potentialRating: string | null;
}

export const lookupEpcRating = async (postcode: string, address?: string): Promise<EpcLookupResponse | null> => {
    try {
        const response = await apiClient.get<ApiResponse<EpcLookupResponse>>(
            `${API_ENDPOINTS.PROPERTIES.BASE}/epc-lookup`,
            {
                params: { postcode, address }
            }
        );
        return response.data.data || null;
    } catch (error) {
        console.error("Failed to lookup EPC rating:", error);
        return null;
    }
};

// ============================================
// MUTATIONS
// ============================================

/**
 * Create a new property
 */
export const useCreateProperty = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: Partial<Property>) => {
            const response = await apiClient.post<ApiResponse<Property>>(
                API_ENDPOINTS.PROPERTIES.BASE,
                data
            );
            return response.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: propertyKeys.lists() });
            queryClient.invalidateQueries({ queryKey: propertyKeys.stats() });
        },
    });
};

/**
 * Update a property by ID
 */
export const useUpdateProperty = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: Partial<Property> }) => {
            const response = await apiClient.patch<ApiResponse<Property>>(
                `${API_ENDPOINTS.PROPERTIES.BASE}/${id}`,
                data
            );
            return response.data.data;
        },
        onSuccess: (_data, { id }) => {
            queryClient.invalidateQueries({ queryKey: propertyKeys.lists() });
            queryClient.invalidateQueries({ queryKey: propertyKeys.stats() });
            queryClient.invalidateQueries({ queryKey: propertyKeys.detail(id) });
        },
    });
};

/**
 * Delete a property by ID
 */
export const useDeleteProperty = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            await apiClient.delete(`${API_ENDPOINTS.PROPERTIES.BASE}/${id}`);
            return id;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: propertyKeys.lists() });
            queryClient.invalidateQueries({ queryKey: propertyKeys.stats() });
        },
    });
};

/**
 * Upload multiple base64 images to Cloudinary
 */
export const useUploadPropertyImages = () => {
    return useMutation({
        mutationFn: async (images: string[]) => {
            const response = await apiClient.post<ApiResponse<string[]>>(
                `${API_ENDPOINTS.PROPERTIES.BASE}/upload`,
                { images }
            );
            return response.data.data;
        },
    });
};

