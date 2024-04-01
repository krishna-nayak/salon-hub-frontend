import { buttonVariants } from "@/components/ui/button";
import UseGetProfile from "@/hooks/fetch/useGetProfile";
import { cn } from "@/lib/utils";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { AiTwotoneShop } from "react-icons/ai";
import { MdOutlinePerson3 } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";

const Nav = ({ links, className }) => {
  const location = useLocation();
  const user = UseGetProfile();

  return (
    <nav className={cn("flex flex-col  lg:space-x-0 lg:space-y-1", className)}>
      <div className="flex justify-between max-md:p-2">
        <div className="flex gap-2 p-2">
          <img
            src={
              user?.imageUrl ||
              `https://avatar.iran.liara.run/username?username=${user?.fullName}`
            }
            alt="pic"
            className="rounded-full w-12 h-12"
          />
          {user && (
            <div className="flex flex-col">
              <span>{user.role}</span>
              <span>{user.name}</span>
            </div>
          )}
        </div>
        <div className="flex gap-2 ">
          <Link to={"/"} className="hidden max-md:block mt-2">
            <IoHomeOutline size={20} />
          </Link>
          <div className="hidden max-md:block ">
            <Link
              to={"#"}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "hover:bg-transparent hover:underline ",
                "justify-start"
              )}
              onClick={() => {
                localStorage.removeItem("userId");
                window.location = "/";
              }}
            >
              <LuLogOut size={20} />
            </Link>
          </div>
        </div>
      </div>

      {links.map((link, idx) => (
        <Link
          key={idx}
          to={link.to}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            location.pathname === link.to
              ? "bg-muted hover:bg-muted "
              : "hover:border-yellow-400 hover:border-2  hover:underline ",
            "justify-start gap-2 w-full"
          )}
        >
          <MdOutlinePerson3 size={20} />
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
              : " hover:border-yellow-400 hover:border-2  hover:underline",
            "justify-start gap-2 w-full"
          )}
        >
          <AiTwotoneShop size={20} />
          My Salon
        </Link>
      )}
      <div className="hidden md:block">
        <Link
          to={"/"}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            location.pathname === "/"
              ? "bg-muted hover:bg-muted"
              : "hover:border-yellow-400 hover:border-2  hover:underline",
            "justify-start gap-2 w-full"
          )}
        >
          <IoHomeOutline size={20} />
          Home
        </Link>
      </div>
      <div className="hidden md:block">
        <Link
          to={"#"}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "hover:border-yellow-400 hover:border-2 hover:underline ",
            "justify-start gap-2 w-full"
          )}
          onClick={() => {
            localStorage.removeItem("userId");
            window.location = "/";
          }}
        >
          <LuLogOut size={20} />
          Log out
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
