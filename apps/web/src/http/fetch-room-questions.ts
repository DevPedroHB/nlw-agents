import { api } from "@/libs/ky";
import { useQuery } from "@tanstack/react-query";

export type TQuestion = {
	id: string;
	question: string;
	answer: string | null;
	createdAt: Date;
	isGeneratingAnswer?: boolean;
};

export interface FetchRoomQuestionsResponse {
	questions: TQuestion[];
}

export async function fetchRoomQuestions(roomId: string) {
	const result = await api
		.get(`rooms/${roomId}/questions`)
		.json<FetchRoomQuestionsResponse>();

	return result;
}

export function useFetchRoomQuestions(roomId: string) {
	return useQuery({
		queryKey: ["fetch-room-questions", roomId],
		queryFn: () => fetchRoomQuestions(roomId),
	});
}
