import React, { useState, useEffect } from "react";
import { TiStarFullOutline } from "react-icons/ti";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BiReset } from "react-icons/bi";
import endpoint from "../utility/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { IoSearchSharp } from "react-icons/io5";
import Navbar from "../components/Navbar";
import BarLoader from "react-spinners/BarLoader";
import { FaRegSadTear } from "react-icons/fa";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PuffLoader } from "react-spinners";
export default function Salon() {
  const [salonDatas, setSalonData] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedCity = searchParams.get("city");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSalons, setFilteredSalons] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [rating, setRating] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const navigateTo = useNavigate();
  useEffect(() => {
    const fetchSalonData = async () => {
      try {
        const response = await endpoint.get(`/salon?city=${selectedCity}`);
        console.log("salon data", response);
        toast(`You are viewing all salon in ${selectedCity} 😄`);
        const salonDataResult = response.data.result;
        setSalonData(salonDataResult);
        setFilteredSalons(salonDataResult);
      } catch (error) {
        console.error("Error fetching salon data:", error);
        toast("Error fetching salon data 😳");
      }
    };

    fetchSalonData();
  }, [selectedCity]);

  if (!salonDatas) {
    return (
      <div className="flex justify-center">
        <BarLoader color="yellow" />
      </div>
    );
  }
  const BADGE = [
    {
      serviceBadge: "Haircut",
    },
    {
      serviceBadge: "Hair color",
    },
    {
      serviceBadge: "Manicure",
    },
    {
      serviceBadge: "Facial",
    },
    {
      serviceBadge: "Massage",
    },
    {
      serviceBadge: "Pedicure",
    },
  ];

  const handleBookNow = (salonid) => {
    console.log("Salon ID:", salonid);
    if (salonid) {
      navigateTo(`/salonDetails/${salonid}`);
    } else {
      console.error("Salon ID is undefined or null");
    }
  };
  // for search
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredSalons(salonDatas);
    } else {
      const filteredSalons = salonDatas.filter((salon) =>
        salon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSalons(filteredSalons);
      setCurrentPage(1);
    }
  };

  const handleReset = () => {
    setSearchQuery("");
    setFilteredSalons(salonDatas);
  };
  // for search by toggle
  const handleFilterByService = (service) => {
    const filteredSalons = salonDatas.filter((salon) =>
      salon.Services.some(
        (s) => s.service_type.toLowerCase() === service.toLowerCase()
      )
    );
    setFilteredSalons(filteredSalons);
    if (filteredSalons.length === 0) {
      toast(`No salons offer ${service} in ${selectedCity} 😞`);
    }
  };

  // for pagination
  const cardsPerPage = 6;
  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredSalons
    ? filteredSalons.slice(indexOfFirstCard, indexOfLastCard)
    : [];
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleImageLoad = () => {
    setImagesLoaded(true);
  };
  return (
    <div>
      <Navbar />
      <div>
        <div className="flex flex-wrap justify-evenly p-10 gap-y-6">
          <div className="flex justify-center  items-center gap-2 ">
            {" "}
            <Input
              className="w-80 h-12 max-sm:w-44"
              placeholder="Search by salon"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              onClick={handleReset}
              className="h-12 bg-yellow-500 dark:bg-slate-900 hover:bg-yellow-400"
            >
              <BiReset className="fill-white" />
            </Button>
            <Button
              onClick={handleSearch}
              className="h-12 bg-yellow-500 dark:bg-slate-900 hover:bg-yellow-400"
            >
              <IoSearchSharp className="fill-white" />
            </Button>
          </div>{" "}
          <div className="flex  flex-wrap gap-2">
            {BADGE.map((badge, idx) => (
              <Button
                key={idx}
                variant="outline"
                className={`dark:bg-black h-10 rounded-md text-slate-500 dark:hover:bg-black hover:border-yellow-400 hover:text-yellow-400 ${
                  selectedService === "Facial" ? "bg-yellow-400" : ""
                }`}
                onClick={() => handleFilterByService(badge.serviceBadge)}
              >
                {badge.serviceBadge}
              </Button>
            ))}
          </div>
        </div>

        {filteredSalons && filteredSalons.length === 0 && (
          <div className="text-center  text-gray-500 font-semibold">
            <div className="flex justify-center">
              {" "}
              <FaRegSadTear className="fill-yellow-400 size-10 " />
            </div>
            No salons found matching the search criteria.
          </div>
        )}
        <div className="p-20 max-sm:p-8 ">
          <div className="flex justify-center gap-20 gap-y-10 items-center  flex-wrap ">
            {" "}
            {/* {filteredSalons?.map((salonData, index) */}
            {currentCards?.map((salonData, index) => (
              <div key={index} className="salonCard ">
                <div className="flex  max-sm:flex-wrap gap-3">
                  {!imagesLoaded && (
                    <div className="flex justify-center">
                      <PuffLoader color="yellow" speedMultiplier={4} />
                    </div>
                  )}
                  <img
                    className="salonImg"
                    src={`https://source.unsplash.com/400x250/?salon,barber-salon,shop,pedicure,haircut,manicure,men-facial,${salonData.name}`}
                    alt="Salon"
                    onLoad={handleImageLoad}
                  />
                  <div>
                    <div className="max-sm:flex max-sm:gap-2">
                      <h5 className="mb-2 mt-2 text-2xl font-bold tracking-tight dark:text-slate-400 ">
                        {salonData.name}
                      </h5>
                      <div className="flex gap-1 -ml-3 mt-3 max-sm:gap-0">
                        <span className="salonBadge">5.0</span>
                        {[...Array(5)].map((star, index) => {
                          const currentRate = index + 1;
                          return (
                            <div key={index}>
                              <TiStarFullOutline className="fill-yellow-400" />
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <p className="mt-3 font-normal text-slate-500 ">
                      {salonData.address}, {salonData.city}, India
                    </p>
                  </div>
                </div>
                <h1 className="dark:text-slate-400 text-xl font-bold mt-2">
                  Services:
                </h1>
                <div className="mt-2 gap-1 flex flex-wrap">
                  {salonData?.Services && salonData?.Services.length > 0 ? (
                    salonData?.Services?.map((service, index) => (
                      <Badge
                        key={index}
                        className="bg-white hover:bg-transparent dark:border-black border-yellow-400 dark:bg-slate-900 text-yellow-400"
                      >
                        {service.service_type.replace(/\b\w/g, (c) =>
                          c.toUpperCase()
                        )}
                      </Badge>
                    ))
                  ) : (
                    <p>No services available</p>
                  )}
                </div>

                <div className="mt-4 flex justify-between">
                  <Button
                    onClick={() => handleBookNow(salonData.salonId)}
                    className=" w-28 bg-yellow-500 dark:bg-slate-900 hover:bg-yellow-400 dark:text-white"
                  >
                    Book Now
                  </Button>
                  <p className="text-blue-500 mt-2 font-semibold">Queue: 2</p>
                </div>
              </div>
            ))}
          </div>
          <div className=" mt-10">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious onClick={handlePreviousPage} />
                </PaginationItem>
                {Array.from({
                  length: Math.ceil(filteredSalons.length / cardsPerPage),
                }).map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink onClick={() => setCurrentPage(index + 1)}>
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext onClick={handleNextPage} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  );
}
