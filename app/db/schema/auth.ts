import { relations } from "drizzle-orm"
import { boolean, index, pgTable, text, timestamp } from "drizzle-orm/pg-core"

export const authUser = pgTable("auth_user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").default(false).notNull(),
	image: text("image"),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull(),
})

export const authSession = pgTable(
	"auth_session",
	{
		id: text("id").primaryKey(),
		expiresAt: timestamp("expires_at").notNull(),
		token: text("token").notNull().unique(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
		ipAddress: text("ip_address"),
		userAgent: text("user_agent"),
		userId: text("user_id")
			.notNull()
			.references(() => authUser.id, { onDelete: "cascade" }),
	},
	(table) => [index("authSession_userId_idx").on(table.userId)],
)

export const authAccount = pgTable(
	"auth_account",
	{
		id: text("id").primaryKey(),
		accountId: text("account_id").notNull(),
		providerId: text("provider_id").notNull(),
		userId: text("user_id")
			.notNull()
			.references(() => authUser.id, { onDelete: "cascade" }),
		accessToken: text("access_token"),
		refreshToken: text("refresh_token"),
		idToken: text("id_token"),
		accessTokenExpiresAt: timestamp("access_token_expires_at"),
		refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
		scope: text("scope"),
		password: text("password"),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
	},
	(table) => [index("authAccount_userId_idx").on(table.userId)],
)

export const authVerification = pgTable(
	"auth_verification",
	{
		id: text("id").primaryKey(),
		identifier: text("identifier").notNull(),
		value: text("value").notNull(),
		expiresAt: timestamp("expires_at").notNull(),
		createdAt: timestamp("created_at").defaultNow().notNull(),
		updatedAt: timestamp("updated_at")
			.defaultNow()
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull(),
	},
	(table) => [index("authVerification_identifier_idx").on(table.identifier)],
)

export const authUserRelations = relations(authUser, ({ many }) => ({
	authSessions: many(authSession),
	authAccounts: many(authAccount),
}))

export const authSessionRelations = relations(authSession, ({ one }) => ({
	authUser: one(authUser, {
		fields: [authSession.userId],
		references: [authUser.id],
	}),
}))

export const authAccountRelations = relations(authAccount, ({ one }) => ({
	authUser: one(authUser, {
		fields: [authAccount.userId],
		references: [authUser.id],
	}),
}))
