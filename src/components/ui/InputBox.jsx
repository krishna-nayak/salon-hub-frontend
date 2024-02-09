import React from "react";

export default function InputBoxs(props) {
  const {
    placeholder,
    value,
    onChange,
    id,
    name,
    type,
    autoComplete,
    required,
    describedby,
  } = props;
  return (
    <div>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 0 y-600 r-gray-400  "
        placeholder={placeholder}
        value={value}
        type={type}
        onChange={onChange}
        id={id}
        name={name}
        autoComplete={autoComplete}
        required={required}
        describedby={describedby}
      ></input>
    </div>
  );
}
