import endpoint from "@/utility/axios";
import { createDateFormat, createDateFromTime } from "@/utility/convert";
import React, { useEffect, useState } from "react";

const UseFetchAppointments = (salonId, date) => {
  const [appointment, setAppointment] = useState([]);
  useEffect(() => {
    async function fetch() {
      const appoint_data = await endpoint.get(`/salon/appointment/${salonId}`);

      const results_appoint = appoint_data?.data || [];

      const selectedDate = createDateFormat(date);
      const results = results_appoint?.filter(
        (appointment) => appointment.date === selectedDate
      );

      const appoint_member = [];
      for (let result of results) {
        let renamedObject = Object.assign(
          {},
          {
            time: createDateFromTime(result.time, date),
            totalDuration: result.duration,
          }
        );
        appoint_member.push(renamedObject);
      }

      setAppointment(appoint_member);
    }
    fetch();
  }, []);
  return appointment;
};

export default UseFetchAppointments;
