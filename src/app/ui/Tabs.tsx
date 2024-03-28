"use client";
import * as React from "react";
import { Tabs } from "flowbite-react";
import { HiAdjustments, HiClipboardList, HiUserCircle } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import ChapterList from "./ChapterList";
export default function FullWidthTabs({ description, novel_id }: any) {
  let customTabTheme = {
    base: "flex flex-col gap-2",
    tablist: {
      base: "flex text-center align-items justify-around",
      styles: {
        default: "flex-wrap border-b border-gray-200 dark:border-gray-700",
        underline:
          "-mb-px flex-unwrap no-scrollbar overflow-scroll border-b border-gray-200 dark:border-gray-700",
        pills:
          "flex-wrap space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400",
        fullWidth:
          "grid w-full grid-flow-col divide-x divide-gray-200 rounded-none text-sm font-medium shadow dark:divide-gray-700 dark:text-gray-400",
      },
      tabitem: {
        base: "flex items-center justify-center  p-4 text-sm font-medium first:ml-0 focus:border-b-2 focus:border-solid focus:border-blue-500 disabled:cursor-not-allowed disabled:text-gray-400 disabled:dark:text-gray-500",
        styles: {
          default: {
            base: "rounded-t-lg",
            active: {
              on: "bg-gray-100  text-cyan-600 dark:bg-gray-800 dark:text-cyan-500",
              off: "text-gray-500 hover:bg-gray-50 hover:text-gray-600 dark:text-gray-400 dark:hover:bg-gray-800  dark:hover:text-gray-300",
            },
          },
          underline: {
            base: "flex flex-col sm:flex-row",
            active: {
              on: "active   border-cyan-600 text-cyan-600 dark:border-cyan-500 dark:text-cyan-500",
              off: " border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
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
      base: "",
      styles: {
        default: "",
        underline: "",
        pills: "",
        fullWidth: "",
      },
    },
    tabpanel: "py-3",
  };
  console.log(description);
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <div className="h-full w-full">
      <Tabs
        aria-label="Tabs with icons"
        style="underline"
        theme={customTabTheme}
      >
        <Tabs.Item active title="Description" icon={HiUserCircle}>
          {description}
        </Tabs.Item>
        <Tabs.Item title="Table of content" icon={MdDashboard}>
          <ChapterList novel_id={novel_id} />
        </Tabs.Item>

        <Tabs.Item title="Comments" icon={HiClipboardList}>
          This is{" "}
          <span className="font-medium text-gray-800 dark:text-white">
            Contacts tab's associated content
          </span>
          . Clicking another tab will toggle the visibility of this one for the
          next. The tab JavaScript swaps classes to control the content
          visibility and styling.
        </Tabs.Item>
      </Tabs>
    </div>
  );
}
