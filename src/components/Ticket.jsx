import React, { useRef } from "react";
/*import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";*/
import svetor from "../assets/svetor.png";

export default function Ticket({ pdfRef, name, gender, service, date, time }) {
  return (
    <div ref={pdfRef}>
      <div className="max-w-md w-full h-full mx-auto z-10 bg-yellow-400 rounded-3xl">
        <div className="flex flex-col">
          <div className="bg-white relative drop-shadow-2xl  rounded-3xl p-4 m-4 text-black">
            <div className="flex-none sm:flex">
              <div className="flex-auto justify-evenly">
                <div className="flex items-center justify-between">
                  <div className="flex items-center  my-1">
                    <span className="mr-3 rounded-full bg-white w-8 h-8">
                      <img src={svetor} alt="" classNameName="w-20" />
                    </span>
                    <h2 className="font-medium">SALON_HUB</h2>
                  </div>
                  <div className="ml-auto text-blue-800">SHT90380</div>
                </div>

                <div className="border-dashed border-b-2 my-5 pt-2">
                  <div className="absolute rounded-full w-5 h-5 bg-yellow-400 -mt-2 -left-2"></div>
                  <div className="absolute rounded-full w-5 h-5 bg-yellow-400 -mt-2 -right-2"></div>
                </div>
                <div className="flex items-center mb-5 p-5 text-sm">
                  <div className="flex flex-col">
                    <span className="text-sm">Name</span>
                    <div className="font-semibold">{name}</div>
                  </div>
                  <div className="flex flex-col ml-auto">
                    <span className="text-sm">Gender</span>
                    <div className="font-semibold">{gender}</div>
                  </div>
                </div>
                <div className="flex items-center mb-4 px-5">
                  <div className="flex flex-col text-sm">
                    <span className="">Date</span>
                    <div className="font-semibold">
                      {date ? new Date(date).toLocaleDateString() : ""}
                    </div>
                  </div>
                  <div className="flex flex-col mx-auto text-sm">
                    <span className="">Time</span>
                    <div className="font-semibold">{time}</div>
                  </div>
                  <div className="flex flex-col text-sm">
                    <span className="">Service</span>
                    <div className="font-semibold">{service}</div>
                  </div>
                </div>
                <div className=" border-dashed border-b-2 my-5 pt-5">
                  <div className="absolute rounded-full w-5 h-5 bg-yellow-400 -mt-2 -left-2"></div>
                  <div className="absolute rounded-full w-5 h-5 bg-yellow-400 -mt-2 -right-2"></div>
                </div>

                <div className="flex flex-col justify-center text-sm ">
                  <h6 className="font-bold text-center">SCAN TICKET</h6>

                  <div className="barcode h-14 w-0 inline-block mt-4 relative left-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
