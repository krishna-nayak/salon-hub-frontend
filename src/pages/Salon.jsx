import React, { useState, useEffect } from "react";
import { TiStarFullOutline } from "react-icons/ti";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { GrPowerReset } from "react-icons/gr";
import endpoint from "../utility/axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { IoSearchSharp } from "react-icons/io5";
import Navbar from "../components/Navbar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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
      {/* <Navbar /> */}
      <div>
        <div className="flex flex-wrap justify-evenly p-20">
          <div className="flex justify-center items-center gap-2">
            {" "}
            <Input
              className="w-80 h-12"
              placeholder="Search by salon"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button onClick={handleReset} className="h-12">
              <GrPowerReset className="fill-white" />
            </Button>
            <Button onClick={handleSearch} className="h-12">
              <IoSearchSharp className="fill-white" />
            </Button>
          </div>{" "}
          <div className="flex text-slate-400 gap-4">
            <Checkbox id="terms1" className="bg-slate-400" />
            <Label>Male</Label>

            <Checkbox id="terms1" className="bg-slate-400" />
            <Label>Female</Label>
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className="bg-black h-10 rounded-md text-slate-500 hover:bg-black hover:border-yellow-400 hover:text-yellow-400"
            >
              Hair color
            </Button>
            <Button
              variant="outline"
              className="bg-black h-10 rounded-md text-slate-500 hover:bg-black hover:border-yellow-400 hover:text-yellow-400"
            >
              Beard
            </Button>
            <Button
              variant="outline"
              className="bg-black h-10 rounded-md text-slate-500 hover:bg-black hover:border-yellow-400 hover:text-yellow-400"
            >
              Shaving
            </Button>{" "}
            <Button
              variant="outline"
              className="bg-black h-10 rounded-md text-slate-500 hover:bg-black hover:border-yellow-400 hover:text-yellow-400"
            >
              Facial
            </Button>
          </div>
        </div>

        {filteredSalons && filteredSalons.length === 0 && (
          <div>No salons found matching the search criteria.</div>
        )}
        <div className="p-20 max-sm:p-10 ">
          <div className="flex justify-center gap-20 gap-y-10 items-center  flex-wrap ">
            {filteredSalons?.map((salonData, index) => (
              <div key={index} className="salonCard ">
                <div className="flex  max-sm:flex-wrap gap-3">
                  <img
                    className="salonImg"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTblXojdXxCoLhR5H5tsZPMqXDMN69dFZv5sw&usqp=CAU"
                    alt="ok"
                  />
                  <div>
                    <div className="max-sm:flex max-sm:gap-2">
                      <h5 className="mb-2 mt-2 text-2xl font-bold tracking-tight text-slate-400 ">
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
                    <p className="mt-3 font-normal text-slate-500 ">
                      {salonData.address}, {salonData.city}, India
                    </p>
                  </div>
                </div>
                <h1 className="text-slate-400 text-xl font-bold">Services:</h1>
                <div className="mt-2 gap-1 flex flex-wrap">
                  {salonData?.Services && salonData?.Services.length > 0 ? (
                    salonData?.Services?.map((service, index) => (
                      <Badge key={index} className="text-yellow-400">
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
                    className="hover:bg-yellow-400 w-28"
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
    </div>
  );
}
