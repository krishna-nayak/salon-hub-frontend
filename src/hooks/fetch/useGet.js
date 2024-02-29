import endpoint from "@/utility/axios";
import React, { useEffect, useState } from "react";

const UseGet = () => {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const service_json = await endpoint.get(`/services`);
      const results = service_json.data;
      let service_opt = [];
      let i = 0;
      for (let result of results) {
        let renamedObject = Object.assign(
          {},
          {
            id: i++,
            value: result.service_type.replace(/\b\w/g, (c) => c.toUpperCase()),
            label: result.service_type.replace(/\b\w/g, (c) => c.toUpperCase()),
            serviceId: result.serviceId,
            price: null,
          }
        );

        service_opt.push(renamedObject);
      }
      setOptions(service_opt);
    };
    fetch();
  }, []);

  return options;
};

export default UseGet;
