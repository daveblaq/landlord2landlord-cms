import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiClient from './client';
import { API_ENDPOINTS, ApiResponse } from './endpoints';

export interface ActivityFeedItem {
    id: string;
    type: 'lead' | 'property';
    title: string;
    description: string;
    time: string; // ISO Date String
    color: string;
}

export const activityKeys = {
    all: ['activities'] as const,
};

export const useActivities = (options?: Partial<UseQueryOptions<ActivityFeedItem[], Error>>) => {
    return useQuery<ActivityFeedItem[], Error>({
        queryKey: activityKeys.all,
        queryFn: async () => {
            const response = await apiClient.get<ApiResponse<ActivityFeedItem[]>>(
                API_ENDPOINTS.ACTIVITIES
            );
            return response.data.data;
        },
        ...options,
    });
};
