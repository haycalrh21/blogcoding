import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";

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

	if (isLoading) return <div className='text-center py-10'>Loading...</div>;
	if (!post) return <div className='text-center py-10'>Post not found</div>;

	return (
		<div className='px-16'>
			<h1 className='text-2xl md:text-3xl font-bold mb-4'>{post.title}</h1>
			<div className='flex items-center mb-4'>
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
			</div>
			<div className='mb-6 flex justify-center gap-4'>
				{post.images?.map((image, index) => (
					<Image
						key={index}
						src={image}
						alt={`Post image ${index + 1}`}
						width={600}
						height={400}
						className='object-cover rounded-lg mb-4 max-w-full h-auto'
					/>
				))}
			</div>
			<div
				className='prose max-w-none mb-8'
				dangerouslySetInnerHTML={{ __html: post.content }}
			/>
			{session?.user?.id === post.authorId && (
				<button
					onClick={handleDelete}
					className='bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors mb-4'
				>
					Delete Post
				</button>
			)}
			<div className='mt-8'>
				<h2 className='text-xl font-semibold mb-4'>Comments</h2>
				<form onSubmit={handleCommentSubmit} className='mb-6'>
					<div className='flex'>
						<input
							type='text'
							value={newComment}
							onChange={(e) => setNewComment(e.target.value)}
							placeholder='Write your comment...'
							className='flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
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
						<div key={comment.id} className='bg-gray-100 p-4 rounded-lg'>
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
								<p className='font-semibold'>{comment.author?.name}</p>
							</div>
							<p>{comment.content}</p>
							<p className='text-sm text-gray-500 mt-2'>
								{new Date(comment.createdAt).toLocaleString()}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
