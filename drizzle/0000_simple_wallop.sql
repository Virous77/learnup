DO $$ BEGIN
 CREATE TYPE "public"."workspaceVisibility" AS ENUM('public', 'private');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "board" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"boardName" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"isDeleted" boolean DEFAULT false NOT NULL,
	"workspaceId" uuid NOT NULL,
	"boardMembers" uuid[] DEFAULT '{}'::uuid[],
	"boardOwner" uuid NOT NULL,
	CONSTRAINT "board_id_unique" UNIQUE("id"),
	CONSTRAINT "board_boardName_unique" UNIQUE("boardName")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "task" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"taskName" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"isDeleted" boolean DEFAULT false NOT NULL,
	"boardId" uuid NOT NULL,
	CONSTRAINT "task_id_unique" UNIQUE("id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar NOT NULL,
	"name" varchar,
	"image" varchar,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"password" varchar NOT NULL,
	"isVerified" boolean DEFAULT false NOT NULL,
	"userName" varchar NOT NULL,
	"bio" varchar,
	"isDeleted" boolean DEFAULT false NOT NULL,
	"visibleName" varchar,
	CONSTRAINT "user_id_unique" UNIQUE("id"),
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "workspace" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"workspaceName" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"isDeleted" boolean DEFAULT false NOT NULL,
	"inviteId" varchar NOT NULL,
	"description" varchar,
	"workspaceImage" varchar,
	"workspaceType" varchar NOT NULL,
	"workspaceOwner" uuid NOT NULL,
	"workspaceVisibility" "workspaceVisibility" NOT NULL,
	"workspaceMembers" uuid[] DEFAULT '{}'::uuid[],
	CONSTRAINT "workspace_id_unique" UNIQUE("id"),
	CONSTRAINT "workspace_workspaceName_unique" UNIQUE("workspaceName"),
	CONSTRAINT "workspace_inviteId_unique" UNIQUE("inviteId")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "board" ADD CONSTRAINT "board_workspaceId_workspace_id_fk" FOREIGN KEY ("workspaceId") REFERENCES "public"."workspace"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "board" ADD CONSTRAINT "board_boardOwner_user_id_fk" FOREIGN KEY ("boardOwner") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "task" ADD CONSTRAINT "task_boardId_board_id_fk" FOREIGN KEY ("boardId") REFERENCES "public"."board"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "workspace" ADD CONSTRAINT "workspace_workspaceOwner_user_id_fk" FOREIGN KEY ("workspaceOwner") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
