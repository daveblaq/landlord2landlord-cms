"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useCurrentUser, User } from '../lib/api/user';
import { isAuthenticated, clearAuthData } from '../lib/utils/storage';
import apiClient from '../lib/api/client';
import { API_ENDPOINTS } from '../lib/api/endpoints';
import { queryClient } from '../providers/query-provider';
import { GlobalLoader } from '@/components/global-loader';

// Modal and UI Components
import { ModalOverlay, Modal, Dialog } from '@/components/application/modals/modal';
import { CloseButton } from '@/components/base/buttons/close-button';
import { FeaturedIcon } from '@/components/foundations/featured-icon/featured-icon';
import { BackgroundPattern } from '@/components/shared-assets/background-patterns';
import { Heading as AriaHeading } from 'react-aria-components';
import { LogOut01 } from '@untitledui/icons';
import { Button } from '@/components/base/buttons/button';
import { toast } from 'sonner';
import { IconNotification } from '@/components/application/notifications/notifications';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    logout: (confirm?: boolean) => Promise<void>;
    login: (token: string, userData: User) => Promise<string>;
    refetchUser: () => void;
}

/**
 * Returns the appropriate dashboard route for a given user role
 */
export const getDashboardRoute = (role: string) => {
    return '/dashboard';
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const pathname = usePathname();
    const router = useRouter();
    const [hasCheckedAuth, setHasCheckedAuth] = useState(false);
    const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    // Fetch current user if token exists
    const {
        data: user,
        isLoading,
        isError,
        refetch
    } = useCurrentUser({
        enabled: hasCheckedAuth, // Only fetch after initial auth check
    });

    // Check if user has a token on mount
    useEffect(() => {
        checkInitialAuth();
    }, []);

    const checkInitialAuth = async () => {
        const hasToken = await isAuthenticated();
        setHasCheckedAuth(true);

        if (!hasToken) {
            // No token, redirect to login if we are on a protected route
            const isPublicRoute = pathname === '/' || pathname?.startsWith('/auth');
            if (!isPublicRoute) {
                router.replace('/auth/login');
            }
        }
    };

    // Handle navigation based on auth state
    useEffect(() => {
        if (!hasCheckedAuth || isLoading) return;

        const isAuthScreen = pathname?.startsWith('/auth');
        const isProtectedScreen =
            pathname?.startsWith('/dashboard') ||
            pathname?.startsWith('/admin');

        if (isError || !user) {
            // Not authenticated, redirect to login if on a protected screen
            if (isProtectedScreen) {
                router.replace('/auth/login');
            }
        } else {
            // Authenticated, redirect to dashboard if on an auth screen
            if (isAuthScreen) {
                router.replace(getDashboardRoute(user.role));
            }
        }
    }, [user, isError, hasCheckedAuth, isLoading, pathname, router]);

    const getDashboardRouteLocal = (role: string) => {
        return getDashboardRoute(role);
    };


    const logout = async (confirm = true) => {
        if (confirm) {
            setIsLogoutConfirmOpen(true);
            return;
        }

        setIsLoggingOut(true);
        try {
            // Call backend logout
            try {
                await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
            } catch (e) {
                console.log('Backend logout failed, proceeding with local cleanup');
            }

            // Clear storage first
            await clearAuthData();

            // Clear all react-query cache to reset all hooks (including useCurrentUser)
            queryClient.clear();

            setIsLogoutConfirmOpen(false);

            toast.custom((t) => (
                <IconNotification
                    title="Logged Out"
                    description="You have successfully logged out."
                    color="success"
                    onClose={() => toast.dismiss(t)}
                />
            ));

            // Navigation should now see no user data and stay on setup
            router.replace('/');
        } catch (error) {
            console.error('Logout error:', error);
            toast.custom((t) => (
                <IconNotification
                    title="Error"
                    description="Failed to log out. Please try again."
                    color="error"
                    onClose={() => toast.dismiss(t)}
                />
            ));
        } finally {
            setIsLoggingOut(false);
        }
    };

    const login = async (token: string, userData: User): Promise<string> => {
        try {
            const { saveAuthToken, saveUserData } = await import('../lib/utils/storage');
            await saveAuthToken(token);
            await saveUserData(userData);

            // Refresh user data from API to ensure sync
            await refetch();

            return getDashboardRoute(userData.role);
        } catch (error) {
            console.error('Login error:', error);
            return '/dashboard';
        }
    };

    const value: AuthContextType = {
        user: user || null,
        isLoading: isLoading || !hasCheckedAuth,
        isAuthenticated: !!user && !isError,
        logout,
        login,
        refetchUser: refetch,
    };

    const isGlobalLoading = isLoading || !hasCheckedAuth;

    return (
        <AuthContext.Provider value={value}>
            {isGlobalLoading ? <GlobalLoader /> : children}

            {isLogoutConfirmOpen && (
                <ModalOverlay
                    isOpen={isLogoutConfirmOpen}
                    onOpenChange={(open) => {
                        if (!open && !isLoggingOut) setIsLogoutConfirmOpen(false);
                    }}
                    isDismissable={!isLoggingOut}
                >
                    <Modal>
                        <Dialog>
                            <div className="relative w-full overflow-hidden rounded-2xl bg-primary shadow-xl sm:max-w-100 border border-secondary text-left">
                                <CloseButton
                                    onClick={() => !isLoggingOut && setIsLogoutConfirmOpen(false)}
                                    theme="light"
                                    size="lg"
                                    className="absolute top-3 right-3"
                                />
                                <div className="flex flex-col gap-4 px-4 pt-5 sm:px-6 sm:pt-6">
                                    <div className="relative w-max">
                                        <FeaturedIcon color="error" size="lg" theme="light" icon={LogOut01} />
                                        <BackgroundPattern
                                            pattern="circle"
                                            size="sm"
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                        />
                                    </div>
                                    <div className="z-10 flex flex-col gap-0.5">
                                        <AriaHeading slot="title" className="text-md font-semibold text-primary">
                                            Log out
                                        </AriaHeading>
                                        <p className="text-sm text-tertiary">
                                            Are you sure you want to log out of the dashboard? You will need to log back in to access the system.
                                        </p>
                                    </div>
                                </div>
                                <div className="z-10 flex flex-1 flex-col-reverse gap-3 p-4 pt-6 *:grow sm:grid sm:grid-cols-2 sm:px-6 sm:pt-8 sm:pb-6">
                                    <Button
                                        color="secondary"
                                        size="md"
                                        onClick={() => setIsLogoutConfirmOpen(false)}
                                        isDisabled={isLoggingOut}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        color="primary-destructive"
                                        size="md"
                                        onClick={() => logout(false)}
                                        isDisabled={isLoggingOut}
                                    >
                                        {isLoggingOut ? "Logging out..." : "Log out"}
                                    </Button>
                                </div>
                            </div>
                        </Dialog>
                    </Modal>
                </ModalOverlay>
            )}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};