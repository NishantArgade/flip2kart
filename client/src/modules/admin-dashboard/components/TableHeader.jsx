/* eslint-disable react/prop-types */
import { TbArrowsSort } from "react-icons/tb"

const TableHeader = ({ header, name }) => {
  return (
    <div className="bg-red-40  flex flex-col flex-wrap items-start  gap-x-2 pb-4 text-start text-xs font-semibold text-gray-500">
      <div className="bg-gray-60 flex w-full  items-center justify-start  gap-1">
        <p className="bg-red-20 py-1  text-start text-xs  font-semibold text-gray-500">
          {name}
        </p>

        <TbArrowsSort
          onClick={() => {
            header?.column?.toggleSorting()
          }}
          className="mr-2 cursor-pointer text-gray-600"
          size={15}
        />
      </div>
      <div className="pl-1">
        {
          {
            asc: (
              <img
                src="/caret-square-up.svg "
                className="opacity-40"
                alt=""
                width={13}
              />
            ),
            desc: (
              <img
                src="/caret-square-down.svg "
                className="opacity-40"
                alt=""
                width={13}
              />
            ),
          }[header?.column?.getIsSorted()]
        }
      </div>
    </div>
  )
}

export default TableHeader
