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
import OfficeModal from "./components/OfficeModal.jsx"
import { FaEdit } from "react-icons/fa"
import { useMutation, useQuery } from "@tanstack/react-query"
import { deleteOffice, getAllOffices } from "../../api/officeApi.js"
import Spinner from "../../components/Spinner.jsx"
import { queryClient } from "../../main.jsx"

const colHelper = createColumnHelper()

const Offices = () => {
  const [globalFilter, setGlobalFilter] = useState("")
  const [opened, { open, close }] = useDisclosure(false)
  const [isEdit, setIsEdit] = useState(false)
  const [officeData, setOfficeData] = useState({})

  const { data, isLoading } = useQuery({
    queryKey: ["allOffices"],
    queryFn: getAllOffices,
  })

  const { mutate, isPending } = useMutation({
    mutationKey: "deleteOffice",
    mutationFn: deleteOffice,
    onSuccess: () => queryClient.invalidateQueries("allOffices"),
  })

  function handleEdit(data) {
    setOfficeData(data)
    setIsEdit(true)
    open()
  }

  function handleAddOffice() {
    setIsEdit(false)
    open()
  }

  const columns = [
    colHelper.accessor("_id", {
      id: "srNo",
      header: (header) => <TableHeader header={header} name={"Sr._No"} />,
      cell: ({ row }) => <div>{row.index + 1}</div>,
    }),

    colHelper.accessor("_id", {
      header: (header) => <TableHeader header={header} name={"ID"} />,
      cell: (props) => <p className="mr-2">{props.getValue()}</p>,
    }),

    colHelper.accessor("manager", {
      header: (header) => <TableHeader header={header} name={"Manager"} />,
      cell: (props) => <p className="mr-2">{props.getValue()}</p>,
    }),

    colHelper.accessor("country", {
      header: (header) => <TableHeader header={header} name={"Country"} />,
      cell: (props) => (
        <p className="mr-2  w-32 truncate">{props.getValue()}</p>
      ),
    }),

    colHelper.accessor("state", {
      header: (header) => <TableHeader header={header} name={"State"} />,
      cell: (props) => <p className="mr-2">{props.getValue()}</p>,
    }),

    colHelper.accessor("city", {
      header: (header) => <TableHeader header={header} name={"City"} />,
      cell: (props) => (
        <Tooltip
          label={props.getValue()}
          withArrow
          arrowOffset={12}
          arrowSize={6}
          className="max-h-32 max-w-96 text-wrap bg-gray-600  text-xs text-white"
        >
          <p className="mr-2 w-40 truncate">{props.getValue()}</p>
        </Tooltip>
      ),
    }),

    colHelper.accessor("phone", {
      header: (header) => <TableHeader header={header} name={"Phone"} />,
      cell: (props) => <p className="mr-2 w-32 truncate">{props.getValue()}</p>,
    }),

    colHelper.accessor("established_at", {
      header: (header) => (
        <TableHeader header={header} name={"EstablishedAt"} />
      ),
      cell: (props) => (
        <p className="mr-2">{moment(props.getValue()).format("YYYY-MM-DD")}</p>
      ),
    }),

    colHelper.accessor("action", {
      header: () => <p className="py-1 pb-5 text-xs text-gray-500">Action</p>,
      cell: ({ row }) => (
        <p className="flex items-center  justify-center gap-x-3 px-0 text-gray-500">
          <FaEdit onClick={() => handleEdit(row.original)} />
          <DeletePopover
            size={18}
            deleteItemName="office"
            item={row.original}
            mutate={mutate}
            isPending={isPending}
          />
        </p>
      ),
    }),
  ]

  return (
    <>
      <OfficeModal
        opened={opened}
        close={close}
        isEdit={isEdit}
        officeData={officeData}
      />

      <ClientFacingHeader
        heading={"Offices"}
        subHeading={"Table for to see office details"}
      />
      {!isLoading ? (
        <div className="w-full p-4">
          <section className="mb-6 flex justify-between gap-x-2">
            {data?.offices.length > 0 && (
              <TableSearchBar
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                placeholder={"Search office by name, location, etc..."}
              />
            )}
            <button
              onClick={handleAddOffice}
              className="flex  h-full w-20 cursor-pointer items-center justify-center gap-x-2 bg-blue-600 py-2 text-xs   text-white lg:w-32"
            >
              <IoMdAddCircle size={20} />
              <p className="hidden lg:block">Add Office</p>
            </button>
          </section>

          {/** Table */}
          {data?.offices.length > 0 ? (
            <Table
              data={data?.offices}
              columns={columns}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          ) : (
            <div className="flex h-[28rem] w-full items-center justify-center font-medium tracking-wider text-gray-300">
              No Data Available
            </div>
          )}
        </div>
      ) : (
        <div className="flex h-[30rem] items-center justify-center bg-white">
          <Spinner />
        </div>
      )}
    </>
  )
}

export default Offices
