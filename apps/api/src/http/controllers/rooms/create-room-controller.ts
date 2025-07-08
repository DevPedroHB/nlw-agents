import { db, roomInsertSchema, roomSelectSchema, schema } from "@nlw-agents/db";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod/v4";

export const createRoomController: FastifyPluginAsyncZod = async (app) => {
	app.post(
		"/rooms",
		{
			schema: {
				body: roomInsertSchema.pick({
					name: true,
					description: true,
				}),
				response: {
					201: z.object({
						room: roomSelectSchema,
					}),
				},
			},
		},
		async (request, reply) => {
			const { name, description } = request.body;

			const result = await db
				.insert(schema.rooms)
				.values({
					name,
					description,
				})
				.returning();

			const room = result[0];

			if (!room) {
				throw new Error("Failed to create new room.");
			}

			return reply.status(201).send({
				room,
			});
		},
	);
};
