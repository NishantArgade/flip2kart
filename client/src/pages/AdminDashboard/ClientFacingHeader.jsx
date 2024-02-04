import React from "react"

const ClientFacingHeader = ({ heading, subHeading }) => {
  return (
    <div className="border-b-[0.1px] bg-gray-50 px-4 py-2 text-sm font-medium text-gray-600 shadow-sm">
      <div>
        <p className="text-lg uppercase text-gray-500">{heading}</p>
        <p className="text-xs  text-gray-400">{subHeading}</p>
      </div>
    </div>
  )
}

export default ClientFacingHeader
