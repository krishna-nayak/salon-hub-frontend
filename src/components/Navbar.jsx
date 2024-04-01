import React, { useState } from "react";
import svetor from "../assets/svetor.png";
import stitle from "../assets/stitle.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ThemeProvider, useTheme } from "@/hooks/context/theme-provider";
import { Sling as Hamburger } from "hamburger-react";

import { Sun, Moon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const userId = localStorage.getItem("userId");

  const toggleDropdown = () => setShowDropdown(!showDropdown);
  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="h-16 bg-yellow-400 max-sm:hidden ">
        <div className="flex justify-between">
          <div className="flex">
            <img src={svetor} alt="" className="w-16 " />
            <img src={stitle} alt="" className="h-10 w-28 mt-4" />
          </div>
          <div className=" flex gap-8  max-md:gap-4 mt-4  font-bold text-white dark:text-black">
            <Link to={"/"}>Home</Link>
            <Link to={"/"}>About</Link>
            <Link to={"/SalonRegistration"}>Register Salon</Link>
          </div>
          <div className="p-2 flex gap-2">
            <ToggleTheme />
            {userId == null ? (
              <>
                <Button
                  variant="outline"
                  className="text-black dark:text-white bg-transparent border-2 hover:bg-transparent"
                >
                  <Link to={"/login"}>Log In</Link>
                </Button>
                <Button className="bg-yellow-400 text-black hover:bg-white dark:bg-slate-800 dark:text-white">
                  <Link to={"/userRegistration"}>Sign Up</Link>
                </Button>
              </>
            ) : (
              <Button className="bg-yellow-400 hover:bg-white text-black dark:bg-black dark:text-white border-2 border-black">
                <Link to={"/profile/my-appointment"}>Profile</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="h-16 bg-yellow-400 hidden max-sm:block">
          <div className="flex justify-between">
            <div className="flex">
              <img src={svetor} alt="" className="w-14 " />
              <img src={stitle} alt="" className="h-8 w-22 mt-4" />
            </div>
            <div className="flex p-2">
              <ToggleTheme className="rounded-full" />
              <span
                onClick={toggleDropdown}
                className="-mt-2 text-white dark:text-black"
              >
                <Hamburger size={"25"} />
              </span>
            </div>
          </div>
        </div>
      </div>
      {showDropdown && (
        <div className="z-50 absolute bg-white dark:bg-black right-4 -mt-4 p-2 rounded-lg shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] ">
          <div className=" text-black dark:text-white  font-normal  ">
            <ul>
              <li>
                <Link to={"/"}>Home</Link>
              </li>
              <hr className=" h-px w-60 my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              <li>
                <Link to={"/"}>About</Link>
              </li>
              <hr className="w-60 h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              <li>
                <Link to={"/"}> Take an appointment</Link>
              </li>
              <hr className="w-60 h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
              <li>
                <Link to={"/SalonRegistration"}> Register your salon</Link>
              </li>
              <hr className="w-60 h-px my-2 bg-gray-200 border-0 dark:bg-gray-700"></hr>
            </ul>
          </div>

          <div className="p-2 flex justify-center gap-2">
            {userId == null ? (
              <>
                <Button
                  variant="outline"
                  className="text-black dark:text-white bg-transparent border-2 hover:bg-transparent"
                >
                  <Link to={"/login"}>Log In</Link>
                </Button>
                <Button className="bg-yellow-400 text-black dark:bg-slate-800 dark:text-white">
                  <Link to={"/userRegistration"}>Sign Up</Link>
                </Button>
              </>
            ) : (
              <Button className="bg-yellow-400 text-black dark:bg-slate-800 dark:text-white">
                <Link to={"/profile/my-appointment"}>Profile</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </ThemeProvider>
  );
}

function ToggleTheme() {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="max-sm:w-8 max-sm:h-8">
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
