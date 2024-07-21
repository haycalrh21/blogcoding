// src/pages/_app.jsx
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { ThemeProvider, ThemeContext } from "@/components/ThemeContext";
import { useContext } from "react";

function AppContent({ Component, pageProps }) {
	const router = useRouter();
	const showNavbar = !["/login", "/register"].includes(router.pathname);
	const showFooter = !["/login", "/register"].includes(router.pathname);
	const { darkMode } = useContext(ThemeContext);

	return (
		<div
			className={`min-h-screen bg-white dark:bg-gray-800 text-black dark:text-white ${
				darkMode ? "dark" : ""
			}`}
		>
			<SessionProvider>
				{showNavbar && <Navbar />}
				<Component {...pageProps} />
				{showFooter && <Footer />}
				<Toaster />
			</SessionProvider>
		</div>
	);
}

export default function App({ Component, pageProps }) {
	return (
		<ThemeProvider>
			<AppContent Component={Component} pageProps={pageProps} />
		</ThemeProvider>
	);
}
