import React from "react";
import { CiLocationOn } from "react-icons/ci";
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
      <div className="flex flex-wrap">
        <a
          href="#"
          class="bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 inline-flex items-center justify-center"
        >
          Hair Cut
        </a>
        <a
          href="#"
          class="bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 inline-flex items-center justify-center"
        >
          Hair Color
        </a>
        <a
          href="#"
          class="bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 inline-flex items-center justify-center"
        >
          Beard Shaving
        </a>
        <a
          href="#"
          class="bg-blue-100 hover:bg-blue-200 text-blue-800 text-xs font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400 inline-flex items-center justify-center"
        >
          Pedicure
        </a>
      </div>
      <div className="flex justify-between">
        <a
          href="#"
          className="mt-4 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Book Now
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </a>
        <p className="text-blue-500 mt-6">Queue: 4</p>
      </div>
    </div>
  );
}
