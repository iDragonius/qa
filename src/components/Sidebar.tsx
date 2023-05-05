import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, ReactNode } from "react";
import cx from "classnames";
import useTranslation from "next-translate/useTranslation";
interface SidebarProps {
  children: ReactNode;
}

const Sidebar: FC<SidebarProps> = ({ children }) => {
  const { pathname } = useRouter();
  const {t} = useTranslation('common')
  const sidebarLinks = [
    { id: 1, href: "/", label: t('home_page') },
    { id: 2, href: "/questions", label: t('questions_page') },
  ];
  return (
    <div className="drawer-mobile drawer">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content  flex flex-col ">
        {children}
        <footer className="footer footer-center mt-5  bg-base-100 p-4 text-base-content">
          <div>
            <p>Copyright © 2023 - All right reserved by Answered</p>
          </div>
        </footer>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu w-52 bg-base-300  text-base-content">
          <span className="hidden   h-[66px] cursor-pointer items-center bg-base-100 px-2  text-left text-2xl font-bold normal-case text-base-content transition-all ease-in-out lg:flex">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              className="fill-current"
            >
              <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
            </svg>
            <span className="ml-2"> Answered</span>
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
                  className={cx(
                    pathname === link.href && "rounded-r-lg  bg-base-200"
                  )}
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
