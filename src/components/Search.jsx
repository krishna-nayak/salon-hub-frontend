import React, { useEffect, useState } from "react";
import { HiMiniScissors } from "react-icons/hi2";
import { FaMicrophoneAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaRegStopCircle } from "react-icons/fa";
//import { useNavigate } from "react-router-dom";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
export default function () {
  const { transcript, resetTranscript } = useSpeechRecognition();
  useEffect(() => {
    SpeechRecognition.startListening({ continuous: true });
    console.log("listening starts");
  });
  //const navigate = useNavigate();

  return (
    <div>
      {" "}
      <form className="flex items-center">
        <label for="voice-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
            <HiMiniScissors className="fill-slate-400" />
          </div>

          <input
            value={transcript}
            type="text"
            id="voice-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search by city"
          />
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              SpeechRecognition.stopListening();
              console.log("stop listening");
            }}
            className="absolute inset-y-0 end-0 flex items-center pe-11"
          >
            <FaRegStopCircle className="fill-slate-400" />
          </button>

          <button
            onClick={resetTranscript}
            type="button"
            className="absolute inset-y-0 end-0 flex items-center pe-3"
          >
            <FaMicrophoneAlt className="fill-slate-400" />
          </button>
        </div>
        <button
          type="submit"
          //onClick={navigate("/salons")}
          className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <FaSearch className="fill-white" />
          Search
        </button>
      </form>
    </div>
  );
}
