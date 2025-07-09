import { generateAnswer, generateEmbeddings } from "@/services/gemini";
import { db, questionInsertSchema, schema } from "@nlw-agents/db";
import { and, eq, sql } from "drizzle-orm";
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
						answer: z.string().nullable(),
					}),
				},
			},
		},
		async (request, reply) => {
			const { roomId } = request.params;
			const { question } = request.body;

			const embeddings = await generateEmbeddings(question);

			const embeddingsAsString = `[${embeddings.join(",")}]`;

			const chunks = await db
				.select({
					id: schema.audioChunks.id,
					transcription: schema.audioChunks.transcription,
					similarity: sql<number>`1 - (${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector)`,
				})
				.from(schema.audioChunks)
				.where(
					and(
						eq(schema.audioChunks.roomId, roomId),
						sql`1 - (${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector) > 0.7`,
					),
				)
				.orderBy(
					sql`${schema.audioChunks.embeddings} <=> ${embeddingsAsString}::vector`,
				)
				.limit(3);

			let answer: string | null = null;

			if (chunks.length > 0) {
				const transcriptions = chunks.map((chunk) => chunk.transcription);

				answer = await generateAnswer(question, transcriptions);
			}

			const result = await db
				.insert(schema.questions)
				.values({ roomId, question, answer })
				.returning();

			const newQuestion = result[0];

			if (!newQuestion) {
				throw new Error("Failed to create new room.");
			}

			return reply.status(201).send({
				id: newQuestion.id,
				answer,
			});
		},
	);
};
