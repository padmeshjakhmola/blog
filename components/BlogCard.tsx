"use client";

import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useRouter } from "next/navigation";

interface Blog {
  id: string;
  name: string;
  author: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

const BlogCard = ({ data }: { data: Blog[] }) => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-4 gap-8">
      {data.map((blog) => {
        const formattedDate = new Intl.DateTimeFormat("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(new Date(blog.createdAt));

        return (
          <div
            key={blog.id}
            className="w-[350px] min-h-[400px] flex flex-col cursor-pointer transition-all hover:scale-105 bg-white shadow-md rounded-xl p-4"
            onClick={() => router.push(`/blog/${blog.id}`)}
          >
            <Image
              src={blog.imageUrl || "/assets/images/person_reading.jpg"}
              alt="blog_image"
              width={400}
              height={200}
              className="h-48 w-full object-cover rounded-xl"
            />

            <div className="flex flex-col flex-grow py-2">
              <div className="flex justify-between items-center">
                <h1 className="font-semibold text-lg">{blog.name}</h1>
              </div>

              <p className="text-sm text-gray-600 overflow-hidden text-ellipsis line-clamp-3">
                {blog.description}
              </p>
            </div>

            <div className="flex items-center pt-2 justify-between">
              <div className="flex flex-row">
                <Avatar className="size-6 mr-2">
                  <AvatarImage src={blog.imageUrl} />
                  <AvatarFallback>{blog.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-xs font-bold flex items-center">
                  <p>{blog.author}</p>
                  <span className="px-1">·</span>
                  <p>{formattedDate}</p>
                </div>
              </div>

              <div>
                <Image
                  src="/assets/icons/link.svg"
                  alt="blog_image"
                  width={15}
                  height={15}
                  className="h-auto"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BlogCard;
