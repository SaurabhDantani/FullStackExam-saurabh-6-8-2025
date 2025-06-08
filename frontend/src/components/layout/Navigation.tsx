'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { toast } from 'react-toastify';

export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    toast.success('Logged out successfully');
  };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-indigo-600">
            E-Commerce
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/products"
              className={`text-gray-600 hover:text-indigo-600 ${
                isActive('/products') ? 'text-indigo-600 font-medium' : ''
              }`}
            >
              Products
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  href="/cart"
                  className={`text-gray-600 hover:text-indigo-600 ${
                    isActive('/cart') ? 'text-indigo-600 font-medium' : ''
                  }`}
                >
                  Cart
                </Link>
                <Link
                  href="/profile"
                  className={`text-gray-600 hover:text-indigo-600 ${
                    isActive('/profile') ? 'text-indigo-600 font-medium' : ''
                  }`}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-indigo-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`text-gray-600 hover:text-indigo-600 ${
                    isActive('/login') ? 'text-indigo-600 font-medium' : ''
                  }`}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={`text-gray-600 hover:text-indigo-600 ${
                    isActive('/register') ? 'text-indigo-600 font-medium' : ''
                  }`}
                >
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-600 hover:text-indigo-600 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              href="/products"
              className={`block text-gray-600 hover:text-indigo-600 ${
                isActive('/products') ? 'text-indigo-600 font-medium' : ''
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  href="/cart"
                  className={`block text-gray-600 hover:text-indigo-600 ${
                    isActive('/cart') ? 'text-indigo-600 font-medium' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cart
                </Link>
                <Link
                  href="/profile"
                  className={`block text-gray-600 hover:text-indigo-600 ${
                    isActive('/profile') ? 'text-indigo-600 font-medium' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left text-gray-600 hover:text-indigo-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className={`block text-gray-600 hover:text-indigo-600 ${
                    isActive('/login') ? 'text-indigo-600 font-medium' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className={`block text-gray-600 hover:text-indigo-600 ${
                    isActive('/register') ? 'text-indigo-600 font-medium' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
} 