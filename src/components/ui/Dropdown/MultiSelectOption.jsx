import { useState } from "react";
import Select from "react-select";

const colourOptions = [
  { value: "Hair Cut", label: "Hair Cut", price: 0 },
  { value: "Hair Color", label: "Hair Color", price: 0 },
  { value: "Manicure", label: "Manicure", price: 0 },
  { value: "Pedicure", label: "Pedicure", price: 0 },
];

const MultiSelectOption = () => {
  const [values, setValues] = useState([]);

  const handleChange = (e) => {
    const update_values = values.map((value, key) => {
      if (key === parseInt(e.target.name))
        return { ...value, price: e.target.value };
      return value;
    });
    setValues(update_values);
  };
  return (
    <div className="mx-4">
      MultiSelectOption
      <div>
        <Select
          closeMenuOnSelect={false}
          defaultValue={null}
          value={values}
          isMulti
          isClearable
          onChange={(newValue, actionMeta) => {
            setValues(newValue);
          }}
          options={colourOptions}
        />
      </div>
      <br />
      <hr />
      <br />
      <div>
        {values?.map((value, index) => {
          return (
            <div key={index}>
              <div className="flex justify-between my-2">
                <span>{value.label}</span>
                <input
                  type="text"
                  name={index}
                  id="price"
                  placeholder="₹0.0"
                  className="border-2"
                  onChange={handleChange}
                />
              </div>
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MultiSelectOption;
