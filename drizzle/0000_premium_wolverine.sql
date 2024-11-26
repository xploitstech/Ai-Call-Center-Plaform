CREATE TABLE IF NOT EXISTS "agents" (
	"agent_id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid,
	"name" varchar(255),
	"system_prompt" text DEFAULT 'Lorem Ipsum',
	"greeting_message" text DEFAULT 'Lorem Ipsum',
	"language" text[] NOT NULL,
	"integration" text[],
	"voice" varchar(50),
	"debug_mode" boolean DEFAULT false,
	"logging_enabled" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT uuid_generate_v4() NOT NULL,
	"name" varchar(255),
	"email" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "agents" ADD CONSTRAINT "agents_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
