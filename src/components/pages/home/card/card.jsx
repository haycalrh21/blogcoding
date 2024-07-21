import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import prisma from "@/db/db";

export default function TutorialCarousel({ data: blogs }) {
	return (
		<section className='py-16 dark:bg-gray-900'>
			<div className='container mx-auto px-4'>
				<h2 className='text-3xl md:text-4xl font-bold text-center mb-12 dark:text-white'>
					Coding Tutorials
				</h2>
				<div className='text-right mt-4 mb-4 hover:underline cursor-pointer dark:text-gray-300'>
					<Link href='/blog'>Lihat Selengkapnya</Link>
				</div>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
					{blogs.map((blog) => (
						<motion.div
							key={blog.id}
							className='rounded-lg shadow-lg overflow-hidden bg-slate-200 dark:bg-gray-800'
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							<div className='p-4'>
								<span className='text-sm font-semibold dark:text-gray-300'>
									By: {blog.author.name}
								</span>
								<h3
									className='text-xl font-bold mt-2 mb-4 dark:text-white'
									dangerouslySetInnerHTML={{ __html: blog.title }}
								/>
								{blog.images && blog.images.length > 0 && (
									<div className='my-4 grid grid-cols-1 gap-2'>
										{blog.images.map((image, imgIndex) => (
											<img
												key={imgIndex}
												src={image}
												alt={`Image ${imgIndex}`}
												className='w-full h-auto rounded-lg shadow-md mb-2'
												style={{ objectFit: "cover", maxHeight: "150px" }}
											/>
										))}
									</div>
								)}
								<motion.button
									className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2'
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
								>
									<Link href={`/blog/${blog.slug}`}>Baca Selengkapnya</Link>
								</motion.button>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}
