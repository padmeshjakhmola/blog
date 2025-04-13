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
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const BlogOptions = ({ id }: { id: string }) => {
  const router = useRouter();
  const [openDialog, setOpenDialog] = useState<"comment" | "delete" | null>(
    null
  );
  const [showInput, setShowInput] = useState(false);

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

  const handleComment = () => {
    console.log("Comment Triggered");
  };

  const icons = [
    // {
    //   type: "comment",
    //   iconPath: "/assets/icons/comment.svg",
    // },
    {
      type: "delete",
      iconPath: "/assets/icons/delete.svg",
    },
  ];

  return (
    <>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-row justify-center items-center space-x-2 text-white bg-white shadow-top-bottom p-4 border rounded-full hover:shadow-red-500/50 hover:shadow-lg">
        {/* Comment button */}
        {/* {!showInput && ( */}
        <Button
          variant="ghost"
          className="bg-transparent hover:bg-transparent cursor-pointer"
          onClick={() => setShowInput((prev) => !prev)}
        >
          <Image
            src="/assets/icons/comment.svg"
            alt="comment"
            width={30}
            height={30}
            className="object-fill"
          />
        </Button>

        <AnimatePresence>
          {showInput && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 400, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mr-2 text-black"
            >
              <div className="flex flex-row items-center justify-center gap-4">
                <Input
                  type="text"
                  placeholder="Enter your comment"
                  className="transition-all duration-300 p-5 rounded-3xl shadow-none shad-no-focus"
                />
                <Link
                  className="p-2 rounded-full bg-brand-dark hover:bg-brand-dark/80 cursor-pointer"
                  href="#"
                >
                  <Image
                    src="/assets/icons/send.svg"
                    alt="send"
                    width={30}
                    height={30}
                    className="object-fill filter invert"
                  />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!showInput &&
          icons.map(({ type, iconPath }) => (
            <Button
              key={type}
              variant="ghost"
              className="bg-transparent hover:bg-transparent cursor-pointer"
              onClick={() => setOpenDialog(type as "comment" | "delete")}
            >
              <Image
                src={iconPath}
                alt={type}
                width={30}
                height={30}
                className="object-fill"
              />
            </Button>
          ))}
      </div>

      <AlertDialog open={!!openDialog} onOpenChange={() => setOpenDialog(null)}>
        {openDialog && (
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                {openDialog === "delete"
                  ? "Are you absolutely sure?"
                  : "Comment on this post"}
              </AlertDialogTitle>
              <AlertDialogDescription>
                {openDialog === "delete"
                  ? "This action cannot be undone. This will permanently delete your blog from our servers."
                  : "You can leave your feedback or comment on this blog post."}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              {openDialog === "delete" ? (
                <AlertDialogAction
                  className="bg-red-400 hover:bg-red-300 cursor-pointer"
                  onClick={handleDelete}
                >
                  Delete
                </AlertDialogAction>
              ) : (
                <AlertDialogAction
                  className="bg-blue-400 hover:bg-blue-300 cursor-pointer"
                  onClick={handleComment}
                >
                  Comment
                </AlertDialogAction>
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        )}
      </AlertDialog>
    </>
  );
};

export default BlogOptions;
