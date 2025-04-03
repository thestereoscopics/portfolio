import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Calendar } from "lucide-react";

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string[];
}

const experiences: Experience[] = [
  {
    title: "Director of Engineering",
    company: "Roboboogie Inc.",
    period: "2020 - 2024",
    description: [
      "Owned end-to-end development for projects, from technical design to implementation and launch",
      "Led frontend development for Fortune 500 clients, optimizing UI/UX and implementing scalable architecture",
      "Mentored junior developers and conducted technical interviews for frontend positions",
    ],
  },
  {
    title: "Senior Frontend Engineer",
    company: "Roboboogie Inc.",
    period: "2015 - 2020",
    description: [
      "Developed responsive web applications using React, PHP, and JavaScript, ensuring pixel-perfect design and high performance",
      "Collaborated with designers and backend engineers to deliver pixel perfect user interfaces",
      "Developed and implemented A/B and Multivariate tests to optimize user experiences, leading to large revenue increases",
      "Developed a CLI tool for faster production with Optimizely X, available on NPM and GitHub. Led to a savings of 15-20% in time spent on test production using Optimizely",
    ],
  },
  {
    title: "Frontend Engineer",
    company: "Thismoment Inc.",
    period: "2013 - 2015",
    description: [
      "Promoted to co-lead the front-end development team for delivering well-built, reliable sites for Fortune 500 clients using JavaScript, PHP, CSS, and HTML",
      "Developed reusable, configurable, and responsive components for use in our CMS (Twitter feed & Video Gallery). Utilizing both outside APIs and creating internal request/response APIs to handle user configuration",
      "Implemented responsive designs and ensured cross-browser compatibility",
    ],
  },
];

const ExperienceSection = () => {
  return (
    <section
      id='experience'
      className='py-20 md:py-32 bg-gray-50 dark:bg-gray-950'
    >
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 text-center'>
          Work Experience
        </h2>
        <div className='w-20 h-1 bg-portfolio-500 mx-auto mb-12'></div>

        <div className='max-w-4xl mx-auto space-y-8'>
          {experiences.map((exp, index) => (
            <Card
              key={index}
              className='experience-card border-none shadow-md overflow-hidden relative p-[2px] hover:shadow-lg transition-shadow dark:bg-gray-800'
            >
              <CardContent className='p-6 md:p-8 rounded-md relative bg-inherit z-10'>
                <div className='flex flex-col md:flex-row md:items-center mb-4 gap-4'>
                  <div className='bg-portfolio-100 dark:bg-portfolio-900/50 p-3 rounded-full'>
                    <Briefcase className='text-portfolio-600 dark:text-portfolio-400 h-6 w-6' />
                  </div>
                  <div className='flex-1'>
                    <h3 className='text-xl font-semibold text-slate-900 dark:text-white'>
                      {exp.title}
                    </h3>
                    <p className='text-portfolio-600 dark:text-portfolio-400 font-medium'>
                      {exp.company}
                    </p>
                  </div>
                  <div className='flex items-center text-slate-500 dark:text-slate-400'>
                    <Calendar className='h-4 w-4 mr-2' />
                    <span className='text-sm'>{exp.period}</span>
                  </div>
                </div>

                <ul className='space-y-2 ml-4'>
                  {exp.description.map((item, i) => (
                    <li
                      key={i}
                      className="text-slate-700 dark:text-slate-300 relative pl-6 before:content-['•'] before:absolute before:left-0 before:text-portfolio-500 dark:before:text-portfolio-400 before:font-bold"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
