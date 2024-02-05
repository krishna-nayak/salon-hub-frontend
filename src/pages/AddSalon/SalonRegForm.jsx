import React, { useState } from "react";
import SalonRegister from "./SalonRegistration";
import SalonServices from "./SalonServices";

import axios from "axios";

function SalonRegForm() {
  const [page, setPage] = useState(0);
  const [salonData, setSalonData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    openinghourstart: "",
    closeingHour: "",
  });

  const FTitles = [" Register Salon", " Service Provided"];
  const PageDisplay = () => {
    if (page === 0) {
      return (
        <SalonRegister salonData={salonData} setSalonData={setSalonData} />
      );
    } else if (page === 1) {
      return <SalonServices />;
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    // console.log(salonData);
    try {
      const response = await axios.post(
        `https://swya6iuf0f.execute-api.ap-south-1.amazonaws.com/salon`,
        salonData
      );
      console.log("Salon Registered:", response.data);
    } catch (error) {
      console.error("Error registering salon:", error);
    }
  };
  return (
    <div>
      <div className="mt-16 flex items-center justify-center ">
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={handleFormSubmit}
          action="#"
        >
          {" "}
          {PageDisplay()}
          <div className="flex w-full gap-2">
            <button
              type="submit"
              disabled={page == 0}
              onClick={() => {
                setPage((currPage) => currPage - 1);
              }}
              //onClick={() => navigate("/salonServices")}
              className="w-full  text-white bg-neutral-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center-600 primary-700 -primary-800"
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (page === FTitles.length - 1) {
                  alert("Submited");
                } else {
                  setPage((currPage) => currPage + 1);
                }
              }}
              //onClick={() => navigate("/salonServices")}
              className="w-full  text-white bg-neutral-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center -600 rimary-700 -primary-800"
            >
              {page === FTitles.length - 1 ? "Create" : "Next"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default SalonRegForm;
