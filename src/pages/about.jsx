import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

export default function About() {
	const data = {
		nama: "Haycal Rayhansyah",
		umur: 26,
		pekerjaan: "Website Developer",
	};

	const portofolio = [
		{
			id: 1,
			title: "Toko Online",
			description: "Toko online baju",
			link: "https://tokoxyz-xyz.vercel.app/",
		},
		{
			id: 2,
			title: "WebCraftr",
			description: "Template Website",
			link: "https://webcrafter.vercel.app/",
		},
		{
			id: 3,
			title: "Kaca Film",
			description: "Landing Page Kaca File",
			link: "https://landingpagekacafilm.vercel.app/",
		},
		{
			id: 4,
			title: "Landing Page Mobil",
			description: "Landing Page Mobil",
			link: "https://landingpagemobil.vercel.app/",
		},
		{
			id: 5,
			title: "Portofolio",
			description: "Example Portofolio",
			link: "https://porto-iknow.vercel.app/",
		},
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4'>
			<motion.div
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.5 }}
				className='flex flex-col items-center bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md mb-8'
			>
				<Image
					src='/profile.jpg'
					alt='Profile Picture'
					width={150}
					height={150}
					className='rounded-full mb-4'
				/>
				<h1 className='text-2xl font-semibold mb-2'>{data.nama}</h1>
				{/* <p className='text-lg mb-1'>{data.umur}</p> */}
				<p className='text-lg'> {data.pekerjaan}</p>
			</motion.div>

			<div className='w-full max-w-4xl'>
				<h2 className='text-2xl font-semibold mb-4'>Portofolio</h2>
				<motion.div
					className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
					variants={containerVariants}
					initial='hidden'
					animate='visible'
				>
					{portofolio.map((item) => (
						<motion.a
							key={item.id}
							href={item.link}
							target='_blank'
							rel='noopener noreferrer'
							className='bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition-colors'
							variants={itemVariants}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<h3 className='text-xl font-semibold mb-2'>{item.title}</h3>
							<p className='text-lg'>{item.description}</p>
						</motion.a>
					))}
				</motion.div>
			</div>
		</div>
	);
}
