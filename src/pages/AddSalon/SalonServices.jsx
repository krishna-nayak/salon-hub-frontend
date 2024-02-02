import React, { useState } from "react";

export default function SalonServices({ salonData, setSalonData }) {
  const [serviceInput, setServiceInput] = useState("");
  const [priceInput, setPriceInput] = useState("");
  const [descInput, setdescInput] = useState("");
  const [durationInput, setdurationInput] = useState("");
  const [tags, setTags] = useState([]);
  const addTag = () => {
    if (serviceInput.trim() !== "" && priceInput.trim() !== "") {
      const tag = {
        service: serviceInput,
        price: priceInput,
        description: descInput,
        duration: durationInput,
      };
      setTags([...tags, tag]);
      setServiceInput("");
      setPriceInput("");
      setdescInput("");
      setdurationInput("");
    }
  };

  const removeTag = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };
  return (
    <div className="">
      <div>
        <label className="block mb-2 text-2xl font-bold  text-gray-900 ">
          Service Provided
        </label>
        <div className="m-auto my-5 bg-gray-300 min-w-60 max-w-90 flex flex-wrap min-h-30 border border-gray-300 rounded-lg p-10">
          <input
            value={serviceInput}
            onChange={(e) => setServiceInput(e.target.value)}
            className="w-full py-2.5 px-3 rounded-md mb-2 bg-white"
            placeholder="Enter service provided"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTag();
              }
            }}
          />
          <input
            value={priceInput}
            onChange={(e) => setPriceInput(e.target.value)}
            className="w-full py-2.5 px-3 rounded-md mb-2 bg-white"
            placeholder="Enter service price"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTag();
              }
            }}
          />
          <input
            value={descInput}
            onChange={(e) => setdescInput(e.target.value)}
            className="w-full py-2.5 px-3 rounded-md mb-2 bg-white"
            placeholder="Description"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTag();
              }
            }}
          />
          <input
            value={durationInput}
            onChange={(e) => setdurationInput(e.target.value)}
            className="w-full py-2.5 px-3 rounded-md mb-2 bg-white"
            placeholder="Time taken to complete"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTag();
              }
            }}
          />
          {tags.map((tag, index) => (
            <div key={index} className="flex bg-white m-1 p-2 rounded-lg">
              <span className="mt-1">
                {tag.service} : {tag.price}/-
                <br />
                Description:{tag.description}
                <br />
                Duration:{tag.duration}
              </span>

              <span
                onClick={() => removeTag(tag)}
                className="ml-2 text-sm font-bold bg-white py-1 cursor-pointer"
              >
                X
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/*
<button
     type="submit"
     className="w-full text-white bg-neutral-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center -600 rimary-700 -primary-800"
    >
    Create Salon
</button>{" "}
*/
