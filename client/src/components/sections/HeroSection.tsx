import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId: string, e: React.MouseEvent) => {
    e.preventDefault();

    // If we're not on the home page, navigate to home first then to the section
    if (location.pathname !== "/") {
      navigate("/" + sectionId);
      return;
    }

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id='hero'
      className='min-h-screen flex items-center justify-center relative overflow-hidden dark:bg-gray-950'
    >
      <div className='absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-950 z-0' />

      {/* Decorative elements */}
      <div className='absolute top-20 right-10 w-96 h-96 bg-portfolio-200 dark:bg-portfolio-700/30 rounded-full opacity-20 blur-3xl' />
      <div className='absolute bottom-20 left-10 w-72 h-72 bg-portfolio-300 dark:bg-portfolio-600/30 rounded-full opacity-20 blur-3xl' />

      <div className='container mx-auto px-4 py-24 md:py-32 relative z-10'>
        <div className='flex flex-col items-center text-center animate-fade-in'>
          <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6'>
            Jeremy Sell
          </h1>
          <h2 className='text-xl md:text-2xl text-portfolio-600 dark:text-portfolio-400 font-medium mb-8'>
            Senior Frontend Engineer
          </h2>
          <p className='text-slate-600 dark:text-slate-300 text-lg md:text-xl max-w-2xl mb-12'>
            Crafting beautiful, performant and accessible web experiences with
            React, Next.js, and modern frontend technologies.
          </p>

          <div className='flex gap-4'>
            <Button className='bg-portfolio-600 hover:bg-portfolio-700'>
              <a href='#contact' onClick={(e) => scrollToSection("contact", e)}>
                Get in touch
              </a>
            </Button>
            <Button
              variant='outline'
              onClick={(e) => scrollToSection("about", e)}
              className='group'
            >
              Learn more
              <ArrowDown className='animate-bounce ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform' />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
