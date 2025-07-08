export type AudioChunk = {
	id: string;
	transcription: string;
	embeddings: number[];
	createdAt: Date;
	roomId: string;
};
