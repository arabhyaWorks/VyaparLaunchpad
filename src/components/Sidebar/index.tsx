import React, { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import Text from "../../Bhasini/Text";

import SidebarLinkGroup from "./SidebarLinkGroup";

import Player from "../../assets/Sidebar/player.svg";
import Upload from "../../assets/Sidebar/upload.svg";
import settings from "../../assets/Sidebar/Setting.svg";
import youraudiobook from "../../assets/Sidebar/your audiobooks.svg";
import sub from "../../assets/Sidebar/subscriptions.svg";
import auth from "../../assets/Sidebar/Logout.svg";

import Google from "../../assets/Sidebar/playStore.svg";
import Apple from "../../assets/Sidebar/appStore.svg";
import useLogout from "../../hooks/auth";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const location = useLocation();
  const logout = useLogout();
  const { pathname } = location;

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      style={{ width: "18rem" }}
      className={`absolute left-0 font-poppins top-0 z-9999 flex h-screen  flex-col overflow-y-hidden bg-[#FFFBEE] duration-300 ease-linear  lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className=" p-3">
        <h1 className="text-[#170F49] font-extrabold text-3xl px-4 font-ubuntu">
          <span className="text-black">Vya</span>
          <span className="text-[#FCBD01]">par</span>{" "}
          <span className="text-black">Launch</span>
          <span className="text-[#FCBD01]">pad</span>
        </h1>
      </div>

      <div className="flex items-center justify-between font-poppins gap-0 ml-2 px-2 pb-5.5 lg:py-6.5">
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-[#7C8DB5]">
              <Text>MENU</Text>
            </h3>

            <ul className="mb-0 flex flex-col gap-0.5">
              <li>
                <NavLink
                  to="/dashboard"
                  className={`group relative text-sm flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-[#2E3271] duration-300 ease-in-out hover:text-[#006A66] ${
                    pathname.includes("calendar") && "hover:text-[#006A66]"
                  }`}
                >
                  <img src={Player} />
                  <Text>Dashboard</Text>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className={`group relative text-sm flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-[#2E3271] duration-300 ease-in-out hover:text-[#006A66] ${
                    pathname.includes("calendar") && "hover:text-[#006A66]"
                  }`}
                >
                  <img src={Player} />
                  <Text>Product</Text>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/dashboard"
                  className={`group relative flex text-sm items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-[#2E3271] duration-300 ease-in-out hover:text-[#006A66] ${
                    pathname.includes("profile") && "text-[#006A66]"
                  }`}
                >
                  <img src={Upload} />
                  <Text>Product Checklist</Text>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/mystore"
                  className={`group relative flex text-sm items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-[#2E3271] duration-300 ease-in-out hover:text-[#006A66] ${
                    pathname.includes("tables") && "text-[#006A66]"
                  }`}
                >
                  <img src={youraudiobook} />
                  <Text>My Store</Text>
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/inventory"
                  className={`group relative flex text-sm items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-[#2E3271] duration-300 ease-in-out hover:text-[#006A66] ${
                    pathname.includes("tables") && "text-[#006A66]"
                  }`}
                >
                  <img src={youraudiobook} />
                  <Text>Inventory</Text>
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4  mt-6 ml-4 text-sm font-semibold text-[#7C8DB5]">
              <Text>GENERAL</Text>
            </h3>

            <ul className="mb-6 text-sm flex flex-col gap-0.5">
              <li>
                <NavLink
                  to="/store-onboarding"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-[#2E3271] duration-300 ease-in-out  ${pathname.includes(
                    "settings"
                  )}`}
                >
                  <img src={settings} />
                  <Text>Store Onboarding</Text>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-[#2E3271] duration-300 ease-in-out  ${pathname.includes(
                    "settings"
                  )}`}
                >
                  <img src={settings} />
                  <Text>Settings</Text>
                </NavLink>
              </li>

              <SidebarLinkGroup
                activeCondition={pathname === "/ui" || pathname.includes("ui")}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-[#2E3271] duration-300 ease-in-out ${
                          pathname === "/ui" || pathname.includes("ui")
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <img src={sub} />
                        <Text>Subscription</Text>
                      </NavLink>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>

              <SidebarLinkGroup
                activeCondition={
                  pathname === "/auth" || pathname.includes("auth")
                }
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-[#2E3271] duration-300 ease-in-out ${
                          pathname === "/auth" || pathname.includes("auth")
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          logout();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        <img src={auth} />
                        <Text>Authentication</Text>
                      </NavLink>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 mt-24 ml-4 text-sm font-semibold text-[#FFFBEE]">
              GO MOBIL
            </h3>

            <ul className="mb-6  flex flex-col gap-1.5">
              <div className="ml-4 py-5 px-[-2] flex flex-row">
                <a target="_blank" href="#">
                  <img
                    alt="Google Store"
                    loading="lazy"
                    width={108}
                    height={80}
                    decoding="async"
                    data-nimg={1}
                    style={{ color: "transparent" }}
                    src={Google}
                    className="mr-8 gap-8"
                  />
                </a>
                <a target="_blank" href="#">
                  <img
                    alt="Apple Store"
                    loading="lazy"
                    width={119}
                    height={40}
                    decoding="async"
                    data-nimg={1}
                    style={{ color: "transparent" }}
                    src={Apple}
                    className="mr-2"
                  />
                </a>
              </div>
              <div className="mt-0 ml-3">
                <Text className="text-xs text-[#7C8DB5]">
                  Legal - Privacy - Cookie Policy - Cookie
                </Text>
                <Text className="text-xs text-[#7C8DB5]">
                  Blog Manage - Imprint Resource Chart
                </Text>
              </div>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
