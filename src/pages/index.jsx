import { useState, useEffect } from "react";

import Hero from "@/components/pages/home/hero/hero";

import TutorialCarousel from "@/components/pages/home/card/card";

export default function Home() {
	const [data, setData] = useState([]);

	const fetchdata = async () => {
		const res = await fetch("/api/blog/index");
		const data = await res.json();
		setData(data);
		// console.log(data);
	};
	useEffect(() => {
		fetchdata();
	}, []);

	return (
		<main suppressHydrationWarning={true}>
			<Hero />
			{/* Render components only after the component has mounted on the client */}
			<TutorialCarousel data={data} />
		</main>
	);
}
