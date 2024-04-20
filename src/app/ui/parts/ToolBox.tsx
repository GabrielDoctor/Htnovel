import React from "react";
import { ZhContext } from "../contexts/ToolBoxContext";

export default function ToolBox() {
  const { data, setData } = React.useContext(ZhContext);

  const handleZhLine = () => {
    // Toggle the state between "true" and "false" strings
    setData(data === "true" ? "false" : "true");
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-5">
      <div className="flex items-center">
        <span className="text-gray-900 dark:text-gray-300 mr-4">
          Display in Chinese alongside:
        </span>

        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            onChange={handleZhLine} // Use onChange and the handler function
            className="sr-only peer"
            checked={data === "true"} // Use boolean for checked attribute
          />
          <div className="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );
}
