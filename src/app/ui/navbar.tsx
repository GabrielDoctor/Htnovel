"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { HiCheck } from "react-icons/hi";
import Switch, { SwitchProps } from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "next/link";
import Cookie from "js-cookie";
import { useAuth } from "./contexts/AuthContext";
import { styled } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import SearchBar from "./SearchBar";
import { ToggleThemeBtn } from "./parts/ToggleThemeBtn";
import { Toast } from "flowbite-react";
export default function Navbar() {
  const auth = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [logout, setLogout] = React.useState(false);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    const logout = await fetch("/api/auth/logout", {
      method: "GET",
    });
    const json = await logout.json();
    if (json.Status === "Success") {
      setLogout(true);
    }
    auth?.setUserData(null);
    setTimeout(() => {
      setLogout(false);
    }, 2000);
    handleClose();
  };
  console.log(auth);

  //" centered-container max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl "
  return (
    <Box sx={{ flexGrow: 1, backgroundColor: "white" }}>
      <AppBar className="dark:!bg-stone-700" position="static">
        <Toolbar
          className="md:max-w-7xl md:ml-40 md:mr-40"
          sx={{ justifyContent: "space-between", flexWrap: "wrap" }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link className="font-bold " href={"/"}>
              LNnovel
            </Link>
          </Typography>
          {auth?.userData?.role === "Admin" && (
            <Link
              className=" mx-3 inline-block text-center px-6 py-2 text-white bg-blue-500 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50 rounded transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-95 active:bg-blue-700"
              href={"/admin"}
            >
              Manage
            </Link>
          )}

          <Link
            className="inline-block font-bold text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300 active:bg-blue-700 rounded-md border border-transparent px-4 py-2 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-95"
            href="/translate"
          >
            CV Vietnamese
          </Link>
          <ToggleThemeBtn />
          {auth?.userData?.name === "Guest" || !auth?.userData ? (
            <Link
              href="/signin"
              className="inline-block px-6 py-2 text-white bg-black hover:bg-amber-600 focus:outline-none focus:shadow-outline rounded-xl"
            >
              Login
            </Link>
          ) : (
            <div>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <Avatar
                  alt="avatar"
                  src={
                    auth?.userData?.avatar ??
                    "https://cdn.donmai.us/original/db/29/__hakurei_reimu_touhou_drawn_by_chamaji__db29c8cdb776f646690952bba3ee6043.jpg"
                  }
                  className="ring-2 ring-white ring-opacity-60 shadow-lg hover:shadow-xl transition-shadow duration-300"
                />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {logout && (
        <Toast>
          <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
            <HiCheck className="h-5 w-5" />
          </div>
          <div className="ml-3 text-sm font-normal">Logout successfully.</div>
          <Toast.Toggle />
        </Toast>
      )}
    </Box>
  );
}
