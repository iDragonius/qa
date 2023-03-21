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
            Answered
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
