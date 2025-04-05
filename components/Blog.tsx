"use client";

import Image from "next/image";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

interface BlogDetails {
  id?: string;
  blogName: string;
  author: string;
  blogDescription: string;
  blogImage: string;
  authorId: string;
  loggedInUser?: string;
  createdAt?: string;
}

const Blog = ({
  id,
  blogName,
  blogImage,
  blogDescription,
  author,
  authorId,
  loggedInUser,
}: BlogDetails) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const handleDelete = async () => {
    try {
      const res = await fetch("/api/blogs/delete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ blogId: id }),
      });

      const data = await res.json();

      if (data.status === 200) {
        alert("Post deleted successfully");
        router.push("/");
      } else {
        alert(data.message || "Failed to delete post");
      }
    } catch (error) {
      alert("An error occurred while deleting the post.");
      console.error(error);
    }
  };

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
      {authorId === loggedInUser && (
        <div className="fixed bottom-4 right-4 flex flex-row justify-center items-center space-x-2 text-white shadow-xl p-4 pr-6 rounded-full cursor-pointer transition-transform duration-300 hover:scale-110 animated-red-gradient hover:shadow-red-500/50 hover:shadow-lg">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                className="bg-transparent hover:bg-transparent cursor-pointer"
              >
                <Image
                  src="/assets/icons/delete.svg"
                  alt="add"
                  width={30}
                  height={30}
                  className="object-fill filter invert"
                />
                <h1 className="text-lg select-none hover: text-white">
                  Delete
                </h1>
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your blog from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  className="bg-red-400 hover:bg-red-300 cursor-pointer"
                  onClick={handleDelete}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}
    </div>
  );
};

export default Blog;
