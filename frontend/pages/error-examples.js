/**
 * Error Examples Page
 * 
 * Demonstrates various error stories and recovery experiences
 */

import React, { useState } from 'react';
import Layout from '../components/Layout';
import ErrorStory from '../components/ErrorStory';
import errorStories, { getErrorStory } from '../lib/errorStories';

export default function ErrorExamples() {
  // State to track which error story is being viewed
  const [activeCategory, setActiveCategory] = useState('auth');
  const [activeType, setActiveType] = useState('invalidOTP');
  const [isFullPage, setIsFullPage] = useState(false);
  
  // Get the selected error story
  const selectedStory = getErrorStory(activeCategory, activeType);
  
  // List of all error categories
  const categories = Object.keys(errorStories);
  
  // Handle error story action clicks
  const handleAction = (action) => {
    console.log(`Action triggered: ${action}`);
    if (action === 'retry') {
      alert('Retry action triggered');
    } else if (action === 'goHome') {
      alert('Go home action triggered');
    }
  };
  
  // Handle category change
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    // Get the first error type in this category
    const firstType = Object.keys(errorStories[category])[0];
    setActiveType(firstType);
  };
  
  return (
    <div className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Error Storytelling Examples
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Explore our narrative-based error recovery experiences
          </p>
        </div>
        
        {/* Display mode toggle */}
        <div className="mb-8 flex justify-center">
          <button
            onClick={() => setIsFullPage(!isFullPage)}
            className="btn btn-outline"
          >
            {isFullPage ? 'Show as Component' : 'Show as Full Page'}
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar for selecting error stories */}
          <div className="lg:col-span-1 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Error Categories</h2>
            
            {/* Category list */}
            <div className="space-y-1 mb-6">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`block w-full text-left px-3 py-2 rounded-md ${activeCategory === category ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100'}`}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
            
            {/* Error type list */}
            <h3 className="text-sm font-medium text-gray-700 mb-2">Error Types</h3>
            <div className="space-y-1">
              {activeCategory && Object.keys(errorStories[activeCategory]).map((type) => (
                <button
                  key={type}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm ${activeType === type ? 'bg-primary-100 text-primary-800' : 'hover:bg-gray-100'}`}
                  onClick={() => setActiveType(type)}
                >
                  {type.replace(/([A-Z])/g, ' $1').trim()}
                </button>
              ))}
            </div>
          </div>
          
          {/* Main content area */}
          <div className="lg:col-span-3">
            {/* Show selected error story */}
            {selectedStory && (
              isFullPage ? (
                <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-50">
                  <ErrorStory 
                    story={selectedStory} 
                    onAction={handleAction} 
                    fullPage={true} 
                  />
                  <button 
                    className="absolute top-4 right-4 text-white bg-gray-800 p-2 rounded-full"
                    onClick={() => setIsFullPage(false)}
                  >
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ) : (
                <ErrorStory 
                  story={selectedStory} 
                  onAction={handleAction} 
                  fullPage={false} 
                />
              )
            )}
            
            {/* Story information */}
            <div className="bg-white rounded-lg shadow overflow-hidden mt-8">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Error Story Details</h3>
              </div>
              <div className="px-6 py-4">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Category</dt>
                    <dd className="mt-1 text-sm text-gray-900">{activeCategory}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Type</dt>
                    <dd className="mt-1 text-sm text-gray-900">{activeType}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Title</dt>
                    <dd className="mt-1 text-sm text-gray-900">{selectedStory.title}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Story Content</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <ul className="list-disc pl-5 space-y-1">
                        {selectedStory.story.map((paragraph, index) => (
                          <li key={index}>{paragraph}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Available Actions</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      <ul className="list-disc pl-5 space-y-1">
                        {selectedStory.actions.map((action, index) => (
                          <li key={index}>
                            <span className="font-medium">{action.label}</span>
                            <span className="text-gray-500"> - Action: {action.action}</span>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            {/* Implementation example */}
            <div className="bg-white rounded-lg shadow overflow-hidden mt-8">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">Implementation Example</h3>
              </div>
              <div className="px-6 py-4">
                <p className="text-sm text-gray-600 mb-4">
                  Here's how to use the Error Story component in your React components:
                </p>
                <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto text-sm">
                  {`import { useApiWithStory } from '../hooks/useApiWithStory';
import ErrorStory from '../components/ErrorStory';

function MyComponent() {
  const { isLoading, error, errorStory, executeRequest, executeStoryAction } = useApiWithStory();
  
  // Example API call with error handling
  const handleSubmit = async () => {
    const data = await executeRequest(() => apiClient.auth.verifyOTP(phone, otp));
    if (data) {
      // Success handling
    }
  };
  
  return (
    <div>
      {errorStory ? (
        <ErrorStory 
          story={errorStory} 
          onAction={executeStoryAction} 
        />
      ) : (
        // Your normal component UI
      )}
    </div>
  );
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Use the Layout component for this page
ErrorExamples.getLayout = function getLayout(page) {
  return (
    <Layout title="Error Storytelling Examples | Aamis" description="Explore our narrative-based error recovery experiences">
      {page}
    </Layout>
  );
};
