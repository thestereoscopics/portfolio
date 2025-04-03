import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import DarkModeToggle from "./DarkModeToggle";
import { useActiveSection } from "@/hooks/useActiveSection";

interface NavItem {
  label: string;
  href: string;
  isSection?: boolean;
}

const navItems: NavItem[] = [
  { label: "About", href: "#about", isSection: true },
  { label: "Experience", href: "#experience", isSection: true },
  { label: "Projects", href: "#projects", isSection: true },
  { label: "Skills", href: "#skills", isSection: true },
  { label: "Contact", href: "#contact", isSection: true },
  // { label: "Surprise", href: "/surprise" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const activeSection = useActiveSection();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const targetId = location.hash.replace("#", "");
        const section = document.getElementById(targetId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location.hash, location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      navigate("/" + sectionId);
      return;
    }

    const targetId = sectionId.replace("#", "");
    const section = document.getElementById(targetId);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md py-3"
          : "bg-transparent dark:bg-gray-950/80 backdrop-blur-sm py-5"
      )}
    >
      <div className='container mx-auto px-4 md:px-6 flex items-center justify-between'>
        <Link
          to='/'
          onClick={
            location.pathname === "/"
              ? (e) => scrollToSection("#hero", e)
              : undefined
          }
          className='text-2xl font-bold text-portfolio-800 dark:text-portfolio-300 hover:text-portfolio-600 dark:hover:text-portfolio-400 transition-colors'
        >
          Jeremy
          <span className='text-portfolio-500 dark:text-portfolio-400'>
            .Sell
          </span>
        </Link>

        <div className='hidden md:flex items-center gap-6'>
          <nav className='flex items-center gap-6'>
            {navItems.map((item) => {
              const isActive =
                item.isSection &&
                ((location.pathname === "/" &&
                  activeSection === item.href.replace("#", "")) ||
                  (location.pathname !== "/" && location.hash === item.href));

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={
                    item.isSection
                      ? (e) => scrollToSection(item.href, e)
                      : undefined
                  }
                  className={cn(
                    "text-sm font-medium transition-colors relative hover:text-portfolio-600 dark:hover:text-portfolio-400",
                    "after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-portfolio-500 dark:after:bg-portfolio-400",
                    "hover:after:w-full after:transition-all after:duration-300",
                    isActive
                      ? "text-portfolio-600 dark:text-portfolio-400 after:w-full"
                      : "text-slate-700 dark:text-slate-300"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <DarkModeToggle />
        </div>

        <div className='md:hidden flex items-center gap-2'>
          <DarkModeToggle />
          <button
            className='text-slate-700 dark:text-slate-300 hover:text-portfolio-600 dark:hover:text-portfolio-400 transition-colors'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label='Toggle menu'
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className='md:hidden bg-white dark:bg-gray-900 absolute w-full border-b border-gray-200 dark:border-gray-700 py-4 animate-slide-in'>
          <nav className='container mx-auto px-4 flex flex-col gap-4'>
            {navItems.map((item) => {
              const isActive =
                item.isSection &&
                ((location.pathname === "/" &&
                  activeSection === item.href.replace("#", "")) ||
                  (location.pathname !== "/" && location.hash === item.href));

              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={
                    item.isSection
                      ? (e) => scrollToSection(item.href, e)
                      : undefined
                  }
                  className={cn(
                    "text-base py-2 px-4 rounded-md transition-colors",
                    isActive
                      ? "bg-portfolio-50 dark:bg-gray-800 text-portfolio-600 dark:text-portfolio-400"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-gray-800 hover:text-portfolio-600 dark:hover:text-portfolio-400"
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
