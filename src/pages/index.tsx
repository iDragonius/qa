import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";
import Hero from "~/components/Hero";
import QuestionItem from "~/components/QuestionItem";
import { api } from "~/utils/api";

const Home: FC = ({}) => {
  const { data: stats } = api.dashboard.getStats.useQuery();
  const { data: tops } = api.dashboard.getTops.useQuery();
  const { data: user } = useSession();

  return (
    <div>
      <Hero />

      <div className="stats stats-vertical  mb-12 w-full bg-primary shadow sm:stats-horizontal">
        <div className="stat">
          <div className="stat-title text-primary-content">Total Questions</div>
          <div className="stat-value text-primary-content ">
            {stats?.questions}
          </div>
          {/* <div className="stat-desc">Mar 1st - Apr 1st</div> */}
        </div>

        <div className="stat">
          <div className="stat-title text-primary-content">Total Answers</div>
          <div className="stat-value text-primary-content">
            {stats?.answers}
          </div>
          {/* <div className="stat-desc">Mar 1st - Apr 1st</div> */}
        </div>

        <div className="stat">
          <div className="stat-title text-primary-content">Users</div>
          <div className="stat-value text-primary-content">{stats?.users}</div>
          <div className="stat-desc"></div>
        </div>
      </div>
      <div className="mb-12">
        <h1 className="mb-3 text-2xl  font-bold text-primary-content">
          Top Questions
        </h1>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 min-[900px]:grid-cols-3">
          {tops?.questions?.map((question) => (
            <QuestionItem data={question} />
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h1 className="mb-3 text-2xl  font-bold text-primary-content">
          Top Users
        </h1>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 min-[900px]:grid-cols-3">
          {tops?.users?.map((u) => (
            <Link
              href={`/users/${u.nickname}`}
              className="cursor-pointer rounded-lg bg-primary p-5 text-primary-content hover:scale-105"
            >
              <div className="mb-4 flex items-center">
                <Image
                  src={u.image as string}
                  alt={"pp"}
                  width={40}
                  height={40}
                  className={"rounded-lg"}
                />
                <div className="ml-3">
                  <h1 className="text-sm font-semibold text-primary-content">
                    {u.nickname}
                  </h1>
                  <p className="text-xs">{u.name}</p>
                </div>
              </div>
              <div className="flex items-center space-x-5">
                <div className="rounded-lg bg-base-300 p-3 text-center">
                  <h1>Questions</h1>
                  <p>{u._count.questions}</p>
                </div>
                <div className="rounded-lg bg-base-200 p-3 text-center">
                  <h1 className="text-primary-content"> Answers</h1>
                  <p>{u._count.answers}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
