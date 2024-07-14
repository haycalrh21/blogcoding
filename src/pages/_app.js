import Navbar from "@/components/navbar/navbar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";

export default function App({ Component, pageProps }) {
	return (
		<div>
			<Suspense fallback={<div>Loading...</div>}>
				<SessionProvider>
					<Navbar />
					<Component {...pageProps} />;
				</SessionProvider>
			</Suspense>
		</div>
	);
}
