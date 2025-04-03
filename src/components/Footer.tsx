
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 pt-10 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-designer-primary font-bold text-xl mb-4">StyleConnect</h3>
            <p className="text-gray-600 text-sm mb-4">
              Connecting clients with talented designers in fashion, accessories, and more.
            </p>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-semibold text-gray-900 mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-designer-primary text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/trending" className="text-gray-600 hover:text-designer-primary text-sm">
                  Trending
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-600 hover:text-designer-primary text-sm">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-600 hover:text-designer-primary text-sm">
                  Dashboard
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-semibold text-gray-900 mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="text-gray-600 hover:text-designer-primary text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-designer-primary text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="text-gray-600 hover:text-designer-primary text-sm">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h4 className="font-semibold text-gray-900 mb-4">Contact Us</h4>
            <p className="text-gray-600 text-sm mb-2">Email: contact@styleconnect.com</p>
            <p className="text-gray-600 text-sm mb-2">Phone: +1 (555) 123-4567</p>
            <p className="text-gray-600 text-sm">Address: 123 Fashion Ave, Design District</p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8">
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} StyleConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
