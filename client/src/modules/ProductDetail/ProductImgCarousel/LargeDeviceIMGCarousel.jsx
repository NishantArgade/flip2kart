import Carousel, { Dots } from "@brainhubeu/react-carousel"
import "@brainhubeu/react-carousel/lib/style.css"
import { useEffect, useState } from "react"

export default function ProductIMGCarousel({
  images,
  selectedImgIndex,
  setSelectedImgIndex,
}) {
  const slides = images.map((item, i) => (
    <div
      key={i}
      className=" relative flex h-full w-full flex-col items-center justify-center p-2"
    >
      <img src={item?.url} />
    </div>
  ))

  const thumbnails = images.map((item, index) => (
    <div key={index} className="h-10 w-10">
      <img
        src={item?.url}
        className={
          index === selectedImgIndex
            ? "h-full w-full rounded-full bg-black object-contain p-1 md:rounded-none md:border-2 md:border-blue-600 md:bg-white md:px-[8px] md:py-[4px]"
            : "h-full w-full rounded-full bg-black object-contain p-1 md:rounded-none md:bg-white md:px-[8px] md:py-[4px]"
        }
        onMouseEnter={() => setSelectedImgIndex(index)}
      />
    </div>
  ))

  return (
    <div className="hidden flex-col-reverse items-start justify-start md:flex md:flex-row ">
      <div className="thin-scrollbar overflow-y-auto md:h-[16.5rem] lg:h-[22rem]">
        <Dots
          number={thumbnails.length}
          thumbnails={thumbnails}
          value={selectedImgIndex}
          onChange={(value) => setSelectedImgIndex(value)}
          className={
            "thin-scrollbar  mx-auto flex items-center overflow-auto md:mx-0 md:block md:h-fit md:flex-col"
          }
        />
      </div>
      <Carousel
        value={selectedImgIndex}
        slides={slides}
        draggable={false}
        className="relative border-[1px] border-gray-200 bg-white p-1"
      />
    </div>
  )
}
