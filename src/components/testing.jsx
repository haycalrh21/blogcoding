import React, { useEffect, useState } from "react";
import CopyableCode from "./copyable";

export default function Testing() {
	const [blogs, setBlogs] = useState([]);

	const fetchdata = async () => {
		const res = await fetch("/api/blog/index");
		const data = await res.json();
		setBlogs(data);
	};

	useEffect(() => {
		fetchdata();
	}, []);

	return (
		<div>
			{blogs.map((blog) => (
				<div key={blog.id} className='mb-8 p-4 border rounded'>
					<h2 className='text-2xl font-bold mb-2'>{blog.title}</h2>
					<div
						className='mb-4'
						dangerouslySetInnerHTML={{ __html: blog.content }}
					/>
					{blog.images.map((image, index) => (
						<img
							key={index}
							src={image}
							alt={`Blog image ${index}`}
							className='mb-4 max-w-full h-auto'
						/>
					))}
					<div className='mb-4'>
						<h3
							className='text-xl font-bold mt-2 mb-4'
							dangerouslySetInnerHTML={{ __html: blog.content }}
						/>
						<CopyableCode
							code={blog.sourceCode.code}
							language={blog.sourceCode.language}
						/>
					</div>
					<p className='text-sm text-gray-600'>
						Author: {blog.author.name} ({blog.author.email})
					</p>
					<p className='text-sm text-gray-600'>
						Created at: {new Date(blog.createdAt).toLocaleString()}
					</p>
				</div>
			))}
		</div>
	);
}
