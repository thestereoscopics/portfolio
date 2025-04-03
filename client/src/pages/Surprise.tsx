import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Code, Sparkles } from "lucide-react";

const facts = [
  "I built site to alert when TSA appointments are available",
  "I built my first website at the age of 14",
  "I've contributed to over 15 open-source projects",
  "I speak three programming languages and two human languages",
  "I once debugged a production issue while on a hiking trip",
  "My record for longest coding session is 16 hours straight",
  "I mentor junior developers in my free time",
  "My favorite keyboard shortcut is Ctrl+Shift+T (reopen closed tab)",
  "I've given talks at 5 different tech conferences",
  "My coding playlist consists mainly of lo-fi and ambient music",
];

const Surprise = () => {
  const [randomFact, setRandomFact] = React.useState("");

  useEffect(() => {
    getRandomFact();
  }, []);

  const getRandomFact = () => {
    const randomIndex = Math.floor(Math.random() * facts.length);
    setRandomFact(facts[randomIndex]);
  };

  return (
    <div className='min-h-screen flex flex-col dark:bg-gray-950'>
      <Navbar />

      <main className='flex-grow flex items-center justify-center pt-24 pb-12 px-4 bg-gradient-to-br from-portfolio-50 to-indigo-50 dark:from-gray-900 dark:to-gray-950'>
        <div className='max-w-3xl mx-auto text-center'>
          <div className='mb-8 flex justify-center'>
            <div className='bg-portfolio-100 dark:bg-gray-800 p-4 rounded-full'>
              <Sparkles className='h-12 w-12 text-portfolio-600 dark:text-portfolio-400' />
            </div>
          </div>

          <h1 className='text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6'>
            You found the surprise!
          </h1>

          <div className='bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-900/40 rounded-xl p-8 mb-8'>
            <h2 className='text-xl font-medium text-portfolio-600 dark:text-portfolio-400 mb-4 flex items-center justify-center'>
              <Code className='mr-2 h-5 w-5' />
              Random Fact About Me
            </h2>

            <p className='text-slate-700 dark:text-slate-300 text-lg mb-6'>
              {randomFact}
            </p>

            <Button
              onClick={getRandomFact}
              className='bg-portfolio-600 hover:bg-portfolio-700 dark:bg-portfolio-600 dark:hover:bg-portfolio-700 dark:text-white'
            >
              Get Another Fact
            </Button>
          </div>

          <Button
            variant='outline'
            asChild
            className='dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800'
          >
            <Link to='/'>
              <ArrowLeft className='mr-2 h-4 w-4' />
              Back to Home
            </Link>
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Surprise;
