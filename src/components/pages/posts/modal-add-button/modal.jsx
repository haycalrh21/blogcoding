import React, { useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import dynamic from "next/dynamic";
import hljs from "highlight.js";
import useSWR, { mutate } from "swr";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ModalPost({ onClose }) {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [images, setImages] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const { data: session } = useSession();
	const { toast } = useToast();

	const modules = useMemo(
		() => ({
			toolbar: [
				[{ header: [1, 2, false] }],
				["bold", "italic", "underline", "strike", "blockquote"],
				[{ list: "ordered" }, { list: "bullet" }],
				["link", "image", "code-block"],
				["clean"],
			],
			syntax: {
				highlight: (text) => hljs.highlightAuto(text).value,
			},
		}),
		[]
	);

	const formats = [
		"header",
		"bold",
		"italic",
		"underline",
		"strike",
		"blockquote",
		"list",
		"bullet",
		"link",
		"image",
		"code-block",
	];

	const handleImageChange = (e) => {
		const files = Array.from(e.target.files);
		setImages(files);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!session) {
			toast({
				title: "Anda harus login untuk membuat post",
				description: "Silahkan login terlebih dahulu",
			});
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
				toast({
					title: "Post created successfully",
					description: "Your post has been created successfully.",
				});

				// Mutate SWR cache to refetch the post list
				mutate("/api/post/getdata");

				onClose();
			} else {
				toast({
					title: "Failed to create post",
					description:
						result.message || "An error occurred while creating the post.",
				});
			}
		} catch (error) {
			console.error("Error membuat post:", error);
			toast({
				title: "Failed to create post",
				description: "An error occurred while creating the post.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto'>
			<div className='bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 my-8 relative'>
				<span
					className='absolute top-2 right-2 cursor-pointer text-gray-600'
					onClick={onClose}
				>
					&times;
				</span>
				<form onSubmit={handleSubmit} className='max-h-[80vh] overflow-y-auto'>
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
							className='w-full px-3 py-2 border rounded text-black'
						/>
					</div>
					<div className='mb-4'>
						<label htmlFor='content' className='block text-gray-700'>
							Content:
						</label>
						<ReactQuill
							theme='snow'
							value={content}
							onChange={setContent}
							modules={modules}
							formats={formats}
							className='text-black'
						/>
					</div>
					<div className='mb-4'>
						<label htmlFor='images' className='block text-gray-700 text-black'>
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
							{isLoading ? (
								<>
									<div className='animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2'></div>
									Loading...
								</>
							) : (
								"Create Post"
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
