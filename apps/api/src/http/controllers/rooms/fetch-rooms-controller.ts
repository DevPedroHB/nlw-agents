import { db, roomSelectSchema, schema } from "@nlw-agents/db";
import { count, eq } from "drizzle-orm";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";

export const fetchRoomsController: FastifyPluginAsyncZod = async (app) => {
	app.get(
		"/rooms",
		{
			schema: {
				response: {
					200: z.object({
						rooms: roomSelectSchema
							.pick({
								id: true,
								name: true,
								createdAt: true,
							})
							.extend({
								questionsCount: z.number(),
							})
							.array(),
					}),
				},
			},
		},
		async (_request, reply) => {
			const rooms = await db
				.select({
					id: schema.rooms.id,
					name: schema.rooms.name,
					createdAt: schema.rooms.createdAt,
					questionsCount: count(schema.questions.id),
				})
				.from(schema.rooms)
				.leftJoin(
					schema.questions,
					eq(schema.questions.roomId, schema.rooms.id),
				)
				.groupBy(schema.rooms.id)
				.orderBy(schema.rooms.createdAt);

			return reply.status(200).send({
				rooms,
			});
		},
	);
};
