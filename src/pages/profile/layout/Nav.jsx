import React from "react";
import { Link } from "react-router-dom";

const Nav = ({ links }) => {
  return (
    <div>
      {/* {console.log(links)} */}
      {links.map((link, idx) => (
        <nav key={idx}>
          <Link to={link.to}>{link.title}</Link>
        </nav>
      ))}
    </div>
  );
};

export default Nav;
