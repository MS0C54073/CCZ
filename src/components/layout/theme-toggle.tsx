"use client"

import * as React from "react"
import { Palette } from "lucide-react"
import { useCustomTheme } from "@/hooks/use-custom-theme"

import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { cycleTheme } = useCustomTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={cycleTheme}
    >
      <Palette className="h-[1.2rem] w-[1.2rem]" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
