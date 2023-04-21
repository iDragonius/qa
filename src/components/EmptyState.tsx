import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import emptyState from "~/assets/empty-state.png";

interface EmptyStateProps {
  type: "drafts" | "questions";
}

const EmptyState: FC<EmptyStateProps> = ({ type }) => {
  return (
    <div className="mx-auto flex w-full flex-col items-center rounded-lg bg-base-100 px-20 py-5">
      <Image src={emptyState} alt={"empty"} width={240} height={240} />
      <h1 className="mt-5 text-2xl  font-semibold text-primary-content">
        You haven't any {type}
      </h1>
      <Link href={"/questions/ask"} className={"btn mt-2 "}>
        Ask question
      </Link>
    </div>
  );
};

export default EmptyState;
