import { Popover, Text } from "@mantine/core"
import { useState } from "react"
import { IoMdTrash } from "react-icons/io"

const DeletePopover = ({
  size = 18,
  deleteItemName = null,
  item,
  isPending,
  mutate,
}) => {
  const [opened, setOpened] = useState(false)

  function handleDelete() {
    mutate(item)
  }

  return (
    <Popover
      opened={opened}
      width={300}
      position="bottom-end"
      withArrow
      shadow="md"
      closeOnClickOutside
      onChange={() => setOpened(false)}
    >
      <Popover.Target>
        <button>
          <IoMdTrash
            size={size}
            onClick={() => setOpened((state) => !state)}
            className="cursor-pointer"
          />
        </button>
      </Popover.Target>
      <Popover.Dropdown className="border-2 border-gray-200 bg-gray-100">
        <Text size="xs" className="text-center">
          Are you sure you want to delete this {deleteItemName}?
        </Text>
        <div className="mt-3 flex items-center justify-center gap-x-2 text-xs">
          <button className="text-gray-500" onClick={() => setOpened(false)}>
            CANCEL
          </button>
          <button
            disabled={isPending}
            className="text-red-600"
            onClick={handleDelete}
          >
            YES, DELETE
          </button>
        </div>
      </Popover.Dropdown>
    </Popover>
  )
}

export default DeletePopover
