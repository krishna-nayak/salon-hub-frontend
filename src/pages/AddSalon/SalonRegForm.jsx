import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ValidationSalReg } from "../../utility/validation/ValSalonReg";
import SalonRegister from "./SalonRegistration";
import SalonServices from "./SalonServices";
import endpoint from "../../utility/axios";

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
  const [errors, setErrors] = useState({});

  const FTitles = [" Register Salon", " Service Provided"];

  const PageDisplay = () => {
    if (page === 0) {
      return (
        <SalonRegister
          salonData={salonData}
          setSalonData={setSalonData}
          setFile={setFile}
          setErrors={setErrors}
          errors={errors}
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
    const error = ValidationSalReg(salonData);
    setErrors((prev) => ({ ...prev, ...ValidationSalReg(salonData) }));
    if (
      error.name == "" &&
      error.email == "" &&
      error.description == "" &&
      error.city == "" &&
      error.openinghourstart == "" &&
      error.closeingHour == ""
    ) {
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
      handlePrevious();

      const salon_response = await endpoint.post(`/salon`, formData);

        const service_id = salon_response.data?.salonId;
      const service_response = await endpoint.post(
        `/salon/${service_id}/services`,
          { services: styles }
        );

      console.log("complete", service_response);
        navigator("/");
      } catch (error) {
        console.error(error.response.data.message || "Error");
        setPage((currPage) => currPage - 1);
      }
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

  const handlePrevious = () => setPage((currPage) => currPage - 1);
  return (
    <div>
      <div className="mt-16 flex items-center justify-center ">
        <form
          className="space-y-4 md:space-y-6"
          onSubmit={handleFormSubmit}
          encType="multipart/form-data"
        >
          {PageDisplay()}
          <div className="flex w-full items-center justify-center gap-2">
            <button
              className="btn"
              disabled={page == 0}
              onClick={handlePrevious}
            >
              Previous
            </button>

            <button
              className="btn"
              type={page == 0 ? "" : "submit"}
              onClick={handleFilter}
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
