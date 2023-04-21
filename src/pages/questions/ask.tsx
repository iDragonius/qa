import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { ChangeEvent, FC, useState } from "react";
import { api } from "~/utils/api";

const Ask: FC = ({}) => {
  const { mutate } = api.question.createQuestion.useMutation();
  const { push } = useRouter();
  const { data: session } = useSession();
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
      <div className="mb-5 rounded-lg bg-base-100 p-5 ">
        <h1 className="text-lg text-primary-content">Ask new question</h1>
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
          className="textarea-bordered textarea mt-2 w-full"
        />
      </div>

      <div className="flex space-x-5">
        <button
          className="btn-primary btn"
          onClick={() => {
            mutate(
              {
                ...questionData,
                draft: false,
              },
              {
                async onSuccess(data) {
                  await push(`/questions/${data.id}`);
                },
              }
            );
          }}
        >
          Publish
        </button>
        <button
          className="btn-ghost btn"
          onClick={() => {
            mutate(
              {
                ...questionData,
                draft: true,
              },
              {
                async onSuccess(data) {
                  await push(
                    `/users/${session?.user.nickname as string}/drafts`
                  );
                },
              }
            );
          }}
        >
          Save to drafts
        </button>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (!session) {
    return {
      redirect: {
        destination: "/questions",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};

export default Ask;
