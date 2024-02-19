import { MultiSelect } from "@mantine/core"
import { useState } from "react"

const offers = [
  "Bank Offer10% off on1 Citi-branded Credit and Debit Card Txns, up to ₹1,500 on orders of ₹10,000 and above",
  "Bank Offer10% off on2 Citi-branded Credit and Debit Card Txns, up to ₹1,500 on orders of ₹10,000 and above",
  "Bank Offer10% off on3 Citi-branded Credit and Debit Card Txns, up to ₹1,500 on orders of ₹10,000 and above",
  "Bank Offer10% off on4 Citi-branded Credit and Debit Card Txns, up to ₹1,500 on orders of ₹10,000 and above",
  "Bank Offer10% off on5 Citi-branded Credit and Debit Card Txns, up to ₹1,500 on orders of ₹10,000 and above",
  "Bank Offer10% off on6 Citi-branded Credit and Debit Card Txns, up to ₹1,500 on orders of ₹10,000 and above",
  "Bank Offer10% off on7 Citi-branded Credit and Debit Card Txns, up to ₹1,500 on orders of ₹10,000 and above",
  "Bank Offer10% off on8 Citi-branded Credit and Debit Card Txns, up to ₹1,500 on orders of ₹10,000 and above",
  "Bank Offer10% off o9 Citi-branded Credit and Debit Card Txns, up to ₹1,500 on orders of ₹10,000 and above",
  "Bank Offer10% off on10 Citi-branded Credit and Debit Card Txns, up to ₹1,500 on orders of ₹10,000 and above",
]

const OfferStep = ({ nextStep, prevStep, offerData, setOfferData }) => {
  const [searchValue, setSearchValue] = useState("")

  const optionsFilter = ({ options, search }) => {
    const filtered = options.filter((option) =>
      option.label.toLowerCase().trim().includes(search.toLowerCase().trim())
    )

    filtered.sort((a, b) => a.label.localeCompare(b.label))
    return filtered
  }

  return (
    <>
      <MultiSelect
        label="Select Offer"
        placeholder="Pick Offer"
        data={offers.map((offer) => ({ label: offer, value: offer }))}
        clearable
        searchable
        filter={optionsFilter}
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        nothingFoundMessage="Category not found..."
        checkIconPosition="left"
        comboboxProps={{ shadow: "xs" }}
        className="w-full"
        hidePickedOptions={true}
        height={4}
        value={offerData}
        onChange={setOfferData}
      />

      <div className="float-end flex items-center gap-4 py-4">
        <div className="mt-8 text-end">
          <button
            type="submit"
            className="rounded-sm border-[1.5px] bg-white px-4 py-2 text-sm font-semibold text-gray-500 shadow-md "
            onClick={nextStep}
          >
            Skip
          </button>
        </div>
        <div className="mt-8 text-end">
          <button
            type="submit"
            className="rounded-sm bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-md "
            onClick={prevStep}
          >
            Previous
          </button>
        </div>
        <div className="mt-8 text-end">
          <button
            type="submit"
            className="rounded-sm bg-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-md "
            onClick={nextStep}
          >
            Next
          </button>
        </div>
      </div>
    </>
  )
}

export default OfferStep
