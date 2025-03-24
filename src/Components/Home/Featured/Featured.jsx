"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import VerticalSlider from "@/Components/VerticalSlider";
import Link from "next/link";

const Featured = () => {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [fuels, setFuels] = useState([]);
  const [gearboxes, setGearboxes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [mileageOptions, setMileageOptions] = useState([]); // Predefined mileage options
  const [priceOptions, setPriceOptions] = useState([]); // Predefined price options
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    brand: "",
    model: "",
    mileage: "",
    fuel: "",
    gearbox: "",
    price: "",
    location: "",
  });
  // const [url, setUrl] = useState()

  useEffect(() => {
    fetch("/api/get")
      .then((response) => response.json())
      .then((data) => {
        console.log("API Response:", data); // API রেসপন্স চেক করুন
        if (data && Array.isArray(data)) {
          setCars(data);
          // Extract unique values for filters
          setBrands([...new Set(data.map((car) => car.brand))]);
          setModels([...new Set(data.map((car) => car.model))]);
          setFuels([...new Set(data.map((car) => car.fuel))]);
          setGearboxes([...new Set(data.map((car) => car.gearbox))]);
          setLocations([...new Set(data.map((car) => car.location))]);

          // Generate mileage and price options
          const mileages = data.map((car) => car.mileage);
          const minMileage = Math.min(...mileages);
          const maxMileage = Math.max(...mileages);
          const mileageStep = Math.ceil((maxMileage - minMileage) / 5); // Divide into 5 steps
          const mileageOptions = [];
          for (let i = 0; i <= 5; i++) {
            mileageOptions.push(minMileage + i * mileageStep);
          }
          setMileageOptions(mileageOptions);

          const prices = data.map((car) => car.price);
          const minPrice = Math.min(...prices);
          const maxPrice = Math.max(...prices);
          const priceStep = Math.ceil((maxPrice - minPrice) / 5); // Divide into 5 steps
          const priceOptions = [];
          for (let i = 0; i <= 5; i++) {
            priceOptions.push(minPrice + i * priceStep);
          }
          setPriceOptions(priceOptions);
        } else {
          console.error("Invalid data format:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      brand: "",
      model: "",
      mileage: "",
      fuel: "",
      gearbox: "",
      price: "",
      location: "",
    });
    setSearchTerm("");
  };

  // Filter cars based on search term and filters
  const filteredCars = cars.filter((car) => {
    return (
      (car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filters.brand ? car.brand === filters.brand : true) &&
      (filters.model ? car.model === filters.model : true) &&
      (filters.mileage ? car.mileage <= filters.mileage : true) &&
      (filters.fuel ? car.fuel === filters.fuel : true) &&
      (filters.gearbox ? car.gearbox === filters.gearbox : true) &&
      (filters.price ? car.price <= filters.price : true) &&
      (filters.location ? car.location === filters.location : true)
    );
  });

  // Get similar products (cars that match some filters)
  const getSimilarProducts = () => {
    return cars.filter((car) => {
      return (
        (filters.brand ? car.brand === filters.brand : true) ||
        (filters.fuel ? car.fuel === filters.fuel : true) ||
        (filters.location ? car.location === filters.location : true)
      );
    });
  };

  return (
    <div className="pb-16">
      <div className="bg-gray-0 my-4">
        <VerticalSlider />
      </div>

      {/* Search Bar and Filters */}
      <div className="mb-6 ">
        <div className="md:w-3/4 mx-auto">
          <input
            type="text"
            placeholder="Search by make, model or keyword (e.g. Renault Clio)"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-orange-300 text-sm rounded-lg p-2 w-full"
          />
        </div>
        <div className="">
          <div className="flex justify-center flex-wrap mt-4 ">
            {/* Brand Filter */}
            <select
              name="brand"
              onChange={handleFilterChange}
              value={filters.brand}
              className="border border-orange-300 text-sm  rounded-lg px-1 mr-2  "
            >
              <option value="">Select Brand</option>
              {brands.map((brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))}
            </select>

            {/* Model Filter */}
            <select
              name="model"
              onChange={handleFilterChange}
              value={filters.model}
              className="border border-orange-300 text-sm rounded-lg p-2 mr-2"
            >
              <option value="">Select Model</option>
              {models.map((model, index) => (
                <option key={index} value={model}>
                  {model}
                </option>
              ))}
            </select>

            {/* Mileage Filter */}
            <select
              name="mileage"
              onChange={handleFilterChange}
              value={filters.mileage}
              className="border border-orange-300 text-sm rounded-lg p-2 mr-2"
            >
              <option value="">Select Max Mileage</option>
              {mileageOptions.map((mileage, index) => (
                <option key={index} value={mileage}>
                  Up to {mileage} miles
                </option>
              ))}
            </select>

            {/* Price Filter */}
            <select
              name="price"
              onChange={handleFilterChange}
              value={filters.price}
              className="border border-orange-300 text-sm rounded-lg p-2 mr-2"
            >
              <option value="">Select Max Price</option>
              {priceOptions.map((price, index) => (
                <option key={index} value={price}>
                  Up to ${price}
                </option>
              ))}
            </select>

            {/* Fuel Filter */}
            <select
              name="fuel"
              onChange={handleFilterChange}
              value={filters.fuel}
              className="border border-orange-300 text-sm rounded-lg p-2 mr-2"
            >
              <option value="">Select Fuel</option>
              {fuels.map((fuel, index) => (
                <option key={index} value={fuel}>
                  {fuel}
                </option>
              ))}
            </select>

            {/* Gearbox Filter */}
            <select
              name="gearbox"
              onChange={handleFilterChange}
              value={filters.gearbox}
              className="border border-orange-300 text-sm rounded-lg p-2 mr-2"
            >
              <option value="">Select Gearbox</option>
              {gearboxes.map((gearbox, index) => (
                <option key={index} value={gearbox}>
                  {gearbox}
                </option>
              ))}
            </select>

            {/* Location Filter */}
            <select
              name="location"
              onChange={handleFilterChange}
              value={filters.location}
              className="border border-orange-300 text-sm rounded-lg p-2 mr-2"
            >
              <option value="">Select Location</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>

            {/* Clear Filters Button */}
            <button
              onClick={clearFilters}
              className="border border-orange-300 text-sm rounded-lg px-5 bg-orange-300 text-white hover:bg-red-600 transition"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Display Selected Filters */}
      <div className="text-xs text-gray-600 mb-4">
        Selected Filters:{" "}
        {Object.entries(filters).map(([key, value]) => {
          if (value) {
            return (
              <span key={key} className="mr-2">
                {key}: {value}
              </span>
            );
          }
          return null;
        })}
      </div>

      {/* Display Filtered Cars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredCars.map((car, index) => (
          <Link
            key={index}
            href={`/cars/${car.model
              .toLowerCase()
              .replace(/\s+/g, "-")}-${car.brand
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
          >
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <div className="relative w-full mb-4">
                <Image
                  src={car?.images[0]}
                  alt={`${car.brand} ${car.model}`}
                  width={400}
                  height={400}
                  className="rounded-lg"
                />
              </div>
              <div className="flex justify-between">
                <div className="">
                  <h3 className="text-lg font-semibold">{car.name}</h3>

                  <p className="text-gray-600 text-sm">
                    {car.year} - {car.mileage} miles
                  </p>
                  <p className="text-gray-600 text-sm">Fuel: {car.fuel}</p>
                  <p className="text-gray-600 text-sm">
                    Gearbox: {car.gearbox}
                  </p>
                </div>
                <div className="">
                  {" "}
                  <p className="text-orange-400  text-sm ">{car.price} €</p>
                </div>
              </div>

              <button className="mt-4 w-full bg-orange-300 text-white py-2 rounded-lg hover:bg-orange-300 transition text-sm">
                View Details
              </button>
            </div>
          </Link>
        ))}
      </div>

      {/* No Results Found Section */}
      {filteredCars.length === 0 && (
        <div className="text-center mt-8">
          <p className="text-lg text-gray-600 mb-4">
            No cars found. Try adjusting your filters or{" "}
            <span
              className="text-orange-300 cursor-pointer"
              onClick={clearFilters}
            >
              search directly
            </span>
            .
          </p>
          <h3 className="text-2xl font-bold mb-4">
            Similar Cars You Might Like
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {getSimilarProducts().map((car, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
                <div className="relative h-40 w-full mb-4">
                  <Image
                    src={car.images[0]}
                    alt={`${car.brand} ${car.model}`}
                    width={400}
                    height={400}
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-semibold">{car.name}</h3>
                <p className="text-gray-600">Price: ${car.price}</p>
                <p className="text-gray-600">
                  {car.year} - {car.mileage} miles
                </p>
                <p className="text-gray-600">Fuel: {car.fuel}</p>
                <p className="text-gray-600">Gearbox: {car.gearbox}</p>
                <button className="mt-4 w-full bg-orange-300 text-white py-2 rounded-lg hover:bg-orange-300 transition">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Featured;
