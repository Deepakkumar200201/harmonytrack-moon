
import React, { useState, useEffect } from "react";
import { CalendarDays, DropletIcon, BarChart3, BookOpen, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useCycle } from "@/context/CycleContext";
import { formatLongDate } from "@/utils/dateUtils";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { nextPeriodDate } = useCycle();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center space-x-2 text-cycle-pink-600 font-semibold text-xl"
          >
            <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-cycle-pink-100 text-cycle-pink-600">
              <DropletIcon size={18} />
            </span>
            <span className="hidden sm:inline-block">Lunar</span>
          </Link>

          {nextPeriodDate && (
            <div className="hidden md:flex glass-card px-3 py-1.5 text-sm text-cycle-pink-700">
              <span>Next period: {formatLongDate(nextPeriodDate)}</span>
            </div>
          )}

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/" active={isActive("/")} onClick={closeMobileMenu}>
              <BarChart3 size={18} />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/calendar" active={isActive("/calendar")} onClick={closeMobileMenu}>
              <CalendarDays size={18} />
              <span>Calendar</span>
            </NavLink>
            <NavLink to="/symptoms" active={isActive("/symptoms")} onClick={closeMobileMenu}>
              <DropletIcon size={18} />
              <span>Symptoms</span>
            </NavLink>
            <NavLink to="/insights" active={isActive("/insights")} onClick={closeMobileMenu}>
              <BarChart3 size={18} />
              <span>Insights</span>
            </NavLink>
            <NavLink to="/education" active={isActive("/education")} onClick={closeMobileMenu}>
              <BookOpen size={18} />
              <span>Education</span>
            </NavLink>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex items-center justify-center h-10 w-10 rounded-full bg-cycle-pink-50 text-cycle-pink-500"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-white pt-20 animate-fade-in">
          <nav className="flex flex-col items-center space-y-4 p-4">
            <NavLink to="/" active={isActive("/")} onClick={closeMobileMenu}>
              <BarChart3 size={20} />
              <span>Dashboard</span>
            </NavLink>
            <NavLink to="/calendar" active={isActive("/calendar")} onClick={closeMobileMenu}>
              <CalendarDays size={20} />
              <span>Calendar</span>
            </NavLink>
            <NavLink to="/symptoms" active={isActive("/symptoms")} onClick={closeMobileMenu}>
              <DropletIcon size={20} />
              <span>Symptoms</span>
            </NavLink>
            <NavLink to="/insights" active={isActive("/insights")} onClick={closeMobileMenu}>
              <BarChart3 size={20} />
              <span>Insights</span>
            </NavLink>
            <NavLink to="/education" active={isActive("/education")} onClick={closeMobileMenu}>
              <BookOpen size={20} />
              <span>Education</span>
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ to, active, children, onClick }) => (
  <Link
    to={to}
    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
      active
        ? "bg-cycle-pink-50 text-cycle-pink-600"
        : "text-gray-600 hover:bg-gray-50"
    }`}
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Header;
