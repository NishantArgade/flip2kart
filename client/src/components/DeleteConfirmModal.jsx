import { Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"

export default function DeleteConfirmModal({
  children,
  removeProductIsPending,
  removeProductMutate,
  productID,
}) {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Modal
        size={300}
        opened={opened}
        onClose={close}
        title="Remove Item"
        centered
      >
        <div className="flex flex-col items-start gap-y-2 text-xs">
          <p className="text-gray-600">
            Are you sure you want to remove this item?
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-4 self-center">
            <button
              onClick={close}
              className="rounded-sm border-[1.5px]  border-gray-300 px-10 py-3 font-semibold shadow-sm"
            >
              CANCEL
            </button>
            <button
              disabled={removeProductIsPending}
              onClick={() => removeProductMutate(productID)}
              className="rounded-sm bg-blue-500  px-10 py-3 font-semibold text-white shadow-sm"
            >
              REMOVE
            </button>
          </div>
        </div>
      </Modal>

      <button className="font-medium  hover:text-blue-500" onClick={open}>
        {children}
      </button>
    </>
  )
}
