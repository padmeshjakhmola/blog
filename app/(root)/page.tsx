import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { blogs } from "@/database/schema";
import Image from "next/image";

const defaultAvatarImage = "https://github.com/shadcn.png";

export default async function Home() {
  const allBlogs = await db.select().from(blogs);

  const data = allBlogs.map((blog) => ({
    id: blog.id,
    blogName: blog.blogName || "N/A",
    author: blog.author || "Unknown",
    blogDescription: blog.blogDescription || "No description available",
    blogImage: blog.blogImage ? blog.blogImage : defaultAvatarImage,
    createdAt: blog.createdAt
      ? new Date(blog.createdAt).toLocaleDateString()
      : "N/A",
  }));

  return (
    <main className="p-10">
      <div className="py-10 space-y-2">
        <h1 className="text-4xl font-semibold">{`"Voices of the Web – A Blog for Everyone"`}</h1>
        <p className="text-gray-800">
          A space where thoughts, stories, and ideas come to life. Explore
          diverse topics, insightful articles, and engaging discussions from all
          walks of life.
        </p>
      </div>

      <div className="relative w-full max-h-[400px] md:max-h-[500px] lg:max-h-[600px] overflow-hidden rounded-2xl transition-all hover:scale-102 cursor-pointer shadow-xl">
        <Image
          src="/assets/images/person_reading.jpg"
          alt="main_image"
          width={1200}
          height={600}
          className="w-full h-auto object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 text-white ">
          <h1 className="text-2xl md:text-4xl font-bold hover:underline">
            Designing for Accessibility: A Guide
          </h1>
          <p className="text-sm md:text-lg mt-2 hover:underline">
            A comprehensive guide to making web and app designs more accessible
            for people with disabilities, ensuring inclusivity.,
          </p>

          <div className="flex flex-row py-10 no-underline gap-16">
            <div className="space-y-2">
              <p className="text-sm">Written By</p>
              <p>Prank Shadow</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm">Published On</p>
              <p>10 April 2025</p>
            </div>
          </div>
        </div>
      </div>

      <div className="top-heading-small flex flex-row justify-between items-center pt-10">
        <h1 className="font-bold text-lg">Featured Blog Post</h1>
        <Button
          variant="secondary"
          className="bg-brand hover:bg-brand-dark/20 text-brand-dark font-bold hover:underline cursor-pointer"
        >
          View all posts
        </Button>
      </div>

      <div className="py-8">
        <BlogCard data={data} />
      </div>
    </main>
  );
}
