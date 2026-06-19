import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiClient from './client';
import { API_ENDPOINTS, ApiResponse } from './endpoints';

// ============================================
// USER TYPES
// ============================================

export enum UserRole {
    CLIENT = 'client',
    SERVICE_PROVIDER = 'service_provider',
    ADMIN = 'admin',
    CONCIERGE = 'concierge',
}

export interface User {
    _id: string;
    id: string; // Map _id to id for frontend convenience
    fullname: string;
    username: string;
    email: string;
    country: string;
    role: UserRole;
    isEmailVerified: boolean;
    status: boolean;
    createdAt: string;
    updatedAt: string;
}

// ============================================
// USER QUERIES
// ============================================

/**
 * Hook to get the current authenticated user
 */
export const useCurrentUser = (options?: Partial<UseQueryOptions<User, Error>>) => {
    return useQuery<User, Error>({
        queryKey: ['currentUser'],
        queryFn: async () => {
            const response = await apiClient.get<ApiResponse<User>>(API_ENDPOINTS.AUTH.ME);
            const userData = response.data.data;
            
            // Map _id to id if needed for convenience
            if (userData && userData._id && !userData.id) {
                userData.id = userData._id;
            } 
            
            return userData;
        },
        ...options,
    });
};
