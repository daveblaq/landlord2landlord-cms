import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import { clearAuthData, getAuthToken } from '../utils/storage';
import { API_EVENTS } from './events';

// Environment configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const API_TIMEOUT = parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '180000', 10);

// Guard against duplicate 401 dispatches when multiple requests fail simultaneously
let isHandling401 = false;

// Serializes arrays as repeated params (type=a&type=b) instead of Axios default (type[]=a&type[]=b)
export function serializeParams(params: Record<string, unknown>): string {
	const sp = new URLSearchParams();
	for (const [key, val] of Object.entries(params)) {
		if (val === undefined || val === null || val === '') continue;
		if (Array.isArray(val)) {
			val.forEach((v) => sp.append(key, String(v)));
		} else {
			sp.append(key, String(val));
		}
	}
	return sp.toString();
}

// Create axios instance
const apiClient: AxiosInstance = axios.create({
	baseURL: API_BASE_URL,
	timeout: API_TIMEOUT,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json',
	},
	paramsSerializer: serializeParams,
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
	async (config) => {
		const token = await getAuthToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
	(response) => {
		// Signal that the server is reachable (used by slow-connection banner)
		if (typeof window !== 'undefined') {
			window.dispatchEvent(new Event(API_EVENTS.ONLINE));
		}
		return response;
	},
	async (error: AxiosError) => {
		if (error.response) {
			switch (error.response.status) {
				case 401:
					if (!isHandling401) {
						isHandling401 = true;
						clearAuthData()
							.catch((err) => console.error('clearAuthData failed:', err))
							.finally(() => {
								if (typeof window !== 'undefined') {
									window.dispatchEvent(new Event(API_EVENTS.AUTH_EXPIRED));
								}
								isHandling401 = false;
							});
					}
					break;
				case 403:
					console.error('Forbidden - You do not have permission');
					break;
				case 404:
					// 404s are handled per-feature; no global action needed
					break;
				case 500:
					console.error('Server error - Please try again later');
					break;
				default:
					console.error('An error occurred:', error.response.data);
			}
		} else if (error.request) {
			console.error('Network error - Please check your connection');
		} else {
			console.error('Error:', error.message);
		}
		return Promise.reject(error);
	}
);

export default apiClient;

// Export types for use in services
export type { AxiosRequestConfig, AxiosError };
