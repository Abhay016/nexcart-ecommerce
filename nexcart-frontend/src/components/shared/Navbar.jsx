import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ShoppingCart, Menu, X, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { logOutUser } from "../../store/actions";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.carts);
  const isAuthenticated = user !== null;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logOutUser(navigate));
  };

  const handleCartIcon = () => {
    navigate("/cart");
  };

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/products" },
    { name: "Deals", href: "/deals" },
    { name: "About", href: "/about" },
    { name: "FAQ's", href: "/faqs" },
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
    <header className="bg-white/80 backdrop-blur-md shadow-md fixed w-full top-0 z-60 transition">
      <div className="container flex justify-between items-center h-16 px-4">
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent hover:scale-105 transition-transform"
        >
          NexCart
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900 hover:opacity-80 transition"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Cart */}
          <button
            className="relative p-2 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-md hover:scale-110 transition-transform cursor-pointer"
            onClick={handleCartIcon}
          >
            <ShoppingCart className="w-5 h-5" />
            {cart?.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1 animate-bounce">
                {cart.length}
              </span>
            )}
          </button>

          {/* Auth */}
          <div className="hidden md:flex relative" ref={dropdownRef}>
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="p-2 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-md hover:scale-110 transition-transform cursor-pointer"
                >
                  <User className="w-5 h-5" />
                </button>

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white shadow-2xl rounded-lg border border-gray-200 z-[999] transition-all duration-200 ease-out">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={logoutHandler}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 rounded-md bg-gradient-to-r from-gray-700 to-gray-900 text-white font-medium shadow-md hover:scale-105 transition-transform"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded-full bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-md hover:scale-110 transition-transform cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <nav className="md:hidden bg-white shadow-2xl rounded-b-xl border-t border-gray-200 animate-slideDown">
          <div className="flex flex-col space-y-2 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block px-4 py-2 font-medium text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-gray-900 hover:opacity-80 transition"
              >
                {link.name}
              </Link>
            ))}

            {isAuthenticated ? (
              <div className="mt-2 flex flex-col rounded-md overflow-hidden border border-gray-200 shadow-sm">
                <Link
                  to="/profile"
                  className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                >
                  My Profile
                </Link>
                <Link
                  to="/orders"
                  className="px-4 py-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                >
                  My Orders
                </Link>
                <button
                  onClick={logoutHandler}
                  className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="mt-2 px-4 py-2 rounded-md bg-gradient-to-r from-gray-700 to-gray-900 text-white font-medium shadow-md hover:scale-105 transition-transform"
              >
                Login
              </Link>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
