import { Question } from "./question";

const data = [
	{
		id: "01",
		question: "An example question 01?",
		answer: "An example answer 01.",
		isGeneratingAnswer: true,
		createdAt: new Date(),
	},
	{
		id: "02",
		question: "An example question 02?",
		answer: "An example answer 02.",
		isGeneratingAnswer: false,
		createdAt: new Date(),
	},
	{
		id: "03",
		question: "An example question 03?",
		answer: "An example answer 03.",
		isGeneratingAnswer: true,
		createdAt: new Date(),
	},
];

interface IListQuestions {
	roomId: string;
}

export function ListQuestions({ roomId }: IListQuestions) {
	console.log(roomId);

	return (
		<div className="space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="font-semibold text-foreground text-2xl">
					Perguntas & Respostas
				</h2>
			</div>
			{data?.map((question) => {
				return <Question key={question.id} question={question} />;
			})}
		</div>
	);
}
