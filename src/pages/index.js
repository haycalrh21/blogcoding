import { useState, useEffect } from "react";
import Image from "next/image";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import Hero from "@/components/pages/home/hero/hero";
import prisma from "@/db/db";

const inter = Inter({ subsets: ["latin"] });

// Dynamic import untuk TutorialCarousel
const TutorialCarousel = dynamic(
	() => import("@/components/pages/home/card/card"),
	{
		ssr: false,
	}
);

export default function Home({ blogs }) {
	const [clientBlogs, setClientBlogs] = useState([]);

	useEffect(() => {
		setClientBlogs(blogs);
	}, [blogs]);

	return (
		<main suppressHydrationWarning={true}>
			<Hero />
			{typeof window !== "undefined" && (
				<TutorialCarousel blogs={clientBlogs} />
			)}
		</main>
	);
}

export async function getServerSideProps() {
	try {
		const blogs = await prisma.blog.findMany({
			include: {
				author: {
					select: {
						id: true,
						name: true,
						email: true,
					},
				},
				sourceCode: true,
			},
			orderBy: {
				createdAt: "desc",
			},
			take: 8,
		});

		return {
			props: {
				blogs: JSON.parse(JSON.stringify(blogs)),
			},
		};
	} catch (error) {
		console.error("Error fetching blogs:", error);
		return {
			props: {
				blogs: [],
			},
		};
	} finally {
		await prisma.$disconnect();
	}
}
