import React, { useState } from "react";
import { useSession } from "next-auth/react"; // Assuming you're using NextAuth for authentication

export default function ModalPost({ onClose }) {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [images, setImages] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const { data: session } = useSession(); // Get the current user session

	const handleImageChange = (e) => {
		const files = Array.from(e.target.files);
		setImages(files);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!session) {
			alert("Anda harus login untuk membuat post");
			return;
		}

		setIsLoading(true);
		const imageBase64 = await Promise.all(
			images.map((image) => {
				return new Promise((resolve, reject) => {
					const reader = new FileReader();
					reader.onloadend = () => resolve(reader.result);
					reader.onerror = reject;
					reader.readAsDataURL(image);
				});
			})
		);

		const postData = {
			title,
			content,
			images: imageBase64,
			authorId: session?.user?.id,
		};

		try {
			const response = await fetch("/api/post", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(postData),
			});

			const result = await response.json();

			if (response.ok) {
				alert("Post created successfully");
				onClose(); // Close the modal after successful submission
			} else {
				alert(`Error: ${result.message}`);
			}
		} catch (error) {
			console.error("Error membuat post:", error);
			alert(`Gagal membuat post: ${error.message}`);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
			<div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 relative'>
				<span
					className='absolute top-2 right-2 cursor-pointer text-gray-600'
					onClick={onClose}
				>
					&times;
				</span>
				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label htmlFor='title' className='block text-gray-700'>
							Title:
						</label>
						<input
							type='text'
							id='title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
							className='w-full px-3 py-2 border rounded'
						/>
					</div>
					<div className='mb-4'>
						<label htmlFor='content' className='block text-gray-700'>
							Content:
						</label>
						<textarea
							id='content'
							value={content}
							onChange={(e) => setContent(e.target.value)}
							required
							className='w-full px-3 py-2 border rounded'
						/>
					</div>
					<div className='mb-4'>
						<label htmlFor='images' className='block text-gray-700'>
							Images:
						</label>
						<input
							type='file'
							id='images'
							onChange={handleImageChange}
							multiple
							accept='image/*'
							className='w-full'
						/>
					</div>
					<div className='flex justify-end space-x-4'>
						<button
							type='button'
							onClick={onClose}
							className='bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-700'
						>
							Cancel
						</button>
						<button
							type='submit'
							disabled={isLoading}
							className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50'
						>
							{isLoading ? "Creating..." : "Create Post"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
