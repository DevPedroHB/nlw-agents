import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { createRoomController } from "./controllers/rooms/create-room-controller";
import { createRoomQuestionController } from "./controllers/rooms/create-room-question-controller";
import { fetchRoomQuestionsController } from "./controllers/rooms/fetch-room-questions-controller";
import { fetchRoomsController } from "./controllers/rooms/fetch-rooms-controller";

export const routes: FastifyPluginAsyncZod = async (app) => {
	// Rooms
	app.register(createRoomController);
	app.register(fetchRoomsController);
	app.register(createRoomQuestionController);
	app.register(fetchRoomQuestionsController);
};
