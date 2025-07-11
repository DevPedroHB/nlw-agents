import { getQueryClient } from "@/libs/get-query-client";
import { api } from "@/libs/ky";
import type { CreateRoomSchema } from "@/pages/home/components/create-room-form";
import { useMutation } from "@tanstack/react-query";

export interface CreateRoomResponse {
	id: string;
}

export async function createRoom(data: CreateRoomSchema) {
	const result = await api
		.post("rooms", {
			json: data,
		})
		.json<CreateRoomResponse>();

	return result;
}

export function useCreateRoom() {
	const queryClient = getQueryClient();

	return useMutation({
		mutationKey: ["create-room"],
		mutationFn: createRoom,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["fetch-rooms"] });
		},
	});
}
