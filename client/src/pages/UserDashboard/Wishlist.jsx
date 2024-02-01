import { Link } from "react-router-dom";
import DeletePopover from "../../components/DeletePopover";

function handleRemoveProduct() {
  console.log("Product deleted");
}

const Wishlist = () => {
  return (
    <>
      <p className="border-b-[1.5px] px-4 py-4">
        My Wishlist <span className="text-gray-500">(2)</span>
      </p>
      <div>
        {[1, 2].map((i) => (
          <span
            key={i}
            className="flex justify-between items-start px-4 w-full  py-5 border-b-[1.5px] cursor-pointer gap-x-1"
          >
            <Link to={"/product-detail/1"}>
              <div className="flex justify-start items-start gap-x-3">
                <div className="px-3 pt-1 w-20 ">
                  <img src="/shirt.png" alt="" />
                </div>

                <div className="text-sm">
                  <p className=" text-gray-800 hover:text-blue-500">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                  <div className="text-xs text-gray-700 mt-2">
                    <div className="text-xs text-gray-700 flex items-center justify-start gap-x-2">
                      <span className="bg-green-600 px-1 py-[2px] rounded-sm  text-white">
                        4.5★
                      </span>
                      <span className="font-medium text-gray-500">(460)</span>
                      <div>
                        <img src="/assured.png" className="w-14" alt="" />
                      </div>
                    </div>
                  </div>
                  <p className="text-xs mt-4">
                    <span className="text-[1.2rem] mr-2 font-bold">₹1,500</span>
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
    </>
  );
};

export default Wishlist;
