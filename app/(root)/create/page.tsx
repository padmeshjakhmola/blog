import BlogForm from "@/components/BlogForm";
import { getCurrentUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div className="py-10 mx-96">
      <BlogForm author={user?.id} />
    </div>
  );
};

export default Page;
