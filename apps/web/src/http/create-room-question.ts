import { getQueryClient } from "@/libs/get-query-client";
import { api } from "@/libs/ky";
import type { CreateQuestionSchema } from "@/pages/room/components/create-question-form";
import { useMutation } from "@tanstack/react-query";
import type {
	FetchRoomQuestionsResponse,
	TQuestion,
} from "./fetch-room-questions";

export interface CreateRoomQuestionResponse {
	id: string;
	answer: string | null;
}

export async function createRoomQuestion(
	roomId: string,
	data: CreateQuestionSchema,
) {
	const result = await api
		.post(`rooms/${roomId}/questions`, {
			json: data,
		})
		.json<CreateRoomQuestionResponse>();

	return result;
}

export function useCreateRoomQuestion(roomId: string) {
	const queryClient = getQueryClient();

	return useMutation({
		mutationKey: ["create-room-question"],
		mutationFn: (data: CreateQuestionSchema) =>
			createRoomQuestion(roomId, data),
		async onMutate({ question }) {
			if (!roomId) return;

			await queryClient.cancelQueries({
				queryKey: ["fetch-room-questions", roomId],
			});

			const prev = queryClient.getQueryData<FetchRoomQuestionsResponse>([
				"fetch-room-questions",
				roomId,
			]);

			const optimisticQuestion: TQuestion = {
				id: crypto.randomUUID(),
				question,
				answer: null,
				createdAt: new Date(),
				isGeneratingAnswer: true,
			};

			queryClient.setQueryData<FetchRoomQuestionsResponse>(
				["fetch-room-questions", roomId],
				(old) => ({
					questions: [optimisticQuestion, ...(old?.questions ?? [])],
				}),
			);

			return { optimisticQuestion, prev };
		},
		onError(_error, _variables, context) {
			if (context?.prev) {
				queryClient.setQueryData<FetchRoomQuestionsResponse>(
					["fetch-room-questions", roomId],
					context.prev,
				);
			}
		},
		onSuccess(data, _variables, context) {
			if (!context?.optimisticQuestion) return;

			queryClient.setQueryData<FetchRoomQuestionsResponse>(
				["fetch-room-questions", roomId],
				(old) => {
					if (!old) return old;

					return {
						questions: old.questions.map((q) =>
							q.id === context.optimisticQuestion!.id
								? {
										...context.optimisticQuestion,
										id: data.id,
										answer: data.answer,
										isGeneratingAnswer: false,
									}
								: q,
						),
					};
				},
			);

			queryClient.invalidateQueries({ queryKey: ["fetch-rooms"] });
		},
	});
}
