"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import VerticalSlider from "@/Components/VerticalSlider";
import Link from "next/link";
import { FaFilter } from "react-icons/fa";
import ProductCardSkeleton from "./CardSkeleton";

const Featured = () => {
  const [cars, setCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [fuels, setFuels] = useState([]);
  const [gearboxes, setGearboxes] = useState([]);
  const [locations, setLocations] = useState([]);
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
  const [cardLoad, setCardLoad] = useState(true);

  useEffect(() => {
    setCardLoad(true);
    fetch("/api/get")
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          setCars(data);
          setBrands([...new Set(data.map((car) => car.brand))]);
          setModels([...new Set(data.map((car) => car.model))]);
          setFuels([...new Set(data.map((car) => car.fuel))]);
          setGearboxes([...new Set(data.map((car) => car.gearbox))]);
          setLocations([...new Set(data.map((car) => car.location))]);
        } else {
          console.error("Invalid data format:", data);
        }
        setCardLoad(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setCardLoad(false);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

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

  // ✅ Get similar cars excluding duplicates from filteredCars
  const getSimilarProducts = () => {
    const shownIds = new Set(filteredCars.map((car) => car._id));

    return cars.filter((car) => {
      const matchesFilter =
        (filters.brand && car.brand === filters.brand) ||
        (filters.fuel && car.fuel === filters.fuel) ||
        (filters.location && car.location === filters.location);

      const notAlreadyShown = !shownIds.has(car._id);
      return matchesFilter && notAlreadyShown;
    });
  };

  return (
    <div className="pb-16">
      <div className="bg-gray-0 my-4">
        <VerticalSlider />
      </div>

      {/* Search Bar and Filters */}
      <div className="mb-6">
        <div className="md:w-3/5 mx-auto">
          <input
            type="text"
            placeholder="Recherche par modèle ou mot clé (exemple: Renault clio)"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-red-500 text-sm rounded-lg p-2 w-full"
          />
        </div>
        <div className="hidden md:block">
          <div className="md:w-3/5 md:mx-auto grid grid-cols-6 gap-2 md:justify-between justify-between flex-wrap mt-4 ">
            <select
              name="brand"
              onChange={handleFilterChange}
              value={filters.brand}
              className="border border-red-500 text-sm rounded-lg px-2 mr-2 mb-2 md:mb-0 w-full"
            >
              <option value="">Marque</option>
              {brands.map((brand, index) => (
                <option key={index} value={brand}>
                  {brand}
                </option>
              ))}
            </select>

            <select
              name="model"
              onChange={handleFilterChange}
              value={filters.model}
              className="border border-red-500 text-sm rounded-lg px-2  mr-2 mb-2 md:mb-0 w-full"
            >
              <option value="">Modèle</option>
              {models.map((model, index) => (
                <option key={index} value={model}>
                  {model}
                </option>
              ))}
            </select>

            <select
              name="fuel"
              onChange={handleFilterChange}
              value={filters.fuel}
              className="border border-red-500 text-sm rounded-lg px-2  mr-2 mb-2 md:mb-0 w-full"
            >
              <option value="">Energie</option>
              {fuels.map((fuel, index) => (
                <option key={index} value={fuel}>
                  {fuel}
                </option>
              ))}
            </select>

            <select
              name="gearbox"
              onChange={handleFilterChange}
              value={filters.gearbox}
              className="border border-red-500 text-sm rounded-lg px-2  mr-2 mb-2 md:mb-0 w-full"
            >
              <option value="">Transmission</option>
              {gearboxes.map((gearbox, index) => (
                <option key={index} value={gearbox}>
                  {gearbox}
                </option>
              ))}
            </select>

            <select
              name="location"
              onChange={handleFilterChange}
              value={filters.location}
              className="border border-red-500 text-sm rounded-lg px-2  mr-2 mb-2 md:mb-0 w-full"
            >
              <option value="">Localisation</option>
              {locations.map((location, index) => (
                <option key={index} value={location}>
                  {location}
                </option>
              ))}
            </select>

            <button onClick={clearFilters}>
              <p className="border border-red-500 text-sm rounded-lg py-[2px] px-5 bg-red-500 text-white hover:bg-red-600 transition w-full">
                Remise à 0
              </p>
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        {/* Selected Filters */}
        <div className="text-xs text-gray-600 mb-4">
          Filtres séléctionnés:{" "}
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
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="text-xs text-gray-600 mb-4 flex items-center gap-2 md:hidden "
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          <p>Filtres</p>
          <FaFilter className="text-red-500" />
        </button>
      </div>

      {/* Responsive filters */}
      <div>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box bg-white">
            <div className="grid grid-cols-2 gap-3">
              <select
                name="brand"
                onChange={handleFilterChange}
                value={filters.brand}
                className="border border-red-500 text-sm rounded-lg px-2 mr-2 mb-2 md:mb-0"
              >
                <option value="">Marque</option>
                {brands.map((brand, index) => (
                  <option key={index} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>

              <select
                name="model"
                onChange={handleFilterChange}
                value={filters.model}
                className="border border-red-500 text-sm rounded-lg px-2  mr-2 mb-2 md:mb-0"
              >
                <option value="">Modèle</option>
                {models.map((model, index) => (
                  <option key={index} value={model}>
                    {model}
                  </option>
                ))}
              </select>

              <select
                name="fuel"
                onChange={handleFilterChange}
                value={filters.fuel}
                className="border border-red-500 text-sm rounded-lg px-2  mr-2 mb-2 md:mb-0"
              >
                <option value="">Energie</option>
                {fuels.map((fuel, index) => (
                  <option key={index} value={fuel}>
                    {fuel}
                  </option>
                ))}
              </select>

              <select
                name="gearbox"
                onChange={handleFilterChange}
                value={filters.gearbox}
                className="border border-red-500 text-sm rounded-lg px-2  mr-2 mb-2 md:mb-0"
              >
                <option value="">Transmission</option>
                {gearboxes.map((gearbox, index) => (
                  <option key={index} value={gearbox}>
                    {gearbox}
                  </option>
                ))}
              </select>

              <select
                name="location"
                onChange={handleFilterChange}
                value={filters.location}
                className="border border-red-500 text-sm rounded-lg px-2  mr-2 mb-2 md:mb-0"
              >
                <option value="">Localisation</option>
                {locations.map((location, index) => (
                  <option key={index} value={location}>
                    {location}
                  </option>
                ))}
              </select>

              <button onClick={clearFilters}>
                <p className="text-white bg-red-500 text-sm rounded-lg px-2 py-[2px]  mr-2 mb-2 md:mb-0">
                  Remise à 0
                </p>
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
      {/* Responisve Filters */}

      {/* Main Logic */}
      {cardLoad ? (
        // ⏳ Skeletons while loading
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredCars.length > 0 ? (
        // ✅ Filtered car results
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {filteredCars.map((car, index) => (
            <Link
              key={index}
              href={`/cars/${car.brand.toLowerCase().replace(/\s+/g, "-")}-${
                car._id
              }`}
            >
              <div className="bg-white p-4 rounded-lg shadow-lg">
                <div className="relative w-full mb-4 aspect-video">
                  {" "}
                  {/* 16:9 aspect ratio */}
                  <Image
                    src={car?.images[0]}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    className="rounded-lg object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="flex  justify-between">
                  <div className="w-[80%] ">
                    <h3 className="text-[17px] font-semibold">{car.name}</h3>
                    <p className="text-gray-600 text-sm">
                      {car.year} - {car.mileage} Km
                    </p>
                    <p className="text-gray-600 text-sm">Energie: {car.fuel}</p>
                    <p className="text-gray-600 text-sm">
                      Transmission: {car.gearbox}
                    </p>
                  </div>
                  <div className="">
                    <p className="text-red-500 text-sm">{car.price} €</p>
                  </div>
                </div>
                <button className="cursor-pointer mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-500 transition text-sm">
                  Voir détails
                </button>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        // ❌ No match — show similar
        <div className="text-center mt-8">
          <p className="text-lg text-gray-600 mb-4">
            Aucun véhicule trouvé. Essayez d&apos;adjuster le filter or{" "}
            <span
              className="text-red-500 cursor-pointer"
              onClick={clearFilters}
            >
              recherche directement
            </span>
            .
          </p>
          <h3 className="text-2xl font-bold mb-4">
            Voiture similaire que vous aimeriez
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {getSimilarProducts().map((car, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-lg">
                <div className="relative w-full mb-4 aspect-video">
                  {" "}
                  {/* 16:9 aspect ratio */}
                  <Image
                    src={car?.images[0]}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    className="rounded-lg object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{car.name}</h3>
                    <p className="text-gray-600 text-sm">
                      {car.year} - {car.mileage} Km
                    </p>
                    <p className="text-gray-600 text-sm text-start">
                      Energie: {car.fuel}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Transmission: {car.gearbox}
                    </p>
                  </div>
                  <p className="text-red-500 text-sm">{car.price} €</p>
                </div>
                <button className="cursor-pointer mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-500 transition text-sm">
                  Voir détails
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
