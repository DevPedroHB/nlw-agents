import { useFetchRoomQuestions } from "@/http/fetch-room-questions";
import { toast } from "sonner";
import { Question } from "./question";

interface IListQuestions {
	roomId: string;
}

export function ListQuestions({ roomId }: IListQuestions) {
	const { data, isLoading, error } = useFetchRoomQuestions(roomId);

	if (error) {
		toast.error(error.message);
	}

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="font-semibold text-foreground text-2xl">
					Perguntas & Respostas
				</h2>
			</div>
			{isLoading && (
				<p className="text-muted-foreground text-sm">Carregando perguntas...</p>
			)}
			{data?.questions.map((question) => {
				return <Question key={question.id} question={question} />;
			})}
		</div>
	);
}
