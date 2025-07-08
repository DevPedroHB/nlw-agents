import {
	db,
	questionInsertSchema,
	questionSelectSchema,
	schema,
} from "@nlw-agents/db";
import { desc, eq } from "drizzle-orm";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";

export const fetchRoomQuestionsController: FastifyPluginAsyncZod = async (
	app,
) => {
	app.get(
		"/rooms/:roomId/questions",
		{
			schema: {
				params: questionInsertSchema.pick({
					roomId: true,
				}),
				response: {
					200: z.object({
						questions: questionSelectSchema
							.pick({
								id: true,
								question: true,
								answer: true,
								createdAt: true,
							})
							.array(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { roomId } = request.params;

			const questions = await db
				.select({
					id: schema.questions.id,
					question: schema.questions.question,
					answer: schema.questions.answer,
					createdAt: schema.questions.createdAt,
				})
				.from(schema.questions)
				.where(eq(schema.questions.roomId, roomId))
				.orderBy(desc(schema.questions.createdAt));

			return reply.status(200).send({
				questions,
			});
		},
	);
};
