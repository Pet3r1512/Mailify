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
            <button className="btn btn-outline btn-primary">Get Started</button>
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
