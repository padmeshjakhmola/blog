import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";

export default function Home() {
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
      <div className="top-heading-small flex flex-row justify-between items-center">
        <h1 className="font-bold text-lg">Featured Blog Post</h1>
        <Button
          variant="secondary"
          className="bg-brand hover:bg-brand-dark/20 text-brand-dark font-bold hover:underline cursor-pointer"
        >
          View all posts
        </Button>
      </div>
      <div className="py-8">
        <BlogCard />
      </div>
    </main>
  );
}
