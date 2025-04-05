import NavBar from "@/components/NavBar";
import Image from "next/image";
import React from "react";

const Page = () => {
  return (
    <>
      <NavBar />
      <div className="flex h-screen items-center justify-center">
        <Image
          src="/assets/icons/404error.svg"
          alt="error"
          width={600}
          height={600}
        />
      </div>
    </>
  );
};

export default Page;
