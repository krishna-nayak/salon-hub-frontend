import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import React, { useState } from "react";

import Nav from "./Nav";

import { Outlet, Navigate } from "react-router-dom";

const ProfileLayout = () => {
  const userId = localStorage.getItem("userId");
  const [isCollapsed, setIsCollapsed] = useState(false);
  console.log(userId);
  return userId ? (
    <section>
      <ResizablePanelGroup
        direction="horizontal"
        className="h-full max-h-[800px] items-stretch rounded-lg border"
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
          maxSize={20}
          defaultSize={20}
          className="min-w-[100px]"
        >
          <div className="flex-col h-full items-center justify-center p-6">
            <Nav
              links={[
                { title: "Profile", to: "/profile/user" },
                { title: "My Appointment", to: "/profile/my-appointment" },
              ]}
            />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <div className="flex-col h-full p-6">
            <div>
              <Outlet />
            </div>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </section>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProfileLayout;
