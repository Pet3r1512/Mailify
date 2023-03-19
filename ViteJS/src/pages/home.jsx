import React from "react";
import Tab from "../components/helmet";

function HeadBar() {
  return (
    <div className="flex w-full py-5 justify-between">
      <a href="/">
        <img srcset="/images/mailify.png 2.8x" alt="" />
      </a>
      <div className="flex gap-4">
        <a href="/register">
          <button className="btn btn-outline btn-primary">Sign In</button>
        </a>
        <button className="btn btn-active btn-primary">
          Create an account
        </button>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="flex flex-1 relative w-full">
      <div className="hero-content justify-between max-w-none">
        <div className="w-[40%]">
          <h1 className="text-6xl font-bold text-primary">
            Email service for people who want more.
          </h1>
          <p className="py-6 text-lg font-semibold text-gray-400">
            You will love working with Mailify.
          </p>
          <a href="/register">
            <button className="btn btn-outline btn-primary flex justify-center items-center gap-1">
              Get Started
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </button>
          </a>
        </div>
        <img className="mr-0" srcset="/images/hero.png 3x" alt="" />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Tab name="Home" />
      <div className="max-w-[1750px] mx-auto flex flex-col h-screen">
        <HeadBar />
        <Hero />
      </div>
    </>
  );
}
