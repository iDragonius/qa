import { useRouter } from "next/router";
import React, { ChangeEvent, FC, useEffect, useState } from "react";
import { api } from "~/utils/api";
import useTranslation from "next-translate/useTranslation";

const UserDraft: FC = () => {
  const { mutate } = api.question.publishQuestion.useMutation();
  const { query, isReady, push } = useRouter();
  const ctx = api.useContext();
  const {
    data: draft,
    isSuccess,
    isRefetching,
  } = api.question.getUserDraft.useQuery(query.id as string, {
    enabled: isReady,
    refetchOnMount: true,
  });
  const {t} = useTranslation('common')
  useEffect(() => {
    setQuestionData({
      title: draft?.title as string,
      content: draft?.content as string,
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
      <div className="mb-5 rounded-lg bg-base-100 p-5 ">
        <h1 className="text-lg text-primary-content">{t('user_drafts')}</h1>
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
          placeholder= {t('title_placeholder')}
          className="input-bordered input mt-2 w-full"
        />
      </div>

      <div className="mb-5 rounded-lg bg-base-100 p-5">
        <h2 className="text-sm text-primary-content"> {t('content_label')}</h2>
        <p className="text-xs text-neutral-content">
            {t('content_description')}
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
          onClick={() =>
            mutate(
              {
                id: query.id as string,
                draft: false,
                ...questionData,
              },
              {
                async onSuccess() {
                  await ctx.question.invalidate();
                },
              }
            )
          }
        >
            {t('publish')}
        </button>
        <button
          className="btn-ghost btn"
          onClick={() =>
            mutate(
              {
                id: query.id as string,
                draft: true,
                ...questionData,
              },
              {
                async onSuccess() {
                  await push(`/users/${query.nickname as string}/drafts`);
                },
              }
            )
          }
        >
            {t('draft')}
        </button>
      </div>
    </div>
  );
};

export default UserDraft;
