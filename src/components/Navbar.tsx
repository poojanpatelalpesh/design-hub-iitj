
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Menu, X, User } from "lucide-react";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl text-designer-primary">DesignHUB</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-transparent text-gray-700 hover:text-designer-primary hover:border-designer-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/trending"
                className="border-transparent text-gray-700 hover:text-designer-primary hover:border-designer-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Trending
              </Link>
              
              {isAuthenticated && (
                <>
                  <Link
                    to="/categories"
                    className="border-transparent text-gray-700 hover:text-designer-primary hover:border-designer-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Categories
                  </Link>
                  <Link
                    to="/dashboard"
                    className="border-transparent text-gray-700 hover:text-designer-primary hover:border-designer-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                  >
                    Dashboard
                  </Link>
                </>
              )}
              
              <Link
                to="/about"
                className="border-transparent text-gray-700 hover:text-designer-primary hover:border-designer-primary inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                About Us
              </Link>
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm font-medium text-gray-700">
                  Hello, {user?.name}
                </div>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-designer-primary"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Button 
                  variant="ghost"
                  className="text-gray-700 hover:text-designer-primary"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </Button>
                <Button 
                  className="bg-designer-primary hover:bg-designer-primary/90 text-white"
                  onClick={() => navigate("/register")}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>

          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-designer-primary hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-designer-primary"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="text-gray-700 hover:text-designer-primary hover:bg-gray-50 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/trending"
              className="text-gray-700 hover:text-designer-primary hover:bg-gray-50 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Trending
            </Link>
            
            {isAuthenticated && (
              <>
                <Link
                  to="/categories"
                  className="text-gray-700 hover:text-designer-primary hover:bg-gray-50 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Categories
                </Link>
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-designer-primary hover:bg-gray-50 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
              </>
            )}
            
            <Link
              to="/about"
              className="text-gray-700 hover:text-designer-primary hover:bg-gray-50 block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {isAuthenticated ? (
              <div className="flex items-center px-4">
                <div className="flex-shrink-0">
                  <User className="h-8 w-8 rounded-full bg-gray-100 p-1" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">{user?.name}</div>
                  <div className="text-sm font-medium text-gray-500">{user?.email}</div>
                </div>
                <Button
                  variant="ghost"
                  className="ml-auto"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex justify-around px-4">
                <Button
                  variant="ghost"
                  onClick={() => {
                    navigate("/login");
                    setIsMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
                <Button
                  className="bg-designer-primary hover:bg-designer-primary/90 text-white"
                  onClick={() => {
                    navigate("/register");
                    setIsMenuOpen(false);
                  }}
                >
                  Sign Up
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
