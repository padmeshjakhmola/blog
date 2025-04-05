import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { getCurrentUser, logout } from "@/lib/actions/user.actions";

const NavBar = async () => {
  const user = await getCurrentUser();

  console.log("rrrrrrrrrrrrrrrrr",user)

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
        {["Home", "Products", "About"].map((item) => (
          <p key={item} className="hover:underline cursor-pointer">
            {item}
          </p>
        ))}

        {/* <Link href="/sign-in">
          <Button
            variant="secondary"
            className="bg-brand hover:bg-brand-dark/20 text-brand-dark font-bold hover:underline cursor-pointer"
            size="lg"
          >
            {user ? "Logout" : "Sign In"}
          </Button>
        </Link> */}

        {user ? (
          <form action={logout}>
            <Button
              type="submit"
              variant="secondary"
              className="bg-red-50 hover:bg-red-100 text-red-500 font-bold hover:underline cursor-pointer"
            >
              Logout
            </Button>
          </form>
        ) : (
          <Link href="/sign-in">
            <Button
              variant="secondary"
              className="bg-brand hover:bg-brand-dark/20 text-brand-dark font-bold hover:underline cursor-pointer"
            >
              Sign In
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
