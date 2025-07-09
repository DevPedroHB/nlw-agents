import { api } from "@/libs/ky";
import { useQuery } from "@tanstack/react-query";

export type TRoom = {
	id: string;
	name: number;
	questionsCount: number;
	createdAt: Date;
};

export interface FetchRoomsResponse {
	rooms: TRoom[];
}

export async function fetchRooms() {
	const result = await api.get("rooms").json<FetchRoomsResponse>();

	return result;
}

export function useFetchRooms() {
	return useQuery({
		queryKey: ["fetch-rooms"],
		queryFn: fetchRooms,
	});
}
