
"use client"

import * as React from "react"
import { Palette } from "lucide-react"
import { useCustomTheme } from "@/hooks/use-custom-theme"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ThemeToggle() {
  const { cycleTheme } = useCustomTheme();

  return (
    <Tooltip>
        <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={cycleTheme}
            >
              <Palette className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">Toggle theme</span>
            </Button>
        </TooltipTrigger>
        <TooltipContent>
            <p>Change Theme</p>
        </TooltipContent>
    </Tooltip>
  )
}
