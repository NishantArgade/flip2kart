import Carousel, { Dots } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { useEffect, useState } from "react";

export default function ProductIMGCarousel() {
  const [value, setValue] = useState(0);

  const productImages = ["/camera.png", "/shirt.png", "/book.png"];

  const slides = productImages.map((i) => (
    <div
      key={i}
      className=" p-2 w-full h-full flex flex-col justify-center items-center relative"
    >
      <img src={i} />
    </div>
  ));

  const thumbnails = productImages.map((i, index) => (
    <img
      key={i}
      src={i}
      className={
        index === value
          ? "md:w-16 md:px-[8px] md:py-[4px] md:h-auto md:bg-white md:rounded-none bg-black p-1 w-2 h-2 rounded-full md:border-blue-600 md:border-2"
          : "md:w-16 md:px-[8px] md:py-[4px] md:h-auto md:bg-white md:rounded-none bg-black p-1 w-2 h-2 rounded-full"
      }
      onMouseEnter={() => setValue(index)}
    />
  ));

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentSlideIndex = (value + 1) % slides.length;
      setValue(currentSlideIndex);
    }, 2000);
    return () => clearInterval(intervalId);
  });

  return (
    <div className="flex flex-col-reverse md:flex-row justify-start items-start  ">
      <Dots
        number={thumbnails.length}
        thumbnails={thumbnails}
        value={value}
        onChange={(value) => setValue(value)}
        className={
          "flex  md:flex-col mx-auto md:mx-0 items-center overflow-auto md:h-fit thin-scrollbar md:block"
        }
      />
      <Carousel
        value={value}
        slides={slides}
        onChange={onchange}
        draggable={false}
        className="border-gray-200 bg-white p-1 border-[1px] relative"
      />
    </div>
  );
}
