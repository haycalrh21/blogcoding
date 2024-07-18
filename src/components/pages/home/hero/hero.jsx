"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
	return (
		<div className='relative min-h-[70vh] flex items-center overflow-hidden bg-gray-700 text-white'>
			<div className='container mx-auto px-4'>
				<div className='flex flex-col md:flex-row items-center'>
					{/* Content */}
					<motion.div
						className='w-full md:w-1/2 text-left mb-8 md:mb-0'
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
					>
						<h1 className='text-4xl md:text-5xl font-bold mb-4 leading-tight'>
							Tutorial Coding, Open Source & Post.
						</h1>
						<p className='text-lg mb-6 text-gray-300'>
							🚀 Situs untuk belajar pemrograman dan menemukan kode sumber untuk
							web dan aplikasi.
						</p>
						{/* <motion.button
							className='bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg'
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							Login untuk Masuk
						</motion.button> */}
					</motion.div>

					{/* Image */}
					<motion.div
						className='w-full md:w-1/2 h-64 md:h-auto'
						initial={{ opacity: 0, y: 50 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.2 }}
					>
						<div className='relative w-full h-full md:h-[400px]'>
							<Image
								src='https://images.unsplash.com/photo-1720370225485-386b9793c61d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
								alt='Coding illustration'
								layout='fill'
								objectFit='cover'
								className='rounded-xl'
							/>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
