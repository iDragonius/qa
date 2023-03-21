import { useSession } from "next-auth/react";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { api } from "~/utils/api";
import Modal from "./Modal";
import Navbar2 from "./Navbar2";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const { data: session } = useSession();
  const [nickname, setNickname] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const { mutateAsync } = api.user.chooseNickname.useMutation();
  useEffect(() => {
    if (session?.user.nickname === null && session !== null) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [session]);
  return (
    <>
      <Sidebar>
        <Navbar2 />
        <div className="mx-5 mt-5">
          <Modal
            disableClickOutside
            onClose={() => {
              setOpen(!open);
            }}
            open={open}
          >
            <h1 className="mb-2 text-xl font-semibold text-primary-content">
              Choose nickname
            </h1>
            <div className="flex w-full items-center justify-between">
              <div className="form-control w-full max-w-xs">
                <input
                  type="text"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Type here"
                  className="input-bordered input w-full max-w-xs"
                />
                <label htmlFor="" className="text-error">
                  {error}
                </label>
              </div>
              <button
                className="btn ml-5 self-start min-[400px]:w-32"
                onClick={() => {
                  mutateAsync({ nickname })
                    .then((res) => {
                      setOpen(false);
                    })
                    .catch((err: { message: string }) => {
                      setError(err.message);
                    });
                }}
              >
                Save
              </button>
            </div>
          </Modal>
          <div className="xl:w-[1000px]">{children}</div>
        </div>
      </Sidebar>
    </>
  );
};

export default Layout;
