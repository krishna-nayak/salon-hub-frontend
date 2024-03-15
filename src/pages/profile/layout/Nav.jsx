import { buttonVariants } from "@/components/ui/button";
import UseGetProfile from "@/hooks/fetch/useGetProfile";
import { cn } from "@/lib/utils";
import React from "react";
import { Link, useLocation } from "react-router-dom";

import { CircleUser } from "lucide-react";
const Nav = ({ links, className }) => {
  const location = useLocation();
  const user = UseGetProfile();

  return (
    <nav
      className={cn(
        "flex flex-col space-x-2  lg:space-x-0 lg:space-y-1",
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
            "justify-start gap-2"
          )}
        >
          <CircleUser />
          {link.title}
        </Link>
      ))}
      {user?.role === "SHOPKEEPER" && (
        <Link
          to={"/profile/salon"}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            location.pathname === "/profile/salon"
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          My Salon
        </Link>
      )}
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
