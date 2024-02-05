import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import SalonRegister from "./SalonRegistration";
import SalonServices from "./SalonServices";

import axios from "axios";

function SalonRegForm() {
  const navigator = useNavigate();
  const [page, setPage] = useState(0);
  const [file, setFile] = useState("");
  const [salonData, setSalonData] = useState({
    name: "",
    description: "",
    address: "",
    city: "",
    openinghourstart: "",
    closeingHour: "",
    email: "",
  });

  const [styles, setStyles] = useState([]);

  const FTitles = [" Register Salon", " Service Provided"];
  const PageDisplay = () => {
    if (page === 0) {
      return (
        <SalonRegister
          salonData={salonData}
          setSalonData={setSalonData}
          setFile={setFile}
        />
      );
    } else if (page === 1) {
      return <SalonServices setStyles={setStyles} />;
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("submit", salonData);
    if (page !== 2) return;

    try {
      const formData = new FormData();

      formData.append("name", salonData.name);
      formData.append("description", salonData.description);
      formData.append("address", salonData.address);
      formData.append("city", salonData.city);
      formData.append("openingHourStart", salonData.openinghourstart);
      formData.append("closeingHour", salonData.closeingHour);
      formData.append("files", file);
      formData.append("email", salonData.email);

      console.log("loading");
      const salon_response = await axios.post(
        `http://localhost:3000/salon`,
        formData
      );

      console.log("complete", salon_response.data.salonId);

      console.log(styles);
      setPage((currPage) => currPage - 1);

      const service_id = salon_response.data?.salonId;

      const service_response = await axios.post(
        `http://localhost:3000/salon/${service_id}/services`,
        { services: styles }
      );

      console.log("Salon Registered:", service_response.data);

      navigator("/");
    } catch (error) {
      console.error(error.response.data.message || "Error");
      setPage((currPage) => currPage - 1);
    }
  };

  const handleFilter = () => {
    if (page === FTitles.length - 1) {
      setPage((currPage) => currPage + 1);
      alert("Submited");
    } else {
      setPage((currPage) => currPage + 1);
    }
  };
  return (
    <div>
      <div className="mt-16 flex items-center justify-center ">
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={handleFormSubmit}
          encType="multipart/form-data"
        >
          {PageDisplay()}
          <div className="flex w-full gap-2">
            <button
              disabled={page == 0}
              onClick={() => setPage((currPage) => currPage - 1)}
              className="w-full  text-white bg-neutral-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center-600 primary-700 -primary-800"
            >
              Previous
            </button>
            <button
              type={page == 0 ? "" : "submit"}
              onClick={handleFilter}
              className="w-full text-white bg-neutral-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center -600 rimary-700 -primary-800"
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
