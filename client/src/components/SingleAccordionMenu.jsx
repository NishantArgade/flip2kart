import { Accordion } from "@mantine/core"
import { MdOutlineNavigateNext } from "react-icons/md"
import { Link } from "react-router-dom"

const SingleAccordionMenu = ({ name, icon, link }) => {
  return (
    <Accordion.Item value={name}>
      <Link to={link}>
        <div>
          <Accordion.Control
            icon={icon}
            className="text-xs font-semibold text-gray-800"
            chevron={
              <MdOutlineNavigateNext
                className="font-extralight text-gray-500 "
                size={26}
              />
            }
            translate="no"
            styles={{
              chevron: {
                transform: "none",
                width: "1rem",
              },
            }}
          >
            {name}
          </Accordion.Control>
        </div>
      </Link>
    </Accordion.Item>
  )
}

export default SingleAccordionMenu
