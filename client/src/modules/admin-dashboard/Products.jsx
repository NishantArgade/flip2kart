import { Tooltip } from "@mantine/core"
import { createColumnHelper } from "@tanstack/react-table"
import moment from "moment"
import { useState } from "react"
import { IoMdAddCircle } from "react-icons/io"
import { Link } from "react-router-dom"
import DeletePopover from "../../components/DeletePopover.jsx"
import EditUser from "../../components/EditUserModal.jsx"
import ClientFacingHeader from "./components/ClientFacingHeader.jsx"
import Table from "./components/Table.jsx"
import TableHeader from "./components/TableHeader.jsx"
import TableSearchBar from "./components/TableSearchBar.jsx"

const data = [
  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },

  {
    id: "65a63a404e9ce490acd0c3a6",
    name: "Iphone asdfsdfs asdfdsfsd sdfdf dsfdsfd dsff dsafdfasdf asdfsdaf",
    price: 200000,
    stock: 100,
    category: "Phone",
    description:
      "Et consetetur nonumy ea invidunt nonumy sit at voluptua dolor clita. At tempor no kasd ipsum elitr duo stet duo.",
    createdAt: new Date("2023/01/10"),
    updatedAt: new Date("2023/03/11"),
  },
]

const colHelper = createColumnHelper()
const columns = [
  colHelper.accessor("id", {
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
        className="max-h-32 max-w-80 text-wrap bg-gray-600  text-xs text-white"
      >
        <p className="mr-2 w-32 truncate">{props.getValue()}</p>
      </Tooltip>
    ),
  }),

  colHelper.accessor("createdAt", {
    header: (header) => <TableHeader header={header} name={"CreatedAt"} />,
    cell: (props) => (
      <p className="mr-2">{moment(props.getValue()).format("YYYY-MM-DD")}</p>
    ),
  }),

  colHelper.accessor("updatedAt", {
    header: (header) => <TableHeader header={header} name={"UpdatedAt"} />,
    cell: (props) => (
      <p className="mr-2">{moment(props.getValue()).format("YYYY-MM-DD")}</p>
    ),
  }),

  colHelper.accessor("action", {
    header: () => null,
    cell: () => (
      <p className="flex items-center  justify-start gap-x-3 px-0 text-gray-500">
        <Link to="/edit-product">
          {" "}
          <EditUser />
        </Link>
        <DeletePopover size={18} deleteItemName="product" />
      </p>
    ),
  }),
]

const Products = () => {
  const [globalFilter, setGlobalFilter] = useState("")

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
          data={data}
          columns={columns}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
        />
      </div>
    </>
  )
}

export default Products
