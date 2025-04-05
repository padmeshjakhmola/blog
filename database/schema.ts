import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const blogs = pgTable("blogs", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  author: varchar("author", { length: 255 }).default("Author"),
  blogName: varchar("blog_name", { length: 255 }).default("Blog"),
  blogDescription: varchar("blog_description", { length: 255 }).default(
    "Description"
  ),
  blogImage: varchar("blog_image", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  fullName: varchar("full_name", { length: 255 }).default("abcdxyz"),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  profileImage: varchar("profile_image", { length: 255 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
