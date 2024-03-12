import React, { useState } from "react"

const Specification = ({ specifications }) => {
  const [showMore, setShowMore] = useState(false)

  if (specifications.length === 0) return null

  return (
    <div className="w-full border-[1.5px]">
      <p className="border-b-[1.5px] p-2 py-4 text-xl font-semibold  tracking-tight text-gray-800">
        Specifications
      </p>
      <div
        className={`${showMore ? "h-full" : "h-96"} relative flex flex-col overflow-hidden`}
      >
        {specifications?.map((item, i) => (
          <div
            key={i}
            className=" flex flex-col items-start justify-start gap-y-4 border-b-[1.5px] p-2 py-4 text-xs"
          >
            <p className="text-[0.9rem] font-thin tracking-wide">
              {item.category}
            </p>
            {item?.items?.map((spec, index) => (
              <div key={index} className="grid w-full grid-cols-12">
                <p className="col-span-3 tracking-wide text-gray-700">
                  {spec?.title}
                </p>
                <p className="col-span-9">{spec?.description}</p>
              </div>
            ))}
          </div>
        ))}
        {!showMore && (
          <div className="absolute bottom-0 left-0 h-24 w-full bg-gradient-to-t from-white to-transparent"></div>
        )}
      </div>
      {!showMore && (
        <div
          className="border-t-[1.5px] p-2 py-4 text-sm font-normal text-blue-500"
          onClick={() => setShowMore(true)}
        >
          <p className="inline-block cursor-pointer">Read more</p>
        </div>
      )}
    </div>
  )
}

export default Specification
