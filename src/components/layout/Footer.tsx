
import React from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white py-8 border-t border-cycle-pink-100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-cycle-pink-600">Lunar</h3>
            <p className="text-sm text-gray-600">
              Track your cycle with precision and gain insights into your body's natural rhythm.
            </p>
            <div className="flex items-center space-x-1 text-sm text-gray-600">
              <span>Made with</span>
              <Heart size={14} className="text-cycle-pink-500 fill-cycle-pink-500" />
              <span>for better health</span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4 text-gray-900">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-cycle-pink-600">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/calendar" className="text-gray-600 hover:text-cycle-pink-600">
                  Calendar
                </Link>
              </li>
              <li>
                <Link to="/symptoms" className="text-gray-600 hover:text-cycle-pink-600">
                  Symptoms
                </Link>
              </li>
              <li>
                <Link to="/insights" className="text-gray-600 hover:text-cycle-pink-600">
                  Insights
                </Link>
              </li>
              <li>
                <Link to="/education" className="text-gray-600 hover:text-cycle-pink-600">
                  Education
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4 text-gray-900">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-cycle-pink-600">
                  About Menstrual Cycles
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-cycle-pink-600">
                  Fertility Awareness
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-cycle-pink-600">
                  Hormonal Health
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-cycle-pink-600">
                  PCOS Resources
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-cycle-pink-600">
                  Endometriosis Support
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium mb-4 text-gray-900">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-600 hover:text-cycle-pink-600">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-cycle-pink-600">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-cycle-pink-600">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-cycle-pink-600">
                  Data Protection
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-cycle-pink-100">
          <p className="text-sm text-center text-gray-500">
            &copy; {new Date().getFullYear()} Lunar. All rights reserved. Not intended to replace medical advice.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
