// This file contains TypeScript definitions for user-related data structures

/**
 * Represents a user profile
 */
export interface Profile {
    id?: number;
    userId?: number;
    firstName?: string;
    lastName?: string;
    bio?: string;
    profileImage?: string;
    phoneNumber?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  /**
   * Represents a user
   */
  export interface User {
    id: number;
    username: string;
    email: string;
    role: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    profile?: Profile;
  }
  
  /**
   * Represents the authentication state
   */
  export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
  }
  
  /**
   * Login request data
   */
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  /**
   * Registration request data
   */
  export interface RegistrationRequest {
    username: string;
    email: string;
    password: string;
    role?: string;
  }
  
  /**
   * Password reset request data
   */
  export interface PasswordResetRequest {
    email: string;
  }
  
  /**
   * Profile update request data
   */
  export interface ProfileUpdateRequest {
    firstName?: string;
    lastName?: string;
    bio?: string;
    phoneNumber?: string;
    profileImage?: string;
    location?: string;
    age?: number;
    height?: number;
    weight?: number;
    activityLevel?: string;
    fitnessGoal?: string;
    fitnessLevel?: string;
    preferredWorkoutDays?: string[];
    workoutDuration?: string;
    dietaryRestrictions?: string[];
  }