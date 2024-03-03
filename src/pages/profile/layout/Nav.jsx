import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Nav = ({ links, className }) => {
  const location = useLocation();

  return (
    <nav
      className={cn(
        "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
        className
      )}
    >
      {links.map((link, idx) => (
        <Link
          key={idx}
          to={link.to}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            location.pathname === link.to
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {link.title}
        </Link>
      ))}
      <Link
        to={"#"}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "hover:bg-transparent hover:underline",
          "justify-start"
        )}
        onClick={() => {
          localStorage.removeItem("userId");
          window.location = "/";
        }}
      >
        Log out
      </Link>
    </nav>
  );
};

export default Nav;
