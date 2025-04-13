import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const blogs = pgTable("blogs", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  author: uuid("author")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  blogName: varchar("blog_name", { length: 255 }).default("Blog"),
  blogDescription: varchar("blog_description", { length: 5000 }).default(
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

export const comments = pgTable("comments", {
  id: uuid("id").defaultRandom().primaryKey().notNull(),
  comment: varchar("comment", { length: 1000 }).notNull(),
  blogId: uuid("blog_id")
    .notNull()
    .references(() => blogs.id, { onDelete: "cascade" }),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});
