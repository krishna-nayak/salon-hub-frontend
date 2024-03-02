import React from "react";
import svetor from "../assets/svetor.png";
import stitle from "../assets/stitle.png";
import { Button } from "@/components/ui/button";
export default function Navbar() {
  return (
    <div className="h-20 bg-yellow-400">
      <div className="flex justify-between">
        <div className="flex">
          <img src={svetor} alt="" className="w-20" />
          <img src={stitle} alt="" className="h-10 w-28 mt-4" />
        </div>
        <div className="p-4">
          <Button> ACCOUNT</Button>
        </div>
      </div>
    </div>
  );
}
