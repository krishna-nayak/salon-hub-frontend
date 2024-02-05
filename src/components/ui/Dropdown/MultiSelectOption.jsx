import { useState } from "react";
import Select from "react-select";

const MultiSelectOption = ({ Options, setStyles }) => {
  const [values, setValues] = useState([]);

  const handleChange = (e) => {
    const update_values = values.map((value, key) => {
      if (key === parseInt(e.target.name) && e.target.id === "price")
        return { ...value, price: e.target.value };
      return value;
    });
    setValues(update_values);
    console.log("update_values", update_values);
    setStyles(update_values);
  };
  return (
    <div className="">
      <label className="block mb-2 text-2xl font-bold  text-gray-900 ">
        Service Provided
      </label>
      <div className=" flex flex-col  items-center justify-center">
        <div className="mt-4 bg-slate-100  border border-gray-300 rounded-lg p-8">
          <div className=" w-96 max-sm:w-80 rounded-md  bg-white ">
            <Select
              className={"capitalize"}
              closeMenuOnSelect={false}
              defaultValue={null}
              value={values}
              isMulti
              isClearable
              onChange={(newValue, actionMeta) => {
                setValues(newValue);
                setStyles(newValue);
              }}
              options={Options}
            />
          </div>
          <div className="mt-8">
            {values?.map((value, index) => {
              return (
                <div key={index}>
                  <div className="grid grid-cols-4 justify-between my-2 gap-2 mt-6">
                    <span>{value.label}</span>
                    <input
                      type="text"
                      name={index}
                      id="description"
                      placeholder="description"
                      className="border-2 py-2 px-3 rounded-md mb-2 bg-white"
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name={index}
                      id="duration"
                      placeholder="duration"
                      className="border-2 py-2 px-3 rounded-md mb-2 bg-white"
                      onChange={handleChange}
                    />
                    <input
                      type="text"
                      name={index}
                      id="price"
                      placeholder="₹0.0"
                      className="border-2 py-2 px-3 rounded-md mb-2 bg-white"
                      onChange={handleChange}
                    />
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiSelectOption;
