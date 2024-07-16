import { Button } from "@/components/ui/button";
import React from "react";
import ModalPost from "@/components/pages/posts/modal-add-button/modal";
import prisma from "@/db/db";
import Link from "next/link";

export default function PagePost({ posts }) {
	const [isModalOpen, setIsModalOpen] = React.useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<div className='px-4 sm:px-8 lg:px-16 '>
			<Button onClick={openModal} className='mt-4'>
				Add Post
			</Button>
			{isModalOpen && <ModalPost onClose={closeModal} />}

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-4'>
				{posts.map((post) => (
					<div key={post.id} className='p-4 bg-white rounded-lg shadow-md'>
						<h2 className='text-xl font-semibold mb-2'>
							<Link href={`/post/${post.id}`} className='hover:underline'>
								{post.title}
							</Link>
						</h2>
						<p className='text-gray-500'>By {post.author.name}</p>
						{post.images.length > 0 && (
							<div className='mb-4'>
								<img
									src={post.images[0]}
									alt='Post image'
									className='w-full rounded-lg max-h-48 object-cover'
								/>
							</div>
						)}

						<div className='flex items-center justify-between'>
							<Link href={`/post/${post.id}`}>
								<Button className='bg-blue-500 text-white rounded hover:bg-blue-700'>
									Baca selengkapnya
								</Button>
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export async function getServerSideProps() {
	try {
		const posts = await prisma.post.findMany({
			include: {
				author: true,
			},
		});

		return {
			props: {
				posts: JSON.parse(JSON.stringify(posts)),
			},
		};
	} catch (error) {
		console.error("Error fetching posts:", error);
		return {
			props: {
				posts: [],
			},
		};
	}
}
