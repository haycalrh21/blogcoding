import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

export default function DetailPagePost() {
	const [post, setPost] = useState(null);
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");
	const { data: session } = useSession();
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	const { id } = router.query;

	useEffect(() => {
		if (id) {
			fetchPost();
			fetchComments();
		}
	}, [id]);

	const handleDelete = async () => {
		try {
			const response = await fetch(`/api/post/${id}`, {
				method: "DELETE",
			});

			if (!response.ok) {
				throw new Error("Failed to delete post");
			}

			router.push("/post"); // Redirect to home page after deletion
		} catch (error) {
			console.error("Error deleting post:", error);
		}
	};

	const fetchComments = async () => {
		try {
			const response = await fetch(`/api/comments/${id}`);
			if (!response.ok) {
				throw new Error("Failed to fetch comments");
			}
			const data = await response.json();
			setComments(data);
		} catch (error) {
			console.error("Error fetching comments:", error);
		}
	};

	const handleCommentSubmit = async (e) => {
		e.preventDefault();
		if (!newComment.trim()) return;

		try {
			const response = await fetch(`/api/comments/${id}`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					content: newComment,
					authorId: session?.user?.id,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to post comment");
			}

			const data = await response.json();
			setComments([data, ...comments]);
			setNewComment("");
		} catch (error) {
			console.error("Error posting comment:", error);
		}
	};

	const fetchPost = async () => {
		try {
			const response = await fetch(`/api/post/${id}`);
			if (!response.ok) {
				throw new Error("Post not found");
			}
			const data = await response.json();
			setPost(data);
			// console.log(data);
		} catch (error) {
			console.error("Error fetching post:", error);
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading)
		return (
			<div className='flex justify-center items-center h-screen'>
				<div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500'></div>
			</div>
		);
	if (!post) return <div className='text-center py-10'>Post not found</div>;

	const containerVariants = {
		hidden: { opacity: 0, y: -20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { type: "spring", stiffness: 50, delay: 0.2 },
		},
	};

	return (
		<motion.div
			className='p-4 sm:p-8 lg:p-16 bg-gray-800 rounded-lg shadow-md'
			initial='hidden'
			animate='visible'
			variants={containerVariants}
		>
			<motion.h1
				className='text-2xl md:text-3xl font-bold mb-4'
				variants={containerVariants}
			>
				{post.title}
			</motion.h1>
			<motion.div
				className='flex items-center mb-4'
				variants={containerVariants}
			>
				{post.author?.image && (
					<Image
						src={post.author.image}
						alt={post.author.name}
						width={40}
						height={40}
						className='rounded-full mr-2'
					/>
				)}
				<div>
					<p className='font-semibold'>{post.author?.name}</p>
					<p className='text-sm text-gray-500'>
						{new Date(post.createdAt).toLocaleDateString()}
					</p>
				</div>
			</motion.div>
			<motion.div
				className='mb-6 flex justify-center gap-4'
				variants={containerVariants}
			>
				{post.images?.map((image, index) => (
					<motion.div key={index} whileHover={{ scale: 1.05 }}>
						<Image
							src={image}
							alt={`Post image ${index + 1}`}
							width={600}
							height={400}
							className='object-cover rounded-lg mb-4 max-w-full h-auto'
						/>
					</motion.div>
				))}
			</motion.div>
			<motion.div
				className='prose max-w-none mb-8 rounded-sm bg-gray-500 p-4'
				dangerouslySetInnerHTML={{ __html: post.content }}
				variants={containerVariants}
			/>
			{session?.user?.id === post.authorId && (
				<motion.button
					onClick={handleDelete}
					className='bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors mb-4'
					variants={containerVariants}
				>
					Delete Post
				</motion.button>
			)}
			<motion.div className='mt-8' variants={containerVariants}>
				<h2 className='text-xl font-semibold mb-4'>Comments</h2>
				<form onSubmit={handleCommentSubmit} className='mb-6'>
					<div className='flex'>
						<input
							type='text'
							value={newComment}
							onChange={(e) => setNewComment(e.target.value)}
							placeholder='Write your comment...'
							className='flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black'
						/>
						<button
							type='submit'
							className='bg-blue-500 text-white px-6 py-2 rounded-r-lg hover:bg-blue-600 transition-colors'
						>
							Comment
						</button>
					</div>
				</form>
				<div className='space-y-4'>
					{comments.map((comment) => (
						<motion.div
							key={comment.id}
							className='bg-gray-100 p-4 rounded-lg'
							variants={containerVariants}
						>
							<div className='flex items-center mb-2'>
								{comment.author?.image && (
									<Image
										src={comment.author.image}
										alt={comment.author.name}
										width={32}
										height={32}
										className='rounded-full mr-2'
									/>
								)}
								<p className='font-semibold text-black'>
									{comment.author?.name}
								</p>
							</div>
							<p className='text-black'>{comment.content}</p>
							<p className='text-sm text-black mt-2'>
								{new Date(comment.createdAt).toLocaleString()}
							</p>
						</motion.div>
					))}
				</div>
			</motion.div>
		</motion.div>
	);
}
