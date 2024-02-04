import React from "react"
import { ReactSearchAutocomplete } from "react-search-autocomplete"

const ProductSearchInput = ({ setSearchValue }) => {
  const items = [
    {
      id: 0,
      name: "IPhone 13 pro max",
      description:
        "i phone 13 pro max with 256gb storage and 8gb ram also with 12mp camera and 6.7 inch display",
    },
    {
      id: 1,
      name: "Redmi note 10 pro",
      description: "18 inch screen with 8gb ram and 128gb storage",
    },
    {
      id: 2,
      name: "Quick Heal Antivirus",
      description:
        "Quick Heal Antivirus Pro Latest Version - 1 PC, 1 Year (Email Delivery in 2 hours- No CD)",
    },
    {
      id: 3,
      name: "Stylish Boys T-shirt",
      description:
        "New Stylish T-shirt for boys with 100% cotton and available in all sizes ",
    },
  ]

  return (
    <ReactSearchAutocomplete
      className="w-full text-sm  outline-none"
      items={items}
      fuseOptions={{ keys: ["name", "description"] }}
      styling={{
        borderRadius: "10px",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        backgroundColor: "#F0F5FF",
        border: "none",
        lineColor: "#cccccc",
        hoverBackgroundColor: "#e8eefa",
      }}
      placeholder="Search for Products, Brands and More"
      autoFocus={false}
      resultStringKeyName="name"
      formatResult={(item) => <span className="h-10">{item.name}</span>}
      onSearch={(value) => setSearchValue(value)}
      onSelect={(item) => setSearchValue(item.name)}
    />
  )
}

export default ProductSearchInput
