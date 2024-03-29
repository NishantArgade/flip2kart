import React, { useState } from "react"
import { MdLocalOffer } from "react-icons/md"

const OffersList = ({ offers }) => {
  const [lastIndex, setLastIndex] = useState(
    offers?.length <= 3 ? offers.length : 3
  )
  if (offers?.length === 0) return null

  return (
    <div>
      <p className="mb-2 text-xs font-medium tracking-wide text-gray-950">
        Available Offers
      </p>
      <div className={`flex  flex-col justify-start gap-y-2 overflow-hidden`}>
        {offers?.slice(0, lastIndex)?.map((offer, index) => (
          <div key={index} className="flex text-xs text-gray-800">
            <span className="mr-2">
              <MdLocalOffer className="text-sm text-green-500" />
            </span>
            <p>{offer}</p>
          </div>
        ))}
      </div>
      <button
        onClick={() => setLastIndex(offers?.length)}
        className={`${lastIndex === offers?.length ? "hidden" : ""} mt-2 text-[0.78rem] text-blue-600`}
      >
        View {offers?.length - 3} more offers
      </button>
    </div>
  )
}

export default OffersList
