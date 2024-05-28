"use client";
import React, { useState } from "react";

export default function ImageUploadForm() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [text, setText] = useState("");

  const handleImageChange = (e: any) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!selectedImage) {
      alert("Please select an image first.");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedImage);

    try {
      const response = await fetch("/api/ocr", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      setText(data.text);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload image.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-2">
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="mb-4 file:border file:border-solid file:border-gray-300 file:px-2 file:py-1 file:text-sm file:bg-white file:text-gray-700 hover:file:bg-gray-100"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Upload
        </button>
      </form>
      {text && (
        <div className="mt-4">
          <p className="text-lg font-semibold mb-2">Extracted Text:</p>
          <textarea
            value={text}
            readOnly
            rows={40}
            className="w-full p-2 border border-gray-300 rounded dark:text-black"
          />
        </div>
      )}
    </div>
  );
}
