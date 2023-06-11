import React from "react";

const Footer = () => {
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-y-12 pb-6 pt-16 lg:flex-row lg:items-center lg:py-16">
          <div>
            <div className="flex items-center text-gray-900">
              <img className="h-10 w-10 flex-none fill-cyan-500" src="/assets/safety.png" alt="" />
              {/* <svg
                viewBox="0 0 40 40"
                aria-hidden="true"
                className="h-10 w-10 flex-none fill-cyan-500"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20 40C8.954 40 0 31.046 0 20S8.954 0 20 0s20 8.954 20 20-8.954 20-20 20ZM4 20c0 7.264 5.163 13.321 12.02 14.704C17.642 35.03 19 33.657 19 32V8c0-1.657-1.357-3.031-2.98-2.704C9.162 6.68 4 12.736 4 20Z"
                />
              </svg> */}
              <div className="ml-4">
                <p className="text-base font-semibold">OnlineSafety Game</p>
                <p className="mt-1 text-sm">Stay safe in the digital world..</p>
              </div>
            </div>
            <nav className="mt-11 flex gap-8">

              <a
                className="relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors delay-150 hover:text-gray-900 hover:delay-[0ms]"
                href="https://twitter.com/AdebayoOmolumo"
                target="_blank"
              >
                <span className="relative z-10">Twitter</span>
              </a>
              <a
                className="relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors delay-150 hover:text-gray-900 hover:delay-[0ms]"
                href="https://github.com/Bayurzx/ChainlinkHackFrontend"
                target="_blank"
              >
                <span className="relative z-10">GitHub</span>
              </a>
              <a
                className="relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors delay-150 hover:text-gray-900 hover:delay-[0ms]"
                href="https://youtu.be/vwk8d62gPKQ"
                target="_blank"
              >
                <span className="relative z-10">YouTube</span>
              </a>
              <a
                className="relative -mx-3 -my-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors delay-150 hover:text-gray-900 hover:delay-[0ms]"
                href="https://www.linkedin.com/in/adebayo-omolumo/"
                target="_blank"
              >
                <span className="relative z-10">LinkedIn</span>
              </a>
            </nav>
          </div>
          <div className="group relative -mx-4 flex items-center self-stretch p-4 transition-colors hover:bg-gray-100 sm:self-auto sm:rounded-2xl lg:mx-0 lg:self-auto lg:p-6">
            <div className="relative flex h-24 w-24 flex-none items-center justify-center">
              <svg
                viewBox="0 0 96 96"
                fill="none"
                aria-hidden="true"
                className="absolute inset-0 h-full w-full stroke-gray-300 transition-colors group-hover:stroke-cyan-500"
              >
                <path
                  d="M1 17V9a8 8 0 0 1 8-8h8M95 17V9a8 8 0 0 0-8-8h-8M1 79v8a8 8 0 0 0 8 8h8M95 79v8a8 8 0 0 1-8 8h-8"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
              </svg>
              <img
                width={80}
                height={80}
                decoding="async"
                data-nimg={1}
                style={{ color: "transparent" }}
                src="/assets/OnlineSafetyLogo.jpg"
              />
            </div>
            <div className="ml-8 lg:w-64">
              <p className="text-base font-semibold text-gray-900">
                <a href="/#">
                  <span className="absolute inset-0 sm:rounded-2xl" />
                  Download the app
                </a>
              </p>
              <p className="mt-1 text-sm text-gray-700">
                Scan the QR code to download the app from the App Store.
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center border-t border-gray-200 pb-12 pt-8 md:flex-row-reverse md:justify-between md:pt-6">


          <p className="mt-6 text-sm text-gray-500 md:mt-0">
            © 2023 OnlineSafety Game. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default Footer;
