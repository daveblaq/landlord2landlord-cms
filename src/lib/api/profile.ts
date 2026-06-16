import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from './client';
import { API_ENDPOINTS, ApiResponse } from './endpoints';
import { User } from './user';

export interface UpdateProfileInput {
    fullname?: string;
    username?: string;
    email?: string;
    country?: string;
}

export interface ChangePasswordInput {
    currentPassword?: string;
    newPassword?: string;
}

/**
 * Mutation hook to update profile details
 */
export const useUpdateProfile = () => {
    const queryClient = useQueryClient();
    return useMutation<ApiResponse<User>, Error, UpdateProfileInput>({
        mutationFn: async (data: UpdateProfileInput) => {
            const response = await apiClient.put<ApiResponse<User>>(
                API_ENDPOINTS.AUTH.UPDATE_PROFILE,
                data
            );
            return response.data;
        },
        onSuccess: () => {
            // Invalidate currentUser cache so that components refresh with new user profile data
            queryClient.invalidateQueries({ queryKey: ['currentUser'] });
        },
    });
};

/**
 * Mutation hook to change user password
 */
export const useChangePassword = () => {
    return useMutation<ApiResponse<null>, Error, ChangePasswordInput>({
        mutationFn: async (data: ChangePasswordInput) => {
            const response = await apiClient.put<ApiResponse<null>>(
                API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
                data
            );
            return response.data;
        },
    });
};
