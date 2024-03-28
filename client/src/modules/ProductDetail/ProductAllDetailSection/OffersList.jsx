import React from "react"
import { MdLocalOffer } from "react-icons/md"

const OffersList = ({ offers }) => {
  if (offers?.length === 0) return null

  return (
    <div className="mb-2 flex flex-col justify-start gap-y-1">
      <p className="text-xs font-medium tracking-wide text-gray-950">
        Available Offers
      </p>
      {offers?.map((offer, index) => (
        <div key={index} className="flex text-xs text-gray-800">
          <span className="mr-2">
            <MdLocalOffer className="text-sm text-green-500" />
          </span>
          <p>{offer}</p>
        </div>
      ))}
    </div>
  )
}

export default OffersList
