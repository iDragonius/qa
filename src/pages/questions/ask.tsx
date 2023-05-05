import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { ChangeEvent, FC, useState } from "react";
import { api } from "~/utils/api";
import useTranslation from "next-translate/useTranslation";

const Ask: FC = ({}) => {
  const { mutate } = api.question.createQuestion.useMutation();
  const { push } = useRouter();
  const { data: session } = useSession();
  const {t} = useTranslation('common')
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
        <h1 className="text-lg text-primary-content">{t('ask')}</h1>
      </div>

      <div className="mb-5 rounded-lg bg-base-100 p-5">
        <h2 className="text-sm text-primary-content">{t('title_label')}</h2>
        <p className="text-xs text-neutral-content">
          {t('title_description')}
        </p>
        <input
          type="text"
          value={questionData.title}
          onChange={changeData}
          name={"title"}
          placeholder=  {t('title_placeholder')}
          className="input-bordered input mt-2 w-full"
        />
      </div>

      <div className="mb-5 rounded-lg bg-base-100 p-5">
        <h2 className="text-sm text-primary-content">{t('content_label')}</h2>
        <p className="text-xs text-neutral-content">
          {t('content_description')}
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
          {t('publish')}
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
          {t('draft')}

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
