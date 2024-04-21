import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { PuffLoader } from "react-spinners";

export default function CarouselS() {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const handleImageLoad = () => {
    setImagesLoaded(true);
  };

  return (
    <div className="relative">
      {!imagesLoaded && (
        <PuffLoader color="yellow" className=" mt-20" speedMultiplier={4} />
      )}{" "}
      <Carousel
        className={`w-96 mt-16 ${!imagesLoaded && "hidden"}`}
        autoPlay
        infiniteLoop
        showStatus={false}
        showThumbs={imagesLoaded}
      >
        <div>
          <img
            className="w-96"
            src={`https://source.unsplash.com/400x250/?salon-shop,beauty-salon,men-salon,haircolor`}
            alt="Salon"
            onLoad={handleImageLoad}
          />
        </div>
        <div>
          <img
            src={`https://source.unsplash.com/400x250/?pedicure,haircut,manicure,facial,haircolor`}
            alt="Salon"
            onLoad={handleImageLoad}
          />
        </div>
        <div>
          <img
            src={`https://source.unsplash.com/400x250/?barber-shop`}
            alt="Salon"
            onLoad={handleImageLoad}
          />
        </div>
        <div>
          <img
            src={`https://source.unsplash.com/400x250/?salon,barber-salon,shop,pedicure,haircut,manicure,men-facial`}
            alt="Salon"
            onLoad={handleImageLoad}
          />
        </div>
      </Carousel>
    </div>
  );
}
