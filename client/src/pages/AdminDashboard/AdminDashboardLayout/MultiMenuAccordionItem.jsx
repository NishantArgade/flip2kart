import { Accordion } from "@mantine/core";
import { NavLink } from "react-router-dom";

const MultiMenuAccordionItem = ({ name, icon, subMenu }) => {
  return (
    <Accordion.Item value={name}>
      <Accordion.Control
        icon={icon}
        className="text-xs text-gray-800 font-bold"
      >
        {name}
      </Accordion.Control>
      <Accordion.Panel className="text-xs">
        {subMenu.map((item, i) => (
          <NavLink
            key={i}
            to={item?.link}
            end
            className={({ isActive, isPending }) =>
              isPending
                ? "pending"
                : isActive
                ? "bg-[#F5FAFF] text-blue-500 p-3 w-full block"
                : "hover:bg-[#F5FAFF] hover:text-blue-500 p-3 w-full block"
            }
          >
            {item?.name}
          </NavLink>
        ))}
      </Accordion.Panel>
    </Accordion.Item>
  );
};

export default MultiMenuAccordionItem;
