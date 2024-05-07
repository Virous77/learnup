CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"password" text NOT NULL,
	"isVerified" boolean DEFAULT false,
	CONSTRAINT "user_id_unique" UNIQUE("id")
);
