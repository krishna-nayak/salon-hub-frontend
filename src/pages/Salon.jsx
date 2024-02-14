import React, { useState, useEffect } from "react";

import { CiLocationOn } from "react-icons/ci";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import endpoint from "../utility/axios";
export default function Salon() {
  const [salonDatas, setSalonData] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedCity = searchParams.get("city");
  const navigateTo = useNavigate();
  useEffect(() => {
    const fetchSalonData = async () => {
      try {
        const response = await endpoint.get(`/salon?city=${selectedCity}`);
        console.log("salon data", response);
        setSalonData(response.data.result);
      } catch (error) {
        console.error("Error fetching salon data:", error);
      }
    };

    fetchSalonData();
  }, [selectedCity]);

  if (!salonDatas) {
    return <div>Loading...</div>;
  }

  const handleBookNow = (salonid) => {
    console.log("Salon ID:", salonid);
    if (salonid) {
      navigateTo(`/salonDetails/${salonid}`);
    } else {
      console.error("Salon ID is undefined or null");
    }
  };
  return (
    <div className="flex flex-wrap">
      {salonDatas?.map((salonData, index) => (
        <div
          key={index}
          className=" p-3 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
        >
          <a href="#">
            <img
              className="rounded-xl w-full"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReQPLx6ak-2cEeNZabgK21Vpr40lA7BAGENQ&usqp=CAU"
              alt="ok"
            />
          </a>
          <div className="mt-4">
            <div className="flex justify-between">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {salonData.name}
                </h5>
              </a>
              <span className="bg-blue-100 text-blue-800 h-6 text-xs font-semibold px-2 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                5.0
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {salonData.address}, {salonData.city}, India
            </p>
            <CiLocationOn className="fill-gray-100" />
          </div>

          <p className="text-white">Services:</p>
          <div className="mt-2 flex flex-wrap">
            {salonData?.Services && salonData?.Services.length > 0 ? (
              salonData?.Services?.map((service, index) => (
                <a href="#" key={index} className="tags">
                  {service.service_type.replace(/\b\w/g, (c) =>
                    c.toUpperCase()
                  )}
                </a>
              ))
            ) : (
              <p>No services available</p>
            )}
          </div>
          <div className="mt-4 flex justify-between">
            <button
              onClick={() => handleBookNow(salonData.salonId)}
              className="btn w-28"
            >
              Book Now
            </button>
            <p className="text-blue-500 mt-2">Queue: 2</p>
          </div>
        </div>
      ))}
    </div>
  );
}
