import { Link } from "react-router-dom"
import DeletePopover from "../../components/DeletePopover"
import Spinner from "../../components/Spinner"
import { useMutation, useQuery } from "@tanstack/react-query"
import {
  toggleProductFromWishlist,
  getMyWishlistProducts,
} from "../../api/productApi"
import { queryClient } from "../../main"

const Wishlist = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["myWishlistProduct"],
    queryFn: getMyWishlistProducts,
  })

  const { mutate, isPending } = useMutation({
    mutationKey: ["toggleProductFromWishlist"],
    mutationFn: toggleProductFromWishlist,
    onSuccess: () => queryClient.invalidateQueries("myWishlistProduct"),
  })

  return (
    <>
      {!isLoading ? (
        data?.wishlist.length > 0 ? (
          <div>
            <p className="border-b-[1.5px] px-4 py-4">
              My Wishlist{" "}
              <span className="text-gray-500">({data?.wishlist.length})</span>
            </p>
            <div>
              {data?.wishlist?.map((item, index) => (
                <span
                  key={index}
                  className="flex w-full cursor-pointer items-start justify-between  gap-x-1 border-b-[1.5px] px-4 py-5"
                >
                  <Link to={`/product-detail/${item?._id}`}>
                    <div className="flex items-start justify-start gap-x-3">
                      <div className="h-20 w-20 p-1">
                        <img
                          src={item?.images[0]?.url}
                          alt=""
                          className="h-full w-full object-contain"
                        />
                      </div>

                      <div>
                        <p className="text-xs text-gray-800 hover:text-blue-500">
                          {item?.name}
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
                          <span className="mr-2 text-[1.2rem] text-sm font-bold">
                            ₹{item?.price.toLocaleString("en-IN")}
                          </span>
                          <strike className="mr-2 text-gray-700">₹2300</strike>
                          <span className="text-green-600 ">
                            {item?.discount}% off
                          </span>
                        </p>
                      </div>
                    </div>
                  </Link>
                  <div className="text-gray-500">
                    <DeletePopover
                      deleteItemName="product"
                      mutate={mutate}
                      item={item}
                      isPending={isPending}
                    />
                  </div>
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-2 flex h-[30rem] flex-col items-center justify-center gap-2 ">
            <img src="/missing-cart.png" className="w-52 " alt="" />
            <p className="mt-4 text-sm">Wishlist is Empty</p>
          </div>
        )
      ) : (
        <div className="flex h-3/4 items-center justify-center ">
          <Spinner />
        </div>
      )}
    </>
  )
}

export default Wishlist
