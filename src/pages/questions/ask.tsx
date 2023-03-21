import React, { FC } from "react";

const Ask: FC = ({}) => {
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
        <textarea className="textarea-bordered textarea mt-2 w-full" />
      </div>
    </div>
  );
};

export default Ask;
