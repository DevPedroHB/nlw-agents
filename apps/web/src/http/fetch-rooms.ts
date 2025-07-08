import { api } from "@/libs/ky";
import type { Room } from "@nlw-agents/db";
import { useQuery } from "@tanstack/react-query";

interface FetchRoomsResponse {
	rooms: Room[];
}

export async function fetchRooms() {
	const result = await api.get("rooms").json<FetchRoomsResponse>();

	return result;
}

export function useFetchRooms() {
	return useQuery({
		queryKey: ["rooms"],
		queryFn: fetchRooms,
	});
}
