import React, { useEffect, useState } from "react";

const VerticalSlider = () => {
  const texts = [
    "Entretien et revision complète! ",
    "Garantie 3 mois!  ",
    "Possibilité de réserver en ligne.",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2000); // Change text every 2 seconds

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="h-12 overflow-hidden relative">
      {texts.map((text, index) => (
        <div
          key={index}
          className="absolute w-full h-12 flex items-center justify-center text-normal transition-transform duration-500"
          style={{
            transform: `translateY(${(currentIndex - index) * 100}%)`,
          }}
        >
          {text}
        </div>
      ))}
    </div>
  );
};

export default VerticalSlider;
