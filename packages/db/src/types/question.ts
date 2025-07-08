export type Question = {
	id: string;
	question: string;
	answer: string | null;
	createdAt: Date;
	roomId: string;
};
