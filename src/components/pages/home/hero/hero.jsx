"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
	return (
		<div className='relative min-h-[70vh] flex items-center overflow-hidden bg-red-100'>
			<div className='container mx-auto px-4 flex flex-col items-center bg-indigo-300'>
				{/* Image - Moved to the top for mobile */}
				<motion.div
					className='w-full h-64 mb-8 relative'
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
				>
					<Image
						src='https://images.unsplash.com/photo-1720370225485-386b9793c61d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
						alt='Coding Blog'
						layout='fill'
						objectFit='cover'
						className='rounded-lg shadow-lg'
					/>
				</motion.div>

				{/* Content */}
				<motion.div
					className='w-full text-center z-20'
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					<h1 className='text-3xl md:text-5xl font-bold mb-4 text-gray-800'>
						Coding Blog
					</h1>
					<p className='text-lg md:text-xl mb-6 text-gray-600'>
						Explore the world of programming with our insightful articles,
						tutorials, and coding tips.
					</p>
					<motion.button
						className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full text-lg'
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						Start Reading
					</motion.button>
				</motion.div>
			</div>
		</div>
	);
}
