import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import endpoint from "../utility/axios";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import salon2 from "../assets/salon2.jpg";
import { TiLocationOutline } from "react-icons/ti";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { TiStarFullOutline } from "react-icons/ti";
import { FaRegClock } from "react-icons/fa";
import TableS from "@/components/TableS";

export default function SalonDetails() {
  const { salonId } = useParams();
  const [salonDetails, setSalonDetails] = useState(null);
  const [selectService, setSelectService] = useState({});
  const [service, setservice] = useState(false);
  const [appointmentDetails, setAppointmentDetails] = useState({});

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

  const handleClickChange = (e) => {
    console.log(e.target);
    if (e.target.id === "default-radio-1") setservice(false);
    else setservice(true);
  };

  const handleChange = (e) =>
    setAppointmentDetails((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = { ...appointmentDetails, ...selectService, note: "0932" };
    const userId = "f57ba5ea-3dbe-4f88-aab6-95ef83b6b7d8";

    console.log("print", body);
    const response = await endpoint.post(
      `/appointment/${userId}/salonService`,
      body
    );

    console.log(response);
  };

  return (
    <div className="p-20 mt-10 bg-black">
      <div className="flex justify-center gap-28  max-lg:gap-10  max-lg:flex-wrap ">
        <img className="aspect-square h-96" src={salon2} alt="salon-pic" />
        <div className="">
          {" "}
          <div>
            <h1 className="text-slate-300 text-5xl font-bold max-lg:text-3xl ">
              {" "}
              {salonDetails.name}
            </h1>
            <div className="flex gap-1 mt-3 max-sm:gap-0">
              <span className=" text-blue-800 h-7 text-sm font-semibold ">
                5.0
              </span>
              <TiStarFullOutline className="fill-yellow-400 size-5" />{" "}
              <TiStarFullOutline className="fill-yellow-400 size-5" />{" "}
              <TiStarFullOutline className="fill-yellow-400 size-5" />{" "}
              <TiStarFullOutline className="fill-yellow-400 size-5" />
              <TiStarFullOutline className="fill-yellow-400 size-5" />
            </div>
            <p className="mt-4 text-slate-500 text-md font-semibold ">
              A salon store is a specialized retail establishment dedicated to{" "}
              <br />
              offering a curated selection of beauty and grooming products for{" "}
              <br />
              customers to purchase.
            </p>
            <div className="flex gap-1 mt-6 text-white">
              <TiLocationOutline className=" fill-blue-800 size-5" />

              <p>
                {salonDetails.city} ,{salonDetails.address} ,India
              </p>
            </div>
            <div className="text-white flex gap-2 mt-2 ">
              <FaRegClock className=" fill-blue-800 size-4" />
              <p>
                Opens at:{" "}
                <span className="text-slate-500 text-md font-semibold">
                  {salonDetails.openinghourstart}5:40
                </span>{" "}
                & Closes at:{" "}
                <span className="text-slate-500 text-md font-semibold">
                  {salonDetails.closeingHour}
                </span>
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <Drawer>
              <DrawerTrigger asChild>
                <Button className="mt-10 bg-yellow-400 font-semibold text-black">
                  Take an appointment{" "}
                </Button>
              </DrawerTrigger>
              <DrawerContent className="bg-yellow-400">
                <div className="mx-auto bg-black rounded-3xl w-full max-w-sm">
                  <DrawerHeader>
                    <DrawerTitle className="text-white">
                      Appointment
                    </DrawerTitle>
                    <DrawerDescription>
                      Reduce the hustel and take appointment!
                    </DrawerDescription>
                  </DrawerHeader>

                  <div className="flex p-4 gap-6 max-sm:flex-wrap">
                    <div>
                      <div>
                        <Label className="text-white">Name</Label>
                        <Input
                          className=""
                          type="text"
                          name="name"
                          id="name"
                          placeholder="Your name"
                        />
                      </div>

                      <div className="mt-4">
                        <Label htmlFor="date" className="text-white">
                          Date
                        </Label>
                        <Input
                          className=""
                          type="date"
                          name="date"
                          id="date"
                          placeholder="Date"
                          onChange={handleChange}
                          value={appointmentDetails?.date || ""}
                        />
                      </div>
                      <div className="mt-4">
                        <Label htmlFor="time" className="text-white">
                          Day
                        </Label>
                        <Input
                          className=""
                          type="time"
                          name="time"
                          id="time"
                          placeholder="Day"
                          onChange={handleChange}
                          value={appointmentDetails?.time || ""}
                        />
                      </div>
                      <div className="mt-4">
                        <Label className="text-white">Choose a service</Label>
                        <div className=" relative w-full">
                          <select
                            id="service-dropdown"
                            className=""
                            defaultValue={""}
                            name="selectedService"
                            onChange={(e) =>
                              setSelectService({
                                [e.target.name]: JSON.parse(e.target.value)
                                  .service_type,
                                price: JSON.parse(e.target.value).SalonService
                                  .price,
                                salonServiceIdArr: JSON.parse(
                                  e.target.value
                                )?.SalonService.salonServiceId.split(","),
                              })
                            }
                          >
                            <option disabled value={""}>
                              -- select an option --
                            </option>
                            {salonDetails?.Services?.map((service) => (
                              <option
                                key={service.serviceId}
                                value={JSON.stringify(service)}
                              >
                                {service.service_type}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="mt-4">
                        <Label className="text-white">Choose how to pay</Label>
                        <div className="flex flex-wrap gap-16">
                          <div className="flex items-center">
                            <Input
                              id="default-radio-1"
                              type="radio"
                              name="default-radio"
                              className="radiobox"
                              onClick={handleClickChange}
                            />
                            <Label
                              htmlFor="default-radio-1"
                              className="ms-2 text-sm font-medium text-gray-300"
                            >
                              Partial
                            </Label>
                          </div>
                          <div className="flex items-center">
                            <Input
                              id="default-radio-2"
                              type="radio"
                              name="default-radio"
                              className="radiobox"
                              onClick={handleClickChange}
                            />
                            <Label
                              htmlFor="default-radio-2"
                              className="ms-2 text-sm font-medium text-gray-300"
                            >
                              Full
                            </Label>
                          </div>
                          <Input
                            className="w-28 "
                            type="text"
                            name="day"
                            id="day"
                            placeholder="₹"
                            disabled={service}
                            value={service ? selectService?.price : 0}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <DrawerFooter>
                    <div className="flex  justify-center gap-5 ">
                      <DrawerClose asChild>
                        <Button className="w-full" variant="outline">
                          Cancel
                        </Button>
                      </DrawerClose>
                      <Button className="w-full">Book</Button>
                    </div>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          </form>
        </div>
      </div>
      <TableS salonDetails={salonDetails} />
    </div>
  );
}
