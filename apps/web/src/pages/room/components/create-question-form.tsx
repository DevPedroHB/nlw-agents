import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useCreateRoomQuestion } from "@/http/create-room-question";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod/v4";

export const createQuestionSchema = z.object({
	question: z.string(),
});

export type CreateQuestionSchema = z.infer<typeof createQuestionSchema>;

interface ICreateQuestionForm {
	roomId: string;
}

export function CreateQuestionForm({ roomId }: ICreateQuestionForm) {
	const form = useForm<CreateQuestionSchema>({
		resolver: zodResolver(createQuestionSchema),
		defaultValues: {
			question: "",
		},
	});

	const { isSubmitting } = form.formState;
	const { mutateAsync } = useCreateRoomQuestion(roomId);

	async function handleCreateQuestion(data: CreateQuestionSchema) {
		await mutateAsync(data, {
			onError(error) {
				toast.error(error.message);
			},
			onSuccess() {
				toast.success("Pergunta criada com sucesso!");

				form.reset();
			},
		});
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Fazer uma pergunta</CardTitle>
				<CardDescription>
					Digite sua pergunta abaixo para receber uma resposta gerada por I.A.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleCreateQuestion)}
						className="flex flex-col gap-4"
					>
						<FormField
							control={form.control}
							name="question"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Sua Pergunta</FormLabel>
									<FormControl>
										<Textarea
											placeholder="O que você gostaria de saber?"
											disabled={isSubmitting}
											className="min-h-[100px]"
											required
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" isLoading={isSubmitting}>
							Enviar pergunta
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
