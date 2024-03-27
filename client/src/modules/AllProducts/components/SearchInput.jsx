import { useEffect } from "react"
import { debounce } from "lodash"
import { IoSearch } from "react-icons/io5"

const SearchInput = ({
  brandsList,
  setFilteredBrands,
  searchBrandValue,
  setSearchBrandValue,
}) => {
  useEffect(() => {
    const debouncedSearch = debounce(() => {
      const results = brandsList.filter((brand) =>
        brand.toLowerCase().includes(searchBrandValue.toLowerCase())
      )
      setFilteredBrands(results)
    }, 300)

    debouncedSearch()

    return () => debouncedSearch.cancel()
  }, [searchBrandValue, brandsList])

  return (
    <div className="relative mb-3">
      <div className="absolute left-0">
        <IoSearch className="text-gray-400" />
      </div>
      <input
        type="text"
        value={searchBrandValue}
        onChange={(e) => setSearchBrandValue(e.target.value)}
        placeholder="Search Brand"
        className="border-b-2 pl-5 outline-none"
      />
    </div>
  )
}

export default SearchInput
