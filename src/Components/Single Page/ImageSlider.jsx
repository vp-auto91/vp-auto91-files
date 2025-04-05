"use client";
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
    <div className="flex flex-col items-center justify-center space-y-4 w-full">
      {/* Main Image Container - Fixed Aspect Ratio (16:9) */}
      <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex}`}
          className="w-full h-full object-cover"
        />

        {/* Navigation Controls */}
        <div className="absolute inset-0 flex items-center justify-between p-4">
          <button
            onClick={goToPrevious}
            className="bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition z-10"
            aria-label="Previous image"
          >
            &#10094;
          </button>
          <button
            onClick={goToNext}
            className="bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition z-10"
            aria-label="Next image"
          >
            &#10095;
          </button>
        </div>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
          {currentIndex + 1}/{images.length}
        </div>
      </div>

      {/* Thumbnails - Scrollable if many images */}
      <div className="w-full overflow-x-auto py-2">
        <div className="flex space-x-2 w-max mx-auto">
          {images.map((image, index) => (
            <div
              key={index}
              onClick={() => goToImage(index)}
              className={`relative aspect-square w-16 h-16 rounded-lg cursor-pointer transition-all ${
                index === currentIndex
                  ? "ring-2 ring-blue-500"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index}`}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
