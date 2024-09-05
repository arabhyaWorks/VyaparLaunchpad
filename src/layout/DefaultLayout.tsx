import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/common/Header";
import Sidebar from "../components/Sidebar/index";

const DefaultLayout = ({ children }) => {
  const { pathname } = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Define the routes that should only render children
  const simpleRoutes = [
    "/store-onboarding",
    "/voice",
    "/product-page",
    "/product-onboarding",
    "/signin",
    "/signup",
    "/",
  ];

  const isLiveRoute = pathname.startsWith("/live");

  if (simpleRoutes.includes(pathname) || isLiveRoute) {
    return <>{children}</>;
  }

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark bg-[#FDE7A8]">
      <div className="flex h-screen overflow-hidden">
        {!isLiveRoute && (
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        )}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {!isLiveRoute && <Header />}
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
