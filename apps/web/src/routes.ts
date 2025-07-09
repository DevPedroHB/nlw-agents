import { createBrowserRouter } from "react-router";
import RootLayout from "./layout/root-layout";
import Home from "./pages/home";
import RecordRoomAudio from "./pages/record-room-audio";
import Room from "./pages/room";

export const routes = createBrowserRouter([
	{
		path: "/",
		Component: RootLayout,
		children: [
			{
				index: true,
				Component: Home,
			},
			{
				path: "room/:roomId",
				Component: Room,
			},
			{
				path: "room/:roomId/audio",
				Component: RecordRoomAudio,
			},
		],
	},
]);
