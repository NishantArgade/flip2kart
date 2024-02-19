import { Link } from "react-router-dom"
import DeletePopover from "../../components/DeletePopover"
import Spinner from "../../components/Spinner"

function handleRemoveProduct() {
  console.log("Product deleted")
}

const Wishlist = () => {
  return (
    <>
      {true ? (
        <div>
          <p className="border-b-[1.5px] px-4 py-4">
            My Wishlist <span className="text-gray-500">(2)</span>
          </p>
          <div>
            {[1, 2].map((i) => (
              <span
                key={i}
                className="flex w-full cursor-pointer items-start justify-between  gap-x-1 border-b-[1.5px] px-4 py-5"
              >
                <Link to={"/product-detail/1"}>
                  <div className="flex items-start justify-start gap-x-3">
                    <div className="w-20 px-3 pt-1 ">
                      <img src="/shirt.png" alt="" />
                    </div>

                    <div className="text-sm">
                      <p className=" text-gray-800 hover:text-blue-500">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      </p>
                      <div className="mt-2 text-xs text-gray-700">
                        <div className="flex items-center justify-start gap-x-2 text-xs text-gray-700">
                          <span className="rounded-sm bg-green-600 px-1 py-[2px]  text-white">
                            4.5★
                          </span>
                          <span className="font-medium text-gray-500">
                            (460)
                          </span>
                          <div>
                            <img src="/assured.png" className="w-14" alt="" />
                          </div>
                        </div>
                      </div>
                      <p className="mt-4 text-xs">
                        <span className="mr-2 text-[1.2rem] font-bold">
                          ₹1,500
                        </span>
                        <strike className="mr-2 text-gray-700">₹2300</strike>
                        <span className="text-green-600 ">24% off</span>
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="text-gray-500">
                  <DeletePopover
                    handleDelete={handleRemoveProduct}
                    deleteItemName="product"
                  />
                </div>
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex h-3/4 items-center justify-center ">
          <Spinner />
        </div>
      )}
    </>
  )
}

export default Wishlist
