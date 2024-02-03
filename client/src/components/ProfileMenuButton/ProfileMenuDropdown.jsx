import { Menu } from "@mantine/core";
import { Link } from "react-router-dom";

export default function AdminProfileDropdownBtn({
  navLinks,
  TargetButton,
  isLoggedIn,
}) {
  return (
    <Menu
      trigger="click-hover"
      openDelay={100}
      closeDelay={400}
      shadow="md"
      width={200}
      withArrow
      arrowSize={10}
      // classNames={"z-[3000]"}
      zIndex={3000}
    >
      <Menu.Target>{TargetButton}</Menu.Target>

      <Menu.Dropdown>
        {!isLoggedIn && (
          <Menu.Item className="hover:bg-gray-50">
            <p className="border-b-2 pb-2 flex items-center justify-between">
              <span>New Customer?</span>
              <Link
                to="/register"
                className="text-blue-500  hover:underline hover:underline-offset-4"
              >
                Signup
              </Link>
            </p>
          </Menu.Item>
        )}

        {navLinks?.map((item) => (
          <Link key={item.link} to={item?.link}>
            <Menu.Item className="hover:bg-gray-50" leftSection={item?.icon}>
              {item?.name}
            </Menu.Item>
          </Link>
        ))}
      </Menu.Dropdown>
    </Menu>
  );
}
