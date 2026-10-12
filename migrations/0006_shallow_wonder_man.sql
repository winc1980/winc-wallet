DROP INDEX "auth_account_userId_idx";--> statement-breakpoint
DROP INDEX "auth_session_userId_idx";--> statement-breakpoint
DROP INDEX "auth_verification_identifier_idx";--> statement-breakpoint
CREATE INDEX "authAccount_userId_idx" ON "auth_account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "authSession_userId_idx" ON "auth_session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "authVerification_identifier_idx" ON "auth_verification" USING btree ("identifier");