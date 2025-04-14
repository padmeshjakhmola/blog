// import { useAppSelector } from "@/lib/hooks";
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { timeAgo } from "@/utils/timeAgo";

interface Comment {
  id: string;
  comment: string;
  createdAt: string;
  user: { fullName: string; profileImage: string };
}

const Comments = ({ id }: { id: string }) => {
  const [allComments, setAllComments] = useState<Comment[]>([]);

  // REDUX
  // const comments = useAppSelector((state) => state.comments.items);


  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments/blogcomments/${id}`);
        const allComments: Comment[] = await response.json();


        setAllComments(allComments);
      } catch (error) {
        console.error("Error Fetching Movies", error);
      }
    };
    fetchComments();
  }, [id]);


  return (
    <div>
      <h1 className="text-xl font-semibold pb-6">Comments</h1>
      {allComments ? (
        <>
          {allComments.map((comment: Comment) => (
            <div key={comment.id} className="flex flex-row items-center gap-5">
              <div className="">
                <Avatar>
                  <AvatarImage src={comment.user.profileImage} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>

              <div className="py-4">
                <div className="flex flex-row justify-start items-center space-x-4">
                  <h1 className="font-semibold">{comment.user.fullName}</h1>
                  <p className="text-sm">{timeAgo(comment.createdAt)}</p>
                </div>
                <p className="text-sm pt-2">{comment.comment}</p>
              </div>
            </div>
          ))}
        </>
      ) : (
        <></>
      )}
    </div>
    // <div>
    //   <h1 className="text-xl font-semibold">Comments</h1>
    //   {!Array.isArray(comments) ? (
    //     <p>No comments found or data error.</p>
    //   ) : (
    //     comments.map((comment) => (
    //       <div key={comment.id}>
    //         <p>{comment.comment}</p>
    //         <p>{comment.user?.fullName}</p>
    //       </div>
    //     ))
    //   )}
    // </div>
  );
};

export default Comments;
