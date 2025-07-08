import { Button } from "@/components/ui/button";
import { Link, Navigate, useParams } from "react-router";

type RoomParams = {
	roomId: string;
};

export default function Room() {
	const params = useParams<RoomParams>();

	if (!params.roomId) {
		return <Navigate to="/" replace />;
	}

	return (
		<main className="flex flex-col justify-center items-center gap-4 min-h-screen">
			<h1>Room</h1>
			<pre>
				<code>{JSON.stringify(params, null, 2)}</code>
			</pre>
			<Button type="button" asChild>
				<Link to="/">Criar sala</Link>
			</Button>
		</main>
	);
}
