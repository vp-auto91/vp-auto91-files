"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

const ImageUploader = ({ onImagesChange }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const imageRef = useRef(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*", // Accept only image files
    onDrop: (acceptedFiles) => {
      setSelectedImages((prevImages) => [...prevImages, ...acceptedFiles]);
      onImagesChange([...selectedImages, ...acceptedFiles]); // Pass the selected images to the parent component
    },
  });

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages((prevImages) => [...prevImages, ...files]);
    onImagesChange([...selectedImages, ...files]); // Pass the selected images to the parent component
  };

  const removeImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
    onImagesChange(updatedImages); // Pass the updated images to the parent component
  };

  const handleStatusImage = () => {
    imageRef.current.click();
  };

  return (
    <div>
      {/* Drag-and-drop area */}
      <div
        {...getRootProps()}
        className="border-2 border-dashed border-gray-300 p-10 text-center cursor-pointer rounded-lg"
      >
        <input {...getInputProps()} />
        <p>Drag & drop images here, or click to select files</p>
      </div>

      {/* Manual upload button */}
      {/* <div onClick={handleStatusImage} className="mt-5 cursor-pointer">
        <input
          className="hidden"
          type="file"
          onChange={handleImageChange}
          multiple
          ref={imageRef}
        />
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Upload Images
        </button>
      </div> */}

      {/* Image previews */}
      <div className="mt-5 flex gap-2 flex-wrap">
        {selectedImages.map((image, index) => (
          <div key={index} className="relative">
            <Image
              src={URL.createObjectURL(image)}
              alt={`Selected image ${index}`}
              className="h-20 w-20 object-cover rounded-md"
              width={100}
              height={100}
            />
            <button
              type="button"
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center"
              onClick={() => removeImage(index)}
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
