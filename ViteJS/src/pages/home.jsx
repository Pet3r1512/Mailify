import React from "react";
import { HeadBar, Tab } from "../components/index";

function Hero() {
  return (
    <div className="flex flex-1 relative w-full">
      <div className="hero-content justify-between max-w-none min-w-full flex flex-col sm:flex-row">
        <div className="sm:w-[40%] flex flex-col items-center sm:items-start">
          <h1 className="text-5xl md:text-6xl font-bold text-primary text-center sm:text-left">
            Email service for people who want more.
          </h1>
          <p className="py-6 text-lg font-semibold text-gray-400">
            You will love working with Mailify.
          </p>
          <a href="/register">
            <button className="btn btn-outline btn-primary flex justify-center items-center gap-1 hover:text-white">
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
        <img className="mr-0" srcSet="/images/hero.png 3x" alt="" />
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="bg-white">
      <Tab name="Home" />
      <div className="max-w-[1750px] mx-auto flex flex-col h-full min-h-screen">
        <HeadBar />
        <Hero />
      </div>
    </div>
  );
}
