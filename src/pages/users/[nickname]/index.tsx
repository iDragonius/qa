import Image from "next/image";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { api } from "~/utils/api";
import cx from "classnames";
import QuestionItem from "~/components/QuestionItem";
const User: FC = ({}) => {
  const { query, isReady } = useRouter();
  const [active, setActive] = useState<1 | 2>(1);
  const { data: user, isRefetching } = api.user.getUser.useQuery(
    query.nickname as string,
    {
      refetchOnMount: true,
      enabled: isReady,
    }
  );
  const changeActive = (activeEl: 1 | 2) => {
    if (activeEl === active) {
      return;
    }
    setActive(activeEl);
  };
  return (
    <div>
      <div className="flex flex-col items-center rounded-lg bg-base-100 p-4 sm:flex-row sm:justify-between">
        <div className="flex flex-col  items-center  sm:flex-row  ">
          <Image
            src={user?.image as string}
            alt={"user"}
            width={120}
            height={120}
            className={"rounded-lg"}
          />
          <div className="mt-3 mb-5 text-center sm:mb-0 sm:mt-0 sm:ml-5 sm:text-left">
            <h1 className="text-2xl text-primary-content">{user?.nickname}</h1>
            <p>{user?.name}</p>
          </div>
        </div>
        <div className=" flex  flex-col items-center gap-3 rounded-lg bg-primary p-5  min-[330px]:flex-row">
          <div className="   flex flex-col items-center">
            <h1 className="mb-1 text-lg font-semibold text-primary-content">
              Questions
            </h1>
            <p className="text-2xl font-bold text-primary-content">
              {user?._count.questions}
            </p>
          </div>
          <div className="divider   divider-horizontal   " />

          <div className="flex flex-col items-center">
            <h1 className="mb-1 text-lg font-semibold text-primary-content">
              Answers
            </h1>
            <p className="text-2xl font-bold text-primary-content">
              {user?._count.answers}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 flex justify-center ">
        <div className="btn-group ">
          <button
            className={cx(" btn", active === 1 && "btn-active")}
            onClick={() => changeActive(1)}
          >
            Questions
          </button>
          <button
            className={cx("btn", active === 2 && "btn-active")}
            onClick={() => changeActive(2)}
          >
            Answers
          </button>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {user?.questions.map((question) => (
          <QuestionItem key={question.id} data={question} />
        ))}
      </div>
    </div>
  );
};

export default User;
