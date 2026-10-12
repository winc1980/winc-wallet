ALTER TABLE "account" RENAME TO "auth_account";--> statement-breakpoint
ALTER TABLE "auth_account" DROP CONSTRAINT "account_user_id_auth_user_id_fk";
--> statement-breakpoint
DROP INDEX "account_userId_idx";--> statement-breakpoint
ALTER TABLE "auth_account" ADD CONSTRAINT "auth_account_user_id_auth_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."auth_user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "auth_account_userId_idx" ON "auth_account" USING btree ("user_id");