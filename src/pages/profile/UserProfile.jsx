import UseGetProfile from "@/hooks/fetch/useGetProfile";
import React from "react";

const UserProfile = () => {
  const userData = UseGetProfile();

  return (
    <section>
      <h3 className="font-bold my-3 text-3xl">My Profile</h3>
      <div>Name: {userData?.name}</div>
      <div>Email: {userData?.email}</div>
      <div>
        Role:{" "}
        {userData?.role?.charAt(0).toUpperCase() +
          userData?.role.slice(1).toLowerCase()}
      </div>
    </section>
  );
};

export default UserProfile;
