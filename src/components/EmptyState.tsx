import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import emptyState from "~/assets/empty-state.png";
import useTranslation from "next-translate/useTranslation";

interface EmptyStateProps {
  type: boolean;
}

const EmptyState: FC<EmptyStateProps> = ({ type }) => {
  const { t } = useTranslation("common");
  return (
    <div className="mx-auto flex w-full flex-col items-center rounded-lg bg-base-100 px-20 py-5">
      <Image src={emptyState} alt={"empty"} width={240} height={240} />
      <h1 className="mt-5 text-2xl  font-semibold text-primary-content">
        {t("not_found")}
      </h1>
      {type && (
        <Link href={"/questions/ask"} className={"btn mt-2 "}>
          {t("ask")}
        </Link>
      )}
    </div>
  );
};

export default EmptyState;
