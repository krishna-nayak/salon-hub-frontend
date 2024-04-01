import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import endpoint from "@/utility/axios";
import React, { useEffect, useState } from "react";
import service1 from "../../assets/service1.png";
import service2 from "../../assets/service2.png";
import service3 from "../../assets/service3.png";
import service4 from "../../assets/service4.png";
import service5 from "../../assets/service5.png";
import service6 from "../../assets/service6.png";

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
  const serviceImages = {
    haircut: service6,
    facial: service1,
    manicure: service3,
    massage: service2,
    "hair color": service4,
    pedicure: service5,
  };
  return (
    <div>
      <h3 className="text-2xl font-bold my-3 ">Appointment</h3>
      <div className="max-h-[800px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="flex-none">Name</TableHead>
              <TableHead>Service </TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Salon name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>City</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {myAppointment.map((appoint, idx) => (
              <TableRow key={idx}>
                <TableCell>{appoint.username}</TableCell>
                <TableCell>
                  <img
                    src={serviceImages[appoint.service_name]}
                    alt={appoint.salon.name}
                    className="h-12 w-12 "
                  />
                </TableCell>
                <TableCell>{appoint.service_name}</TableCell>
                <TableCell>
                  <span className=" px-2 py-1 w-44 text-yellow-800 font-bold  bg-yellow-50 rounded-lg">
                    {appoint.salon.name}
                  </span>
                </TableCell>
                <TableCell>{appoint.date}</TableCell>
                <TableCell>{appoint.time}</TableCell>
                <TableCell>
                  {" "}
                  <span className=" px-4   font-semibold border border-yellow-400 rounded-xl">
                    ₹{appoint.price}
                  </span>
                </TableCell>
                <TableCell>{appoint.salon.city}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
});

export default MyAppointment;
