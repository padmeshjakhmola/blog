"use client";

import Image from "next/image";
import React, { useState } from "react";

interface BlogDetails {
  id?: string;
  blogName: string;
  author: string;
  blogDescription: string;
  blogImage: string;
  createdAt?: string;
}

const Blog = ({
  blogName,
  blogImage,
  blogDescription,
  author,
}: BlogDetails) => {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      {loading && (
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-brand"></div>
        </div>
      )}
      <div className="flex flex-col justify-center items-center">
        <Image
          src={blogImage}
          alt="reading"
          width={1000}
          height={600}
          className="object-cover rounded-xl"
          onLoad={() => setLoading(false)}
        />
        <h1 className="py-4 text-4xl font-semibold pt-10">{blogName}</h1>
        <p className="font-semibold">— {author}</p>

        <p className="px-16 py-10">{blogDescription}</p>
      </div>
    </div>
  );
};

export default Blog;
