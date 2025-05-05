/**
 * Home Page
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Layout from '../components/Layout';

export default function Home() {
  // Example categories
  const categories = [
    { id: 'chicken', name: 'Chicken', image: '/images/categories/chicken.jpg' },
    { id: 'mutton', name: 'Mutton', image: '/images/categories/mutton.jpg' },
    { id: 'seafood', name: 'Seafood', image: '/images/categories/seafood.jpg' },
    { id: 'marinades', name: 'Marinades', image: '/images/categories/marinades.jpg' },
  ];

  // Example featured products
  const featuredProducts = [
    {
      id: 'p1',
      name: 'Premium Chicken Breast',
      description: 'Boneless, skinless chicken breast. High in protein and low in fat.',
      price: 280,
      image: '/images/products/chicken-breast.jpg',
      category: 'chicken',
    },
    {
      id: 'p2', 
      name: 'Mutton Curry Cut',
      description: 'Bone-in mutton pieces perfect for curries and stews.',
      price: 560,
      image: '/images/products/mutton-curry.jpg',
      category: 'mutton',
    },
    {
      id: 'p3',
      name: 'Fresh Tiger Prawns',
      description: 'Large, cleaned tiger prawns. Perfect for grilling or curries.',
      price: 450,
      image: '/images/products/prawns.jpg',
      category: 'seafood',
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gray-900 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-gray-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent"></div>
            </div>
            
            <div className="pt-10 sm:pt-16 lg:pt-8 xl:pt-16">
              <div className="sm:text-center lg:text-left px-4 sm:px-8 xl:pr-16">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
                  <span className="block">Premium Meat,</span>
                  <span className="block text-meat-500">Delivered Fresh</span>
                </h1>
                <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto lg:mx-0">
                  Experience the highest quality meat sourced directly from trusted farms. 
                  Delivered to your doorstep, fresh and ready to cook.
                </p>
                <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow w-full sm:w-auto">
                    <Link href="/products" className="w-full sm:w-auto btn btn-primary btn-lg flex items-center justify-center">
                      Shop Now
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto">
                    <Link href="/about" className="w-full sm:w-auto btn btn-outline btn-lg flex items-center justify-center">
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full bg-meat-700">
            {/* Replace with actual hero image */}
            <div className="w-full h-full bg-gradient-to-br from-meat-800 to-meat-600 flex items-center justify-center">
              <p className="text-xl text-white font-semibold">[Hero Image Placeholder]</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-lg text-meat-600 font-semibold tracking-wide uppercase">Why Choose Us</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              The Aamis Difference
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {/* Benefit 1 */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-meat-100 text-meat-600 mb-5">
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Quality</h3>
                <p className="text-base text-gray-600 text-center">
                  All our products are sourced from certified farms with the highest quality standards.  
                </p>
              </div>

              {/* Benefit 2 */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-meat-100 text-meat-600 mb-5">
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Farm to Table</h3>
                <p className="text-base text-gray-600 text-center">
                  We work directly with farmers, eliminating middlemen to deliver the freshest products to you.
                </p>
              </div>

              {/* Benefit 3 */}
              <div className="flex flex-col items-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-meat-100 text-meat-600 mb-5">
                  <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                    <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-5h2a2 2 0 012 2v3.05a2.5 2.5 0 014.9 0H19a1 1 0 001-1v-5a2 2 0 00-2-2h-2V6a1 1 0 00-1-1H3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Express Delivery</h3>
                <p className="text-base text-gray-600 text-center">
                  From our facilities to your doorstep in under 120 minutes, keeping your meat fresh.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-lg text-meat-600 font-semibold tracking-wide uppercase">Categories</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Shop By Category
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link href={`/products?category=${category.id}`} key={category.id} className="group">
                <div className="relative rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="h-64 bg-gray-200 group-hover:opacity-90 transition-opacity duration-300">
                    {/* Category image */}
                    <div className="w-full h-full bg-gradient-to-br from-meat-800 to-meat-600 flex items-center justify-center">
                      <p className="text-xl text-white font-semibold">{category.name}</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent">
                    <h3 className="text-xl font-bold text-white">{category.name}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/products" className="w-full sm:w-auto inline-flex justify-center btn btn-primary px-6 py-3">
              View All Products
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-lg text-meat-600 font-semibold tracking-wide uppercase">Featured Products</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Customer Favorites
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <div key={product.id} className="card group">
                <div className="relative h-64 bg-gray-200 overflow-hidden">
                  {/* Replace with actual product image */}
                  <div className="w-full h-full bg-gradient-to-br from-gray-700 to-gray-600 flex items-center justify-center">
                    <p className="text-xl text-white font-semibold">[{product.name} Image]</p>
                  </div>
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                </div>
                <div className="card-body">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="card-title">{product.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                    </div>
                    <span className="text-lg font-bold text-meat-600">₹{product.price}</span>
                  </div>
                  <div className="mt-4 flex flex-col sm:flex-row justify-between items-center gap-2">
                    <Link href={`/products/${product.id}`} className="text-primary-600 hover:text-primary-800 font-medium text-sm w-full sm:w-auto text-center sm:text-left">
                      View Details
                    </Link>
                    <button className="btn btn-sm btn-primary w-full sm:w-auto">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-meat-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-12">
            <h2 className="text-lg text-white font-semibold tracking-wide uppercase">Testimonials</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              What Our Customers Say
            </p>
          </div>

          <div className="mt-10 max-w-4xl mx-auto">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden">
              <div className="p-8">
                <div className="flex items-center mb-6">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                    {/* Placeholder for user avatar */}
                    <span className="text-gray-500 font-semibold">RS</span>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold">Rahul Singh</h4>
                    <div className="flex text-meat-500">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <blockquote className="text-lg text-gray-700 italic">
                  "I've been ordering meat from Aamis for 6 months now, and I'm consistently impressed with the quality. The delivery is always on time, and the cuts are exactly as described. The marinades are amazing too!"  
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              <span className="block">Ready to try Aamis?</span>
              <span className="block text-meat-600">Order now and get 10% off your first order.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <Link href="/products" className="btn btn-primary btn-lg">
                  Get Started
                </Link>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <Link href="/contact" className="btn btn-outline btn-lg">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Use the Layout component for this page
Home.getLayout = function getLayout(page) {
  return (
    <Layout title="Aamis - Premium Fresh Meat Delivery" description="Order premium quality fresh meat online. Free delivery, farm to table within 120 minutes.">
      {page}
    </Layout>
  );
};
