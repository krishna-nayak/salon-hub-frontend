import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import endpoint from "../utility/axios";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
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
export default function Modal() {

  const { salonId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [salonDetails, setSalonDetails] = useState(null);
  const [selectService, setSelectService] = useState({});
  const [paymentStatus, setPaymentStatus] = useState(false);

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
    if (e.target.id === "default-radio-1") setPaymentStatus(false);
    else setPaymentStatus(true);
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

      <form onSubmit={handleSubmit}>
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline">Appointment draw</Button>
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm">
              <DrawerHeader>
                <DrawerTitle>Appointment</DrawerTitle>
                <DrawerDescription>
                  Reduce the hustel and take appointment!
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4 ">
                <div className="flex  gap-6 max-sm:flex-wrap">
                  <div>
                    <div>
                      <Label>Name</Label>
                      <Input
                        className=""
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Your name"
                      />
                    </div>

                    <div className="mt-4">
                      <Label htmlFor="date">Date</Label>
                      <Input
                        className="InputBox"
                        type="date"
                        name="date"
                        id="date"
                        placeholder="Date"
                        onChange={handleChange}
                        value={appointmentDetails?.date || ""}
                      />
                    </div>
                    <div className="mt-4">
                      <Label htmlFor="time" className="Label ">
                        Day
                      </Label>
                      <Input
                        className="InputBox"
                        type="time"
                        name="time"
                        id="time"
                        placeholder="Day"
                        onChange={handleChange}
                        value={appointmentDetails?.time || ""}
                      />
                    </div>
                    <div className="mt-4">
                      <Label className="Label ">Choose a service</Label>
                      <div className=" relative w-full">
                        <select
                          id="service-dropdown"
                          className="InputBox"
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
                      <Label className="Label">Choose how to pay</Label>
                      <div className="flex flex-wrap gap-16">
                        <div className="flex items-center">
                          <Input
                            id="default-radio-1"
                            type="radio"
                            value=""
                            name="default-radio"
                            className="radiobox"
                            onClick={handleClickChange}
                          />
                          <Label
                            htmlFor="default-radio-1"
                            className="ms-2 text-sm font-medium text-gray-400"
                          >
                            Partial
                          </Label>
                        </div>
                        <div className="flex items-center">
                          <Input
                            id="default-radio-2"
                            type="radio"
                            value=""
                            name="default-radio"
                            className="radiobox"
                            onClick={handleClickChange}
                          />
                          <Label
                            htmlFor="default-radio-2"
                            className="ms-2 text-sm font-medium text-gray-400"
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
                          disabled={paymentStatus}
                          value={paymentStatus ? selectService?.price : 0}
                        />
                      </div>
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
    </>
  );
}
