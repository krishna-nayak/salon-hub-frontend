import React from "react";
import svetor from "../assets/svetor.png";
import stitle from "../assets/stitle.png";
import { Button } from "@/components/ui/button";
import { ThemeProvider, useTheme } from "@/hooks/context/theme-provider";
export default function Navbar() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="h-20 bg-yellow-400">
        <div className="flex justify-between">
          <div className="flex">
            <img src={svetor} alt="" className="w-20" />
            <img src={stitle} alt="" className="h-10 w-28 mt-4" />
          </div>

          <div className="p-4 flex gap-2">
            <ToggleTheme className="" />
            <Button
              className="bg-white text-black dark:bg-black dark:text-white "
              asChild
            >
              <Link to={"/profile/user"}>ACCOUNT</Link>
            </Button>
          </div>
        </div>
      </div>{" "}
    </ThemeProvider>
  );
}
import { Sun, Moon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

function ToggleTheme() {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
