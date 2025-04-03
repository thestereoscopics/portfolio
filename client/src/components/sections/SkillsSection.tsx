
import React, { useState, useEffect, useRef } from "react";
import { Progress } from "@/components/ui/progress";

interface SkillCategory {
  title: string;
  skills: {
    name: string;
    level: number;
  }[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    skills: [
      { name: "JavaScript", level: 95 },
      { name: "TypeScript", level: 85 },
      { name: "React", level: 90 },
      { name: "CSS/SCSS/Less", level: 90 },
      { name: "HTML", level: 95 },
    ],
  },
  {
    title: "Full-Stack & Backend",
    skills: [
      { name: "Next.js", level: 85 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Node.js", level: 75 },
      { name: "PHP", level: 65 },
      { name: "MySQL/PostgreSQL", level: 70 },
    ],
  },
  {
    title: "Development & Optimization",
    skills: [
      { name: "Git & GitHub", level: 95 },
      { name: "UI/UX Design Principles", level: 80 },
      { name: "Performance Optimization", level: 100 },
      { name: "Responsive Design", level: 95 },
      { name: "Accessibility (WCAG)", level: 85 },
    ],
  },
];

const SkillsSection = () => {
  const [visible, setVisible] = useState(false);
  const [skillValues, setSkillValues] = useState<Record<string, number>>({});
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Initialize all skill values to 0
    const initialValues: Record<string, number> = {};
    skillCategories.forEach(category => {
      category.skills.forEach(skill => {
        initialValues[skill.name] = 0;
      });
    });
    setSkillValues(initialValues);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (visible) {
      // Animate each skill from 0 to its target value
      const timers: NodeJS.Timeout[] = [];
      
      skillCategories.forEach(category => {
        category.skills.forEach(skill => {
          // Create a different timeout for each skill for a staggered effect
          const timer = setTimeout(() => {
            // Animate from 0 to the target value over time
            let startValue = 0;
            const interval = setInterval(() => {
              if (startValue < skill.level) {
                startValue += 1;
                setSkillValues(prev => ({ ...prev, [skill.name]: startValue }));
              } else {
                clearInterval(interval);
              }
            }, 15); // Speed of the animation
            
            return () => clearInterval(interval);
          }, Math.random() * 300); // Staggered start within 300ms
          
          timers.push(timer);
        });
      });
      
      return () => {
        timers.forEach(timer => clearTimeout(timer));
      };
    }
  }, [visible]);

  return (
    <section 
      id='skills' 
      className='py-20 md:py-32 bg-gray-50 dark:bg-gray-900'
      ref={sectionRef}
    >
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 text-center'>
          Skills & Expertise
        </h2>
        <div className='w-20 h-1 bg-portfolio-500 mx-auto mb-12'></div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          {skillCategories.map((category, catIndex) => (
            <div
              key={catIndex}
              className='bg-white dark:bg-gray-800 shadow-md rounded-lg p-6'
            >
              <h3 className='text-xl font-semibold text-slate-900 dark:text-white mb-6 text-center'>
                {category.title}
              </h3>

              <div className='space-y-6'>
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className='flex justify-between items-center mb-2'>
                      <span className='text-slate-700 dark:text-slate-300 font-medium'>
                        {skill.name}
                      </span>
                      <span className='text-slate-500 dark:text-slate-400 text-sm'>
                        {Math.round(skillValues[skill.name] || 0)}%
                      </span>
                    </div>
                    <Progress
                      value={skillValues[skill.name] || 0}
                      className='h-2 bg-portfolio-100 dark:bg-gray-700'
                    >
                      <div
                        className='h-full bg-portfolio-600 dark:bg-portfolio-500 rounded-full transition-all duration-500'
                        style={{ width: `${skillValues[skill.name] || 0}%` }}
                      />
                    </Progress>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
