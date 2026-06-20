import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import apiClient from './client';
import { API_ENDPOINTS, ApiResponse } from './endpoints';

// ============================================
// LEAD TYPES
// ============================================

export type LeadType = 'Property Enquiry' | 'Mortgage Lead' | 'Insurance Lead' | 'Valuation Lead' | 'General Enquiry';
export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Viewing Scheduled' | 'Negotiating' | 'Closed';

export interface LeadNote {
    _id?: string;
    content: string;
    submittedBy: {
        userId: string;
        name: string;
        role: string;
    };
    capturedStatus: {
        leadStatus: string;
        propertyStatus?: string;
    };
    createdAt: string;
}

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
    notes?: LeadNote[];
    createdAt: string;
    updatedAt: string;
}

export interface LeadQueryParams {
    type?: string | string[];
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
    stats: () => [...leadKeys.all, 'stats'] as const,
    stat: (params: LeadQueryParams) => [...leadKeys.stats(), params] as const,
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
 * Fetch status counts/statistics for leads
 */
export const useLeadStats = (
    params: LeadQueryParams = {},
    options?: Partial<UseQueryOptions<Record<LeadStatus, number>, Error>>
) => {
    return useQuery<Record<LeadStatus, number>, Error>({
        queryKey: leadKeys.stat(params),
        queryFn: async () => {
            const response = await apiClient.get<ApiResponse<Record<LeadStatus, number>>>(
                `${API_ENDPOINTS.LEADS.BASE}/stats`,
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
            queryClient.invalidateQueries({ queryKey: leadKeys.stats() });
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
            queryClient.invalidateQueries({ queryKey: leadKeys.stats() });
            queryClient.invalidateQueries({ queryKey: leadKeys.detail(id) });
        },
    });
};

/**
 * Add a note to a lead
 */
export const useCreateLeadNote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ leadId, content }: { leadId: string; content: string }) => {
            const response = await apiClient.post<ApiResponse<Lead>>(
                `${API_ENDPOINTS.LEADS.BASE}/${leadId}/notes`,
                { content }
            );
            return response.data.data;
        },
        onSuccess: (_data, { leadId }) => {
            queryClient.invalidateQueries({ queryKey: leadKeys.detail(leadId) });
        },
    });
};

/**
 * Bulk Create Leads
 */
export const useBulkCreateLeads = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (leads: any[]) => {
            const response = await apiClient.post<ApiResponse<Lead[]>>(
                `${API_ENDPOINTS.LEADS.BASE}/bulk`,
                { leads }
            );
            return response.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: leadKeys.lists() });
            queryClient.invalidateQueries({ queryKey: leadKeys.stats() });
        },
    });
};

/**
 * Fetch all matching leads unpaginated (e.g. for CSV export)
 */
export const fetchAllLeads = async (params: LeadQueryParams = {}): Promise<Lead[]> => {
    const response = await apiClient.get<ApiResponse<LeadsResponse>>(
        API_ENDPOINTS.LEADS.BASE,
        { params: { ...params, limit: 0 } }
    );
    return response.data.data.results;
};

