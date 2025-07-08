import type { z } from "zod/v4";
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "../connection";
import { schema } from "../schema";

export const roomInsertSchema = createInsertSchema(schema.rooms);
export const roomSelectSchema = createSelectSchema(schema.rooms);
export const roomUpdateSchema = createUpdateSchema(schema.rooms);

export type RoomInsert = z.infer<typeof roomInsertSchema>;
export type RoomSelect = z.infer<typeof roomSelectSchema>;
export type RoomUpdate = z.infer<typeof roomUpdateSchema>;
