import { useQuery, useMutation, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import apiClient from './client';
import { API_ENDPOINTS, ApiResponse } from './endpoints';
import { User } from './user';

export interface CreateConciergeInput {
    fullname: string;
    email: string;
    password?: string;
    country: string;
}

export interface UpdateConciergeInput {
    fullname?: string;
    email?: string;
    country?: string;
    status?: boolean;
}

/**
 * Hook to get the list of concierge users
 */
export const useConcierges = (options?: Partial<UseQueryOptions<User[], Error>>) => {
    return useQuery<User[], Error>({
        queryKey: ['concierges'],
        queryFn: async () => {
            const response = await apiClient.get<ApiResponse<User[]>>(API_ENDPOINTS.CONCIERGES.BASE);
            const concierges = response.data.data || [];
            
            // Map _id to id for convenience
            return concierges.map((c) => ({
                ...c,
                id: c._id || c.id,
            }));
        },
        ...options,
    });
};

/**
 * Hook to create a new concierge
 */
export const useCreateConcierge = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiResponse<User>, Error, CreateConciergeInput>({
        mutationFn: async (data: CreateConciergeInput) => {
            const response = await apiClient.post<ApiResponse<User>>(
                API_ENDPOINTS.CONCIERGES.BASE,
                data
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['concierges'] });
        },
    });
};

/**
 * Hook to update an existing concierge details or status
 */
export const useUpdateConcierge = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiResponse<User>, Error, { id: string; data: UpdateConciergeInput }>({
        mutationFn: async ({ id, data }) => {
            const response = await apiClient.patch<ApiResponse<User>>(
                API_ENDPOINTS.CONCIERGES.DETAIL(id),
                data
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['concierges'] });
        },
    });
};

/**
 * Hook to delete a concierge
 */
export const useDeleteConcierge = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiResponse<null>, Error, string>({
        mutationFn: async (id: string) => {
            const response = await apiClient.delete<ApiResponse<null>>(
                API_ENDPOINTS.CONCIERGES.DETAIL(id)
            );
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['concierges'] });
        },
    });
};
