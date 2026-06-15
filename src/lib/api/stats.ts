import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import apiClient from './client';
import { API_ENDPOINTS, ApiResponse } from './endpoints';

export interface MetricDetail {
    value: number;
    change: string;
    trend: 'positive' | 'negative';
}

export interface StatsResponse {
    totalProperties: MetricDetail;
    activeLeads: MetricDetail;
    avgMonthlyRent: MetricDetail;
    conversionRate: MetricDetail;
}

export const statsKeys = {
    all: ['stats'] as const,
};

export const useStats = (options?: Partial<UseQueryOptions<StatsResponse, Error>>) => {
    return useQuery<StatsResponse, Error>({
        queryKey: statsKeys.all,
        queryFn: async () => {
            const response = await apiClient.get<ApiResponse<StatsResponse>>(
                API_ENDPOINTS.STATS
            );
            return response.data.data;
        },
        ...options,
    });
};
