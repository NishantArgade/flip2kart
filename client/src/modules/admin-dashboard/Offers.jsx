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
import OfferModal from "./components/OfferModal.jsx"
import { useMutation, useQuery } from "@tanstack/react-query"
import { deleteOffer, getAllOffers } from "../../api/offerApi.js"
import Spinner from "../../components/Spinner.jsx"
import { queryClient } from "../../main.jsx"

const colHelper = createColumnHelper()

const Offers = () => {
  const [globalFilter, setGlobalFilter] = useState("")
  const [opened, { open, close }] = useDisclosure(false)
  const [isEdit, setIsEdit] = useState(false)
  const [selectedOffer, setSelectedOffer] = useState({})

  const { data, isLoading } = useQuery({
    queryKey: ["getAllOffers"],
    queryFn: getAllOffers,
  })

  const { mutate, isPending } = useMutation({
    mutationKey: "deleteOffer",
    mutationFn: deleteOffer,
    onSuccess: () => queryClient.invalidateQueries("getAllOffers"),
  })

  function handleEdit(data) {
    setSelectedOffer(data)
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
      header: (header) => <TableHeader header={header} name={"Sr. No"} />,
      cell: ({ row }) => <div>{row.index + 1}</div>,
      maxSize: 100,
    }),
    colHelper.accessor("_id", {
      header: (header) => <TableHeader header={header} name={"ID"} />,
      cell: (props) => <p className="mr-2">{props.getValue()}</p>,
    }),

    colHelper.accessor("offer", {
      header: (header) => <TableHeader header={header} name={"Offer"} />,
      cell: (props) => (
        <Tooltip
          label={props.getValue()}
          arrowOffset={12}
          arrowSize={6}
          withArrow
          className="max-h-32 max-w-[30rem] text-wrap bg-gray-600  text-xs text-white"
        >
          <p className="mr-2 line-clamp-1 w-[30rem]">{props.getValue()}</p>
        </Tooltip>
      ),
    }),

    colHelper.accessor("created_at", {
      header: (header) => <TableHeader header={header} name={"Created At"} />,
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
            deleteItemName="offer"
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
      <OfferModal
        opened={opened}
        close={close}
        isEdit={isEdit}
        offerData={selectedOffer}
      />

      <ClientFacingHeader
        heading={"Offers"}
        subHeading={"Table for to see all available offers"}
      />
      {!isLoading ? (
        <div className="min-h-96 w-full p-4">
          <section className="mb-6 flex justify-between gap-x-2">
            {data?.offers.length > 0 && (
              <TableSearchBar
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
                placeholder={"Search office by offer"}
              />
            )}
            <button
              onClick={handleAddOffice}
              className="flex  h-full w-20 cursor-pointer items-center justify-center gap-x-2 bg-blue-600 py-2 text-xs   text-white lg:w-32"
            >
              <IoMdAddCircle size={20} />
              <p className="hidden lg:block">Add Offer</p>
            </button>
          </section>

          {/** Table */}
          {data?.offers.length > 0 && (
            <Table
              data={data?.offers}
              columns={columns}
              globalFilter={globalFilter}
              setGlobalFilter={setGlobalFilter}
            />
          )}
        </div>
      ) : (
        // data?.offers.length > 0
        //  (
        //   <div className="flex  h-[28rem] w-full items-center justify-center bg-white font-medium tracking-wider text-gray-300">
        //     No Data Available
        //   </div>
        // )
        <div className="flex h-[30rem] items-center justify-center bg-white">
          <Spinner />
        </div>
      )}
    </>
  )
}

export default Offers
