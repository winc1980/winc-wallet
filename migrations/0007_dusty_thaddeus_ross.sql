CREATE TABLE "organization_members" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organization_id" uuid NOT NULL,
	"user_id" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organizations" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "receipt_images" RENAME COLUMN "uuid" TO "id";--> statement-breakpoint
ALTER TABLE "auth_account" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "auth_account" ALTER COLUMN "id" SET DEFAULT pg_catalog.gen_random_uuid();--> statement-breakpoint
ALTER TABLE "auth_account" ALTER COLUMN "user_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "auth_session" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "auth_session" ALTER COLUMN "id" SET DEFAULT pg_catalog.gen_random_uuid();--> statement-breakpoint
ALTER TABLE "auth_session" ALTER COLUMN "user_id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "auth_user" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "auth_user" ALTER COLUMN "id" SET DEFAULT pg_catalog.gen_random_uuid();--> statement-breakpoint
ALTER TABLE "auth_verification" ALTER COLUMN "id" SET DATA TYPE uuid;--> statement-breakpoint
ALTER TABLE "auth_verification" ALTER COLUMN "id" SET DEFAULT pg_catalog.gen_random_uuid();--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "journal_entries" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "journal_lines" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "organization_members" ADD CONSTRAINT "organization_members_organization_id_organizations_id_fk" FOREIGN KEY ("organization_id") REFERENCES "public"."organizations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_members" ADD CONSTRAINT "organization_members_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth_user"("id") ON DELETE no action ON UPDATE no action;