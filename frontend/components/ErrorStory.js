/**
 * Error Story Component
 * 
 * Displays a narrative-based error recovery UI to help users
 * understand and navigate through errors.
 */

import React from 'react';
import Image from 'next/image';

/**
 * Error story component with illustrations and narrative-based error recovery
 * @param {object} props - Component props
 * @param {object} props.story - Error story object with title, story text, actions
 * @param {function} props.onAction - Function to handle action button clicks
 * @param {boolean} props.fullPage - Whether to display as full page or inline
 */
const ErrorStory = ({ story, onAction, fullPage = false }) => {
  if (!story) return null;

  // Extract story details
  const { title, story: storyText, actions, illustration } = story;
  
  // Handle action button clicks
  const handleActionClick = (actionType) => {
    if (onAction) {
      onAction(actionType);
    }
  };

  // Define component classes based on fullPage prop
  const containerClasses = fullPage
    ? 'min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100'
    : 'rounded-lg shadow-lg overflow-hidden bg-white border border-gray-100 my-8';

  const contentClasses = fullPage
    ? 'max-w-3xl bg-white rounded-xl shadow-xl overflow-hidden flex flex-col md:flex-row animate-fade-in'
    : 'flex flex-col md:flex-row';

  return (
    <div className={containerClasses}>
      <div className={contentClasses}>
        {/* Illustration */}
        {illustration && (
          <div className="md:w-2/5 bg-gradient-to-br from-primary-50 to-primary-100 p-6 flex items-center justify-center">
            <div className="relative w-full max-w-xs aspect-square">
              <Image
                src={illustration}
                alt={title}
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>
          </div>
        )}
        
        {/* Content */}
        <div className="p-8 md:w-3/5">
          <h2 className="text-2xl font-display font-bold text-gray-800 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-800 to-primary-600">
            {title}
          </h2>
          
          <div className="text-gray-600 space-y-3 mb-8">
            {storyText.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          {/* Actions */}
          {actions && actions.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {actions.map((action, index) => {
                // Primary action (first one) gets highlighted
                const isPrimary = index === 0;
                const buttonClasses = isPrimary
                  ? 'px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200'
                  : 'px-6 py-3 border border-gray-200 text-primary-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200';
                
                return (
                  <button
                    key={index}
                    className={buttonClasses}
                    onClick={() => handleActionClick(action.action)}
                  >
                    {action.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorStory;
