import type { z } from "zod/v4";
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "../connection";
import { schema } from "../schema";

export const audioChunkInsertSchema = createInsertSchema(schema.audioChunks);
export const audioChunkSelectSchema = createSelectSchema(schema.audioChunks);
export const audioChunkUpdateSchema = createUpdateSchema(schema.audioChunks);

export type AudioChunkInsert = z.infer<typeof audioChunkInsertSchema>;
export type AudioChunkSelect = z.infer<typeof audioChunkSelectSchema>;
export type AudioChunkUpdate = z.infer<typeof audioChunkUpdateSchema>;
