import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React, { FC, useState } from "react";
import Avatar from "./Avatar";
import Modal from "./Modal";

const Navbar2: FC = ({}) => {
  const [open, setOpen] = useState<boolean>(false);
  const { data: sessionData } = useSession();
  return (
    <>
      <Modal
        open={open}
        disableClickOutside={false}
        onClose={() => setOpen(!open)}
      >
        <div className="flex justify-between">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input-bordered input"
            />
          </div>
          <button onClick={() => setOpen(!open)} className="btn">
            Close
          </button>
        </div>
      </Modal>
      <div className="navbar sticky top-0 z-[100000] min-h-[66px] bg-base-100">
        <div className="flex-1">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-2" className=" btn-ghost  btn-square btn">
              <svg
                className="swap-off fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                viewBox="0 0 512 512"
              >
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>
            </label>
          </div>
          <Link
            href={"/"}
            className="btn-ghost btn text-xl normal-case lg:hidden"
          >
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
            <span className="ml-2 hidden sm:inline-block"> Answered</span>
          </Link>
        </div>
        <div className="flex-none gap-2">
          <div className="form-control hidden sm:block">
            <input
              type="text"
              placeholder="Search"
              className="input-bordered input"
            />
          </div>
          <button
            className="btn-ghost btn-circle btn sm:hidden"
            onClick={() => setOpen(!open)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          {!sessionData ? (
            <button onClick={() => signIn()} className="btn">
              Get started
            </button>
          ) : (
            <Avatar />
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar2;
