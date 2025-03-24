'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { User, Profile, ProfileUpdateRequest } from '@/types/user';
import { authService } from '@/services/authService';
import { api } from '@/lib/api';
import { toast } from 'react-toastify';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, role?: string) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<void>;
  updateProfile: (profileData: ProfileUpdateRequest) => Promise<void>;
  uploadProfileImage: (file: File) => Promise<string>;
  requestPasswordReset: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check if user is already logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchCurrentUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  // Set up axios interceptors for authentication
  useEffect(() => {
    // Add token to requests
    const requestInterceptor = api.interceptors.request.use((config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Handle 401 unauthorized responses
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Clear token and user data on authentication errors
          localStorage.removeItem('token');
          setUser(null);
          
          // Only redirect if not already on an auth page
          const path = window.location.pathname;
          if (!path.includes('/login') && !path.includes('/register') && !path.includes('/forgot-password')) {
            toast.error('Your session has expired. Please log in again.');
            router.push('/login');
          }
        }
        return Promise.reject(error);
      }
    );

    // Clean up interceptors on unmount
    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [router]);

  // Fetch current user data
  const fetchCurrentUser = async () => {
    try {
      setIsLoading(true);
      const userData = await authService.getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      localStorage.removeItem('token');
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await authService.login(email, password);
      
      // Store the token
      localStorage.setItem('token', response.token);
      
      // Set authorization header for future requests
      api.defaults.headers.common['Authorization'] = `Bearer ${response.token}`;
      
      // Fetch user data
      await fetchCurrentUser();
      
      toast.success('Successfully logged in');
      
      // Redirect based on profile status
      if (user?.profile?.firstName) {
        // Profile is set up, go to dashboard
        router.push('/dashboard');
      } else {
        // New user or incomplete profile, go to profile setup
        router.push('/profile-setup');
      }
    } catch (error) {
      console.error('Login failed:', error);
      toast.error('Login failed. Please check your credentials.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (username: string, email: string, password: string, role = 'CLIENT') => {
    try {
      setIsLoading(true);
      await authService.register({ username, email, password, role });
      toast.success('Registration successful! Please log in.');
      router.push('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Registration failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    toast.info('You have been logged out');
    router.push('/');
  };

  // Update user data
  const updateUser = async (userData: Partial<User>) => {
    try {
      setIsLoading(true);
      if (!user) throw new Error('No user is logged in');
      
      const response = await api.put(`/api/users/${user.id}`, userData);
      setUser(response.data);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update user:', error);
      toast.error('Failed to update profile');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update profile
  const updateProfile = async (profileData: ProfileUpdateRequest) => {
    try {
      setIsLoading(true);
      if (!user) throw new Error('No user is logged in');
      
      const response = await authService.updateProfile(user.id, profileData);
      setUser(response);
      toast.success('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile:', error);
      toast.error('Failed to update profile');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Upload profile image
  const uploadProfileImage = async (file: File): Promise<string> => {
    try {
      setIsLoading(true);
      if (!user) throw new Error('No user is logged in');
      
      const imageUrl = await authService.uploadProfileImage(user.id, file);
      
      // Update user state with new profile image
      setUser(prevUser => {
        if (!prevUser) return null;
        
        const updatedProfile: Profile = {
          ...prevUser.profile,
          profileImage: imageUrl
        };
        
        return {
          ...prevUser,
          profile: updatedProfile
        };
      });
      
      toast.success('Profile image updated');
      return imageUrl;
    } catch (error) {
      console.error('Failed to upload profile image:', error);
      toast.error('Failed to upload profile image');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Request password reset
  const requestPasswordReset = async (email: string) => {
    try {
      setIsLoading(true);
      await authService.requestPasswordReset(email);
      // We don't confirm whether the email exists for security reasons
      toast.success('If an account exists with this email, you will receive password reset instructions shortly.');
    } catch (error) {
      console.error('Password reset request failed:', error);
      // Still show success message even on error for security reasons
      toast.success('If an account exists with this email, you will receive password reset instructions shortly.');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset password with token
  const resetPassword = async (token: string, password: string) => {
    try {
      setIsLoading(true);
      await authService.resetPassword(token, password);
      toast.success('Password has been reset successfully');
      router.push('/login');
    } catch (error) {
      console.error('Password reset failed:', error);
      toast.error('Failed to reset password. The link may be expired or invalid.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update password
  const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      setIsLoading(true);
      if (!user) throw new Error('No user is logged in');
      
      await authService.updatePassword(currentPassword, newPassword);
      toast.success('Password updated successfully');
    } catch (error) {
      console.error('Password update failed:', error);
      toast.error('Failed to update password. Please check your current password.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
        updateProfile,
        uploadProfileImage,
        requestPasswordReset,
        resetPassword,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}