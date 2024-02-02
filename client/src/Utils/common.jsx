import { TbArrowsSort } from "react-icons/tb";

export const getTableHeader = (header, headerName) => {
  return (
    <div className="flex  pb-4 flex-col items-start gap-x-2  text-xs text-start bg-red-40 flex-wrap font-semibold text-gray-500">
      <div className="flex items-center w-full  justify-start gap-1  bg-gray-60">
        <p className="text-xs text-start  bg-red-20 font-semibold  text-gray-500 py-1">
          {headerName}
        </p>

        <TbArrowsSort
          onClick={() => {
            header.column.toggleSorting();
          }}
          className="text-gray-600 cursor-pointer mr-2"
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
          }[header.column.getIsSorted()]
        }
      </div>
    </div>
  );
};
