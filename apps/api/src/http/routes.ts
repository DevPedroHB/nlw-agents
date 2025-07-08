import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { fetchRoomsController } from "./controllers/rooms/fetch-rooms-controller";

export const routes: FastifyPluginAsyncZod = async (app) => {
	app.register(fetchRoomsController);
};
