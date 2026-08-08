import { useState, useRef, useEffect } from "react";
import { ShoppingCart, Menu, X, Search, User } from "lucide-react";

export default function Navbar({ isAuthenticated = false }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Deals", href: "/deals" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md fixed w-full top-0 z-50 transition">
      <div className="container flex justify-between items-center h-16 px-4">
        {/* Logo */}
        <a
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent hover:scale-105 transition-transform"
        >
          NexCart
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <button className="p-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md hover:scale-110 transition-transform">
            <Search className="w-5 h-5" />
          </button>

          {/* Cart */}
          <button className="relative p-2 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-md hover:scale-110 transition-transform">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1 animate-bounce">
              3
            </span>
          </button>

          {/* Auth */}
          <div className="hidden md:flex relative" ref={dropdownRef}>
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="p-2 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-md hover:scale-110 transition-transform"
                >
                  <User className="w-5 h-5" />
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 animate-fadeIn">
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    >
                      My Profile
                    </a>
                    <a
                      href="/orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    >
                      My Orders
                    </a>
                    <button
                      onClick={() => console.log("Logout clicked")}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <a
                href="/login"
                className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-medium shadow-md hover:scale-105 transition-transform"
              >
                Login
              </a>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-md hover:scale-110 transition-transform"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="md:hidden bg-white shadow-lg animate-slideDown">
          <div className="flex flex-col space-y-2 p-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                {link.name}
              </a>
            ))}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center px-4 py-2 rounded-md bg-gradient-to-r from-gray-700 to-gray-900 text-white font-medium shadow-md hover:opacity-90 transition"
                >
                  <User className="w-5 h-5 mr-2" />
                </button>
                {dropdownOpen && (
                  <div className="mt-2 w-40 bg-white shadow-lg rounded-md border border-gray-200 animate-fadeIn">
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      My Profile
                    </a>
                    <a
                      href="/orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      My Orders
                    </a>
                    <button
                      onClick={() => console.log("Logout clicked")}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a
                href="/login"
                className="px-4 py-2 rounded-md bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-medium shadow-md hover:scale-105 transition-transform"
              >
                Login
              </a>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
