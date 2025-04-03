import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, ExternalLink, Github } from "lucide-react";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image: string;
}

const projects: Project[] = [
  {
    title: "Optimizely X CLI",
    description:
      "x-optimizely-cli is a command-line tool that empowers developers to build Optimizely X experiments, link pages to experiments, create variations, and seamlessly push everything directly to the Optimizely X platform using the Optimizely v2 REST API, all from the terminal.",
    technologies: ["Node.js", "Git", "Optimizely X", "Express.js"],
    githubUrl: "https://github.com/teamroboboogie/x-optimizely-cli",
    liveUrl: "https://www.npmjs.com/package/@teamroboboogie/x-optimizely-cli",
    image:
      "https://res.cloudinary.com/def6chmvf/image/upload/f_auto,q_auto/v1743187763/Screenshot_2025-03-24_at_5.01.10_PM_r6qjw2.png",
  },
  {
    title: "Wacom Site Navigation",
    description:
      "A custom site navigation system for the Wacom website. Allows users to navigate a complex website with ease and efficiency. Started as an optimization effort and built into the Magento platform.",
    technologies: ["Magento", "JavaScript", "CSS", "HTML"],
    githubUrl: "https://github.com/thestereoscopics/Supernav",
    liveUrl: "https://estore.wacom.com/en-us/",
    image:
      "https://res.cloudinary.com/def6chmvf/image/upload/f_auto,q_auto/v1743189710/Screenshot_2025-03-28_at_12.11.22_PM_baxach.png",
  },
  {
    title: "Band Together",
    description:
      "A web application that allows users to save their favorite bands by querying the Spotify API and Discogs API to compile band information. Users can finally answer the question: 'What band should I listen to today?'.",
    technologies: ["React", "TypeScript", "Supabase", "Tailwind CSS"],
    githubUrl: "https://github.com/thestereoscopics/Band-Together",
    liveUrl: "https://en.wikipedia.org/wiki/Coming_Soon",
    image:
      "https://res.cloudinary.com/def6chmvf/image/upload/f_auto,q_auto/v1743187786/Screenshot_2025-03-26_at_11.11.06_AM_uxr7r8.png",
  },
  {
    title: "Cabin Reservation App",
    description:
      "A web application that allows users to book , view , and manage cabin reservations. Includes login flow, payment processing, and an admin dashboard for managing cabins, reservations, and users.",
    technologies: ["React", "Redux", "Node.js", "Socket.io"],
    githubUrl:
      "https://github.com/thestereoscopics/21-the-wild-oasis-customer-facing",
    liveUrl: "https://cabinoasis.vercel.app/",
    image:
      "https://res.cloudinary.com/def6chmvf/image/upload/f_auto,q_auto/v1743187782/Screenshot_2025-03-26_at_11.16.44_AM_wj992h.png",
  },
  {
    title: "RoboBoogie Website",
    description:
      "Roboboogie's Custom Website serves as a comprehensive platform showcasing their expertise in Conversion Rate Optimization (CRO). Built from the ground up with forms, accessibility, and SEO best practices. Reusable components and page templates to make it easy to update and maintain.",
    technologies: ["PHP", "JavaScript", "CSS/Less", "WordPress"],
    githubUrl: "https://github.com/thestereoscopics/",
    liveUrl: "https://teamroboboogie.com/",
    image:
      "https://res.cloudinary.com/def6chmvf/image/upload/f_auto,q_auto/v1743191349/Screenshot_2025-03-28_at_12.48.54_PM_t48xah.png",
  },
  {
    title: "Wacom 3D Scroll",
    description:
      "Bringing a luxury feel to the Wacom website by adding the ability to move a tablet in 3D. Allows the user to see the tablet from different angles. Uses 290 images injected into a canvas element.",
    technologies: ["JavaScript", "HTML", "CSS/Canvas", "Magento"],
    githubUrl: "https://github.com/thestereoscopics/3d-scroll",
    liveUrl:
      "https://estore.wacom.com/en-us/wacom-cintiq-pro-24-dtk2420k0.html",
    image:
      "https://res.cloudinary.com/def6chmvf/image/upload/f_auto,q_auto/v1743193049/Screenshot_2025-03-28_at_1.17.21_PM_fkaiih.png",
  },
];

const ProjectsSection = () => {
  return (
    <section id='projects' className='py-20 md:py-32 bg-white dark:bg-gray-900'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 text-center'>
          Projects
        </h2>
        <div className='w-20 h-1 bg-portfolio-500 mx-auto mb-12'></div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {projects.map((project, index) => (
            <Card
              key={index}
              className='relative border-none shadow-lg overflow-hidden hover:shadow-xl transition-shadow dark:bg-gray-800'
            >
              <div className='h-72 overflow-hidden'>
                <img
                  src={project.image}
                  alt={project.title}
                  className='w-full h-full object-cover transition-transform hover:scale-105'
                />
              </div>

              <CardContent className='p-6'>
                <h3 className='text-xl font-semibold text-slate-900 dark:text-white mb-2'>
                  {project.title}
                </h3>
                <p className='text-slate-600 dark:text-slate-300 mb-4'>
                  {project.description}
                </p>

                <div className='flex flex-wrap gap-2 mb-4'>
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className='text-xs font-medium bg-portfolio-100 dark:bg-portfolio-900/50 text-portfolio-700 dark:text-portfolio-300 px-3 py-1 rounded-full'
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>

              <CardFooter className='p-6 pt-0 flex gap-3'>
                {project.githubUrl && (
                  <Button variant='outline' size='sm' asChild>
                    <a
                      href={project.githubUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <Github className='h-4 w-4 mr-2' />
                      Code
                    </a>
                  </Button>
                )}

                {project.liveUrl && (
                  <Button
                    size='sm'
                    className='bg-portfolio-600 hover:bg-portfolio-700'
                    asChild
                  >
                    <a
                      href={project.liveUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <ExternalLink className='h-4 w-4 mr-2' />
                      Live Demo
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
