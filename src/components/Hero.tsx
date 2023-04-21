import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import React, { FC } from "react";

const Hero = ({}) => {
  const { data: session } = useSession();
  return (
    <div className="hero  mb-5 rounded-xl bg-base-200 py-10">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              Answered
            </span>
          </h1>
          <p className="py-6">
            Ask questions, get different answers and choose the one you like. To
            get answers from our community, click the button below
          </p>
          {session ? (
            <Link href={"/questions/ask"} className="btn-primary btn">
              Ask question
            </Link>
          ) : (
            <button
              className="btn-primary btn"
              onClick={async () => await signIn()}
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
