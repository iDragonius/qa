import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useState } from "react";
import { api } from "~/utils/api";

const QuestionItem: FC = ({}) => {
  const { query } = useRouter();
  const { data: session } = useSession();
  const ctx = api.useContext();
  const { data: question } = api.question.getQuestion.useQuery({
    id: query.id as string,
  });
  const { mutate: sendAnswer } = api.answer.sendAnswer.useMutation();
  const [content, setContent] = useState<string>("");
  return (
    <div>
      <div className="flex flex-col justify-between gap-x-5 min-[550px]:flex-row">
        <div className="mb-5 flex  w-full items-center rounded-lg bg-base-100 p-5">
          <div className="avatar">
            <div className="mask mask-squircle">
              <Image
                src={question?.user.image as string}
                alt={"user profile"}
                width={120}
                height={120}
              />
            </div>
          </div>
          <div className="ml-3">
            <p>{question?.user.nickname}</p>
          </div>
        </div>
        <div className="mb-5 flex  w-max items-center  justify-center self-end rounded-lg bg-base-100 py-5 px-10 ">
          <Link href={"/questions/ask"} className="btn-primary btn">
            Ask Question
          </Link>
        </div>
      </div>

      <div className="mb-5 rounded-lg bg-base-100 p-5 text-primary-content">
        <h1 className="mb-2 text-2xl">{question?.title}</h1>
        <div className="flex items-center">
          <p className=" text-sm text-neutral-content">
            {dayjs(question?.createdAt).format("DD  MMMM YYYY")}
          </p>
          <div className=" divider divider-horizontal mx-1" />
          <p className=" text-sm text-neutral-content">
            {question?.views} views
          </p>
          <div className=" divider divider-horizontal mx-1" />
          <p className=" text-sm text-neutral-content">
            {question?.answers.length} answers
          </p>
        </div>
        <div className="divider my-1" />
        <p className="">{question?.content}</p>
      </div>
      {question?.user.id === session?.user.id && !question?.is_answered && (
        <div className="alert alert-info mb-5 shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 flex-shrink-0 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>
              In your questions you can mark comment as answer, for other users
            </span>
          </div>
        </div>
      )}
      <div className="mb-5 rounded-lg bg-base-100 p-5 text-primary-content">
        <div>
          <h1 className="text-xl">Your answer</h1>
          <div className="divider  my-1" />
        </div>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className=" textarea-bordered textarea w-full text-lg"
        />
        <button
          className="btn mt-2"
          onClick={() =>
            sendAnswer(
              { id: question?.id as string, content: content },
              {
                async onSuccess(input) {
                  await ctx.question.getQuestion.invalidate({
                    id: query.id as string,
                  });
                },
              }
            )
          }
        >
          Send your answer
        </button>
      </div>
      <div className="mb-5 rounded-lg bg-base-100 p-5 text-primary-content">
        <div>
          <h1 className="text-xl">
            Answers{" "}
            <span className="ml-3 text-neutral-content">
              {question?.answers.length}
            </span>
          </h1>
          <div className="divider  my-1" />
        </div>
        <div className="space-y-3">
          {question?.answers.map((answer) => (
            <div key={answer.id} className="rounded-lg bg-base-200 p-3 ">
              <div className="mb-3 flex items-center ">
                <div className="avatar">
                  <div className="mask mask-squircle">
                    <Image
                      src={answer.user.image as string}
                      alt={"user profile"}
                      width={32}
                      height={32}
                    />
                  </div>
                </div>
                <div className="ml-3 ">
                  <p className=" text-sm">{answer?.user.nickname}</p>
                  <p className=" text-xs text-neutral-content">
                    {dayjs(answer?.createdAt).format("DD  MMMM YYYY")}
                  </p>
                </div>
              </div>
              <p className="text-sm">{answer.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionItem;
