import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { getCurrentUser } from "@/lib/actions/user.actions";

const NavBar = async () => {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-row justify-between mx-10 mt-6 text-md">
      <Link href="/">
        <Image
          src="/assets/images/logo.png"
          alt="logo"
          width={50}
          height={50}
          className="block"
        />
      </Link>

      <div className="flex flex-row justify-center items-center space-x-14 font-semibold">
        <p className="hover:underline cursor-pointer">Home</p>
        <p className="hover:underline cursor-pointer">Products</p>
        <p className="hover:underline cursor-pointer">About</p>

        <Link href="/sign-in">
          <Button
            variant="secondary"
            className="bg-brand hover:bg-brand-dark/20 text-brand-dark font-bold hover:underline cursor-pointer"
            size="lg"
          >
            {user ? "Logout" : " Sign In"}
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
