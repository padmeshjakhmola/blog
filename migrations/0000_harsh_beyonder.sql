CREATE TABLE "blogs" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"author" varchar(255) DEFAULT 'Author',
	"blog_name" varchar(255) DEFAULT 'Blog',
	"blog_description" varchar(255) DEFAULT 'Description',
	"blog_image" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "blogs_id_unique" UNIQUE("id")
);
