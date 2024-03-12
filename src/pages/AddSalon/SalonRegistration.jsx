import React, { useState } from "react";

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
    <div className="">
      <div className="max-sm:w-80">
        <div className="w-full bg-slate-100 rounded-lg shadow mt-0  xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1>Register Salon</h1>
            <div>
              <label className="label ">Name</label>
              <input
                className="inputBox"
                type="text"
                name="name"
                id="name"
                placeholder="name@salon"
                value={salonData.name}
                onChange={handleChange}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div>
              <label className="label ">Email</label>
              <input
                className="inputBox"
                type="email"
                name="email"
                id="email"
                placeholder="email@salon"
                value={salonData.email}
                onChange={handleChange}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </div>
            <div>
              <label className="label ">Address</label>
              <input
                className="inputBox"
                type="text"
                name="address"
                id="address"
                placeholder="Salon address"
                value={salonData.address}
                onChange={handleChange}
              />
              {errors.address && (
                <span className="error">{errors.address}</span>
              )}
            </div>
            <div>
              <label className="label ">City</label>
              <input
                className="inputBox"
                type="text"
                name="city"
                id="city"
                placeholder="Salon city"
                value={salonData.city}
                onChange={handleChange}
              />
              {errors.city && <span className="error">{errors.city}</span>}
            </div>
            <div>
              <label htmlFor="openinghourstart" className="label ">
                Opening Hour
              </label>
              <input
                className="inputBox"
                type="text"
                name="openinghourstart"
                id="openinghourstart"
                placeholder="Salon starts at "
                value={salonData.openinghourstart}
                onChange={handleChange}
              />
              {errors.openinghourstart && (
                <span className="error">{errors.openinghourstart}</span>
              )}
            </div>
            <div>
              <label className="label ">Closing Hour</label>
              <input
                className="inputBox"
                type="text"
                name="closeingHour"
                id="closeingHour"
                placeholder="Salon ends at"
                value={salonData.closeingHour}
                onChange={handleChange}
              />
              {errors.closeingHour && (
                <span className="error">{errors.closeingHour}</span>
              )}
            </div>
            <div className="mb-3 w-96">
              <label htmlFor="formFileMultiple" className="label ">
                Upload images of salon
              </label>
              <input
                className="inputFile"
                type="file"
                id="formFileMultiple"
                name="image"
                onChange={handleFile}
              />
              {salonData?.image != null ? <>{salonData?.image}</> : <></>}
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  className="inputBox"
                  id="terms"
                  aria-describedby="terms"
                  type="checkbox"
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
