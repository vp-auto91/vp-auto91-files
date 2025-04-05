"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import ImageUploader from "./ImageUploader";

const AddProductForm = () => {
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [extraFields, setExtraFields] = useState([]); // State to manage dynamic fields

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Function to add a new field
  const addField = () => {
    setExtraFields([...extraFields, { name: "", value: "" }]);
  };

  // Function to handle changes in dynamic fields
  const handleFieldChange = (index, field, value) => {
    const updatedFields = [...extraFields];
    updatedFields[index][field] = value;
    setExtraFields(updatedFields);
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      // Cloudinary-তে ইমেজ আপলোড করুন
      const imagesURLs = await Promise.all(
        selectedImages.map(async (image) => {
          const formData = new FormData();
          formData.append("file", image);

          const response = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          const result = await response.json();
          return result.url;
        })
      );

      // Prepare the form data with all fields
      const formData = {
        name: data.name,
        brand: data.brand,
        model: data.model,
        year: data.year,
        mileage: data.mileage,
        fuel: data.fuel,
        gearbox: data.gearbox,
        location: data.location,
        description: data.description,
        price: data.price,
        images: imagesURLs,
        color: data.color,
        url: `${data.model.toLowerCase().replace(/\s+/g, "-")}-${data.brand
          .toLowerCase()
          .replace(/\s+/g, "-")}`,
        extraFields: extraFields, // Include dynamic fields in the form data
      };

      // Submit the form data to your backend
      const response = await fetch("/api/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Product added successfully!");
        reset();
        setSelectedImages([]);
        setExtraFields([]); // Reset dynamic fields
      } else {
        toast.error(result.error || "Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("An error occurred while adding the product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full mx-auto overflow-y-scroll max-h-[700px] px-5">
      <h1 className="text-center mb-5 text-lg">Add Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex gap-3 ">
          <div className="w-1/2">
            {/* Name */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>

            {/* Brand */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Brand
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                {...register("brand", { required: true })}
              />
              {errors.brand && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>

            {/* Model */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Model
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                {...register("model", { required: true })}
              />
              {errors.model && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>

            {/* Year */}
            <div className="mb-5">
              <label className="block text-sm font-medium text-gray-700">
                Year
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                {...register("year", { required: true })}
              />
              {errors.year && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
              {/* Mileage */}
              <div className="mt-3">
                <label className="block text-sm font-medium text-gray-700">
                  Mileage
                </label>
                <input
                  type="number"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  {...register("mileage", { required: true })}
                />
                {errors.mileage && (
                  <span className="text-red-500 text-sm">
                    This field is required
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="w-1/2">
            {/* Fuel */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Fuel
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                {...register("fuel", { required: true })}
              >
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
              {errors.fuel && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
            {/* Color */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Color
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                {...register("color", { required: true })}
              />
              {errors.color && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>

            {/* Gearbox */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Gearbox
              </label>
              <select
                className="w-full p-2 border border-gray-300 rounded-md"
                {...register("gearbox", { required: true })}
              >
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic</option>
              </select>
              {errors.gearbox && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>

            {/* Location */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-md"
                {...register("location", { required: true })}
              />
              {errors.location && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>

            {/* Price */}
            <div className="mb-3">
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                className="w-full p-2 border border-gray-300 rounded-md"
                {...register("price", { required: true })}
              />
              {errors.price && (
                <span className="text-red-500 text-sm">
                  This field is required
                </span>
              )}
            </div>
          </div>
        </div>
        {/* Dynamic Fields */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Extra Fields
          </label>
          {extraFields.map((field, index) => (
            <div key={index} className="flex gap-3 mb-3">
              <input
                type="text"
                placeholder="Field Name"
                className="w-1/3 p-2 border border-gray-300 rounded-md"
                value={field.name}
                onChange={(e) =>
                  handleFieldChange(index, "name", e.target.value)
                }
              />
              <input
                type="text"
                placeholder="Field Value"
                className="w-2/3 p-2 border border-gray-300 rounded-md"
                value={field.value}
                onChange={(e) =>
                  handleFieldChange(index, "value", e.target.value)
                }
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addField}
            className="border border-red-500 w-full hover:bg-red-500 text-gray-700 mt-3 px-4 py-2 rounded-md"
          >
            Add Field
          </button>
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <span className="text-red-500 text-sm">This field is required</span>
          )}
        </div>

        {/* Product Images */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700">
            Product Images
          </label>
          <ImageUploader onImagesChange={setSelectedImages} />
        </div>

        {/* Submit Button */}
        <div className="text-center mt-5">
          <button
            type="submit"
            className="bg-red-500 hover:bg-orange-400 cursor-pointer text-white px-8 py-2 rounded-md"
            disabled={loading}
          >
            {loading ? "Adding Product..." : "Add Product"}
          </button>
        </div>
      </form>
      <Toaster />
    </div>
  );
};

export default AddProductForm;
