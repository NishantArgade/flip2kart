import { Modal, Radio } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useMutation } from "@tanstack/react-query"
import { updateActiveAddress } from "../../../api/addressApi"
import { getAddressString } from "../../../utils/helper"
import { queryClient } from "../../../main"

export default function ChangeAddressModal({ children, data }) {
  const [opened, { open, close }] = useDisclosure(false)

  const {
    mutate: updateAciveAddressMutate,
    isPending: updateActiveAddressIsPending,
  } = useMutation({
    mutationKey: "updateActiveAddress",
    mutationFn: updateActiveAddress,
    onSuccess: () => {
      queryClient.invalidateQueries("allMyAddresses")
      close()
    },
  })

  function handleUpdateActiveAddress(addressID) {
    updateAciveAddressMutate(addressID)
  }

  return (
    <>
      <Modal
        size={340}
        opened={opened}
        onClose={close}
        title="Select Delivery Address"
        centered
      >
        <div className="thin-scrollbar flex h-80 flex-col items-start justify-start  gap-y-2 overflow-auto text-xs">
          {data?.addresses.map((item, i) => (
            <div
              key={i}
              className="flex cursor-pointer items-start justify-start gap-x-2 py-3 hover:bg-gray-100"
              onClick={() => handleUpdateActiveAddress(item._id)}
            >
              <Radio
                size="xs"
                checked={item.is_active}
                readOnly
                disabled={updateActiveAddressIsPending}
              />
              <div>
                <p className="font-semibold">
                  {item.user_name}, <span>{item.pincode}</span>
                </p>
                <p className="mt-1 text-gray-600">{getAddressString(item)}</p>
              </div>
            </div>
          ))}
        </div>
      </Modal>

      <button
        onClick={open}
        className="rounded-sm border-2 bg-white  px-4 py-2 font-semibold text-blue-500 shadow-sm  hover:shadow-md"
      >
        {children}
      </button>
    </>
  )
}
