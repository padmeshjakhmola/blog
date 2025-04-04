import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

const NavBar = () => {
  return (
    <div className="flex flex-row justify-between mx-10 mt-6 text-md">
      <Image
        src="/assets/images/logo.png"
        alt="logo"
        width={50}
        height={50}
        className="block"
      />
      <div className="flex flex-row justify-center items-center space-x-14 font-semibold">
        <p className="hover:underline cursor-pointer">Home</p>
        <p className="hover:underline cursor-pointer">Products</p>
        <p className="hover:underline cursor-pointer">About</p>

        <Button
          variant="secondary"
          className="bg-brand hover:bg-brand-dark/20 text-brand-dark font-bold hover:underline cursor-pointer"
          size="lg"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
