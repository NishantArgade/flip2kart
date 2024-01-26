import Carousel, { Dots, autoplayPlugin } from "@brainhubeu/react-carousel";
import "@brainhubeu/react-carousel/lib/style.css";
import { useEffect, useRef, useState } from "react";
import { IoIosHeart } from "react-icons/io";

export default function ProductIMGCarousel() {
  const [value, setValue] = useState(0);
  // const [thumbnails, setThumbnails] = useState([]);

  // const slides = [[

  //   <img src={"/shirt.png"} />,
  //   <img src={"/book.png"} />,
  // ];]

  const slides = ["/camera.png", "/shirt.png", "/book.png"].map((i) => (
    <div
      key={i}
      className=" p-2 w-full h-full flex flex-col justify-center items-center relative"
    >
      <img src={i} />
    </div>
  ));

  const thumbnails = ["/camera.png", "/shirt.png", "/book.png"].map(
    (i, index) => (
      <img
        key={i}
        src={i}
        className={
          index === value
            ? "w-16 border-2 border-blue-600 px-[8px] py-[4px] w-10"
            : "w-16 px-[8px] py-[4px] w-10"
        }
        onMouseEnter={() => setValue(index)}
      />
    )
  );
  // useEffect(() => {

  //   setThumbnails(thumbnails);
  // }, [value]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentSlideIndex = (value + 1) % slides.length;
      setValue(currentSlideIndex);
    }, 2000);
    return () => clearInterval(intervalId);
  });

  console.log(value);
  return (
    <div className="flex justify-start items-start  ">
      <Dots
        number={thumbnails.length}
        thumbnails={thumbnails}
        value={value}
        onChange={(value) => setValue(value)}
        className={
          "flex flex-col justify-start items-center overflow-auto h-[27rem] thin-scrollbar"
        }
      />
      <div></div>
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
