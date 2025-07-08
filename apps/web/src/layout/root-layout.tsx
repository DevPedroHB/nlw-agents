import { Toaster } from "@/components/ui/sonner";
import { QueryClientProvider } from "@/providers/query-client-provider";
import { Outlet } from "react-router";

export default function RootLayout() {
	return (
		<QueryClientProvider>
			<Outlet />
			<Toaster visibleToasts={9} closeButton richColors />
		</QueryClientProvider>
	);
}
