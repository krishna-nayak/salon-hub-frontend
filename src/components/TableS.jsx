import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import service1 from "../assets/service1.png";
import service2 from "../assets/service2.png";
import service3 from "../assets/service3.png";
import service4 from "../assets/service4.png";
import service5 from "../assets/service5.png";
import service6 from "../assets/service6.png";
import { BarLoader } from "react-spinners";
import { FaRegClock } from "react-icons/fa6";

const serviceImages = {
  haircut: service6,
  facial: service1,
  manicure: service3,
  massage: service2,
  "hair color": service4,
  pedicure: service5,
};

export default function TableS({ salonDetails }) {
  if (
    !salonDetails ||
    !salonDetails.Services ||
    !Array.isArray(salonDetails.Services)
  ) {
    return (
      <div>
        <div className="flex justify-center">
          <BarLoader color="yellow" />
        </div>
      </div>
    );
  }
  return (
    <div className="mt-20 px-20 max-lg:px-2">
      <div>
        <h1 className="text-center dark:text-slate-300 text-3xl font-bold max-md:text-2xl ">
          Services provided by {salonDetails.name}
        </h1>
        <p className="text-yellow-500 text-md text-center mt-2 px-6">
          Get an wide range of services with discounts from our salon{" "}
        </p>
        <div className="flex flex-wrap justify-center gap-8 px-20 relative mt-20 ">
          {salonDetails.Services.map((service, index) => (
            <div key={index}>
              <div className="mt-10 relative bottom-4  block w-80  p-6 shade">
                <div>
                  <div className="absolute right-0 top-0 h-16 w-16 ">
                    <div className="ribbon dark:bg-blue-600  bg-blue-200 font-bold">
                      {" "}
                      ₹{service.SalonService.price}/-{" "}
                    </div>
                  </div>
                  <div className="mx-auto flex h-16 w-16 -translate-y-12 transform items-center justify-center rounded-3xl bg-yellow-300 shadow-lg shadow-yellow-500/80">
                    <img
                      src={serviceImages[service.service_type]}
                      alt={service.service_type}
                      className="h-20 w-20 object-cover "
                    />
                  </div>
                  <div className="flex justify-between">
                    {" "}
                    <h5 className="uppercase text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {service.service_type}
                    </h5>
                    <p className="mt-2 flex gap-2">
                      <FaRegClock className=" fill-blue-800 size-4 mt-1 " />
                      {service.SalonService.duration} min
                    </p>
                  </div>

                  <p className="font-normal text-gray-700 dark:text-gray-400 mt-2">
                    {service.SalonService.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
