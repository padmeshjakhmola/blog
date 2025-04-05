ALTER TABLE "blogs" ALTER COLUMN "author" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "blogs" ALTER COLUMN "author" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "blogs" ALTER COLUMN "author" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_author_users_id_fk" FOREIGN KEY ("author") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;