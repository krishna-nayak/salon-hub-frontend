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
import { cn } from "@/lib/utils";
import { DatePickerWithPresets } from "@/components/ui/DatePicker/DatePickerWithPresets";
import { set } from "date-fns";

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

  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState();

  if (!salonDetails) {
    return <div>Loading...</div>;
  }

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
          {/* Drawer */}
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline">Appointment</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="text-left">
                <DrawerTitle>Edit profile</DrawerTitle>
                <DrawerDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DrawerDescription>
              </DrawerHeader>
              {/* <ProfileForm className="px-4" /> */}
              {/* <form></form> */}
              <form className={cn("grid items-start gap-4 w-[80%] mx-auto")}>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    id="email"
                    defaultValue="shadcn@example.com"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" defaultValue="@shadcn" />
                  <DatePickerWithPresets setDate={setDate} date={date} />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="time">time</Label>
                  <Input type="time" />
                </div>
              </form>
              <DrawerFooter className="pt-2">
                <Button type="submit">Save changes</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      <TableS salonDetails={salonDetails} />
    </div>
  );
}
