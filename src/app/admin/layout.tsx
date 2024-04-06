"use client";
import { verifyToken } from "@/lib/utils";
import { useAmp } from "next/amp";
import { cookies } from "next/headers";
import { useAuth } from "../ui/contexts/AuthContext";
import { Tabs } from "flowbite-react";
import Link from "next/link";
import Head from "next/head";
import { Children } from "react";
export default function Admin({ children }: any) {
  const auth = useAuth();
  const TabStyle = {
    base: "flex  flex-col sm:flex-row gap-2 h-full w-full",
    tablist: {
      base: "flex  flex-row sm:flex-col  text-center sm:flex-start pb-auto border-2 border-b border-gray-200 dark:border-gray-700",
      styles: {
        default: "flex-wrap border-b border-gray-200 dark:border-gray-700",
        underline:
          "-mb-px flex-wrap border-b border-gray-200 dark:border-gray-700",
        pills:
          "flex-wrap space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400",
        fullWidth:
          "grid w-full grid-flow-col divide-x divide-gray-200 rounded-none text-sm font-medium shadow dark:divide-gray-700 dark:text-gray-400",
      },
      tabitem: {
        base: "flex text-2xl focus:border-b focus:border-b-2 focus:border-solid focus:border-blue-500  first:ml-0 items-center justify-center rounded-t-lg p-4 text-sm font-medium first:ml-0  disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
        styles: {
          default: {
            base: "rounded-t-lg",
            active: {
              on: "bg-gray-100 text-cyan-600 dark:bg-gray-800 dark:text-cyan-500",
              off: "text-gray-500 hover:bg-gray-50 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800  dark:hover:text-gray-300",
            },
          },
          underline: {
            base: "rounded-t-lg",
            active: {
              on: "active rounded-t-lg border-b-2 border-cyan-600 text-cyan-600 dark:border-cyan-500 dark:text-cyan-500",
              off: "border-b-2 border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
            },
          },
          pills: {
            base: "",
            active: {
              on: "rounded-lg bg-cyan-600 text-white",
              off: "rounded-lg hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-white",
            },
          },
          fullWidth: {
            base: "ml-0 flex w-full rounded-none first:ml-0",
            active: {
              on: "active rounded-none bg-gray-100 p-4 text-gray-900 dark:bg-gray-700 dark:text-white",
              off: "rounded-none bg-white hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white",
            },
          },
        },
        icon: "mr-2 h-5 w-5",
      },
    },
    tabitemcontainer: {
      base: "h-full w-full",
      styles: {
        default: "",
        underline: "",
        pills: "",
        fullWidth: "",
      },
    },
    tabpanel: "py-3",
  };
  return auth?.userData?.role === "Admin" ? (
    <div className=" h-screen m-auto">
      <>
        <Head>
          <title>Admin Dashboard</title>
        </Head>

        <Tabs
          aria-label="Tabs with underline"
          style="underline"
          theme={TabStyle}
        >
          <Tabs.Item active title="Manage Books">
            {children}
          </Tabs.Item>
          <Tabs.Item title="Manage Users">
            <span className="font-medium text-gray-800 dark:text-white">
              Manage User
            </span>
          </Tabs.Item>
          <Tabs.Item title="Statistic">
            <Link
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              href="https://admin.htnovel.tech"
            >
              Statistic Page
            </Link>
          </Tabs.Item>
        </Tabs>
      </>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen m-auto">
      <h1 className="text-red-500 text-6xl">
        You dont have permission on this Page
      </h1>
    </div>
  );
}
