import { notifications } from "@mantine/notifications"
import { IoMdInformationCircle } from "react-icons/io"
import { RiCheckboxCircleFill } from "react-icons/ri"

export const toast = {
  success: (msg) => {
    return notifications.show({
      message: <p className="text-[#FFFFFF]">{msg}</p>,
      icon: <RiCheckboxCircleFill size={26} className="text-green-500" />,
      withBorder: false,
      withCloseButton: false,
      styles: {
        icon: { background: "none" },
      },
    })
  },
  error: (msg) => {
    return notifications.show({
      message: <p className="text-[#FFFFFF]">{msg}</p>,
      icon: <IoMdInformationCircle size={26} className="text-red-500" />,
      withBorder: false,
      withCloseButton: false,
      styles: {
        icon: { background: "none" },
      },
    })
  },
  info: (msg) => {
    return notifications.show({
      message: <p className="text-[#FFFFFF]">{msg}</p>,
      icon: <IoMdInformationCircle size={26} className="text-blue-500" />,
      withBorder: false,
      withCloseButton: false,
      styles: {
        icon: { background: "none" },
      },
    })
  },
  custom: (icon, msg) => {
    return notifications.show({
      message: <p className="text-[#FFFFFF]">{msg}</p>,
      icon: icon,
      withBorder: false,
      withCloseButton: false,
      styles: {
        icon: { background: "none" },
      },
    })
  },
}
