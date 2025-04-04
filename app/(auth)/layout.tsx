import Image from "next/image";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="hidden w-1/2 items-center justify-center bg-brand p-10 lg:flex xl:w-2/5">
        <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12">
          <Image
            src="/assets/images/logo.png"
            alt="logo"
            width={80}
            height={80}
            className="h-auto transition-all hover:scale-105"
          />
          <div className="space-y-5 text-black">
            <h1 className="h2">Express, Explore, Engage</h1>
            <p className="h-3">
              Your space to share thoughts, discover stories, and connect with
              ideas that matter.
            </p>
          </div>
          <Image
            src="/assets/images/person.png"
            alt="Files"
            width={280}
            height={280}
            className="transition-all hover:scale-105"
          />
        </div>
      </section>

      <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        {children}
      </section>
    </div>
  );
};

export default Layout;
