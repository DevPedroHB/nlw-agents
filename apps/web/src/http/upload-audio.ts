import { getQueryClient } from "@/libs/get-query-client";
import { api } from "@/libs/ky";
import { useMutation } from "@tanstack/react-query";

export async function uploadAudio(roomId: string, audioBlob: Blob) {
	const formData = new FormData();

	formData.append("file", audioBlob);

	const result = await api.post(`rooms/${roomId}/audio`, {
		body: formData,
	});

	return result;
}

export function useUploadAudio(roomId: string) {
	const queryClient = getQueryClient();

	return useMutation({
		mutationKey: ["upload-audio"],
		mutationFn: (audioBlob: Blob) => uploadAudio(roomId, audioBlob),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["fetch-room-questions", roomId],
			});
		},
	});
}
