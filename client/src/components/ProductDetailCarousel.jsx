import Carousel, { Dots, autoplayPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { useEffect, useRef, useState } from "react";

export default function ProductDetailCarousel() {
  const [value, setValue] = useState(0);

  const slides = [
    <img src={"/camera.png"} />,
    <img src={"/shirt.png"} />,
    <img src={"/book.png"} />,
  ];
  const thumbnails = [
    <img
      src={"/camera.png"}
      className={
        value === 0
          ? "w-16 border-2 border-blue-600 px-[8px] py-[4px]"
          : "w-16 px-[8px] py-[4px]"
      }
      onMouseEnter={() => setValue(0)}
    />,
    <img
      src={"/shirt.png"}
      className="w-10"
      className={
        value === 1
          ? "w-16 border-2 border-blue-600 px-[8px] py-[4px]"
          : "w-16 px-[8px] py-[4px]"
      }
      onMouseEnter={() => setValue(1)}
    />,
    <img
      src={"/book.png"}
      className="w-10"
      className={
        value === 2
          ? "w-16 border-2 border-blue-600 px-[8px] py-[4px]"
          : "w-16 px-[8px] py-[4px]"
      }
      onMouseEnter={() => setValue(2)}
    />,
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentSlideIndex = (value + 1) % slides.length;
      setValue(currentSlideIndex);
    }, 2000);
    return () => clearInterval(intervalId);
  });

  return (
    <div className="flex justify-normal ">
      <Dots
        number={thumbnails.length}
        thumbnails={thumbnails}
        value={value}
        onChange={(value) => setValue(value)}
        className={"flex flex-col justify-start items-center "}
      />
      <Carousel
        value={value}
        slides={slides}
        onChange={onchange}
        draggable={false}
      />
    </div>
  );
}
