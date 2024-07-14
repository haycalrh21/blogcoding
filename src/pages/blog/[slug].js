import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";

export default function BlogPost() {
	const [blog, setBlog] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();
	const { slug } = router.query;

	useEffect(() => {
		if (slug) {
			fetchBlog();
		}
	}, [slug]);

	const fetchBlog = async () => {
		try {
			const response = await fetch(`/api/blog/${slug}`);
			if (!response.ok) {
				throw new Error("Blog not found");
			}
			const data = await response.json();
			setBlog(data);
		} catch (error) {
			console.error("Error fetching blog:", error);
		} finally {
			setIsLoading(false);
		}
	};

	if (isLoading) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500'></div>
			</div>
		);
	}

	if (!blog) {
		return <div className='text-center mt-10'>Blog not found</div>;
	}

	return (
		<>
			<Head>
				<title>{blog.title} | My Blog</title>
				<meta
					name='description'
					content={blog.excerpt || blog.content.substring(0, 150)}
				/>
				<meta name='keywords' content={`blog, article, ${blog.title}`} />
				<meta property='og:title' content={blog.title} />
				<meta
					property='og:description'
					content={blog.excerpt || blog.content.substring(0, 150)}
				/>
				<meta property='og:image' content={blog.images && blog.images[0]} />
				<meta property='og:type' content='article' />
				<meta
					property='article:published_time'
					content={new Date(blog.createdAt).toISOString()}
				/>
				<meta
					property='article:modified_time'
					content={new Date(blog.updatedAt).toISOString()}
				/>
				<meta property='article:author' content={blog.author.name} />
				{blog.tags && (
					<meta property='article:tag' content={blog.tags.join(", ")} />
				)}
				<link rel='canonical' href={`https://yourdomain.com/blog/${slug}`} />
			</Head>
			<div className='container mx-auto px-4 py-8'>
				<h1 className='text-3xl font-bold mb-4'>{blog.title}</h1>
				<p className='text-gray-600 mb-4'>
					Published on: {new Date(blog.createdAt).toLocaleDateString()}
				</p>

				<div className='mb-6'>
					<h2 className='text-xl font-semibold mb-2'>Content</h2>
					<div dangerouslySetInnerHTML={{ __html: blog.content }} />
				</div>
				{blog.images && blog.images.length > 0 && (
					<div className='mb-6'>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							{blog.images.map((image, index) => (
								<Image
									key={index}
									src={image}
									alt={`Blog image ${index + 1}`}
									width={500}
									height={300}
									layout='responsive'
									objectFit='cover'
								/>
							))}
						</div>
					</div>
				)}
				{blog.sourceCode && (
					<div className='mb-6'>
						<h2 className='text-xl font-semibold mb-2'>Source Code:</h2>
						<p>Language: {blog.sourceCode.language}</p>
						<pre className='bg-gray-100 p-4 rounded-md overflow-x-auto'>
							<code
								dangerouslySetInnerHTML={{ __html: blog.sourceCode.code }}
							/>
						</pre>
					</div>
				)}
				<div className='mb-6'>
					<h2 className='text-xl font-semibold mb-2'>Author:</h2>
					<p>{blog.author.name}</p>
					{blog.author.image && (
						<Image
							src={blog.author.image}
							alt={`${blog.author.name}'s profile picture`}
							width={50}
							height={50}
							className='rounded-full'
						/>
					)}
				</div>
			</div>
		</>
	);
}
