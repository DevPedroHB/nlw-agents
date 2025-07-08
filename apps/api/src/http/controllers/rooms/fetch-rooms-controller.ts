import { db, schema } from "@nlw-agents/db";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const fetchRoomsController: FastifyPluginAsyncZod = async (app) => {
	app.get("/rooms", async (_request, reply) => {
		const rooms = await db
			.select()
			.from(schema.rooms)
			.orderBy(schema.rooms.createdAt);

		return reply.status(200).send({
			rooms,
		});
	});
};
