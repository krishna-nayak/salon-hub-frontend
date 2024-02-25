import React, { useState, useEffect } from "react";
import { TiStarFullOutline } from "react-icons/ti";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RiScissors2Fill } from "react-icons/ri";
import endpoint from "../utility/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function Salon() {
  const [salonDatas, setSalonData] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedCity = searchParams.get("city");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSalons, setFilteredSalons] = useState(null);
  const navigateTo = useNavigate();
  useEffect(() => {
    const fetchSalonData = async () => {
      try {
        const response = await endpoint.get(`/salon?city=${selectedCity}`);
        console.log("salon data", response);
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
    return <div>Loading...</div>;
  }

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
    }
  };
  const handleReset = () => {
    setSearchQuery("");
    setFilteredSalons(salonDatas);
  };
  return (
    <div>
      <div className="flex justify-center items-center">
        <Input
          className="w-80"
          placeholder="Search by salon"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <RiScissors2Fill onClick={handleReset} className="-ml-4" />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      {filteredSalons && filteredSalons.length === 0 && (
        <div>No salons found matching the search criteria.</div>
      )}
      <div className="p-20 max-sm:p-10">
        <div className="flex justify-center gap-20 gap-y-10 items-center  flex-wrap">
          {filteredSalons?.map((salonData, index) => (
            <div key={index} className="salonCard">
              <div className="flex  max-sm:flex-wrap gap-3">
                <img
                  className="salonImg"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTblXojdXxCoLhR5H5tsZPMqXDMN69dFZv5sw&usqp=CAU"
                  alt="ok"
                />
                <div>
                  <div className="max-sm:flex max-sm:gap-2">
                    <h5 className="mb-2 mt-2 text-2xl font-bold tracking-tight text-gray-900 ">
                      {salonData.name}
                    </h5>
                    <div className="flex gap-1 -ml-3 mt-3 max-sm:gap-0">
                      <span className="salonBadge">5.0</span>
                      <TiStarFullOutline className="fill-yellow-400" />{" "}
                      <TiStarFullOutline className="fill-yellow-400" />{" "}
                      <TiStarFullOutline className="fill-yellow-400" />{" "}
                      <TiStarFullOutline className="fill-yellow-400" />
                      <TiStarFullOutline className="fill-yellow-400" />
                    </div>
                  </div>
                  <p className="mt-3 font-normal text-gray-700 dark:text-gray-400">
                    {salonData.address}, {salonData.city}, India
                  </p>
                </div>
              </div>
              <h1 className="text-black text-xl font-bold">Services:</h1>
              <div className="mt-2 gap-1 flex flex-wrap">
                {salonData?.Services && salonData?.Services.length > 0 ? (
                  salonData?.Services?.map((service, index) => (
                    <Badge key={index} variant="outline">
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
                  className="btn w-28"
                >
                  Book Now
                </Button>
                <p className="text-blue-500 mt-2 font-semibold">Queue: 2</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
