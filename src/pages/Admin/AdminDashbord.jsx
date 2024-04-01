import endpoint from "@/utility/axios";
import { useEffect, useState } from "react";

/**
 * @Todo
 * Delete Users Account or Block Users.
 * Remove Salon Account from register Account if user request.
 * Data Filter out based on Shop, User
 */
const AdminDashbord = () => {
  const [users, setUsers] = useState([]);

  const fetchAllUsers = async () => {
    const response = await endpoint.get(`/users`);
    const users = response.data;
    setUsers(users);
  };

  useEffect(() => {
    fetchAllUsers();
  }, []);
  return (
    <div>
      <h1>Dashbord</h1>
      {users?.map((user, idx) => (
        <div key={idx} className="flex gap-4">
          <div>{user.fullName}</div>
          <div>{user.email}</div>
          <div>{user.role}</div>
          {/**
           * Open a Model
           * Show the all upcomming appointments on model
           * TODO: Cancel Appointment and return payment if it follow the term and condition
           */}
          <a href="#" className="text-blue-400">
            Appointment
          </a>
        </div>
      ))}
    </div>
  );
};

export default AdminDashbord;
