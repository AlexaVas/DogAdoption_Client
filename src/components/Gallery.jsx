/** @format */

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import { Carousel, IconButton } from "@material-tailwind/react";



function Gallery(props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = props.slides;

  const handleLeft = () => {
    const isFirst = currentIndex === 0;

    const index = isFirst ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(index);
  };

  const handleRight = () => {
    const isLast = currentIndex == slides.length - 1;
    console.log(isLast);
    console.log(slides.length);

    const index = isLast ? 0 : currentIndex + 1;
    setCurrentIndex(index);
  };

  const [size, setSize] = useState("100px");

  const handleSize = () => {
    console.log("click");

    setSize("500px");
  };

  console.log(currentIndex);

  return (
    <Carousel
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handlePrev}
          className="!absolute top-2/4 left-4 -translate-y-2/4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handleNext}
          className="!absolute top-2/4 !right-4 -translate-y-2/4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </IconButton>
      )}>
      {slides[0] && (
        <img
          onClick={handleSize}
          src={`${slides[0]}`}
          alt="image 1"
          className=" h-80 sm:h-80 lg:h-[600px] w-full  object-cover  rounded-lg"
        />
      )}
      {slides[1] && (
        <img
          onClick={handleSize}
          src={`${slides[1]}`}
          alt="image 2"
          className=" h-80 sm:h-80 lg:h-[600px] w-full  object-cover  rounded-lg"
        />
      )}
      {slides[2] && (
        <img
          onClick={handleSize}
          src={`${slides[2]}`}
          alt="image 3"
          className=" h-80 sm:h-80 lg:h-[600px] w-full  object-cover  rounded-lg"
        />
      )}

      {slides[3] && (
        <img
          onClick={handleSize}
          src={`${slides[3]}`}
          alt="image 4"
          className=" h-80 sm:h-80 lg:h-[600px] w-full  object-cover  rounded-lg"
        />
      )}
      {slides[4] && (
        <img
          onClick={handleSize}
          src={`${slides[4]}`}
          alt="image 5"
          className=" h-80 sm:h-80 lg:h-[600px] w-full  object-cover  rounded-lg"
        />
      )}
    </Carousel>
  );
}

export default Gallery;
