import { CreateRoomForm } from "./components/create-room-form";
import { ListRooms } from "./components/list-rooms";

export default function Home() {
	return (
		<main className="px-4 py-8 min-h-screen">
			<div className="mx-auto max-w-4xl">
				<div className="items-start gap-8 grid grid-cols-2">
					<CreateRoomForm />
					<ListRooms />
				</div>
			</div>
		</main>
	);
}
