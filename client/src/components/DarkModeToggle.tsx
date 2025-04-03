import React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { set } from "date-fns";

const DarkModeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only render the toggle after mounting to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    if (theme === "system") {
      setTheme(
        window.matchMedia("(prefers-color-scheme: dark)").matches === true
          ? "dark"
          : "light"
      );
    }
  }, [setTheme, theme]);

  if (!mounted) return null;

  return (
    <Button
      variant='ghost'
      size='icon'
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className='w-9 h-9 rounded-full'
      aria-label='Toggle dark mode'
    >
      {theme === "dark" ? (
        <Sun className='h-5 w-5 text-yellow-300' />
      ) : (
        <Moon className='h-5 w-5' />
      )}
    </Button>
  );
};

export default DarkModeToggle;
