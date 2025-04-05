import React from "react";

import ImageSlider from "./ImageSlider";

const DefaultSingle = ({ product }) => {
  const images = product.images;
  return (
    <div className="">
      <div className="my-16 mb-24 px-5 ">
        {/* Two-column grid for product details */}
        <div className="md:flex gap-10">
          {/* Left Column: Product Images */}
          <div className="md:w-2/3 ">
            {/* Main Image */}
            <div className=" rounded-lg overflow-hidden">
              <ImageSlider images={images} />
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="md:w-1/3 mt-8 md:mt-0">
            {/* Product Name */}
            <h1 className="text-3xl font-bold text-orange-400">
              {product?.name}
            </h1>
            {/* Price */}
            <p className="text-lg text-orange-400 font-bold my-3 ">
              {product?.price}€
            </p>
            <h1 className="text-xl font-bold text-gray-700 mb-5">
              {product?.model}
            </h1>
            <div className="flex gap-5 mb-8">
              {/* Brand */}
              <div className="w-full border border-orange-300 rounded-lg p-4 shadow-sm bg-gray-100">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Brand</span>
                </p>
                <p className="text-lg text-gray-800">{product?.brand}</p>
              </div>

              {/* Year */}
              <div className="w-full border border-orange-300 rounded-lg p-4 shadow-sm bg-gray-100">
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Year</span>
                </p>
                <p className="text-lg text-gray-800">{product?.year}</p>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="w-full text-white bg-orange-300 py-2.5 text-center  rounded-md">
                <button className=" ">Contact Us</button>
              </div>
            </div>
          </div>
        </div>
        <div className="my-24">
          <h1 className="text-center my-5">Details</h1>
          <div className="flex">
            <div className="md:w-2/3 mb-8 mx-auto text-justify">
              <p>{product?.description}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-4">
            {/* Gearbox */}
            <div className="border border-orange-300 rounded-lg p-4 shadow-sm bg-gray-100 ">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Gearbox</span>
              </p>
              <p className="text-lg text-gray-800">{product?.gearbox}</p>
            </div>

            {/* Mileage */}
            <div className="border border-orange-300 rounded-lg p-4 shadow-sm bg-gray-100">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">KM</span>
              </p>
              <p className="text-lg text-gray-800">{product?.mileage} Km</p>
            </div>

            {/* Fuel */}
            <div className="border border-orange-300 rounded-lg p-4 shadow-sm bg-gray-100">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Fuel</span>
              </p>
              <p className="text-lg text-gray-800">{product?.fuel}</p>
            </div>

            {/* Location */}
            <div className="border border-orange-300 rounded-lg p-4 shadow-sm bg-gray-100">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Location</span>
              </p>
              <p className="text-lg text-gray-800">{product?.location}</p>
            </div>
            {/* Extra Fields */}
            {product?.extraFields?.map((field, index) => (
              <div
                key={index}
                className="border border-orange-300 rounded-lg p-4 shadow-sm bg-gray-100"
              >
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">{field.name}</span>
                </p>
                <p className="text-lg text-gray-800">{field.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultSingle;
