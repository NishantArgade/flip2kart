import { Tooltip } from "@mantine/core"
import { createColumnHelper } from "@tanstack/react-table"
import moment from "moment"
import { useState } from "react"
import { IoMdAddCircle } from "react-icons/io"
import DeletePopover from "../../components/DeletePopover.jsx"
import ClientFacingHeader from "./components/ClientFacingHeader.jsx"
import Table from "./components/Table.jsx"
import TableHeader from "./components/TableHeader.jsx"
import TableSearchBar from "./components/TableSearchBar.jsx"
import { useDisclosure } from "@mantine/hooks"
import { FaEdit } from "react-icons/fa"
import CategoryModal from "./components/CategoryModal.jsx"
import { useMutation, useQuery } from "@tanstack/react-query"
import {
  deleteCategory,
  getAllCategoriesAndBrands,
} from "../../api/categoryApi.js"
import { queryClient } from "../../main.jsx"
import Spinner from "../../components/Spinner.jsx"
import { useForm } from "@mantine/form"

const colHelper = createColumnHelper()

const Categories = () => {
  const [globalFilter, setGlobalFilter] = useState("")
  const [opened, { open, close }] = useDisclosure(false)
  const [isEdit, setIsEdit] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState({})
  const [previewImage, setPreviewImage] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)

  const form = useForm({
    initialValues: {
      category: "",
      brands: "",
      min_price: "",
      max_price: "",
    },

    validate: {
      category: (value) => {
        if (!value) return "Category is required"
      },
      min_price: (value) => {
        if (!value) return "Minimum price is required"
      },
      max_price: (value) => {
        if (!value) return "Maximum price is required"
      },
    },
  })

  function handleEdit(data) {
    setSelectedCategory(data)
    setPreviewImage(data?.image?.url || null)
    setSelectedImage(JSON.stringify(data?.image) || null)
    form.setValues({
      category: data?.name || "",
      brands: data?.brands?.join(", ") || "",
      min_price: data?.min_price || "",
      max_price: data?.max_price || "",
    })
    setIsEdit(true)
    open()
  }

  function handleAddOffice() {
    setIsEdit(false)
    open()
  }

  const { data, isLoading } = useQuery({
    queryKey: ["allCategories"],
    queryFn: getAllCategoriesAndBrands,
  })

  const { mutate, isPending } = useMutation({
    mutationKey: "deleteCategory",
    mutationFn: deleteCategory,
    onSuccess: () => queryClient.invalidateQueries("allCategories"),
  })

  const columns = [
    colHelper.accessor("_id", {
      id: "srNo",
      header: (header) => <TableHeader header={header} name={"Sr. No"} />,
      cell: ({ row }) => <div>{row.index + 1}</div>,
      maxSize: 20,
    }),

    colHelper.accessor("_id", {
      header: (header) => <TableHeader header={header} name={"ID"} />,
      cell: (props) => <p className="mr-2">{props.getValue()}</p>,
    }),

    colHelper.accessor("name", {
      header: (header) => <TableHeader header={header} name={"Category"} />,
      cell: (props) => <p className="mr-2">{props.getValue()}</p>,
    }),

    colHelper.accessor("brands", {
      header: (header) => <TableHeader header={header} name={"Brands"} />,
      cell: (props) => (
        <Tooltip
          label={props.getValue().join(", ")}
          withArrow
          arrowOffset={12}
          arrowSize={6}
          className="max-h-40 max-w-[28rem] text-wrap bg-gray-600  text-xs text-white"
        >
          <p className="mr-2 w-[28rem] truncate">
            {props.getValue().join(", ")}
          </p>
        </Tooltip>
      ),
    }),

    colHelper.accessor("createdAt", {
      header: (header) => <TableHeader header={header} name={"createdAt"} />,
      cell: (props) => (
        <p className="mr-2">{moment(props.getValue()).format("YYYY-MM-DD")}</p>
      ),
    }),

    colHelper.accessor("action", {
      header: () => <p className="py-1 pb-5 text-xs text-gray-500">Action</p>,
      cell: ({ row }) => (
        <p className="flex  items-center justify-center gap-x-3 px-0 text-gray-500">
          <FaEdit onClick={() => handleEdit(row.original)} />
          <DeletePopover
            size={18}
            deleteItemName="category"
            item={row.original}
            isPending={isPending}
            mutate={mutate}
          />
        </p>
      ),
    }),
  ]

  return (
    <>
      <CategoryModal
        opened={opened}
        close={close}
        isEdit={isEdit}
        form={form}
        selectedCategory={isEdit ? selectedCategory : {}}
        previewImage={previewImage}
        selectedImage={selectedImage}
        setPreviewImage={setPreviewImage}
        setSelectedImage={setSelectedImage}
      />

      <ClientFacingHeader
        heading={"Categories"}
        subHeading={"Table for to see category details"}
      />
      {!isLoading ? (
        data?.categories.length > 0 ? (
          <div className="w-full p-4">
            <section className="mb-6 flex justify-between gap-x-2">
              <TableSearchBar
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                placeholder={"Search office by category, brand, etc..."}
              />
              <button
                onClick={handleAddOffice}
                className="flex  h-full w-20 cursor-pointer items-center justify-center gap-x-2 bg-blue-600 py-2 text-xs   text-white lg:w-32"
              >
                <IoMdAddCircle size={20} />
                <p className="hidden lg:block">Add Category</p>
              </button>
            </section>

            {/** Table */}

            <Table
              data={data?.categories}
              columns={columns}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          </div>
        ) : (
          <div className="flex  h-[28rem] w-full items-center justify-center bg-white font-medium tracking-wider text-gray-300">
            No Data Available
          </div>
        )
      ) : (
        <div className="flex h-[30rem] items-center justify-center bg-white">
          <Spinner />
        </div>
      )}
    </>
  )
}

export default Categories
