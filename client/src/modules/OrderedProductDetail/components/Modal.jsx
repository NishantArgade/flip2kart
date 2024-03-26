import { Modal } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"

export default function ModalComponent({
  children,
  isPending,
  mutate,
  item,
  title,
  body,
  opened,
  close,
  open,
}) {
  return (
    <>
      <Modal size={300} opened={opened} onClose={close} title={title} centered>
        <div className="flex flex-col items-start gap-y-2 text-xs">
          <p className="text-gray-600">{body}</p>
          <div className="mt-10 flex items-center justify-center gap-x-4 self-center">
            <button
              onClick={close}
              className="rounded-sm border-[1.5px] border-gray-300  px-10 py-3 font-semibold uppercase shadow-sm"
            >
              No
            </button>
            <button
              disabled={isPending}
              onClick={() => mutate(item)}
              className="rounded-sm bg-blue-500 px-10  py-3 font-semibold uppercase text-white shadow-sm"
            >
              yes
            </button>
          </div>
        </div>
      </Modal>

      <button onClick={open}>{children}</button>
    </>
  )
}
