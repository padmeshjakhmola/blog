import blogPosts from "@/lib/dummydata";
import { blogs } from "./schema";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { config } from "dotenv";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

const seed = async () => {
  try {
    for (const blog of blogPosts) {
      await db.insert(blogs).values(blog);
    }
    console.log("Seeding completed successfully.");
  } catch (error) {
    console.error("Error seeding data:", error);
  }
};

seed();
