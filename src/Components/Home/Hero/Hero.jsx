import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className=" mx-auto">
      <div className="text-black text-center py-10 w-full">
        <div className="flex gap-5">
          {/* First Banner */}
          <div className="relative  h-[700px] w-full">
            <Image
              src="/images/banner1.png"
              alt="Body Parts"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center  text-white p-4">
              <p className="text-sm">BEST OFFERS FOR YOU</p>
              <h3 className="text-2xl font-bold">BODY PARTS</h3>
              <p className="text-lg">GET UP TO 30% OFF</p>
              <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition">
                SHOP NOW
              </button>
            </div>
          </div>

          {/* Second Banner */}
          <div className="relative w-full h-[700px]">
            <Image
              src="/images/banner2.png"
              alt="Mega Sale"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-4">
              <h3 className="text-4xl font-bold">MEGA SALE</h3>
              <p className="text-5xl font-extrabold">10% OFF</p>
              <p className="text-lg">on premium cars</p>
              <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition">
                SHOP NOW
              </button>
            </div>
          </div>

          {/* Third Banner */}
          <div className="relative w-full h-[700px]">
            <Image
              src="/images/banner3.png"
              alt="Hybrid Electric Cars"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center  text-white p-4">
              <h3 className="text-2xl font-bold">Hybrid/Electric cars</h3>
              <p className="text-lg">ALL TOP BRANDS</p>
              <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition">
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
