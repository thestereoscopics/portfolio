import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='py-8 bg-slate-100 dark:bg-gray-900 text-slate-800 dark:text-white border-t border-slate-200 dark:border-gray-800'>
      <div className='container mx-auto px-4 text-center'>
        <p className='text-slate-700 dark:text-slate-300'>
          © {currentYear} Jeremy Sell.
        </p>
        <p className='text-slate-500 dark:text-slate-400 text-sm mt-2'>
          Built with React, Next.js, and Tailwind CSS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
