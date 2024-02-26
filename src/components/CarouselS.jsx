import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import bmw1 from "../assets/bmw4.jpg";
import bmw2 from "../assets/bmws.jpg";
import bmw3 from "../assets/bmw3.jpg";

const images = [bmw1, bmw2, bmw3, bmw1, bmw2, bmw3];
export default function CarouselS() {
  return (
    <Carousel className="w-full max-w-4xl mx-auto">
      <CarouselContent className="-ml-1 ">
        {images.map((image, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-4">
                  <img
                    src={image}
                    alt={`Slide ${index + 1}`}
                    className="w-[300px] h-[300px]"
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
