import { Popover, Text } from "@mantine/core";
import { useState } from "react";
import { IoMdTrash } from "react-icons/io";

const DeletePopover = ({ handleDelete, size = 18, deleteItemName = null }) => {
  const [opened, setOpened] = useState(false);

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
      <Popover.Dropdown className="bg-gray-100 border-2 border-gray-200">
        <Text size="xs" className="text-center">
          Are you sure you want to delete this {deleteItemName}?
        </Text>
        <div className="flex items-center justify-center text-xs mt-3 gap-x-2">
          <button className="text-gray-500" onClick={() => setOpened(false)}>
            CANCEL
          </button>
          <button className="text-red-600" onClick={handleDelete}>
            YES, DELETE
          </button>
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};

export default DeletePopover;
