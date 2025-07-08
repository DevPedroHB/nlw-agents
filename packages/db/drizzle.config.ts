import { env } from "@nlw-agents/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	dialect: "postgresql",
	casing: "snake_case",
	schema: "./src/schema/**.ts",
	out: "./drizzle/migrations",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
});
