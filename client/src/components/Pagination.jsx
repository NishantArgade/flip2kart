import React, { useState } from "react"

function Pagination({ totalPages, activePage, setActivePage }) {
  const [startPage, setStartPage] = useState(1)

  function updateSearchUrl(currPage) {
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set("page", currPage)
    window.history.pushState({}, "", "?" + urlParams.toString())
  }
  const handlePageClick = (page) => {
    setActivePage(page)
    updateSearchUrl(page)
    if (page < startPage + 5) {
      setStartPage(Math.max(1, page - 4))
    } else if (page >= startPage + 5) {
      setStartPage(Math.min(totalPages - 9, page - 4))
    }
  }

  const handleNextClick = () => {
    if (activePage < totalPages) {
      const nextPage = activePage + 1
      setActivePage(nextPage)
      updateSearchUrl(nextPage)
      if (nextPage >= startPage + 5) {
        setStartPage(Math.min(totalPages - 9, nextPage - 4))
      }
    }
  }

  const handlePrevClick = () => {
    if (activePage > 1) {
      const prevPage = activePage - 1
      setActivePage(prevPage)
      updateSearchUrl(prevPage)
      if (prevPage < startPage + 5) {
        setStartPage(Math.max(1, prevPage - 4))
      }
    }
  }

  if (totalPages === 1) return null

  return (
    <div className="relative mt-5 flex items-center justify-center ">
      <div className="absolute left-0 px-2 text-xs text-gray-700">
        Page {activePage} of {totalPages}
      </div>
      <div className="flex flex-grow items-center justify-center gap-2">
        {activePage !== 1 && (
          <button
            className="text-xs font-medium uppercase text-blue-500"
            type="button"
            onClick={handlePrevClick}
          >
            Previous
          </button>
        )}

        <div className="flex items-center gap-2">
          {Array.from({ length: Math.min(10, totalPages) }).map((_, index) => {
            const pageNumber = startPage + index
            return (
              <button
                key={pageNumber}
                className={`${pageNumber === activePage ? "bg-blue-500 text-white shadow-md" : "bg-none text-black"} inline-flex items-center justify-center rounded-full px-2 py-1 text-center align-middle font-sans text-xs font-medium uppercase transition-all`}
                type="button"
                onClick={() => handlePageClick(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          })}
        </div>

        {activePage !== totalPages && (
          <button
            className="text-xs font-medium uppercase text-blue-500"
            type="button"
            onClick={handleNextClick}
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
}

export default Pagination
