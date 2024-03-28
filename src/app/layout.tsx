import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import Navbar from "@/app/ui/navbar";
import { Typography, Link } from "@mui/material";
import { AuthProvider } from "./ui/contexts/AuthContext";
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
    <html className={cookies().get("theme")?.value || "light"} lang="en">
      <body className={inter.className + " dark:bg-black dark:text-white"}>
        <AppRouterCacheProvider>
          <Script
            defer
            src="https://admin.htnovel.tech/script.js"
            data-website-id="049fd73a-0c94-4b77-8191-a0617948210c"
          ></Script>
          <AuthProvider>
            <Navbar />

            {children}
          </AuthProvider>
          <Copyright
            className="dark:!text-white"
            component="footer"
            sx={{ mt: 8, mb: 4 }}
          />
          <div className="flex flex-row justify-center items-center mb-1 ">
            <Typography variant="body1" color="initial">
              Contact:{"   "}
            </Typography>
            <Link
              className="bg-sky-900 hover:bg-sky-700 flex flex-row justify-start items-center border-black border-2 rounded-lg px-2 "
              href="https://discord.gg/DQkcPCTd"
            >
              <DiscordIcon />{" "}
              <Typography variant="subtitle1">Discord</Typography>
            </Link>
          </div>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
