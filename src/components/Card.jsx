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
    desc: "Easy to manage appointments",
    img: appoint,
  },
  {
    title: "Partial Payment",
    desc: "Worry not about paying before service",
    img: book,
  },
];

export default function Card() {
  return (
    <div className="flex items-center justify-center">
      <div className="text-center bg-white dark:bg-slate-900 rounded-3xl shadow-xl flex flex-wrap justify-center -mt-10 p-6 gap-10">
        {CARD.map((card, idx) => (
          <div
            key={idx}
            className="rounded-md max-w-sm w-72 dark:text-white p-2"
          >
            <img src={card.img} alt="" className="" />
            <h1 className="text-xl font-bold ">{card.title} </h1>
            <p className="text-gray-400 font-medium mt-2 ">{card.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
