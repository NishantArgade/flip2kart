import { Modal, Rating } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useMemo, useState } from "react";
import { FaEdit } from "react-icons/fa";

function EditReviewModal() {
  const [rateValue, setRateValue] = useState(0);
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      rating: "",
      comment: "",
    },

    validate: {
      rating: (value) => {
        if (!value) return "field should not be empty";
        return value.length < 2
          ? "first name must have at least 2 letters"
          : null;
      },
    },
  });

  const rateValueOptimize = useMemo(() => {
    if (rateValue === 1) {
      return "Very Bad";
    } else if (rateValue === 2) {
      return "Bad";
    } else if (rateValue === 3) {
      return "Good";
    } else if (rateValue === 4) {
      return "Very  Good";
    } else if (rateValue === 5) {
      return "Excellent";
    }
  }, [rateValue]);

  return (
    <>
      <Modal
        size={"lg"}
        opened={opened}
        onClose={close}
        title="Edit Review"
        closeOnClickOutside={false}
        centered
      >
        <div>
          <div className="text-xs mb-2">
            <p className="font-semibold mb-1">Review Info</p>
            <div>
              <span>User Name: </span>
              <span>Nishant Argade</span>
            </div>
            <div>
              <span>Product Name: </span>
              <span>Iphone </span>
            </div>
          </div>

          <form onSubmit={form.onSubmit(console.log)} className="">
            <div className="grid grid-cols-2 gap-4">
              <div className="py-4 ">
                <p className="text-xs font-medium text-gray-900">
                  Rate Product
                </p>
                <div className="mt-2 flex items-center gap-x-4">
                  <Rating
                    value={rateValue}
                    className="gap-x-2"
                    onChange={setRateValue}
                    color="#FFE11B"
                  />
                  <span
                    className={
                      rateValueOptimize === "Very Bad"
                        ? "text-red-500 text-xs font-semibold"
                        : rateValueOptimize === "Bad"
                        ? "text-orange-500 text-xs font-semibold"
                        : "text-green-500 text-xs font-semibold"
                    }
                  >
                    {rateValueOptimize}
                  </span>
                </div>
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="Comment"
                  className="block mb-1 text-xs font-medium text-gray-900"
                >
                  Comment
                </label>
                <textarea
                  id="Commnet"
                  placeholder="Write your comment..."
                  {...form.getInputProps("comment")}
                  className="border-gray-300 focus:border-blue-500 p-2 text-sm outline-none border-[1.5px] rounded-md resize-none w-full h-16"
                />
              </div>
            </div>

            <div className="flex gap-4 items-center justify-end">
              <div className="flex flex-col self-start">
                <button
                  onClick={close}
                  className="bg-white text-gray-800 border-[1.5px] border-gray-200 shadow-md rounded-sm text-xs py-2 px-6 mt-6"
                >
                  CANCEL
                </button>
              </div>
              <div className="flex flex-col self-start">
                <button
                  type="submit"
                  className="bg-blue-600 text-white shadow-md rounded-sm text-xs py-2 px-6 mt-6"
                >
                  SAVE
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>

      <FaEdit onClick={open} size={16} className="cursor-pointer" />
    </>
  );
}

export default EditReviewModal;
