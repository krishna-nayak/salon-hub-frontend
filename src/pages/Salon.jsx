import React from "react";
import { CiLocationOn } from "react-icons/ci";
import Tags from "../components/ui/Tags";
import Buttons from "../components/ui/Buttons";
export default function Salon() {
  return (
    <div className="p-3 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="rounded-xl w-full"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnr12Y0j5RPLDoiE1K_IeUTpnXIkgynzwDCw&usqp=CAU"
          alt=""
        />
      </a>
      <div className="mt-4">
        <div className="flex justify-between">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Green Trends
            </h5>
          </a>
          <span className="bg-blue-100 text-blue-800 h-6 text-xs font-semibold px-2 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
            5.0
          </span>
        </div>
      </div>
      <div className="flex">
        <p className=" font-normal text-gray-700 dark:text-gray-400">
          Bhubaneswar,Odisha ,India
        </p>
        <CiLocationOn className="fill-gray-100" />
      </div>

      <p className="text-white">Services:</p>
      <div className="mt-2 flex flex-wrap">
        <Tags href="#">Hair Cut</Tags>
        <Tags href="#">Hair Color</Tags>
        <Tags href="#">Beard Shaving</Tags>
        <Tags href="#">Pedicure</Tags>
      </div>
      <div className="mt-4 flex justify-between">
        <Buttons>Book Now</Buttons>
        <p className="text-blue-500 mt-2">Queue: 4</p>
      </div>
    </div>
  );
}
