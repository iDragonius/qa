import React, { FC } from "react";
import QuestionItem from "~/components/QuestionItem";
import { api } from "~/utils/api";

const QuestionPage: FC = ({}) => {
  const { data: questions } = api.question.getAllQuestions.useQuery(undefined, {
    refetchOnMount: true,
  });
  return (
    <div className=" grid  grid-cols-1 gap-5 min-[550px]:grid-cols-2 lg:grid-cols-3 ">
      {questions?.map((question) => (
        <QuestionItem data={question} key={question.id} />
      ))}
    </div>
  );
};

export default QuestionPage;
