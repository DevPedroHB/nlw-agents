import { db, questionInsertSchema, schema } from "@nlw-agents/db";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";

export const createRoomQuestionController: FastifyPluginAsyncZod = async (
	app,
) => {
	app.post(
		"/rooms/:roomId/questions",
		{
			schema: {
				params: questionInsertSchema.pick({
					roomId: true,
				}),
				body: questionInsertSchema.pick({
					question: true,
				}),
				response: {
					201: z.object({
						id: z.string().uuid(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { roomId } = request.params;
			const { question } = request.body;

			const result = await db
				.insert(schema.questions)
				.values({
					question,
					roomId,
				})
				.returning();

			const newQuestion = result[0];

			if (!newQuestion) {
				throw new Error("Failed to create new room.");
			}

			return reply.status(201).send({
				id: newQuestion.id,
			});
		},
	);
};
