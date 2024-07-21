// src/pages/_app.jsx
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/context/themecontext"; // Pastikan path ini sesuai
import { useRouter } from "next/router";

function AppContent({ Component, pageProps }) {
	const router = useRouter();
	const showNavbar = !["/login", "/register"].includes(router.pathname);
	const showFooter = !["/login", "/register"].includes(router.pathname);

	return (
		<div
			className={`min-h-screen bg-white dark:bg-gray-800 text-black dark:text-white`}
		>
			{showNavbar && <Navbar />}
			<Component {...pageProps} />
			{showFooter && <Footer />}
			<Toaster />
		</div>
	);
}

function MyApp({ Component, pageProps }) {
	return (
		<ThemeProvider>
			<SessionProvider>
				<AppContent Component={Component} pageProps={pageProps} />
			</SessionProvider>
		</ThemeProvider>
	);
}

export default MyApp;
