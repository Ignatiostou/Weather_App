import { useTheme } from "@/components/ThemeProvider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { MoonIcon, SunIcon, MonitorIcon } from "lucide-react";



export const ThemeDropdown = () => {
  const { setTheme, theme } = useTheme();

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative overflow-hidden border-border/60 bg-card/40 shadow-sm hover:bg-card/70 hover:shadow-md transition-all duration-300 dark:hover:bg-secondary/30 group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="relative flex items-center justify-center">
            {theme === 'light' && (
              <SunIcon className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 text-amber-500 dark:scale-0 dark:opacity-0" />
            )}
            {theme === 'dark' && (
              <MoonIcon className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 text-blue-400 dark:scale-100" />
            )}
            {theme === 'system' && (
              <MonitorIcon className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 text-slate-600 dark:text-slate-300" />
            )}
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="border-border/60 bg-gradient-to-b from-card to-card/90 shadow-lg"
      >
        <DropdownMenuItem
          onClick={() => handleThemeChange('light')}
          className="cursor-pointer group/item"
        >
          <div className="flex items-center gap-3 w-full">
            <div className="p-1.5 rounded-sm bg-amber-100 dark:bg-amber-900/30">
              <SunIcon className="h-4 w-4 text-amber-500" />
            </div>
            <span className="flex-1">Light</span>
            {theme === 'light' && (
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            )}
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange('dark')}
          className="cursor-pointer group/item"
        >
          <div className="flex items-center gap-3 w-full">
            <div className="p-1.5 rounded-sm bg-blue-900/30">
              <MoonIcon className="h-4 w-4 text-blue-400" />
            </div>
            <span className="flex-1">Dark</span>
            {theme === 'dark' && (
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            )}
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleThemeChange('system')}
          className="cursor-pointer group/item"
        >
          <div className="flex items-center gap-3 w-full">
            <div className="p-1.5 rounded-sm bg-slate-200 dark:bg-slate-700">
              <MonitorIcon className="h-4 w-4 text-slate-600 dark:text-slate-300" />
            </div>
            <span className="flex-1">System</span>
            {theme === 'system' && (
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            )}
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};