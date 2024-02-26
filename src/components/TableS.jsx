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

const invoices = [
  {
    invoice: "SR0001",
    service: "Hair Color",
    totalAmount: "₹250.00",
    duration: "1-1.5 hour",
    details: "Hair color with hair wash and drying with avialable colors.",
  },
  {
    invoice: "SR0002",
    service: "Hair Cut",
    totalAmount: "₹150.00",
    duration: "1 hour",
    details:
      "Diffrent hair cut avialable like U cut,V cut,French,Leaser,advance layer,etc ",
  },
  {
    invoice: "SR0003",
    service: "Manicure",
    totalAmount: "₹350.00",
    duration: "45-50 min",
    details: "Cleansing risening with proper formulation.",
  },
  {
    invoice: "SR0004",
    service: "Pedicure",
    totalAmount: "₹450.00",
    duration: "1 hour",
    details: "Fish treatment with procedure avialble but optional.",
  },
  {
    invoice: "SR0005",
    service: "Facial",
    totalAmount: "₹550.00",
    duration: "30-40 min",
    details: "Deep clean, Charcoal wash,Papaya ,Fruit punch ,etc avialble ",
  },
  {
    invoice: "SR0006",
    service: "Massage",
    totalAmount: "₹200.00",
    duration: "1-2 hour",
    details: "Steam and Ice Massage also avialble with full body treatment ",
  },
  {
    invoice: "SR0007",
    service: "Beard Shave",
    totalAmount: "₹300.00",
    duration: "30 min",
    details: "Charcoal pack with shaving",
  },
];
export default function TableS({ salonDetails }) {
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
                <TableHead className="w-[50px]">SL NO.</TableHead>
                <TableHead>SERVICE</TableHead>
                <TableHead>DURATION</TableHead>
                <TableHead>AMOUNT</TableHead>
                <TableHead>DETAILS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>{invoice.service}</TableCell>
                  <TableCell>{invoice.duration}</TableCell>
                  <TableCell className="">{invoice.totalAmount}</TableCell>
                  <TableCell>{invoice.details}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
