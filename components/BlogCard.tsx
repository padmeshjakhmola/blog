import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import blogPosts from "../lib/dummydata";

const BlogCard = () => {
  return (
    <div className="grid grid-cols-4 gap-8">
      {blogPosts.map((data) => (
        <div
          key={data.id}
          className="max-w-[350px] min-h-[400px] flex flex-col cursor-pointer transition-all hover:scale-105 bg-white shadow-md rounded-xl p-4"
        >
          <Image
            src="/assets/images/person_reading.jpg"
            alt="blog_image"
            width={400}
            height={200}
            className="h-48 w-full object-cover rounded-xl"
          />

          <div className="flex flex-col flex-grow py-2">
            <div className="flex justify-between items-center">
              <h1 className="font-semibold text-lg">{data.name}</h1>
              {/* <Image
                src="/assets/icons/link.svg"
                alt="blog_image"
                width={20}
                height={20}
                className="h-auto"
              /> */}
            </div>

            <p className="text-sm text-gray-600 overflow-hidden text-ellipsis line-clamp-3">
              {data.description}
            </p>
          </div>

          <div className="flex items-center pt-2 justify-between">
            <div className="flex flex-row">
              <Avatar className="size-6 mr-2">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="text-xs font-bold flex items-center">
                <p>{data.author}</p>
                <span className="px-1">·</span>
                <p>{data.date}</p>
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
      ))}
    </div>
  );
};

export default BlogCard;
