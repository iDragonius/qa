import Link from "next/link";
import React, { FC } from "react";
import { RouteTypes } from "~/utils/types";
import dayjs from "dayjs";
import Image from "next/image";
import useTranslation from "next-translate/useTranslation";

interface QuestionItemProps {
  data: RouteTypes["question"]["getAllQuestions"][0];
}

const QuestionItem: FC<QuestionItemProps> = ({ data }) => {
  const {t} = useTranslation('common')

  return (
    <Link
      href={`/questions/${data?.id || ""}`}
      className="indicator card w-full cursor-pointer bg-base-200  transition-all ease-in-out hover:scale-105"
    >
      {data?.is_answered ? (
        <div className="indicator-center indicator-bottom badge-secondary badge indicator-item ">
          {t('answered')}
        </div>
      ) : (
        <div className="indicator-center indicator-bottom badge-accent badge indicator-item">
          {t('open')}
        </div>
      )}
      <div className="card-body flex flex-col justify-between space-y-1 py-4">
        <div className=" space-y-1">
          <div className="flex items-center justify-between">
            <Link
              href={`/users/${data.user.nickname as string}`}
              className="btn-ghost btn -ml-5 flex items-center space-x-3  text-lg normal-case"
            >
              <div className=" avatar w-max">
                <Image
                  src={data?.user.image as string}
                  alt={"profile"}
                  width={32}
                  height={32}
                  className=" mask mask-squircle "
                />
              </div>
              <p>{data?.user.nickname}</p>
            </Link>
          </div>
          <div className="space-y-3">
            <h1 className="card-title  text-primary-content">{data?.title}</h1>
            {/* <h1 className="prose text-secondary-content line-clamp-2">
            {data?.content}
          </h1> */}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-neutral-content">
            {dayjs(data?.createdAt).format("DD  MMMM YYYY")}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default QuestionItem;
