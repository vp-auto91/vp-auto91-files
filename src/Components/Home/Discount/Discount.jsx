import React from "react";
import Image from "next/image";

const Discount = () => {
  return (
    <div className="relative w-full h-[400px] lg:h-[500px] mb-2">
      {/* Background Image */}
      <Image
        src="/images/CTA.png" // Replace with your actual image path
        alt="Luxury Car"
        layout="fill"
        objectFit="cover"
        className="w-full h-full rounded-md"
      />

      {/* Overlay */}
      <div className="absolute inset-0"></div>

      {/* Text Content */}
      <div className="absolute top-1/2 left-10 transform -translate-y-1/2 text-white">
        <p className="uppercase text-sm tracking-wide text-gray-300 mb-2">
          Obtenez 20% de reduction sur votre prestation
        </p>
        <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
          Entretien et revision
          <br />
          VP AUTO 91
        </h2>
        <button className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded-md hover:bg-gray-300 transition">
          Prendre RDV
        </button>
      </div>
    </div>
  );
};

export default Discount;
