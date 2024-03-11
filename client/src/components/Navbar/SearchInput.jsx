import { useNavigate } from "react-router-dom"
import { ReactSearchAutocomplete } from "react-search-autocomplete"
import { getAllProducts } from "../../api/productApi"
import { useQuery } from "@tanstack/react-query"
import { queryClient } from "../../main"

function getProductName(str) {
  let productName = str.split(" (")[0]
  if (productName.endsWith("-")) {
    productName = productName.slice(0, -1).trim()
  }
  return productName
}
const SearchInput = ({ searchValue, setSearchValue }) => {
  const { data } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
  })

  const items = data?.products?.map(({ _id, name, description, category }) => ({
    id: _id,
    name: getProductName(name),
    description,
    category,
  }))

  const navigate = useNavigate()

  function onSearchClick(item) {
    navigate(
      `/products?name=${item?.name}&category=${item?.category}&sort=popularity`
    )
    queryClient.invalidateQueries("filteredProducts")
  }

  return (
    <div
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          navigate(`/products?name=${searchValue}&sort=popularity`)
          queryClient.invalidateQueries("filteredProducts")
        }
      }}
      className="w-full text-sm  outline-none"
    >
      <ReactSearchAutocomplete
        items={items}
        fuseOptions={{ keys: ["name", "description", "category"] }}
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
        formatResult={(item) => (
          <span className="flex h-fit cursor-pointer items-center  justify-start py-1 text-xs">
            {item.name}
          </span>
        )}
        onSelect={(item) => onSearchClick(item)}
        onSearch={(value) => setSearchValue(value)}
      />
    </div>
  )
}

export default SearchInput
