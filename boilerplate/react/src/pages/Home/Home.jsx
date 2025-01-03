import React from "react";
import Logo from "../../assets/logos/logo.png";
import Header from "../../components/specific/Header/Header";
import Button from "../../components/common/Button/Button";

function Home() {
  return (
    <div className="w-full h-screen justify-between flex-col flex items-center py-8">
      <Header />
      <main className="flex flex-col gap-4 justify-center items-center">
        <img
          src={Logo}
          alt="Quickstruc logo"
          width={220}
          priority
          className="object-contain"
        />
        <ol className="list-inside list-decimal text-lg text-white/70 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] text-white px-1 py-0.5 rounded font-semibold">
              Pages/Home/Home.jsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>
        <Button
          onEvent={() => {
            window.location.href =
              "https://github.com/CodeWithJagdeep/Quickstruc";
          }}
          children="Contribute"
          customCss={{
            color: "white",
            padding: "10px 30px",
            marginTop: "60px",
          }}
          tailwindProperties={"border border-white/80 text-white rounded-full"}
        />
      </main>
      <footer>
        <p className="text-white text-sm">
          © 2024 Quickstruc. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;
