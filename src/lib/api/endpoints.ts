// API Endpoints Configuration
export const API_ENDPOINTS = {
    // Authentication
    AUTH: {
        SIGN_UP: '/auth/sign-up',
        LOGIN: '/auth/login',
        ME: '/auth/me',
        LOGOUT: '/auth/logout',
        UPDATE_PROFILE: '/auth/profile',
        CHANGE_PASSWORD: '/auth/change-password',
    },
    // Properties
    PROPERTIES: {
        BASE: '/properties',
        DETAIL: (idOrSlug: string) => `/properties/${idOrSlug}`,
    },
    // Leads
    LEADS: {
        BASE: '/leads',
    },
    // Stats
    STATS: '/stats',
    // Activities
    ACTIVITIES: '/activities',
    // Concierges
    CONCIERGES: {
        BASE: '/concierges',
        DETAIL: (id: string) => `/concierges/${id}`,
    },
} as const;

// API Response Types
export interface ApiResponse<T = any> {
    status: number;
    success?: boolean;
    data: T;
    message: string;
}

// Auth Response Type
export interface AuthResponse {
    user: any;
    token: string;
}

export interface PaginatedResponse<T = any> {
    success: boolean;
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface ApiError {
    success: false;
    message: string;
    errors?: Record<string, string[]>;
}