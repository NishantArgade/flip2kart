import { Popover, Text } from "@mantine/core"
import { useState } from "react"

const DeleteReviewPopover = ({
  deleteItemName = null,
  item,
  mutate,
  isPending,
}) => {
  const [opened, setOpened] = useState(false)

  function handleDelete() {
    mutate(item)
  }

  return (
    <Popover
      opened={opened}
      width={300}
      withArrow
      shadow="md"
      closeOnClickOutside
      onChange={() => setOpened(false)}
    >
      <Popover.Target>
        <button
          className="mr-6 text-xs font-semibold text-blue-500"
          onClick={() => setOpened(true)}
        >
          Delete
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

export default DeleteReviewPopover
