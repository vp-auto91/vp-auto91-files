"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCardSkeleton from "../Home/Featured/CardSkeleton";
import { useParams } from "next/navigation";

const SimilarProducts = () => {
  const [cardLoad, setCardLoad] = useState(true);
  const [cars, setCars] = useState([]);
  const params = useParams();

  // Extract ID from URL (last part after last hyphen)
  const currentCarId = params.url?.split("-").pop();

  useEffect(() => {
    if (!currentCarId) return;

    setCardLoad(true);
    fetch(`/api/get`)
      .then((response) => response.json())
      .then((data) => {
        if (data && Array.isArray(data)) {
          // Filter out the current car on the client side
          const filteredCars = data.filter((car) => car._id !== currentCarId);
          setCars(filteredCars.slice(0, 4)); // Show max 4 similar cars
        } else {
          console.error("Invalid data format:", data);
        }
        setCardLoad(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setCardLoad(false);
      });
  }, [currentCarId]);

  return (
    <div className="pb-16">
      <h2 className="text-2xl font-bold mb-6">Similar Vehicles</h2>

      {cardLoad ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2].map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      ) : cars.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {cars.map((car) => (
            <Link
              key={car._id}
              href={`/cars/${car.brand.toLowerCase().replace(/\s+/g, "-")}-${
                car._id
              }`}
            >
              <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative w-full mb-4 aspect-video">
                  <Image
                    src={car?.images[0] || "/car-placeholder.jpg"}
                    alt={`${car.brand} ${car.model}`}
                    fill
                    className="rounded-lg object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {car.brand} {car.model}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {car.year} - {car.mileage} Km
                    </p>
                    <p className="text-gray-600 text-sm">Fuel: {car.fuel}</p>
                    <p className="text-gray-600 text-sm">
                      Transmission: {car.gearbox}
                    </p>
                  </div>
                  <p className="text-red-500 font-semibold">{car.price} €</p>
                </div>
                <button className="mt-4 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition text-sm">
                  View Details
                </button>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No similar vehicles found.</p>
      )}
    </div>
  );
};

export default SimilarProducts;
