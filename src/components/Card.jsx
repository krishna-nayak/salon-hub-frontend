import React from "react";
import book from "../assets/book.png";
import salon from "../assets/salon.png";
import appoint from "../assets/appoint.png";
import wait from "../assets/wait.png";
const CARD = [
  {
    title: "Advance booking",
    desc: " Enjoy hustel free advance booking !",
    img: salon,
  },
  { title: "Save Time", desc: " No need to wait in queue", img: wait },
  {
    title: "Quick Appointment ",
    desc: "  Easy to manage appointments",
    img: appoint,
  },
  {
    title: "Partial Payment",
    desc: "  Worry not about paying before service",
    img: book,
  },
];

export default function Card() {
  return (
    <div className="flex items-center justify-center ">
      <div className="bg-gradient-to-b from-black from-10% via-black via-30% to-gray-900 to-90% text-center rounded-3xl shadow-lg flex flex-wrap justify-center -mt-10 p-6 gap-10">
        {CARD.map((card, idx) => (
          <div className=" rounded-md max-w-sm w-72 text-white border-gray-200 shadow p-2">
            <img src={card.img} alt="" className="" />
            <h1 className="text-xl font-bold ">{card.title} </h1>
            <p className="text-gray-400 font-medium mt-2 ">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
