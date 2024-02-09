import React, { useState } from "react";
//import axios from "axios";
//import { useNavigate } from "react-router-dom";
import InputBox from "../../components/ui/InputBox";
function SalonRegister({ salonData, setSalonData, setFile, errors }) {
  const handleChange = (e) => {
    setSalonData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFile = (e) => {
    console.log(e.target.files);
    setFile(e.target.files[0]);
  };

  return (
    <div className="  ">
      <div className="max-sm:w-80">
        <div className="w-full bg-slate-100 rounded-lg shadow mt-0  xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Register Salon
            </h1>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Name
              </label>
              <InputBox
                type="text"
                name="name"
                id="name"
                placeholder="name@salon"
                value={salonData.name}
                onChange={handleChange}
              />
              {errors.name && (
                <span className="text-red-600">{errors.name}</span>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Email
              </label>
              <InputBox
                type="email"
                name="email"
                id="email"
                placeholder="name@salon"
                value={salonData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="text-red-600">{errors.email}</span>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Address
              </label>
              <InputBox
                type="text"
                name="address"
                id="address"
                placeholder="Salon address"
                value={salonData.address}
                onChange={handleChange}
              />
              {errors.address && (
                <span className="text-red-600">{errors.address}</span>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                City
              </label>
              <InputBox
                type="text"
                name="city"
                id="city"
                placeholder="Salon city"
                value={salonData.city}
                onChange={handleChange}
              />
              {errors.city && (
                <span className="text-red-600">{errors.city}</span>
              )}
            </div>
            <div>
              <label
                htmlFor="openinghourstart"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Opening Hour
              </label>
              <InputBox
                type="text"
                name="openinghourstart"
                id="openinghourstart"
                placeholder="Salon starts at "
                value={salonData.openinghourstart}
                onChange={handleChange}
              />
              {errors.openinghourstart && (
                <span className="text-red-600">{errors.openinghourstart}</span>
              )}
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Closing Hour
              </label>
              <InputBox
                type="text"
                name="closeingHour"
                id="closeingHour"
                placeholder="Salon ends at"
                value={salonData.closeingHour}
                onChange={handleChange}
              />
              {errors.closeingHour && (
                <span className="text-red-600">{errors.closeingHour}</span>
              )}
            </div>
            <div className="mb-3 w-96">
              <label
                htmlFor="formFileMultiple"
                className="mb-2 text-sm font-medium inline-block text-gray-900 "
              >
                Upload images of salon
              </label>
              <input
                className=" border-neutral-600 relative block w-auto flex-auto rounded border border-solid  bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-500  file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-700 file:px-3 file:py-[0.32rem] file:text-neutral-100 file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem]  max-sm:w-60"
                type="file"
                id="formFileMultiple"
                name="image"
                onChange={handleFile}
              />
              {salonData?.image != null ? <>{salonData?.image}</> : <></>}
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <InputBox id="terms" aria-describedby="terms" type="checkbox" />
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
