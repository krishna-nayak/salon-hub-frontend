import React, { useEffect, useState } from "react";
import MultiSelectOption from "../../components/ui/Dropdown/MultiSelectOption";

import endpoint from "../../utility/axios";

let Options = [
  { value: "Hair Cut", label: "Hair Cut", price: 0 },
  { value: "Hair Color", label: "Hair Color", price: 0 },
  { value: "Manicure", label: "Manicure", price: 0 },
  { value: "Pedicure", label: "Pedicure", price: 0 },
  { value: "Shaving", label: "Shaving", price: 0 },
  { value: "Makeup", label: "Makeup", price: 0 },
];

export default function SalonServices({ setStyles }) {
  const [options, setOptions] = useState(Options);

  useEffect(() => {
    fetchServices();
    async function fetchServices() {
      const service_json = await endpoint.get(`/services`);
      console.log(service_json.data);
      const results = service_json.data;
      let service_opt = [];
      for (let result of results) {
        let renamedObject = Object.assign(
          {},
          {
            value: result.service_type.toUpperCase(),
            label: result.service_type.toUpperCase(),
            price: null,
            serviceId: result.serviceId,
          }
        );
        service_opt.push(renamedObject);
      }

      setOptions(service_opt);
    }
  }, []);

  return <MultiSelectOption Options={options} setStyles={setStyles} />;
}
