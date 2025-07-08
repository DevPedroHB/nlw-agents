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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreateRoom } from "@/http/create-room";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod/v4";

export const createRoomSchema = z.object({
	name: z.string(),
	description: z.string(),
});

export type CreateRoomSchema = z.infer<typeof createRoomSchema>;

export function CreateRoomForm() {
	const form = useForm<CreateRoomSchema>({
		resolver: zodResolver(createRoomSchema),
		defaultValues: {
			name: "",
			description: "",
		},
	});

	const { mutateAsync } = useCreateRoom();

	async function handleCreateRoom(data: CreateRoomSchema) {
		await mutateAsync(data, {
			onError(error) {
				toast.error(error.message);
			},
			onSuccess() {
				toast.success("Sala criada com sucesso!");

				form.reset();
			},
		});
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Criar sala</CardTitle>
				<CardDescription>
					Crie uma nova sala para começar a fazer perguntas e receber respostas
					da I.A.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleCreateRoom)}
						className="flex flex-col gap-4"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome da sala</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder="Digite o nome da sala..."
											required
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Descrição</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Digite a descrição da sala..."
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit" className="w-full">
							Criar sala
						</Button>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
}
