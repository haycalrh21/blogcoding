import Navbar from "@/components/navbar/navbar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
	return (
		<div>
			<SessionProvider>
				<Navbar />
				<Component {...pageProps} />;
			</SessionProvider>
		</div>
	);
}
