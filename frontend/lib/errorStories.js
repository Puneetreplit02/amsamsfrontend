/**
 * Error Stories
 * 
 * A collection of narrative-based error handling stories to help users
 * understand and recover from common error situations.
 */

/**
 * Error story templates categorized by domain and error type
 */
const errorStories = {
  // Authentication-related errors
  auth: {
    // OTP verification failures
    invalidOTP: {
      title: 'Verification code not working?',
      story: [
        'Looks like the verification code you entered isn\'t quite right.',
        'Here\'s what might be happening:',
        '• Your code may have expired (they\'re only valid for 10 minutes)',
        '• The numbers might have been typed incorrectly',
        '• You may have requested a new code, making the old one invalid'
      ],
      actions: [
        { label: 'Try again', action: 'retry' },
        { label: 'Send a new code', action: 'resendOTP' }
      ],
      illustration: '/illustrations/otp-error.svg'
    },
    
    // Phone number not found or invalid
    phoneNotFound: {
      title: 'We don\'t recognize this number',
      story: [
        'We couldn\'t find an account with this phone number.',
        'If you\'re new here, we\'ll help you create an account. If not, double-check your number.'
      ],
      actions: [
        { label: 'Create account', action: 'createAccount' },
        { label: 'Try a different number', action: 'retry' },
        { label: 'Use Google login instead', action: 'googleLogin' }
      ],
      illustration: '/illustrations/phone-error.svg'
    },
    
    // Session expired
    sessionExpired: {
      title: 'Your session took a little nap',
      story: [
        'It looks like your login session has expired for security reasons.',
        'Don\'t worry! This happens automatically after a period of inactivity to keep your account safe.'
      ],
      actions: [
        { label: 'Log in again', action: 'login' }
      ],
      illustration: '/illustrations/session-timeout.svg'
    }
  },
  
  // Network-related errors
  network: {
    // Timeout or server unreachable
    connectionFailed: {
      title: 'Hmm, we\'re having trouble connecting',
      story: [
        'We\'re having trouble reaching our servers right now.',
        'This could be due to:',
        '• Your internet connection might be unstable',
        '• Our servers might be experiencing high traffic',
        '• There might be temporary maintenance going on'
      ],
      actions: [
        { label: 'Try again', action: 'retry' },
        { label: 'Check status page', action: 'checkStatus' }
      ],
      illustration: '/illustrations/connection-error.svg'
    },
    
    // Offline status
    offline: {
      title: 'You\'re offline right now',
      story: [
        'It looks like you don\'t have an internet connection at the moment.',
        'Some features might not work until you\'re back online.'
      ],
      actions: [
        { label: 'Try again when online', action: 'checkConnection' }
      ],
      illustration: '/illustrations/offline.svg'
    }
  },
  
  // Payment-related errors
  payment: {
    // Payment processing failed
    paymentFailed: {
      title: 'Your payment didn\'t go through',
      story: [
        'We weren\'t able to process your payment.',
        'This could be because:',
        '• Your card might have insufficient funds',
        '• The card details might not be correct',
        '• Your bank might have declined the transaction for security reasons'
      ],
      actions: [
        { label: 'Try again', action: 'retry' },
        { label: 'Use a different payment method', action: 'changePayment' }
      ],
      illustration: '/illustrations/payment-failed.svg'
    },
    
    // Gateway timeout
    gatewayTimeout: {
      title: 'Payment is taking longer than expected',
      story: [
        'Our payment partner is taking a bit longer than usual to respond.',
        'Don\'t worry! If your payment went through, we\'ll confirm it shortly. If not, no charges were made.'
      ],
      actions: [
        { label: 'Check payment status', action: 'checkStatus' },
        { label: 'Try again', action: 'retry' }
      ],
      illustration: '/illustrations/payment-pending.svg'
    }
  },
  
  // Order-related errors
  orders: {
    // Item out of stock
    outOfStock: {
      title: 'This item just sold out',
      story: [
        'We\'re sorry, but it looks like this item just sold out as you were shopping.',
        'Our stock levels update in real-time, and this item is currently unavailable.'
      ],
      actions: [
        { label: 'See similar items', action: 'viewSimilar' },
        { label: 'Get notified when back', action: 'setAlert' }
      ],
      illustration: '/illustrations/out-of-stock.svg'
    },
    
    // Delivery unavailable in area
    deliveryUnavailable: {
      title: 'We don\'t deliver to this area yet',
      story: [
        'We\'re constantly expanding, but we don\'t deliver to this location yet.',
        'We\'re adding new delivery areas each month, so please check back soon!'
      ],
      actions: [
        { label: 'Try a different address', action: 'changeAddress' },
        { label: 'Notify me when available', action: 'notifyAvailability' }
      ],
      illustration: '/illustrations/location-unavailable.svg'
    }
  },
  
  // Generic errors
  generic: {
    // Unknown/unexpected error
    unknown: {
      title: 'Something unexpected happened',
      story: [
        'We encountered an unexpected issue while processing your request.',
        'Our team has been notified and is working to fix it.'
      ],
      actions: [
        { label: 'Try again', action: 'retry' },
        { label: 'Go to home page', action: 'goHome' }
      ],
      illustration: '/illustrations/generic-error.svg'
    },
    
    // Maintenance mode
    maintenance: {
      title: 'We\'re doing some quick maintenance',
      story: [
        'We\'re currently updating our systems to serve you better.',
        'This should only take a few minutes. Please try again shortly.'
      ],
      actions: [
        { label: 'Try again', action: 'retry' },
        { label: 'Check status page', action: 'checkStatus' }
      ],
      illustration: '/illustrations/maintenance.svg'
    }
  }
};

/**
 * Get an error story by category and type
 * @param {string} category - Error category (auth, network, etc.)
 * @param {string} type - Specific error type within the category
 * @returns {object} Error story object or fallback generic error
 */
export function getErrorStory(category, type) {
  try {
    return errorStories[category]?.[type] || errorStories.generic.unknown;
  } catch (error) {
    console.error('Error retrieving error story:', error);
    return errorStories.generic.unknown;
  }
}

/**
 * Map API error to appropriate error story
 * @param {object} error - Error object from API
 * @returns {object} Error story object
 */
export function mapApiErrorToStory(error) {
  // If we have a specific error with status code
  if (error.status) {
    switch (error.status) {
      case 401:
        return errorStories.auth.sessionExpired;
      case 403:
        return errorStories.auth.unauthorized;
      case 404:
        // Check if it's a specific type of not found
        if (error.details?.type === 'PRODUCT_NOT_FOUND') {
          return errorStories.orders.outOfStock;
        }
        return errorStories.generic.notFound;
      case 500:
        return errorStories.generic.unknown;
      case 503:
        return errorStories.generic.maintenance;
      default:
        return errorStories.generic.unknown;
    }
  }
  
  // If we have network issues
  if (error.message?.includes('Network Error') || error.message?.includes('timeout')) {
    if (navigator.onLine === false) {
      return errorStories.network.offline;
    }
    return errorStories.network.connectionFailed;
  }
  
  // Default to generic error
  return errorStories.generic.unknown;
}

export default errorStories;
