import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section
      id='about'
      className='py-20 md:py-32 bg-white dark:bg-gray-900 relative'
    >
      <div className='container mx-auto px-4'>
        <div className='max-w-3xl mx-auto'>
          <h2 className='text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 text-center'>
            About Me
          </h2>
          <div className='w-20 h-1 bg-portfolio-500 mx-auto mb-10'></div>

          <Card className='border-none shadow-lg dark:bg-gray-800'>
            <CardContent className='p-6 md:p-8'>
              <p className='text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-6'>
                Hi, I&apos;m Jeremy Sell, a Senior Frontend Engineer with over
                10 years of experience crafting high-performance web
                applications. My expertise lies in React, Next.js, and modern
                frontend architectures, with a strong focus on performance
                optimization, accessibility (WCAG), and A/B testing.
              </p>

              <p className='text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-6'>
                My journey into web development began with a fascination for
                backend technologies—specifically Ruby. I was drawn to the logic
                and structure behind building applications, but along the way, I
                discovered my true passion lay in the frontend. The ability to
                craft interactive, visually engaging experiences while solving
                complex problems captivated me. While I&apos;ve shifted my focus
                to the frontend, my curiosity for the backend remains strong,
                and I continue to work with APIs, databases, and backend
                languages/frameworks.
              </p>

              <p className='text-slate-700 dark:text-slate-300 text-lg leading-relaxed mb-6'>
                Beyond coding, I thrive in collaborative environments. I enjoy
                mentoring engineers (and being mentored), contributing to
                open-source projects, and exploring new advancements in the tech
                world. Whether it&apos;s optimizing an application for speed,
                refining a UI for better usability, or implementing data-driven
                experimentation, I&apos;m always looking for ways to improve and
                innovate.
              </p>

              <p className='text-slate-700 dark:text-slate-300 text-lg leading-relaxed'>
                Let's build something great together. 🚀
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
