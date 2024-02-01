import { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import TableSearchBar from "../TableSearchBar";
import ProductTable from "./ProductTable";

const Products = () => {
  const [globalFilter, setGlobalFilter] = useState("");

  return (
    <div className=" w-full p-4 ">
      <div className="flex justify-between gap-x-2 mb-6">
        <TableSearchBar
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
        <Link
          to="/add-product"
          className="flex  items-center w-20 lg:w-32 py-2 justify-center gap-x-2 bg-blue-600 text-white text-xs   h-full cursor-pointer"
        >
          <IoMdAddCircle size={20} />
          <p className="hidden lg:block">Add Product</p>
        </Link>
      </div>

      <ProductTable
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </div>
  );
};

export default Products;
