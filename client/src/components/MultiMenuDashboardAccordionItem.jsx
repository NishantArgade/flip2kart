import { Accordion } from "@mantine/core"
import { NavLink } from "react-router-dom"

const MultiMenuDashboardAccordionItem = ({ name, icon, subMenu }) => {
  return (
    <Accordion.Item value={name}>
      <Accordion.Control
        icon={icon}
        className="text-xs font-bold text-gray-800"
      >
        {name}
      </Accordion.Control>
      <Accordion.Panel className="text-xs">
        {subMenu.map((item, i) => (
          <NavLink
            key={i}
            to={item?.link}
            end
            onClick={() => {
              const ele = document.getElementById(
                "admin-dashboard-right-section"
              )
              if (ele) ele.scrollIntoView({ behavior: "smooth", block: "end" })
            }}
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                  ? "block w-full bg-[#F5FAFF] p-3 text-blue-500"
                  : "block w-full p-3 hover:bg-[#F5FAFF] hover:text-blue-500"
            }
          >
            {item?.name}
          </NavLink>
        ))}
      </Accordion.Panel>
    </Accordion.Item>
  )
}

export default MultiMenuDashboardAccordionItem
