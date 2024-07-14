import { Button } from "@/components/ui/button";
import React from "react";
import ModalPost from "@/components/pages/posts/modal-add-button/modal";
import prisma from "@/db/db";

export default function PagePost({ posts }) {
	const [isModalOpen, setIsModalOpen] = React.useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<div className='p-4'>
			<Button onClick={openModal}>Add Post</Button>
			{isModalOpen && <ModalPost onClose={closeModal} />}

			<div className='grid grid-cols-1 gap-4 mt-4'>
				{posts.map((post) => (
					<div key={post.id} className='p-4 bg-white rounded-lg shadow-md'>
						<h2 className='text-xl font-semibold mb-2'>{post.title}</h2>
						<p className='text-gray-700 mb-4'>{post.content}</p>
						{post.images.length > 0 && (
							<div className='mb-4'>
								{post.images.map((image, index) => (
									<img
										key={index}
										src={image}
										alt='Post image'
										className='w-full rounded-lg max-h-48 object-cover'
									/>
								))}
							</div>
						)}
						<div className='flex items-center justify-between'>
							<p className='text-gray-500'>By {post.author.name}</p>
							<Button className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700'>
								Comment
							</Button>
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
