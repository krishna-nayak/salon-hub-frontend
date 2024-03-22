import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoStorefront } from "react-icons/io5";
import { format } from "date-fns";
import { RiCalculatorFill } from "react-icons/ri";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const CITY = [
  "Bhubneswar",
  "Delhi",
  "Bangarulu",
  "Hydrabad",
  "Mumbai",
  "Kolkata",
];

export default function () {
  const [searchInput, setSearchInput] = useState("");
  const navigateTo = useNavigate();
  const [date, setDate] = useState(null);

  const handleInputChange = (v) => setSearchInput(v);

  const handleSearch = async (event) => {
    event.preventDefault();
    navigateTo(`/salon?city=${searchInput}`);
  };

  return (
    <div className="flex justify-between">
      <div className="">
        <div className="flex gap-2 mt-5 font-semibold cursor-pointer">
          <IoStorefront className="mt-1 ml-3" />
          <Select className="flex" onValueChange={handleInputChange}>
            <SelectTrigger className="w-[130px] border-0 self-center -mt-1 h-8 dark:bg-white">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              {CITY.map((city, index) => (
                <SelectItem key={index} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex">
        <div className="p-5">
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex gap-2 font-semibold cursor-pointer">
                <RiCalculatorFill className=" h-4 w-4 mt-1 " />
                {date ? format(date, "PPP") : <span>Date</span>}
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 text-slate-400">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <button
          className=" w-32  top-0 end-0 h-full  text-xl font-semibold text-white  rounded-e-3xl border  hover:bg-yellow-400 border-yellow-400 focus:outline-none  bg-yellow-300"
          type="submit"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
    </div>
  );
}
