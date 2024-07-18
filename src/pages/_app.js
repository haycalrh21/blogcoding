import Navbar from "@/components/navbar/navbar";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
	const router = useRouter();
	const showNavbar = !["/login", "/register"].includes(router.pathname);

	return (
		<div className='bg-gray-800 min-h-screen text-white'>
			<SessionProvider>
				{showNavbar && <Navbar />}
				<Component {...pageProps} />
				<Toaster />
			</SessionProvider>
		</div>
	);
}
