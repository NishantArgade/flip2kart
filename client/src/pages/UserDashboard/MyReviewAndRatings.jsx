const MyReviewAndRatings = () => {
  return (
    <>
      <p className="border-b-[1.5px] px-4 py-4">
        My Review <span className="text-gray-500">(2)</span>
      </p>
      <div>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex w-full items-start justify-between border-b-[1.5px]  px-4 py-5"
          >
            <div className="flex items-start justify-start gap-x-3">
              <div className="w-20 px-3 pt-1 ">
                <img src="/shirt.png" alt="" />
              </div>

              <div className="text-sm">
                <p className="text-gray-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </p>
                <div className="mt-2 text-xs text-gray-700">
                  <span className="mr-2 rounded-sm bg-green-600 px-1 py-[2px] text-white">
                    4.5★
                  </span>
                  <span className="font-semibold text-gray-800">
                    Mind-blowing purchase
                  </span>
                </div>
                <p className="mt-2 text-xs text-gray-800">Awesome product</p>
                <p className="mt-2 text-xs text-gray-500">
                  Nishant Argade <span>09 Dec, 2023</span>
                </p>

                <div className="mt-2">
                  <button className="mr-6 text-xs font-semibold text-blue-500">
                    Edit
                  </button>
                  <button className="text-xs font-semibold text-blue-500">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default MyReviewAndRatings
