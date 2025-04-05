import BlogForm from "@/components/BlogForm";
import { getCurrentUser } from "@/lib/actions/user.actions";
import React from "react";

const Page = async () => {
  const user = await getCurrentUser();

  if (!user) {
    return new Error("User not logged in");
  }

  return (
    <div className="py-10 mx-96">
      <BlogForm author={user?.id} />
    </div>
  );
};

export default Page;
