import React, { useEffect, useState } from "react";

const VerticalSlider = () => {
  const texts = [
    "Entretien et revision complète! Possibilité de réserver en ligne.",
    "Garantie 3 mois!  ",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 2000); // Change text every 2 seconds

    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <div className="h-10 overflow-hidden relative">
      {texts.map((text, index) => (
        <div
          key={index}
          className="absolute w-full h-10 flex items-center justify-center text-normal transition-transform duration-500"
          style={{
            transform: `translateY(${(index - currentIndex) * 100}%)`,
          }}
        >
          {text}
        </div>
      ))}
    </div>
  );
};

export default VerticalSlider;
