import { api } from "@/libs/ky";
import { useQuery } from "@tanstack/react-query";

interface FetchRoomsResponse {
	rooms: {
		name: number;
		id: string;
		createdAt: Date;
		questionsCount: number;
	}[];
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
