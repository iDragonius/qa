import { useRouter } from "next/router";
import React, { type ChangeEvent, type FC, useEffect, useState } from "react";
import { api } from "~/utils/api";

const UserQuestion: FC = ({}) => {
  const { mutate } = api.question.publishQuestion.useMutation();
  const { query, isReady, push } = useRouter();
  const ctx = api.useContext();
  const {
    data: question,
    isSuccess,
    isRefetching,
  } = api.question.getUserQuestion.useQuery(query.id as string, {
    enabled: isReady,
    refetchOnMount: true,
  });
  useEffect(() => {
    setQuestionData({
      title: question?.title as string,
      content: question?.content as string,
    });
  }, [isSuccess, isRefetching]);

  const [questionData, setQuestionData] = useState<{
    title: string;
    content: string;
  }>({
    title: "",
    content: "",
  });
  const changeData = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setQuestionData({
      ...questionData,
      [e.currentTarget.name]: e.currentTarget.value,
    });
  };
  return (
    <div>
      <div className="mb-5 flex items-center justify-between rounded-lg bg-base-100 p-5 ">
        <h1 className="text-lg text-primary-content">Your question</h1>
        <div
          className=" tooltip tooltip-bottom "
          data-tip="To change status of question go to questions"
        >
          <p className="cursor-pointer rounded-lg bg-primary py-2 px-5 text-primary-content">
            {question?.is_answered ? "Closed" : "Open"}
          </p>
        </div>
      </div>

      <div className="mb-5 rounded-lg bg-base-100 p-5">
        <h2 className="text-sm text-primary-content">Title</h2>
        <p className="text-xs text-neutral-content">
          Be specific and imagine you’re asking a question to another person.
        </p>
        <input
          type="text"
          value={questionData.title}
          onChange={changeData}
          name={"title"}
          placeholder="Type here"
          className="input-bordered input mt-2 w-full"
        />
      </div>

      <div className="mb-5 rounded-lg bg-base-100 p-5">
        <h2 className="text-sm text-primary-content">Content</h2>
        <p className="text-xs text-neutral-content">
          The body of your question contains your problem details and results.
          Minimum 30 characters
        </p>
        <textarea
          value={questionData.content}
          onChange={changeData}
          minLength={30}
          name={"content"}
          rows={10}
          className="textarea-bordered textarea mt-2 w-full"
        />
      </div>

      <div className="mb-10 flex space-x-5">
        <button
          className="btn-primary btn"
          onClick={() => {
            mutate(
              {
                id: query.id as string,
                draft: false,
                ...questionData,
              },
              {
                async onSuccess() {
                  await ctx.question.invalidate();
                  await push(`/users/${query.nickname as string}/questions`);
                },
              }
            );
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default UserQuestion;
