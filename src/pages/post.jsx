import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ModalPost from "@/components/pages/posts/modal-add-button/modal";
import Link from "next/link";
import { motion } from "framer-motion";
import useSWR, { mutate } from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function PagePost() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const { data: posts, error } = useSWR("/api/post/getdata", fetcher);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
		},
	};

	if (error)
		return (
			<div className='flex justify-center items-center h-screen'>
				<div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500'></div>
			</div>
		);
	if (!posts)
		return (
			<div className='flex justify-center items-center h-screen'>
				<div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500'></div>
			</div>
		);

	return (
		<div className='px-4 sm:px-8 lg:px-16'>
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
			>
				<Button onClick={openModal} className='mt-4'>
					Add Post
				</Button>
			</motion.div>
			{isModalOpen && (
				<ModalPost
					onClose={closeModal}
					onPostCreated={() => mutate("/api/post/getdata")}
				/>
			)}

			<motion.div
				className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4'
				variants={containerVariants}
				initial='hidden'
				animate='visible'
			>
				{posts.map((post) => (
					<motion.div
						key={post.id}
						className='p-4 bg-gray-700 rounded-lg shadow-md'
						variants={itemVariants}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<h2 className='text-xl font-semibold mb-2'>
							<Link href={`/post/${post.id}`} className='hover:underline'>
								{post.title}
							</Link>
						</h2>
						<p>By {post.author.name}</p>
						{post.images.length > 0 && (
							<motion.div className='mb-4' whileHover={{ scale: 1.05 }}>
								<img
									src={post.images[0]}
									alt='Post image'
									className='w-full rounded-lg h-48 object-cover'
								/>
							</motion.div>
						)}

						<div className='flex items-center justify-between'>
							<Link href={`/post/${post.id}`}>
								<motion.div
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
								>
									<Button className='bg-blue-500 text-white rounded hover:bg-blue-700'>
										Baca selengkapnya
									</Button>
								</motion.div>
							</Link>
						</div>
					</motion.div>
				))}
			</motion.div>
		</div>
	);
}
