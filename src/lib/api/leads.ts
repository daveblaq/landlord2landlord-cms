import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import apiClient from './client';
import { API_ENDPOINTS, ApiResponse } from './endpoints';

// ============================================
// LEAD TYPES
// ============================================

export type LeadType = 'Property Enquiry' | 'Mortgage Lead' | 'Insurance Lead' | 'Valuation Lead' | 'General Enquiry';
export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Viewing Scheduled' | 'Negotiating' | 'Closed';

export interface Lead {
    _id: string;
    id: string;
    name: string;
    email: string;
    phone?: string;
    type: LeadType;
    status: LeadStatus;
    message?: string;
    metadata?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
}

export interface LeadQueryParams {
    type?: string;
    status?: string;
    email?: string;
    limit?: number;
    page?: number;
}

export interface LeadsResponse {
    results: Lead[];
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
}

// ============================================
// QUERY KEYS
// ============================================

export const leadKeys = {
    all: ['leads'] as const,
    lists: () => [...leadKeys.all, 'list'] as const,
    list: (params: LeadQueryParams) => [...leadKeys.lists(), params] as const,
    detail: (id: string) => [...leadKeys.all, 'detail', id] as const,
};

// ============================================
// QUERIES
// ============================================

/**
 * Fetch paginated/filtered list of leads
 */
export const useLeads = (
    params: LeadQueryParams = {},
    options?: Partial<UseQueryOptions<LeadsResponse, Error>>
) => {
    return useQuery<LeadsResponse, Error>({
        queryKey: leadKeys.list(params),
        queryFn: async () => {
            const response = await apiClient.get<ApiResponse<LeadsResponse>>(
                API_ENDPOINTS.LEADS.BASE,
                { params }
            );
            return response.data.data;
        },
        ...options,
    });
};

/**
 * Fetch a single lead by ID
 */
export const useLead = (
    id: string,
    options?: Partial<UseQueryOptions<Lead, Error>>
) => {
    return useQuery<Lead, Error>({
        queryKey: leadKeys.detail(id),
        queryFn: async () => {
            const response = await apiClient.get<ApiResponse<Lead>>(
                `${API_ENDPOINTS.LEADS.BASE}/${id}`
            );
            return response.data.data;
        },
        enabled: !!id,
        ...options,
    });
};

// ============================================
// MUTATIONS
// ============================================

/**
 * Create a new lead
 */
export const useCreateLead = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: Partial<Lead>) => {
            const response = await apiClient.post<ApiResponse<Lead>>(
                API_ENDPOINTS.LEADS.BASE,
                data
            );
            return response.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: leadKeys.lists() });
        },
    });
};

/**
 * Update a lead by ID
 */
export const useUpdateLead = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: Partial<Lead> }) => {
            const response = await apiClient.patch<ApiResponse<Lead>>(
                `${API_ENDPOINTS.LEADS.BASE}/${id}`,
                data
            );
            return response.data.data;
        },
        onSuccess: (_data, { id }) => {
            queryClient.invalidateQueries({ queryKey: leadKeys.lists() });
            queryClient.invalidateQueries({ queryKey: leadKeys.detail(id) });
        },
    });
};
