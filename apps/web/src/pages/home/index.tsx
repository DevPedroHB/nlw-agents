import { CreateRoomForm } from "./components/create-room-form";
import { ListRooms } from "./components/list-rooms";

export default function Home() {
	return (
		<main className="min-h-screen">
			<div className="mx-auto px-4 py-8 max-w-4xl container">
				<div className="items-start gap-8 grid grid-cols-1 md:grid-cols-2">
					<CreateRoomForm />
					<ListRooms />
				</div>
			</div>
		</main>
	);
}
