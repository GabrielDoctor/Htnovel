import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Navbar from "@/app/ui/NavBar";
import { Typography, Link } from "@mui/material";
import { AuthProvider } from "./ui/contexts/AuthContext";
import { SettingsProvider } from "./ui/contexts/SettingContext";
import DiscordIcon from "@/app/ui/assets/discord";
const inter = Inter({ subsets: ["latin"] });

import Script from "next/script";
export const metadata: Metadata = {
  title: "Light Novel with MTL",
  description: "A web for reading novel with Machine Translation",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  function Copyright(props: any) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="#">
          HTnovel
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  return (
    <html
      className={`${
        cookies().get("theme")?.value === "dark" ? "dark" : ""
      }   dark:bg-slate-800 bg-slate-200 `}
      lang="en"
      suppressHydrationWarning={true}
    >
      <body className="m-0 p-0">
        <Script
          defer
          src="https://admin.htnovel.tech/script.js"
          data-website-id="049fd73a-0c94-4b77-8191-a0617948210c"
        ></Script>
        <AuthProvider>
          <SettingsProvider>
            <Navbar />
            {children}
            <Copyright className="dark:!text-white py-3" component="footer" />
          </SettingsProvider>
        </AuthProvider>

        {/* <div className="flex flex-row justify-center items-center mb-1 ">
            <Typography variant="body1" color="initial">
              Contact:{"   "}
            </Typography>
            <Link
              className="bg-sky-900 hover:bg-sky-700 flex flex-row justify-start items-center border-black border-2 rounded-lg px-2 "
              href=""
            >
              <DiscordIcon />{" "}
              <Typography variant="subtitle1">Discord</Typography>
            </Link>
          </div> */}
      </body>
    </html>
  );
}
