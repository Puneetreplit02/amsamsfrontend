/**
 * Header Component
 * 
 * Main navigation header for the application
 */

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Header = ({ user }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();

  // Navigation links
  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'Our Story', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 mr-6">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-meat-800 to-meat-600">Aamis</span>
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="flex-1">
            <nav className="hidden md:ml-6 md:flex md:space-x-8">
              {navLinks.map((link) => {
                const isActive = router.pathname === link.href || 
                  (link.href !== '/' && router.pathname.startsWith(link.href));
                
                return (
                  <Link 
                    href={link.href} 
                    key={link.name}
                    className={`inline-flex items-center px-3 py-2 text-sm font-medium border-b-2 ${isActive
                      ? 'border-meat-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* User menu & Mobile menu button */}
          <div className="flex items-center">
            {/* Search */}
            <button className="p-2 rounded-full text-gray-500 hover:text-gray-600 focus:outline-none">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            
            {/* Cart */}
            <Link href="/cart" className="ml-4 p-2 rounded-full text-gray-500 hover:text-gray-600 focus:outline-none relative">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {/* Cart item counter */}
              <span className="absolute top-0 right-0 bg-meat-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Link>

            {/* User profile menu */}
            {user ? (
              <Link href="/profile" className="ml-4 flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden border border-gray-200">
                  {user.avatar ? (
                    <Image 
                      src={user.avatar} 
                      alt={user.name || "User"} 
                      width={32} 
                      height={32} 
                      objectFit="cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-primary-100 text-primary-700">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}
                </div>
              </Link>
            ) : (
              <Link href="/login" className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-meat-600 hover:bg-meat-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-meat-500">
                Sign in
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden ml-4 p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-meat-500"
              onClick={toggleMobileMenu}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">{mobileMenuOpen ? 'Close main menu' : 'Open main menu'}</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div 
        id="mobile-menu"
        className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden border-t border-gray-200 transition-all duration-300 ease-in-out`}
      >
        <div className="pt-2 pb-3 space-y-1 px-4">
          {navLinks.map((link) => {
            const isActive = router.pathname === link.href || 
              (link.href !== '/' && router.pathname.startsWith(link.href));
            
            return (
              <Link 
                href={link.href} 
                key={link.name}
                className={`block pl-3 pr-4 py-3 border-l-4 text-base font-medium ${isActive
                  ? 'bg-primary-50 border-meat-500 text-meat-700'
                  : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
        
        {/* Mobile menu user section */}
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="flex items-center px-4">
            {user ? (
              <>
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user.name || 'User'}</div>
                  <div className="text-sm font-medium text-gray-500">{user.email || 'User account'}</div>
                </div>
              </>
            ) : (
              <Link href="/login" className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-meat-600 hover:bg-meat-700">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
