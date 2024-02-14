import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import endpoint from "../utility/axios";

export default function Modal() {
  const [showModal, setShowModal] = useState(false);
  const { salonId } = useParams();
  const [salonDetails, setSalonDetails] = useState(null);

  useEffect(() => {
    const fetchSalonDetails = async () => {
      try {
        const response = await endpoint.get(`/salon/${salonId}`);
        setSalonDetails(response.data);
      } catch (error) {
        console.error("Error fetching salon details:", error);
      }
    };

    fetchSalonDetails();
  }, [salonId]);

  if (!salonDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="">
        <h1> {salonDetails.name}</h1>
        <p>
          A salon store is a specialized retail establishment dedicated to
          offering a curated selection of beauty and grooming products for
          customers to purchase
        </p>
        <p>{salonDetails.city}</p>
        <p>{salonDetails.address} ,India</p>
        <div className=" ">
          <p>Opens at:{salonDetails.openinghourstart}</p>
          <p>Closes at:{salonDetails.closeingHour}</p>
        </div>
      </div>

      <button
        className="btn  w-32"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Take Appointment
      </button>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl font-semibold">Appointment</h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <div className="flex gap-10 ">
                    <div>
                      <div>
                        <label className="label">Name</label>
                        <input
                          className="inputBox"
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Your name"
                        />
                      </div>

                      <div>
                        <label className="label ">Date </label>
                        <input
                          className="inputBox"
                          type="text"
                          name="date"
                          id="date"
                          placeholder="Date"
                        />
                      </div>
                      <div>
                        <label className="label ">Day</label>
                        <input
                          className="inputBox"
                          type="text"
                          name="day"
                          id="day"
                          placeholder="Day"
                        />
                      </div>
                      <div className="">
                        <label className="label ">Choose a service</label>
                        <div className=" relative w-full">
                          <select
                            id="city-dropdown"
                            className="inputBox"
                            defaultValue={""}
                          >
                            <option disabled value={""}>
                              -- select an option --
                            </option>
                            {salonDetails?.Services?.map((service) => (
                              <option
                                key={service.serviceId}
                                value={service.service_type}
                              >
                                {service.service_type}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="label ">Choose how to pay</label>
                        <div className="flex flex-wrap gap-4">
                          <div className="flex items-center">
                            <input
                              id="default-radio-1"
                              type="radio"
                              value=""
                              name="default-radio"
                              className="radiobox"
                            />
                            <label className="ms-2 text-sm font-medium text-gray-400">
                              Partial
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="default-radio-2"
                              type="radio"
                              value=""
                              name="default-radio"
                              className="radiobox"
                            />
                            <label className="ms-2 text-sm font-medium text-gray-400">
                              Full
                            </label>
                          </div>
                          <input
                            className="inputBox w-12 "
                            type="text"
                            name="day"
                            id="day"
                            placeholder=" ₹"
                          />
                        </div>
                      </div>
                    </div>
                    <img
                      className="max-sm:hidden"
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPzcfyvvhbzWW6vPz8v1-G-hAZtjiO4NcRiQ&usqp=CAU"
                      alt="your service image"
                    ></img>
                  </div>
                </div>
                {/*footer*/}
                <div className="flex gap-2 items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="btn w-20"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    CLOSE
                  </button>
                  <button
                    className="btn w-20"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    BOOK
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
