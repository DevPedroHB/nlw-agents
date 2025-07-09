import z from "zod";

export const envSchema = z.object({
	DATABASE_URL: z.string().url(),
	GEMINI_API_KEY: z.string(),
	VITE_API_URL: z.string().url().default("http://localhost:3333/api/v1"),
});

export type Env = z.infer<typeof envSchema>;

export const env = envSchema.parse(process.env);
