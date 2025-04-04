"use client";

import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch("/api/geturl");
        if (!response.ok) throw new Error("Unable to fetch movies for DB");

        const data = await response.json();

        setBlogs(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    }

    fetchBlogs();
  }, []);

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
        {/* <BlogCard data={data} /> */}

        {blogs.length > 0 && <BlogCard data={blogs} />}
      </div>
      <Link href="/create">
        <div className="fixed bottom-4 right-4 flex flex-row justify-center items-center space-x-2 text-white shadow-xl p-3 rounded-full cursor-pointer transition-transform duration-300 hover:scale-105 animated-red-gradient hover:shadow-red-500/50 hover:shadow-lg">
          <Image
            src="/assets/icons/add.svg"
            alt="add"
            width={40}
            height={40}
            className="object-fill filter invert"
          />
          <h1>Add Blog?</h1>
        </div>
      </Link>
    </main>
  );
}
