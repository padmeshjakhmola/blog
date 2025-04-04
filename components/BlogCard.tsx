import Image from "next/image";
import React from "react";

const BlogCard = () => {
  return (
    <div className="max-w-[350px] cursor-pointer transition-all hover:scale-105">
      <Image
        src="/assets/images/person_reading.jpg"
        alt="blog_image"
        width={400}
        height={200}
        className="h-auto rounded-xl"
      />
      <div className="flex flex-row justify-between items-start">
        <div className="py-2">
          <div className="flex flex-row justify-between items-center">
            <h1 className="font-bold">
              Interview with Photographer & UX design, Viola LeBlanc
            </h1>
            <Image
              src="/assets/icons/link.svg"
              alt="blog_image"
              width={20}
              height={20}
              className="h-auto"
            />
          </div>
          <p className="overflow-hidden text-ellipsis line-clamp-3 text-sm pt-2">
            Lorem Ipsum has been the standard dummy text ever since the 1500s,
            when an unknown printer took a galley of type and scrambled it to
            make a type specimen book. It has survived not only five centuries,
            but also the leap into electronic typesetting, remaining essentially
            unchanged. It was popularised in the 1960s with the release of
            Letraset sheets containing Lorem Ipsum passages, and more recently
            with desktop publishing software like Aldus PageMaker including
            versions of Lorem Ipsum.
          </p>
        </div>

        <div></div>
      </div>
    </div>
  );
};

export default BlogCard;
