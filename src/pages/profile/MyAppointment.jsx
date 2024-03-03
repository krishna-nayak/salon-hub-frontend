import endpoint from "@/utility/axios";
import React, { useEffect, useState } from "react";

const MyAppointment = React.memo(() => {
  const [myAppointment, setMyAppointment] = useState([]);
  useEffect(() => {
    async function fetchMyAppointment() {
      const userId = localStorage.getItem("userId");
      const results = await endpoint.get(`/user/appointment/${userId}`);
      setMyAppointment(results.data);
    }
    fetchMyAppointment();
  }, []);
  console.log("heelo/");
  return (
    <div>
      <h3 className="text-2xl font-bold my-3">Appointment</h3>
      <div>
        <div className="flex gap-10 justify-between">
          <span className="font-medium">Name</span>
          <span className="font-medium">Service</span>
          <span className="font-medium">Salon name</span>
          <span className="font-medium">date</span>
          <span className="font-medium">time</span>
          <span className="font-medium">price</span>
          <span className="font-medium">city</span>
        </div>
        {myAppointment.map((appoint, idx) => (
          <div key={idx} className="">
            <div className="flex gap-10 justify-between">
              <span className="font-medium">{appoint.username}</span>
              <span className="font-medium">{appoint.service_name}</span>
              <span className="font-medium">{appoint.salon.name}</span>
              <span className="font-medium">{appoint.date}</span>
              <span className="font-medium">{appoint.time}</span>
              <span className="font-medium">₹{appoint.price}</span>
              <span className="font-medium">{appoint.salon.city}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default MyAppointment;
