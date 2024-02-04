/* eslint-disable react/prop-types */
import React from "react"
import { GrFormPrevious } from "react-icons/gr"
import {
  MdKeyboardDoubleArrowLeft,
  MdOutlineNavigateNext,
} from "react-icons/md"
import { RiArrowRightDoubleLine } from "react-icons/ri"

const TablePagination = ({ table }) => {
  return (
    <div className="mt-2 flex w-full items-center  justify-end gap-2 rounded-sm bg-[#F5FAFF] px-3 py-2 text-gray-600">
      <button
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        <MdKeyboardDoubleArrowLeft />
      </button>
      <button
        disabled={!table.getCanPreviousPage()}
        onClick={() => table.previousPage()}
      >
        <GrFormPrevious />
      </button>
      <button
        disabled={!table.getCanNextPage()}
        onClick={() => table.nextPage()}
      >
        <MdOutlineNavigateNext />
      </button>
      <button
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        <RiArrowRightDoubleLine />
      </button>
      <p className="ml-3 text-sm font-medium">
        {table.getState().pagination.pageIndex + 1}
      </p>
      <p className="font-base text-sm text-gray-600">of</p>
      <p className="text-sm font-medium">{table.getPageCount()}</p>
    </div>
  )
}

export default TablePagination
