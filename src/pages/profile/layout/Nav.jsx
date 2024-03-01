import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ links }) => {
  return (
    <nav>
      {/* {console.log(links)} */}
      {links.map((link, idx) => (
        <div key={idx}>
          <Link to={link.to}>{link.title}</Link>
        </div>
      ))}
      <div>
        <Link
          to={"#"}
          onClick={() => {
            localStorage.removeItem("userId");
            window.location = "/";
          }}
        >
          Log out
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
