
"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useCustomTheme } from "@/hooks/use-custom-theme"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ThemeToggle() {
  const { theme, toggleTheme } = useCustomTheme();

  return (
    <Tooltip>
        <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
        </TooltipTrigger>
        <TooltipContent>
            <p>Toggle Theme</p>
        </TooltipContent>
    </Tooltip>
  )
}
