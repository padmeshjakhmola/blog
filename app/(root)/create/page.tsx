import BlogForm from "@/components/BlogForm";
import { getCurrentUser } from "@/lib/actions/user.actions";
import React from "react";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <div className="py-10 mx-96">
      <BlogForm author={user?.name ?? "Unknown Author"} />
    </div>
  );
};

export default Page;
