import { Accordion } from "@mantine/core";
import { MdOutlineNavigateNext } from "react-icons/md";
import { Link } from "react-router-dom";

const SingleMenuAccordionItem = ({ name, icon, link }) => {
  return (
    <Accordion.Item value={name}>
      <Link to={link} className="bg-red-500">
        <div>
          <Accordion.Control
            icon={icon}
            className="text-xs text-gray-800 font-semibold"
            chevron={
              <MdOutlineNavigateNext
                className="text-gray-500 font-extralight "
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
  );
};

export default SingleMenuAccordionItem;
