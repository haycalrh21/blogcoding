import Image from "next/image";
import { Inter } from "next/font/google";
import Hero from "@/components/pages/home/hero/hero";
import TutorialCarousel from "@/components/pages/home/card/card";
import { useEffect } from "react";
import Testing from "@/components/testing";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ blogs }) {
	return (
		<main>
			{/* <div className='container mx-auto px-4 flex flex-col items-center bg-indigo-300'> */}
			<Hero />
			<TutorialCarousel blogs={blogs} />
			{/* <Testing /> */}
			{/* </div> */}
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
			take: 8, // Ambil maksimal 8 data blog
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
	}
}
