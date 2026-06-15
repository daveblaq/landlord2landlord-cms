import { User } from '../api/user';

const TOKEN_KEY = 'l2l_auth_token';
const USER_KEY = 'l2l_user_data';

/**
 * Checks if window is defined (client-side execution)
 */
const isClient = () => typeof window !== 'undefined';

/**
 * Get the saved JWT authentication token from storage
 */
export const getAuthToken = async (): Promise<string | null> => {
  if (!isClient()) return null;
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Save JWT authentication token to storage
 */
export const saveAuthToken = async (token: string): Promise<void> => {
  if (!isClient()) return;
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Save user profile data to storage
 */
export const saveUserData = async (user: User): Promise<void> => {
  if (!isClient()) return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

/**
 * Retrieve saved user profile data from storage
 */
export const getUserData = async (): Promise<User | null> => {
  if (!isClient()) return null;
  const data = localStorage.getItem(USER_KEY);
  if (!data) return null;
  try {
    return JSON.parse(data) as User;
  } catch (e) {
    return null;
  }
};

/**
 * Clear all authentication-related storage data on logout or expiry
 */
export const clearAuthData = async (): Promise<void> => {
  if (!isClient()) return;
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

/**
 * Check if the user is authenticated (token exists in storage)
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const token = await getAuthToken();
  return !!token;
};
