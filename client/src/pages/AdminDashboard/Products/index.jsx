import { useState } from "react"
import { IoMdAddCircle } from "react-icons/io"
import { Link } from "react-router-dom"
import TableSearchBar from "../TableSearchBar"
import ProductTable from "./ProductTable"

const Products = () => {
  const [globalFilter, setGlobalFilter] = useState("")

  return (
    <div className="w-full p-4">
      {/** Header */}
      <section className="mb-6 flex justify-between gap-x-2">
        <TableSearchBar
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <Link
          to="/add-product"
          className="flex  h-full w-20 cursor-pointer items-center justify-center gap-x-2 bg-blue-600 py-2 text-xs   text-white lg:w-32"
        >
          <IoMdAddCircle size={20} />
          <p className="hidden lg:block">Add Product</p>
        </Link>
      </section>

      {/** Table */}
      <ProductTable
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </div>
  )
}

export default Products
