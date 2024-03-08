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
        <p className="legend">Legend 1</p>
      </div>
      <div>
        <img src={salon} />
        <p className="legend">Legend 2</p>
      </div>
      <div>
        <img src={appoint} />
        <p className="legend">Legend 3</p>
      </div>
    </Carousel>
  );
}
