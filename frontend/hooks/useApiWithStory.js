/**
 * Custom hook for API requests with error storytelling
 */

import { useState } from 'react';
import apiClient from '../lib/api';
import { mapApiErrorToStory } from '../lib/errorStories';

/**
 * Hook for making API requests with built-in error storytelling
 * @returns {object} API utilities with error handling
 */
export function useApiWithStory() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorStory, setErrorStory] = useState(null);
  
  /**
   * Reset error and error story states
   */
  const resetError = () => {
    setError(null);
    setErrorStory(null);
  };
  
  /**
   * Execute API request with error handling
   * @param {Function} apiCall - Function that returns a Promise from apiClient
   * @param {object} options - Additional options
   * @returns {Promise<object>} Response data or null on error
   */
  const executeRequest = async (apiCall, options = {}) => {
    resetError();
    setIsLoading(true);
    
    try {
      const response = await apiCall();
      
      if (!response.success) {
        // Convert API error to user-friendly story
        const story = mapApiErrorToStory(response.error || response);
        setError(response.error || 'An error occurred');
        setErrorStory(story);
        return null;
      }
      
      return response.data;
    } catch (err) {
      console.error('API request error:', err);
      const story = mapApiErrorToStory(err);
      setError(err.message || 'An unexpected error occurred');
      setErrorStory(story);
      return null;
    } finally {
      setIsLoading(false);
      
      // If onComplete callback is provided, call it
      if (options.onComplete) {
        options.onComplete();
      }
    }
  };
  
  /**
   * Execute action associated with error story
   * @param {string} actionType - Type of action to execute
   */
  const executeStoryAction = (actionType) => {
    switch (actionType) {
      case 'retry':
        // Reset error states to allow retry
        resetError();
        break;
        
      case 'goHome':
        // Navigate to home page
        window.location.href = '/';
        break;
        
      case 'login':
        // Navigate to login page
        window.location.href = '/login';
        break;
        
      case 'resendOTP':
        // This would typically trigger the OTP resend function
        // which would be passed in as a prop or callback
        resetError();
        break;
        
      case 'checkStatus':
        // Open status page in new tab
        window.open('/status', '_blank');
        break;
        
      case 'googleLogin':
        // Trigger Google login
        // This would typically call the googleLogin function
        break;
        
      default:
        console.log(`Action ${actionType} not implemented yet`);
    }
  };
  
  return {
    isLoading,
    error,
    errorStory,
    resetError,
    executeRequest,
    executeStoryAction,
  };
}

export default useApiWithStory;
