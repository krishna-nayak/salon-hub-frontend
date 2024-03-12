import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import book from "../assets/book.png";
import salon from "../assets/salon.png";
import appoint from "../assets/appoint.png";
import wait from "../assets/wait.png";
export default function CarouselS() {
  return (
    <Carousel className="w-96" autoPlay infiniteLoop showStatus={false}>
      <div>
        <img src={book} />
      </div>
      <div>
        <img src={salon} />
      </div>
      <div>
        <img src={appoint} />
      </div>
    </Carousel>
  );
}
