import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { formatRelative } from "@/functions/format-relative";
import { useFetchRooms } from "@/http/fetch-rooms";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { toast } from "sonner";

export function ListRooms() {
	const { data, isLoading, error } = useFetchRooms();

	if (error) {
		toast.error(error.message);
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>Salas recentes</CardTitle>
				<CardDescription>
					Acesso rápido para as salas criadas recentemente.
				</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-3">
				{isLoading && (
					<p className="text-muted-foreground text-sm">Carregando salas...</p>
				)}
				{data?.rooms.map((room) => {
					return (
						<Link
							key={room.id}
							to={`/room/${room.id}`}
							className="flex justify-between items-center hover:bg-muted/50 p-3 border rounded-lg transition-all"
						>
							<div className="flex flex-col flex-1 gap-1">
								<h3 className="font-medium">{room.name}</h3>
								<div className="flex items-center gap-2">
									<Badge variant="secondary" className="text-xs">
										{formatRelative(room.createdAt, new Date())}
									</Badge>
									<Badge variant="secondary" className="text-xs">
										{room.questionsCount} pergunta(s)
									</Badge>
								</div>
							</div>
							<span className="flex items-center gap-1 text-sm">
								Entrar
								<ArrowRight className="size-3" />
							</span>
						</Link>
					);
				})}
			</CardContent>
		</Card>
	);
}
