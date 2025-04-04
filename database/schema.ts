import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const blogs = pgTable("blogs", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  author: varchar("author", { length: 255 }).default("Author"),
  blogName: varchar("blog_name", { length: 255 }).default("Blog"),
  blogDescription: varchar("blog_description", { length: 255 }).default("Description"),
  blogImage: varchar("blog_image", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
