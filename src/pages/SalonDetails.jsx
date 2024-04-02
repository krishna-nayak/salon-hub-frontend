import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button } from "@/components/ui/button";
import endpoint from "../utility/axios";
import Navbar from "../components/Navbar";
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
import useScreenSize from "@/hooks/useSize";
import { TimeProvider, useTime } from "@/hooks/context/TimeContext";
import Appointment from "./Appointment";
import CarouselS from "../components/CarouselS";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Review from "@/components/SalonDetailsComponents/Review";
export default function SalonDetails() {
  const { salonId } = useParams();
  const [salonDetails, setSalonDetails] = useState({});

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
  }, []);

  const [open, setOpen] = React.useState(false);

  if (!salonDetails) {
    return <div>Loading...</div>;
  }

  const [dialogOpen, setDialogOpen] = React.useState(false);
  const size = useScreenSize();
  return (
    <div>
      <Navbar />
      <TimeProvider>
        <div className="px-16 mt-10 ">
          <div className="flex justify-center gap-28  max-lg:gap-10  max-lg:flex-wrap ">
            <CarouselS />
            <div>
              {" "}
              <div className="mt-10">
                <h1 className="dark:text-slate-300 text-5xl font-bold max-lg:text-3xl ">
                  {" "}
                  {salonDetails.name}
                </h1>
                <div className="flex gap-1 mt-3 max-sm:gap-0">
                  <span className=" text-blue-800 h-7 text-sm font-semibold ">
                    5.0
                  </span>
                  {[...Array(5)].map((star, index) => {
                    return (
                      <div key={index}>
                        <TiStarFullOutline className="fill-yellow-400" />
                      </div>
                    );
                  })}
                </div>
                <p className="mt-4 text-slate-500 text-md font-semibold ">
                  A salon store is a specialized retail establishment dedicated
                  to <br />
                  offering a curated selection of beauty and grooming products
                  for <br />
                  customers to purchase.
                </p>
                <div className="flex gap-1 mt-6 dark:text-white">
                  <TiLocationOutline className=" fill-blue-800 size-5" />

                  <p>
                    {salonDetails.city} ,{salonDetails.address} ,India
                  </p>
                </div>
                <div className="dark:text-white flex gap-2 mt-4 ">
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
              <div className="mt-8">
                {size.width > 724 ? (
                  <DialogProvider
                    {...{ dialogOpen, setDialogOpen, salonDetails }}
                  />
                ) : (
                  <DrawerProvider
                    {...{ dialogOpen, setDialogOpen, salonDetails }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <TableS salonDetails={salonDetails} salonId={salonId} />
        <Review salonId={salonId} />
      </TimeProvider>
    </div>
  );
}

function DialogProvider({ dialogOpen, setDialogOpen, salonDetails }) {
  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-yellow-400 text-black dark:bg-slate-900 dark:text-white hover:bg-yellow-400">
          Appointment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Appointment</DialogTitle>
          <DialogDescription>
            Give your details. Click <span className="font-bold">Book Now</span>{" "}
            when you're done.
          </DialogDescription>
        </DialogHeader>
        <Appointment salonDetails={salonDetails} />
        <DialogFooter>
          <Button type="submit" form="appoint">
            Save changes
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DrawerProvider({ dialogOpen, setDialogOpen, salonDetails }) {
  return (
    <Drawer open={dialogOpen} onOpenChange={setDialogOpen}>
      <DrawerTrigger asChild>
        <Button className="bg-yellow-400 text-black dark:bg-slate-900 dark:text-white hover:bg-yellow-400">
          Appointment
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Appointment</DrawerTitle>
          <DrawerDescription>
            Give your details. Click <span className="font-bold">Book Now</span>{" "}
            when you're done.
          </DrawerDescription>
        </DrawerHeader>
        <Appointment salonDetails={salonDetails} />
        <DrawerFooter className="pt-2">
          <Button type="submit" form="appoint">
            Save changes
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
