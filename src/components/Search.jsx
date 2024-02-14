import React, { useEffect, useState } from "react";
import { HiMiniScissors } from "react-icons/hi2";
import { FaMicrophoneAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaRegStopCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import endpoint from "../utility/axios";

export default function () {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigateTo = useNavigate();
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await endpoint.get(`/salon`);
        console.log(response);
        const cities = response.data.result.map((salon) => salon.city);
        setSearchResults(cities);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    navigateTo(`/salon?city=${searchInput}`); // Redirect to '/salons' with the selected city as a URL parameter
  };
  return (
    <div>
      {" "}
      <form className="flex items-center" onSubmit={handleSearch}>
        <label htmlFor="voice-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <select
            id="city-dropdown"
            value={searchInput}
            onChange={handleInputChange}
            className="inputBox"
          >
            <option value="">Select a city</option>
            {searchResults.map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
        <button
          className="btn w-20"
          type="submit"
          //onClick={navigate("/salons")}
        >
          {/* <FaSearch className="fill-white" /> */}
          Search
        </button>
      </form>
    </div>
  );
}
