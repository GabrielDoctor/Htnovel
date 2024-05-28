"use client";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useState } from "react";
import { useAuth } from "./contexts/AuthContext";
import SettingsModal from "./parts/SettingModel";
import { CustomFlowbiteTheme } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSettings } from "./contexts/SettingContext";
export default function NavBar() {
  const { theme } = useSettings();
  const { userData, setUserData } = useAuth();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const customTheme: CustomFlowbiteTheme["navbar"] = {
    root: {
      base: "bg-white px-2 py-2.5 dark:border-gray-700 dark:bg-gray-800 sm:px-4 sticky top-0 z-50",
      rounded: {
        on: "rounded",
        off: "",
      },
      bordered: {
        on: "border",
        off: "",
      },
      inner: {
        base: "mx-auto flex flex-wrap items-center justify-between",
        fluid: {
          on: "",
          off: "container",
        },
      },
    },
    brand: {
      base: "flex items-center",
    },
    collapse: {
      base: "w-full md:block md:w-auto",
      list: "mt-4 flex flex-col md:mt-0 md:flex-row md:space-x-8 md:text-sm md:font-medium",
      hidden: {
        on: "hidden",
        off: "",
      },
    },
    link: {
      base: `block py-2 pl-3 pr-4 md:p-0 text-white`,
      active: {
        on: "bg-cyan-700  dark:text-white md:bg-transparent md:text-cyan-700 md:font-semibold shadow-lg hover:scale-105 transition-transform duration-200 ease-in-out",
        off: "border-b border-gray-100 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:hover:bg-transparent md:hover:text-cyan-700 md:dark:hover:bg-transparent md:dark:hover:text-white transition duration-300 ease-in-out",
      },
      disabled: {
        on: "text-gray-400 hover:cursor-not-allowed dark:text-gray-600",
        off: "",
      },
    },
    toggle: {
      base: "inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden",
      icon: "h-6 w-6 shrink-0",
    },
  };

  const toggleSettingsModal = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };
  const pathname = usePathname;
  const handleLogOut = async () => {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      setUserData(null);
    }
  };

  return (
    <Navbar
      theme={customTheme}
      fluid={true}
      rounded={true}
      className="bg-gradient-to-r from-blue-500 to-teal-400 dark:from-gray-700 dark:to-gray-900 shadow-xl rounded-lg px-4 py-2.5 text-white"
    >
      <Navbar.Brand as={Link} href="/">
        <img
          src="/images/logo.webp"
          className="mr-3 h-6 rounded"
          alt="Flowbite React Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          HTnovel
        </span>
      </Navbar.Brand>

      <div className="flex md:order-2">
        {userData?.role === "Admin" && <Link href={`/admin`}>Manager</Link>}
        {userData ? (
          <div className="flex flex-row gap-5">
            <button
              onClick={toggleSettingsModal}
              className=" rounded-md bg-zinc-600 hover:bg-slate-300 p-2 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Image
                src={`/images/setting.svg`}
                width={24}
                height={24}
                alt="Setting icon"
                className="text-white"
              />
            </button>
            {isSettingsOpen && (
              <SettingsModal
                isOpen={isSettingsOpen}
                setIsOpen={setIsSettingsOpen}
              />
            )}
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
                  alt="User Avatar"
                  img={
                    userData?.photo ||
                    "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                  }
                  rounded
                />
              }
            >
              <Dropdown.Header>
                <span className="block truncate text-sm font-medium">
                  {userData?.user_name}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>
                <Link href="/booklist">Booklist</Link>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogOut}>Sign out</Dropdown.Item>
            </Dropdown>
            <Navbar.Toggle />
          </div>
        ) : (
          <Link
            className="bg-blue-600 p-2  rounded-full shadow-lg transition duration-200 ease-in-out transform hover:scale-110 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            href="/signin"
          >
            <Image
              src={`/images/login.svg`}
              width={20}
              height={20}
              alt="Login icon"
            />
          </Link>
        )}
      </div>
      <Navbar.Collapse>
        <Navbar.Link
          className="text-white"
          as={Link}
          href="/"
          {...{ active: pathname() === "/" }}
        >
          Home
        </Navbar.Link>
        <Navbar.Link
          className="text-white"
          href="#"
          {...{ active: pathname() === "/about" }}
        >
          About
        </Navbar.Link>
        <Navbar.Link
          className="text-white"
          as={Link}
          href="/translate"
          {...{ active: pathname() === "/translate" }}
        >
          Translate
        </Navbar.Link>
        <Navbar.Link
          className="text-white"
          as={Link}
          href="/ocr"
          {...{ active: pathname() === "/ocr" }}
        >
          OCR
        </Navbar.Link>
        <Navbar.Link className="text-white" as={Link} href="#">
          Contact
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
