// User related types
export interface User {
    id: number;
    username: string;
    email: string;
    role: 'ADMIN' | 'TRAINER' | 'NUTRITIONIST' | 'CLIENT';
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    profile?: Profile;
  }
  
  export interface Profile {
    id: number;
    userId: number;
    firstName?: string;
    lastName?: string;
    bio?: string;
    profileImage?: string;
    phoneNumber?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface AuthRequest {
    email: string;
    password: string;
  }
  
  export interface AuthResponse {
    token: string;
    type: string;
    username: string;
    email: string;
    role: string;
    authorities: string;
  }
  
  export interface RegistrationRequest {
    username: string;
    email: string;
    password: string;
    role?: string;
  }
  
  // Program related types
  export interface GymProgram {
    id: number;
    title: string;
    description?: string;
    difficultyLevel: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
    durationDays: number;
    price: number;
    isActive: boolean;
    trainerId: number;
    trainer?: User;
    sessions?: GymSession[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface GymSession {
    id: number;
    title: string;
    description?: string;
    videoUrl?: string;
    durationMinutes?: number;
    sessionOrder: number;
    programId: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface UserGymProgram {
    id: number;
    userId: number;
    programId: number;
    purchaseDate: string;
    expiryDate?: string;
    lastWatchedSessionId?: number;
    status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
    program?: GymProgram;
    user?: User;
  }
  
  // Nutrition related types
  export interface NutritionPlan {
    id: number;
    title: string;
    description?: string;
    durationDays: number;
    price: number;
    isActive: boolean;
    nutritionistId: number;
    nutritionist?: User;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface UserNutritionPlan {
    id: number;
    userId: number;
    planId: number;
    purchaseDate: string;
    expiryDate?: string;
    status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
    plan?: NutritionPlan;
    user?: User;
  }
  
  // Blog related types
  export interface BlogPost {
    id: number;
    title: string;
    content: string;
    imageUrl?: string;
    category: string;
    isPublished: boolean;
    publishedAt?: string;
    authorId: number;
    author?: User;
    createdAt: string;
    updatedAt: string;
  }
  
  // E-commerce related types
  export interface Product {
    id: number;
    name: string;
    description?: string;
    price: number;
    discountPrice?: number;
    inventoryCount: number;
    imageUrl?: string;
    category: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Order {
    id: number;
    userId: number;
    user?: User;
    orderDate: string;
    status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
    totalAmount: number;
    shippingAddress: string;
    paymentMethod: string;
    items: OrderItem[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface OrderItem {
    id: number;
    orderId: number;
    productId: number;
    product?: Product;
    quantity: number;
    price: number;
  }
  
  // Pagination types
  export interface PaginatedResponse<T> {
    content: T[];
    pageable: {
      pageNumber: number;
      pageSize: number;
      sort: {
        sorted: boolean;
        unsorted: boolean;
        empty: boolean;
      };
      offset: number;
      unpaged: boolean;
    };
    totalElements: number;
    totalPages: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    numberOfElements: number;
    first: boolean;
    empty: boolean;
  }
  
  // Response types
  export interface ApiResponse<T> {
    data: T;
    message?: string;
    status: number;
  }