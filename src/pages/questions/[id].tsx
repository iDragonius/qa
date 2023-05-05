import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { type FC, useState } from "react";
import { api } from "~/utils/api";
import tick from "~/assets/tick.svg";
import cx from "classnames";
import deleteIcon from "~/assets/delete.svg";
import useTranslation from "next-translate/useTranslation";

const QuestionItem: FC = ({}) => {
  const { query, isReady } = useRouter();
  const { data: session } = useSession();
  const ctx = api.useContext();
  const { data: question } = api.question.getQuestion.useQuery(
    {
      id: query.id as string,
    },
    {
      refetchOnMount: true,
      enabled: isReady,
    }
  );
  const { mutate: sendAnswer } = api.answer.sendAnswer.useMutation();
  const { mutate: markAnswer } = api.question.markAnswer.useMutation();
  const { mutate: unmarkAnswer } = api.question.unmarkAnswer.useMutation();
  const { mutate: deleteAnswer } = api.answer.deleteAnswer.useMutation();
  const {t} = useTranslation('common')
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
                width={48}
                height={48}
              />
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm text-primary-content">
              {question?.user.nickname}
            </p>
            <p className="text-xs">{question?.user.name}</p>
          </div>
        </div>
        <div className="mb-5 flex  w-max items-center  justify-center self-end rounded-lg bg-base-100 py-5 px-10 ">
          <Link href={"/questions/ask"} className="btn-primary btn">
            {t('ask')}
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
            {question?.views} {t('views')}
          </p>
          <div className=" divider divider-horizontal mx-1" />
          <p className=" text-sm text-neutral-content">
            {question?.answers.length} {t('answers')}
          </p>
        </div>
        <div className="divider my-1" />
        <p className="">{question?.content}</p>
      </div>
      {question?.user.id === session?.user.id && !question?.is_answered && (
        <div className="alert mb-5 shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 flex-shrink-0 stroke-info"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <span>{t('mark_answer')}</span>
          </div>
          <div className="flex-none">
            <button className="btn-primary btn-sm btn">OK</button>
          </div>
        </div>
      )}
      <div className="mb-5 rounded-lg bg-base-100 p-5 text-primary-content">
        <div>
          <h1 className="text-xl">{t('your_answer')}</h1>
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
                async onSuccess() {
                  await ctx.question.getQuestion.invalidate({
                    id: query.id as string,
                  });
                },
              }
            )
          }
        >
          {t('send_answer')}
        </button>
      </div>
      <div className="mb-5 rounded-lg bg-base-100 p-5 text-primary-content">
        <div>
          <h1 className="text-xl">
            {t('answers_stat')}{" "}
            <span className="ml-3 text-neutral-content">
              {question?.answers.length}
            </span>
          </h1>
          <div className="divider  my-1" />
        </div>
        <div className="space-y-3">
          {question?.answers
            .sort((a, b) => +b.is_answer - +a.is_answer)
            .map((answer) => (
              <div
                key={answer.id}
                className={cx(
                  "rounded-lg bg-base-200 py-3 transition-all ease-in-out ",
                  answer.is_answer
                    ? "border-l-8 border-success px-1 pr-3"
                    : "px-3"
                )}
              >
                <div className="flex items-center justify-between">
                  <Link
                    href={`/users/${answer.user.nickname as string}`}
                    className=" btn-ghost btn mb-1 flex w-max items-center px-3 normal-case"
                  >
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
                    <div className=" ml-3 text-left ">
                      <p className=" text-sm  ">{answer?.user.nickname}</p>
                      <p className="text-xs text-neutral-content">
                        {answer.user.name}
                      </p>
                    </div>
                  </Link>
                  {/* {!question.is_answered && (
                  <div
                    className="tooltip tooltip-bottom flex items-center rounded-lg py-2 px-3 font-semibold text-white"
                    data-tip="Mark as answer"
                  >
                    <div className="ml-3 flex h-8 w-8 items-center justify-center rounded-lg bg-success">
                      <Image src={tick} height={20} width={20} alt={"tick"} />
                    </div>
                  </div>
                )} */}
                  {question.user.id === session?.user.id && (
                    <div className="dropdown-end dropdown-hover dropdown">
                      <label tabIndex={0} className=" m-1">
                        <button className="btn-ghost btn-square btn">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-5 w-5 stroke-current"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                            ></path>
                          </svg>
                        </button>
                      </label>
                      <ul
                        tabIndex={0}
                        className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
                      >
                        {question.user.id === session?.user.id && (
                          <>
                            {answer.is_answer ? (
                              <li>
                                <button
                                  onClick={() => {
                                    void unmarkAnswer(
                                      {
                                        questionsId: question.id,
                                        answerId: answer.id,
                                      },
                                      {
                                        async onSuccess() {
                                          await ctx.question.getQuestion.invalidate(
                                            {
                                              id: query.id as string,
                                            }
                                          );
                                        },
                                      }
                                    );
                                  }}
                                >
                                  <svg
                                    className="swap-on fill-current"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 512 512"
                                  >
                                    <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
                                  </svg>

                                  <span>{t('unmark')}</span>
                                </button>
                              </li>
                            ) : (
                              <li>
                                <button
                                  onClick={() => {
                                    void markAnswer(
                                      {
                                        questionsId: question.id,
                                        answerId: answer.id,
                                      },
                                      {
                                        async onSuccess() {
                                          await ctx.question.getQuestion.invalidate(
                                            {
                                              id: query.id as string,
                                            }
                                          );
                                        },
                                      }
                                    );
                                  }}
                                >
                                  <Image
                                    src={tick as string}
                                    height={20}
                                    width={20}
                                    alt={"tick"}
                                  />
                                  <span>{t('mark')}</span>
                                </button>
                              </li>
                            )}
                          </>
                        )}
                        {answer.user.id === session?.user.id && (
                          <li>
                            <button
                              className="flex items-center"
                              onClick={() => {
                                void deleteAnswer(
                                  {
                                    questionId: question.id,
                                    answerId: answer.id,
                                  },
                                  {
                                    async onSuccess() {
                                      await ctx.question.getQuestion.invalidate(
                                        {
                                          id: query.id as string,
                                        }
                                      );
                                    },
                                  }
                                );
                              }}
                            >
                              <Image
                                src={deleteIcon as string}
                                height={20}
                                width={20}
                                alt={"delete"}
                              />
                              {t('delete')}
                            </button>
                          </li>
                        )}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="px-3">
                  <p className="mb-2 text-sm">{answer.content}</p>
                  <p className=" text-xs text-neutral-content">
                    {dayjs(answer?.createdAt).format("DD  MMMM YYYY")}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionItem;
