import apiClient from './client';
import { API_ENDPOINTS, ApiResponse, AuthResponse } from './endpoints';

export interface LoginData {
    email: string;
    password: string;
}

export interface SignUpData {
    fullname: string;
    username: string;
    email: string;
    password: string;
    country: string;
    role?: string;
    isVIP?: boolean;
    vipType?: string;
}

/**
 * User Login
 */
export const login = async (data: LoginData): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
        API_ENDPOINTS.AUTH.LOGIN,
        data
    );
    return response.data;
};

/**
 * User Sign Up
 */
export const signUp = async (data: SignUpData): Promise<ApiResponse<AuthResponse>> => {
    const response = await apiClient.post<ApiResponse<AuthResponse>>(
        API_ENDPOINTS.AUTH.SIGN_UP,
        data
    );
    return response.data;
};
