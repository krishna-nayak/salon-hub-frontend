import UseGetProfile from "@/hooks/fetch/useGetProfile";
import React from "react";

const UserProfile = () => {
  const userData = UseGetProfile();
  console.log(userData);
  return (
    <section>
      <div>name: {userData?.name}</div>
      <div>email: {userData?.email}</div>
      <div>
        role: {userData?.role.charAt(0).toUpperCase() + userData?.role.slice(1)}
      </div>
    </section>
  );
};

export default UserProfile;
