/**
 * API Client
 * 
 * Client for making API requests to the backend
 */

import axios from 'axios';

// Create axios instance with base URL
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to attach auth token
api.interceptors.request.use(
  async (config) => {
    // If running in browser, get token from localStorage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors (token expired or invalid)
    if (error.response && error.response.status === 401) {
      // If in browser, navigate to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        // Only redirect if we're not already on the login or auth pages
        if (!window.location.pathname.includes('/login') && 
            !window.location.pathname.includes('/auth')) {
          window.location.href = '/login?session=expired';
        }
      }
    }
    return Promise.reject(error);
  }
);

/**
 * API request with error handling
 * @param {string} method - HTTP method (get, post, put, delete)
 * @param {string} url - API endpoint
 * @param {object} data - Request data (for POST/PUT)
 * @returns {Promise<object>} Response data
 */
export async function apiRequest(method, url, data = null) {
  try {
    const response = await api[method](url, data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error(`API ${method} error:`, error);
    
    // Extract error message from response if available
    const errorMessage = error.response?.data?.error || 
                         error.response?.data?.message || 
                         error.message || 
                         'An unknown error occurred';
    
    return { 
      success: false, 
      error: errorMessage,
      status: error.response?.status,
      details: error.response?.data
    };
  }
}

// Helper functions for common API requests
export const apiClient = {
  /**
   * GET request
   * @param {string} url - API endpoint
   * @returns {Promise<object>} Response data
   */
  get: (url) => apiRequest('get', url),
  
  /**
   * POST request
   * @param {string} url - API endpoint
   * @param {object} data - Request data
   * @returns {Promise<object>} Response data
   */
  post: (url, data) => apiRequest('post', url, data),
  
  /**
   * PUT request
   * @param {string} url - API endpoint
   * @param {object} data - Request data
   * @returns {Promise<object>} Response data
   */
  put: (url, data) => apiRequest('put', url, data),
  
  /**
   * DELETE request
   * @param {string} url - API endpoint
   * @returns {Promise<object>} Response data
   */
  delete: (url) => apiRequest('delete', url),

  // User API endpoints
  users: {
    /**
     * Get current user profile
     * @returns {Promise<object>} User profile
     */
    me: () => apiRequest('get', '/api/users/me'),
    
    /**
     * Update user profile
     * @param {object} data - Profile data
     * @returns {Promise<object>} Updated profile
     */
    updateProfile: (data) => apiRequest('post', '/api/users/profile', data),
  },
  
  // Authentication endpoints
  auth: {
    /**
     * Request OTP for phone verification
     * @param {string} phone - Phone number
     * @returns {Promise<object>} OTP response
     */
    requestOTP: (phone) => apiRequest('post', '/api/auth/otp/request', { phone }),
    
    /**
     * Verify OTP and authenticate
     * @param {string} phone - Phone number
     * @param {string} otp - OTP code
     * @returns {Promise<object>} Auth response with token
     */
    verifyOTP: (phone, otp) => apiRequest('post', '/api/auth/otp/verify', { phone, otp }),
  },
  
  // Product endpoints
  products: {
    /**
     * Get all products
     * @param {object} params - Query parameters (category, search)
     * @returns {Promise<object>} List of products
     */
    list: (params) => apiRequest('get', `/api/products?${new URLSearchParams(params)}`),
    
    /**
     * Get product by ID
     * @param {string} id - Product ID
     * @returns {Promise<object>} Product details
     */
    get: (id) => apiRequest('get', `/api/products/${id}`),
  },
  
  // Order endpoints
  orders: {
    /**
     * Create new order
     * @param {object} orderData - Order data
     * @returns {Promise<object>} Created order
     */
    create: (orderData) => apiRequest('post', '/api/orders', orderData),
    
    /**
     * Get order by ID
     * @param {string} id - Order ID
     * @returns {Promise<object>} Order details
     */
    get: (id) => apiRequest('get', `/api/orders/${id}`),
    
    /**
     * Get current user's orders
     * @returns {Promise<object>} List of orders
     */
    list: () => apiRequest('get', '/api/orders'),
  },
};

export default apiClient;
