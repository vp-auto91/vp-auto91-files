// components/ImageSlider.js
"use client"; // Required for client-side interactivity in Next.js App Router

import { useState } from "react";

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Main Image */}
      <div className="relative w-full ">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className="w-full max-h-[400px] object-cover rounded-lg shadow-lg"
        />
        <div className="absolute bottom-5 right-10 flex justify-between items-center gap-10">
          <button
            onClick={goToPrevious}
            className="   bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition"
          >
            &#10094;
          </button>
          <div className=" bg-black/50 text-white px-3 py-1 rounded-lg">
            {currentIndex + 1}/{images.length}
          </div>
          <button
            onClick={goToNext}
            className="  bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition"
          >
            &#10095;
          </button>
        </div>
      </div>
      {/* Thumbnails */}
      <div className="flex space-x-2">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index}`}
            onClick={() => goToImage(index)}
            className={`w-16 h-16 object-cover rounded-lg cursor-pointer transition-opacity ${
              index === currentIndex
                ? "opacity-100 border-2 border-blue-500"
                : "opacity-50 hover:opacity-80"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
