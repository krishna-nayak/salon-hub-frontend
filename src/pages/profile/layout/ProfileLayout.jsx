import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import React, { useState, useEffect } from "react";

import Nav from "./Nav";

import { Outlet, Navigate, useLocation } from "react-router-dom";

const ProfileLayout = () => {
  const userId = localStorage.getItem("userId");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return userId ? (
    <section className="">
      {isMobileView ? (
        <div className="flex flex-col">
          <div className="flex-none">
            <Nav
              links={[
                // { title: "Profile", to: "/profile/user" },
                { title: "My Appointment", to: "/profile/my-appointment" },
              ]}
            />
          </div>
          <div className="flex-grow p-6 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      ) : (
        <ResizablePanelGroup
          direction="horizontal"
          className="h-full items-stretch rounded-lg border fixed"
          onLayout={(sizes) => {
            document.cookie = `react-resizable-panels:layout=${JSON.stringify(
              sizes
            )}`;

            if (sizes[0] === 5) setIsCollapsed(true);
            else setIsCollapsed(false);
          }}
        >
          <ResizablePanel
            collapsedSize={"5"}
            collapsible={true}
            minSize={10}
            maxSize={15}
            defaultSize={25}
            className="min-w-[100px] "
          >
            <div className="flex-col h-full items-center justify-center py-6">
              <Nav
                links={[
                  // { title: "Profile", to: "/profile/user" },
                  { title: "My Appointment", to: "/profile/my-appointment" },
                ]}
              />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel>
            <div className="flex-col h-full p-6 overflow-y-auto">
              <div>
                <Outlet />
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      )}
    </section>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProfileLayout;
