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
  console.log(salonDetails);
  return (
    <div className="mt-20 ">
      <div>
        <h1 className="text-center dark:text-slate-300 text-3xl font-bold max-md:text-2xl px-10">
          Services provided by {salonDetails.name}
        </h1>
        <div className="flex justify-center p-2">
          <Table className="w-[950px] mt-10 text-white">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">SERIAL</TableHead>
                <TableHead></TableHead>
                <TableHead>SERVICE</TableHead>
                <TableHead>DURATION</TableHead>
                <TableHead>AMOUNT</TableHead>
                <TableHead>DETAILS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salonDetails.Services.map((service, index) => (
                <TableRow
                  key={index}
                  className="dark:bg-gradient-to-b dark:from-black dark:from-10% dark:via-black via-30% dark:to-gray-900 dark:to-90%  "
                >
                  <TableCell className="font-medium dark:text-slate-300 text-black">
                    {index + 1}.
                  </TableCell>
                  <TableCell>
                    <img
                      src={serviceImages[service.service_type]}
                      alt={service.service_type}
                      className="h-20 w-20 object-cover rounded-full max-sm:max-w-10 max-sm:max-h-10"
                    />
                  </TableCell>
                  <TableCell className="text-lg font-semibold max-sm:text-sm dark:text-slate-300 text-black">
                    {service.service_type}
                  </TableCell>
                  <TableCell className="dark:text-slate-300 text-black">
                    {service.SalonService.duration}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="text-yellow-400 text-md max-sm:text-sm "
                    >
                      ₹{service.SalonService.price}
                    </Badge>
                  </TableCell>
                  <TableCell className="dark:text-slate-300 text-black">
                    {service.SalonService.description}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
