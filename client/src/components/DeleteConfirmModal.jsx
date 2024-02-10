import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function DeleteConfirmModal({ children }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        size={300}
        opened={opened}
        onClose={close}
        title="Remove Item"
        centered
      >
        <div className="flex flex-col gap-y-2 text-xs items-start">
          <p className="text-gray-600">
            Are you sure you want to remove this item?
          </p>
          <div className="self-center flex justify-center items-center gap-x-4 mt-10">
            <button
              onClick={close}
              className="px-10 py-3  border-[1.5px] border-gray-300 font-semibold shadow-sm rounded-sm"
            >
              CANCEL
            </button>
            <button
              onClick={close}
              className="px-10 py-3  bg-blue-500 text-white font-semibold shadow-sm rounded-sm"
            >
              REMOVE
            </button>
            {/* <button></button> */}
          </div>
        </div>
      </Modal>

      <button onClick={open}>{children}</button>
    </>
  );
}
