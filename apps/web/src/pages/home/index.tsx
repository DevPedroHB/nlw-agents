import { Button } from "@/components/ui/button";
import { useFetchRooms } from "@/http/fetch-rooms";
import { Link } from "react-router";
import { toast } from "sonner";

export default function Home() {
	const { data, isLoading, error } = useFetchRooms();

	if (error) {
		toast.error(error.message);
	}

	return (
		<main className="flex flex-col justify-center items-center gap-4 min-h-screen">
			<h1>Home</h1>
			<pre>
				<code>
					{isLoading ? "Carregando..." : JSON.stringify(data, null, 2)}
				</code>
			</pre>
			<Button type="button" asChild>
				<Link to={`/room/${"example-room-id"}`}>Acessar sala</Link>
			</Button>
		</main>
	);
}
