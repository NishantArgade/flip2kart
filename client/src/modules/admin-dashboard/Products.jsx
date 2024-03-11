import { Tooltip } from "@mantine/core"
import { createColumnHelper } from "@tanstack/react-table"
import moment from "moment"
import { useState } from "react"
import { IoMdAddCircle } from "react-icons/io"
import { Link, useNavigate } from "react-router-dom"
import DeletePopover from "../../components/DeletePopover.jsx"
import ClientFacingHeader from "./components/ClientFacingHeader.jsx"
import Table from "./components/Table.jsx"
import TableHeader from "./components/TableHeader.jsx"
import TableSearchBar from "./components/TableSearchBar.jsx"
import { FaEdit } from "react-icons/fa"
import { useMutation, useQuery } from "@tanstack/react-query"
import {
  deleteProduct,
  deleteProductImgs,
  getAllProducts,
} from "../../api/productApi.js"
import { queryClient } from "../../main.jsx"

const colHelper = createColumnHelper()

const Products = () => {
  const navigate = useNavigate()
  const [globalFilter, setGlobalFilter] = useState("")
  const { data } = useQuery({
    queryKey: ["allProducts"],
    queryFn: getAllProducts,
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ["deleteProduct"],
    mutationFn: deleteProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries("allProducts")
      deleteProductImgs(data?.product?.images)
    },
    onError: (error) => console.log(error),
  })

  const columns = [
    colHelper.accessor("_id", {
      header: (header) => <TableHeader header={header} name={"ProductID"} />,
      cell: (props) => <p className="mr-2">{props.getValue()}</p>,
    }),
    colHelper.accessor("name", {
      header: (header) => <TableHeader header={header} name={"Name"} />,
      cell: (props) => (
        <Tooltip
          label={props.getValue()}
          arrowOffset={12}
          arrowSize={6}
          withArrow
          className="max-h-32 max-w-80 text-wrap bg-gray-600  text-xs text-white"
        >
          <p className="mr-2  w-32 truncate">{props.getValue()}</p>
        </Tooltip>
      ),
      // size: 1000,
    }),

    colHelper.accessor("price", {
      header: (header) => <TableHeader header={header} name={"Price"} />,
      cell: (props) => <p className="mr-2">{props.getValue()}</p>,
    }),

    colHelper.accessor("stock", {
      header: (header) => <TableHeader header={header} name={"Stock"} />,
      cell: (props) => <p className="mr-2">{props.getValue()}</p>,
    }),

    colHelper.accessor("category", {
      header: (header) => <TableHeader header={header} name={"Category"} />,
      cell: (props) => <p className="mr-2">{props.getValue()}</p>,
    }),

    colHelper.accessor("description", {
      header: (header) => <TableHeader header={header} name={"Description"} />,
      cell: (props) => (
        <Tooltip
          label={props.getValue()}
          arrowOffset={12}
          arrowSize={6}
          withArrow
          className="max-h-auto max-w-80  text-wrap bg-gray-600  text-xs text-white"
        >
          <p className="mr-2 w-32 truncate">{props.getValue()}</p>
        </Tooltip>
      ),
    }),

    colHelper.accessor("created_at", {
      header: (header) => <TableHeader header={header} name={"CreatedAt"} />,
      cell: (props) => (
        <p className="mr-2">{moment(props.getValue()).format("YYYY-MM-DD")}</p>
      ),
    }),

    colHelper.accessor("updated_at", {
      header: (header) => <TableHeader header={header} name={"UpdatedAt"} />,
      cell: (props) => (
        <p className="mr-2">{moment(props.getValue()).format("YYYY-MM-DD")}</p>
      ),
    }),

    colHelper.accessor("action", {
      header: () => null,
      cell: ({ row }) => (
        <p className="flex items-center  justify-start gap-x-3 px-0 text-gray-500">
          <button
            onClick={() =>
              navigate("/edit-product", { state: { product: row.original } })
            }
          >
            <FaEdit />
          </button>
          <DeletePopover
            size={18}
            deleteItemName="product"
            mutate={mutate}
            isPending={isPending}
            item={row.original}
          />
        </p>
      ),
    }),
  ]
  return (
    <>
      <ClientFacingHeader
        heading={"Products"}
        subHeading={"Table for products"}
      />
      <div className="w-full p-4">
        <section className="mb-6 flex justify-between gap-x-2">
          <TableSearchBar
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            placeholder={"Search product by name, description, etc..."}
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
        <Table
          data={data?.products || []}
          columns={columns}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
    </>
  )
}

export default Products
