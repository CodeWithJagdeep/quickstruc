import React, { useState } from "react";
import Button from "../../../components/common/Button/Button.tsx";

function Login() {
  return (
    <div className="flex items-center justify-between bg-[black] min-h-screen w-full">
      <div className="w-full">
        <div className="w-full flex flex-col items-center">
          <div className="flex items-center justify-center w-full">
            <div className="mb-12">
              <img src={""} alt="" />
            </div>
          </div>
          <div className=" w-[500px]">
            <div className="text-white text-center text-5xl">
              Sign in to Quickstruc
            </div>
            <div className="text-white/70 text-base mt-3 text-center">
              Login or register
            </div>
            <div className="mt-6">
              <Button
                onEvent={() => {
                  console.log("sign in with google");
                }}
                children={
                  <span className="ml-3 text-lg">Sign in with Google</span>
                }
                tailwindProperties={
                  "py-3 px-7 border w-full cursor-pointer border-white/15 bg-[#cf72c9]  flex items-center justify-center text-black"
                }
              />

              <div className="flex w-full items-center mt-3">
                <Button
                  onEvent={() => {
                    console.log("sign in with Github");
                  }}
                  children={
                    <span className="ml-3 text-base">Sign in with Github</span>
                  }
                  tailwindProperties={
                    "py-3 cursor-pointer px-7 border w-1/2 mr-2 border-white/15 bg-[#070707] flex items-center justify-center text-white"
                  }
                />
                <Button
                  onEvent={() => {
                    console.log("sign in with Github");
                  }}
                  children={
                    <span className="ml-3 text-base">Sign in with twitter</span>
                  }
                  tailwindProperties={
                    "py-3 cursor-pointer px-7 border w-1/2 ml-2 border-white/15 bg-[#070707] flex items-center justify-center text-white"
                  }
                />
              </div>
            </div>
            <div className="text-white/60 mt-7 text-sm text-center">
              By continuing, you agree to our
              <a href="/" className="text-white underline mx-3">
                Terms of Service
              </a>
              and
              <a href="/" className="text-white underline mx-3">
                Privacy Policy.
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
