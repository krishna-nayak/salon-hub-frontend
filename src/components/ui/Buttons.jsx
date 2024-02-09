import React from "react";

export default function Buttons(props) {
  const { children, onClick, disabled, type } = props;

  return (
    <div>
      <button
        className="w-full  text-white bg-neutral-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center-600"
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        {children}
      </button>
    </div>
  );
}
