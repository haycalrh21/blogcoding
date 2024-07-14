import { useSession } from "next-auth/react";
import { useState } from "react";

import dynamic from "next/dynamic";
import slugify from "slugify";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

export default function CreateBlogPage() {
	const { data: session } = useSession();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [images, setImages] = useState([]);
	const [code, setCode] = useState("");
	const [language, setLanguage] = useState("");

	const handleImageChange = (e) => {
		setImages(Array.from(e.target.files));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

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
		const slug = slugify(title, { lower: true, strict: true });

		const blogData = {
			title,
			content,
			slug,
			images: imageBase64,
			code,
			language,
			authorId: session?.user?.id, // Tambahkan ini
		};

		try {
			const response = await fetch("/api/blog/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(blogData),
			});

			const result = await response.json();
			if (response.ok) {
				alert("Blog created successfully");
			} else {
				alert(`Error: ${result.message}`);
			}
		} catch (error) {
			console.error("Error creating blog:", error);
			alert("An error occurred while creating the blog.");
		}
	};

	const modules = {
		toolbar: [
			[{ header: [1, 2, false] }],
			["bold", "italic", "underline", "strike", "blockquote"],
			[
				{ list: "ordered" },
				{ list: "bullet" },
				{ indent: "-1" },
				{ indent: "+1" },
			],
			["link", "image"],
			["clean"],
		],
	};

	const formats = [
		"header",
		"bold",
		"italic",
		"underline",
		"strike",
		"blockquote",
		"list",
		"bullet",
		"indent",
		"link",
		"image",
	];
	return (
		<form onSubmit={handleSubmit} className='max-w-2xl mx-auto p-4'>
			<div className='mb-4'>
				<label className='block text-gray-700 text-sm font-bold mb-2'>
					Blog Title
				</label>
				<input
					type='text'
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder='Blog Title'
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
				/>
			</div>
			<div className='mb-4'>
				<label className='block text-gray-700 text-sm font-bold mb-2'>
					Blog Content
				</label>
				<ReactQuill
					value={content}
					onChange={setContent}
					modules={modules}
					formats={formats}
					className='h-64 mb-12'
				/>
			</div>
			<div className='mb-4'>
				<label className='block text-gray-700 text-sm font-bold mb-2'>
					Upload Images
				</label>
				<input
					type='file'
					multiple
					onChange={handleImageChange}
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
				/>
				{images.length > 0 && (
					<div className='mt-2 flex flex-wrap'>
						{images.map((image, index) => (
							<img
								key={index}
								src={URL.createObjectURL(image)}
								className='w-20 h-20 object-cover m-1'
								alt={`Uploaded ${index}`}
							/>
						))}
					</div>
				)}
			</div>
			<div className='mb-4'>
				<label className='block text-gray-700 text-sm font-bold mb-2'>
					Source Code
				</label>
				<ReactQuill
					value={code}
					onChange={setCode}
					modules={modules}
					formats={formats}
					className='h-64 mb-12'
				/>
			</div>
			<div className='mb-4'>
				<label className='block text-gray-700 text-sm font-bold mb-2'>
					Programming Language
				</label>
				<input
					type='text'
					value={language}
					onChange={(e) => setLanguage(e.target.value)}
					placeholder='Programming Language'
					className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
				/>
			</div>
			<div className='flex items-center justify-between'>
				<button
					type='submit'
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
				>
					Create Blog
				</button>
			</div>
		</form>
	);
}
