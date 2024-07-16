import Navbar from "@/components/navbar/navbar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps }) {
	return (
		<div style={{ background: "#405D72" }} className='min-h-screen'>
			<SessionProvider>
				<Navbar />
				<Component {...pageProps} />;
			</SessionProvider>
		</div>
	);
}
