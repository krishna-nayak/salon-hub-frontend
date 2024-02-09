import React, { useEffect, useState } from "react";
import { HiMiniScissors } from "react-icons/hi2";
import { FaMicrophoneAlt } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { FaRegStopCircle } from "react-icons/fa";
//import { useNavigate } from "react-router-dom";
import InputBox from "./ui/InputBox";
import Buttons from "./ui/Buttons";
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
        <label htmlFor="voice-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          {/* <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none ">
            <HiMiniScissors className="fill-slate-400" />
          </div> */}
          <InputBox
            value={transcript}
            onChange={() => nul}
            type="text"
            id="voice-search"
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
        <Buttons
          type="submit"
          //onClick={navigate("/salons")}
        >
          {/* <FaSearch className="fill-white" /> */}
          Search
        </Buttons>
      </form>
    </div>
  );
}
