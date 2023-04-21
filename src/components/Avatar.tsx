import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

const Avatar: FC = ({}) => {
  const { data: sessionData } = useSession();
  return (
    <div className="dropdown-end dropdown">
      <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
        <div className="w-10 rounded-full">
          <Image
            src={sessionData?.user.image as string}
            alt={"Profile Image"}
            width={40}
            height={40}
          />
        </div>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
      >
        <li>
          <Link href={`/users/${sessionData?.user.nickname as string}`}>
            Your profile
          </Link>
        </li>
        <li>
          <Link
            href={`/users/${sessionData?.user.nickname as string}/questions`}
          >
            Your questions
          </Link>
        </li>
        <li>
          <Link href={`/users/${sessionData?.user.nickname as string}/drafts`}>
            Your drafts
          </Link>
        </li>
        <li>
          <Link href={"/settings"}>Settings</Link>
        </li>
        <li>
          <div onClick={() => signOut()}>Logout</div>
        </li>
      </ul>
    </div>
  );
};

export default Avatar;
