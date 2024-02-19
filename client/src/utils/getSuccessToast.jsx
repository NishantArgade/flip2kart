import { notifications } from "@mantine/notifications"
import { RiCheckboxCircleFill } from "react-icons/ri"

export const getSuccessToast = (message) => {
  return notifications.show({
    message: <p className="text-[#FFFFFF]">{message}</p>,
    withBorder: false,
    withCloseButton: false,
    icon: (
      <button className=" text-green-500">
        <RiCheckboxCircleFill size={26} />
      </button>
    ),
    styles: {
      icon: { background: "none" },
    },
  })
}
