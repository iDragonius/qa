import React, { FC } from "react";
import { api } from "~/utils/api";
import Link from "next/link";
import EmptyState from "~/components/EmptyState";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import { GetServerSideProps } from "next";
const UserDrafts: FC = ({}) => {
  const { query } = useRouter();
  const { data: drafts } = api.question.getUserDrafts.useQuery(undefined, {
    refetchOnMount: true,
  });
  if (drafts?.length === 0) {
    return <EmptyState type={"drafts"} />;
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 min-[900px]:grid-cols-3">
      {drafts?.map((draft) => (
        <div
          key={draft.id}
          className="flex flex-col justify-between  rounded-lg bg-base-100 p-5"
        >
          <div>
            <h1 className="  mb-1 text-xl text-primary-content">
              {draft.title}
            </h1>
            <p className=" mb-5 text-neutral-content line-clamp-2">
              {draft.content}
            </p>
          </div>

          <div className="flex items-center justify-between">
            <p>{dayjs(draft?.updatedAt).format("DD  MMMM YYYY, HH:mm")}</p>
            <Link
              className="btn-primary btn-sm btn  px-5"
              href={`/users/${query.nickname as string}/drafts/${draft.id}`}
            >
              View
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {

  
  return {
    props: {},
  };
};
export default UserDrafts;
