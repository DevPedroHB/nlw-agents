import { env } from "@nlw-agents/env";
import { drizzle } from "drizzle-orm/postgres-js";
import { createSchemaFactory } from "drizzle-zod";
import postgres from "postgres";
import { z } from "zod/v4";
import { schema } from "./schema";

export const sql = postgres(env.DATABASE_URL);
export const db = drizzle(sql, {
	schema,
	casing: "snake_case",
});
export const { createInsertSchema, createSelectSchema, createUpdateSchema } =
	createSchemaFactory({
		zodInstance: z,
		coerce: true,
	});
