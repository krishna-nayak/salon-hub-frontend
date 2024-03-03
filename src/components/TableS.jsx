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
const serviceImages = {
  "hair cut": service6,
  facial: service1,
  Manicure: service3,
  Massage: service2,
  "hair color": service4,
  pedicure: service5,
};

export default function TableS({ salonDetails }) {
  if (
    !salonDetails ||
    !salonDetails.Services ||
    !Array.isArray(salonDetails.Services)
  ) {
    return <div>No services available</div>;
  }
  console.log(salonDetails);
  return (
    <div className="mt-20 ">
      <div>
        <h1 className="text-center text-slate-300 text-3xl font-bold max-md:text-3xl ">
          Services provided by {salonDetails.name}
        </h1>
        <div className="flex justify-center">
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
                  className="bg-gradient-to-b from-black from-10% via-black via-30% to-gray-900 to-90%  "
                >
                  <TableCell className="font-medium">{index + 1}.</TableCell>
                  <TableCell>
                    <img
                      src={serviceImages[service.service_type]}
                      alt={service.service_type}
                      className="h-20 w-20 object-cover rounded-full max-sm:max-w-10 max-sm:max-h-10"
                    />
                  </TableCell>
                  <TableCell className="text-lg font-semibold max-sm:text-sm">
                    {service.service_type}
                  </TableCell>
                  <TableCell>{service.SalonService.duration}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className="text-yellow-400 text-md max-sm:text-sm "
                    >
                      ₹{service.SalonService.price}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-slate-300">
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
