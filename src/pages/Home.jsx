import React from "react";
import Search from "../components/Search";
import Navbar from "../components/Navbar";
import ybackground from "../assets/ybackground.png";
import Card from "../components/Card";
//import QRScanner from "../components/QRScanner";
export default function Home() {
  return (
    <div className="">
      <Navbar />
      <div
        className="bg-cover bg-center h-96 flex items-center  justify-center p-8"
        style={{ backgroundImage: `url(${ybackground})` }}
      >
        <div>
          <h1 className="text-3xl font-bold text-white max-sm:text-2xl text-center  ">
            India's No. 1 Online Salon Booking Site
          </h1>

          <div className="bg-white rounded-3xl shadow-lg mt-2 text-slate-500 ">
            <Search />
          </div>
        </div>
      </div>
      <Card />

      {/* <QRScanner /> */}
    </div>
  );
}
