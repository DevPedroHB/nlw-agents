import type { z } from "zod/v4";
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "../connection";
import { schema } from "../schema";

export const questionInsertSchema = createInsertSchema(schema.questions);
export const questionSelectSchema = createSelectSchema(schema.questions);
export const questionUpdateSchema = createUpdateSchema(schema.questions);

export type QuestionInsert = z.infer<typeof questionInsertSchema>;
export type QuestionSelect = z.infer<typeof questionSelectSchema>;
export type QuestionUpdate = z.infer<typeof questionUpdateSchema>;
