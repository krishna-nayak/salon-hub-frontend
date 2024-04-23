import React, { useRef, useState, useEffect } from "react";
import svetor from "../assets/svetor.png";
import { Button } from "./ui/button";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
export default function Ticket({ name, gender, service, date, time }) {
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [downloading, setDownloading] = useState(false);
  const pdfRef = useRef();

  useEffect(() => {
    const ticketData = `Name: ${name}, Gender: ${gender}, Service: ${service}, Date: ${date}, Time: ${time}`;
    const encodedData = encodeURIComponent(ticketData);
    const qrCodeApiUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodedData}`;
    setQrCodeUrl(qrCodeApiUrl);
  }, [name, gender, service, date, time]);

  const downloadPDF = () => {
    setDownloading(true);
    const button = document.getElementById("downloadButton");
    if (button) {
      button.style.display = "none";
    }

    const input = pdfRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = (pdfHeight - imgHeight * ratio) / 2;
      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );
      const qrCodeImage = new Image();
      qrCodeImage.src = qrCodeUrl;
      qrCodeImage.onload = () => {
        const qrCodeWidth = qrCodeImage.width * 0.2;
        const qrCodeHeight = qrCodeImage.height * 0.2;
        const qrCodeX = (pdfWidth - qrCodeWidth) / 2;
        const qrCodeY = imgY + imgHeight * ratio - qrCodeHeight * 1.6;
        pdf.addImage(qrCodeImage, qrCodeX, qrCodeY, qrCodeWidth, qrCodeHeight);
        pdf.save("ticket.pdf");
        setDownloading(false); //downloading process completed

        if (button) {
          button.style.display = "block";
        }
      };
    });
  };

  return (
    <div ref={pdfRef} className="text-black ">
      <div className="max-w-md w-full h-full mx-auto z-10 bg-yellow-400 rounded-3xl">
        <div className="flex flex-col">
          <div className="bg-white relative drop-shadow-2xl  rounded-3xl p-4 m-4 text-black">
            <div className="flex-none sm:flex">
              <div className="flex-auto justify-evenly">
                <div className="flex items-center justify-between">
                  <div className="flex items-center  my-1">
                    <span className="mr-3 rounded-full bg-white w-8 h-8">
                      <img src={svetor} alt="" className="w-20" />
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
                  <img
                    src={qrCodeUrl}
                    alt="QR Code"
                    className="h-28 w-auto mt-4 mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!downloading && (
        <Button
          id="downloadButton"
          onClick={downloadPDF}
          className="w-full  mt-4"
        >
          Download
        </Button>
      )}
    </div>
  );
}
