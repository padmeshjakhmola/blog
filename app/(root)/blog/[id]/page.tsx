"use client";

import React from "react";
import { usePathname } from "next/navigation";

const Page = () => {
  const pathName = usePathname();
  const blogId = pathName.split("/")[2];
  return <div>Blog Id is: {blogId}</div>;
};

export default Page;
