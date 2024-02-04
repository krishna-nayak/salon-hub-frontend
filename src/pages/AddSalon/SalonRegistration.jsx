import React, { useState } from "react";
//import axios from "axios";
//import { useNavigate } from "react-router-dom";

function SalonRegister({ salonData, setSalonData }) {
  /* const handleFormSubmit = async (event) => {
    event.preventDefault();

if (!sname || !location || !description) {
      alert("Fillup the empty fields");
    } else {
      alert("Success");
    }
    try {
      const response = await axios.post(
        `https://swya6iuf0f.execute-api.ap-south-1.amazonaws.com/salon`,
        salonData
      );
      console.log("Salon Registered:", response.data);
    } catch (error) {
      console.error("Error registering salon:", error);
    }
  };*/

  return (
    <div>
      <div>
        <div className="w-full bg-white rounded-lg shadow mt-0  xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Register Salon
            </h1>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 0 y-600 r-gray-400  -blue-500 er-blue-500"
                placeholder="name@salon"
                value={salonData.name}
                onChange={(event) =>
                  setSalonData({ ...salonData, name: event.target.value })
                }
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 0 y-600 r-gray-400  -blue-500 er-blue-500"
                placeholder="Salon address"
                required
                value={salonData.address}
                onChange={(event) =>
                  setSalonData({ ...salonData, address: event.target.value })
                }
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                City
              </label>
              <input
                type="text"
                name="city"
                id="city"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 0 y-600 r-gray-400  -blue-500 er-blue-500"
                placeholder="Salon city"
                required
                value={salonData.city}
                onChange={(event) =>
                  setSalonData({ ...salonData, city: event.target.value })
                }
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Opening Hour
              </label>
              <input
                type="text"
                name="openingHr"
                id="openingHr"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 0 y-600 r-gray-400  -blue-500 er-blue-500"
                placeholder="Salon starts at "
                required
                value={salonData.openinghourstart}
                onChange={(event) =>
                  setSalonData({
                    ...salonData,
                    openinghourstart: event.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Closing Hour
              </label>
              <input
                type="text"
                name="closeingHr"
                id="closeingHr"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 0 y-600 r-gray-400  -blue-500 er-blue-500"
                placeholder="Salon ends at"
                required
                value={salonData.closeingHour}
                onChange={(event) =>
                  setSalonData({
                    ...salonData,
                    closeingHour: event.target.value,
                  })
                }
              />
            </div>
            <div className="mb-3 w-96">
              <label
                htmlFor="formFileMultiple"
                className="mb-2 text-sm font-medium inline-block text-gray-900 "
              >
                Upload images of salon
              </label>
              <input
                className=" border-gray-300 relative block w-auto flex-auto rounded border border-solid  bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700  file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 max-sm:w-60"
                type="file"
                id="formFileMultiple"
                multiple
              />
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 0 y-600 -primary-600 t-gray-800"
                  required=""
                />
              </div>

              <div className="ml-3 text-sm">
                <label className="font-light text-gray-500 300">
                  I accept the{" "}
                  <a
                    className="font-medium text-primary-600 hover:underline ry-500"
                    href="#"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default SalonRegister;

/*DESCRIPTION
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Description
              </label>
              <input
                type="text"
                name="description"
                id="description"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 0 y-600 r-gray-400  -blue-500 er-blue-500"
                placeholder="About your salon"
                required
                value={salonData.description}
                onChange={(event) =>
                  setSalonData({
                    ...salonData,
                    description: event.target.value,
                  })
                }
              />
            </div>
            */
