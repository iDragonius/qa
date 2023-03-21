import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, ReactNode } from "react";
import cx from "classnames";
interface SidebarProps {
  children: ReactNode;
}
const sidebarLinks = [
  { id: 1, href: "/", label: "Home" },
  { id: 2, href: "/questions", label: "Questions" },
];
const Sidebar: FC<SidebarProps> = ({ children }) => {
  const { pathname } = useRouter();

  return (
    <div className="drawer-mobile drawer">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content  flex flex-col ">{children}</div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu w-52 bg-base-300  text-base-content">
          <span className="hidden   h-[66px] cursor-pointer items-center bg-base-100 px-2  text-left text-2xl font-bold normal-case text-base-content transition-all ease-in-out lg:flex">
            Answered
          </span>
          <div className="mt-3 flex w-full justify-end lg:hidden">
            <label
              htmlFor="my-drawer-2"
              className="btn-ghost btn-square btn   "
            >
              <svg
                className="swap-on fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
            </label>
          </div>

          <div className="mt-2 lg:my-5">
            {sidebarLinks.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  className={cx(pathname === link.href && "bg-base-200")}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
