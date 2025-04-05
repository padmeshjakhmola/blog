"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2),
  image: z.instanceof(File, { message: "Image file is required" }),
});

const BlogForm = ({ author }: { author: string }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("author", author);
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("image", values.image);

    try {
      setIsLoading(true);
      const response = await fetch("/api/image-upload", {
        method: "POST",
        body: formData,
      });

      // const result = await response.json();
      // console.log("Upload result:", result, result.status, response.status);
      if (response.status === 500) {
        return toast.error("Failed to Uploded");
      }
      toast.success("File Uploded");
      router.replace("/");
    } catch (error) {
      console.error("Error uploading files:", error);

      // ...
      toast.error("Failed to upload please check console");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="py-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your Blog Title" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Description</FormLabel>
                <FormControl>
                  {/* <Input placeholder="Enter your Blog Description"  /> */}
                  <Textarea
                    {...field}
                    placeholder="Enter your Blog Description"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <FormLabel>Blog Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    className="w-full"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        form.setValue("image", file);
                      }
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="bg-brand-dark w-full text-white hover:bg-brand-dark/80 cursor-pointer"
            disabled={isLoading}
          >
            Submit
            {isLoading && (
              <Image
                src="/assets/icons/loader.svg"
                width={24}
                height={24}
                alt="loader"
                className="ml-2 animate-spin"
              />
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BlogForm;
