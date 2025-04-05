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
      <div className="fixed bottom-4 right-4 flex flex-row justify-center items-center space-x-2 text-white shadow-xl p-4 pr-6 rounded-full cursor-pointer transition-transform duration-300 hover:scale-110 animated-red-gradient hover:shadow-red-500/50 hover:shadow-lg">
        <Image
          src="/assets/icons/delete.svg"
          alt="add"
          width={30}
          height={30}
          className="object-fill filter invert"
        />
        <h1 className="text-lg select-none">Delete</h1>
      </div>
    </div>
  );
};

export default Blog;
