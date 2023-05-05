import Link from "next/link";
import { useRouter } from "next/router";
import React, { type FC } from "react";
import EmptyState from "~/components/EmptyState";
import { api } from "~/utils/api";
import cx from "classnames";
import useTranslation from "next-translate/useTranslation";
const UserQuestions: FC = ({}) => {
  const { query } = useRouter();
  const { data: questions } = api.question.getUserQuestions.useQuery(
    undefined,
    {
      refetchOnMount: true,
    }
  );
  const { t } = useTranslation("common");

  if (questions?.length === 0) {
    return <EmptyState type={true} />;
  }
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 min-[900px]:grid-cols-3">
      {questions?.map((question) => (
        <div key={question.id} className="indicator flex w-full flex-col">
          <span
            className={cx(
              " indicator-center indicator-bottom badge indicator-item",
              question.is_answered ? "badge-accent" : "badge-secondary"
            )}
          >
            {question.is_answered ? t("asnwered") : t("open")}
          </span>

          <div className="flex h-full flex-col justify-between  rounded-lg bg-base-100 p-5">
            <div>
              <h1 className="  mb-1 text-xl text-primary-content">
                {question.title}
              </h1>
              <p className=" mb-5 text-neutral-content line-clamp-2">
                {question.content}
              </p>
            </div>

            <div className="j flex items-center justify-end space-x-3">
              <Link
                className="btn-ghost btn-sm btn  px-5"
                href={`/users/${query.nickname as string}/questions/${
                  question.id
                }`}
              >
                {t("edit")}
              </Link>
              <Link
                className="btn-primary btn-sm btn  px-5"
                href={`/questions/${question.id}`}
              >
                {t("view")}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default UserQuestions;
