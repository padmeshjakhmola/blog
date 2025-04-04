import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="p-10">
      <div className="top-heading-small flex flex-row justify-between items-center">
        <h1 className="font-bold text-lg">Featured Blog Post</h1>
        <Button
          variant="secondary"
          className="bg-brand hover:bg-brand-dark/20 text-brand-dark font-bold hover:underline cursor-pointer"
        >
          View all posts
        </Button>
      </div>
      <div className="py-8 grid grid-cols-4 gap-8">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </main>
  );
}
