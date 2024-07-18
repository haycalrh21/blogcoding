import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import { motion } from "framer-motion";
import CopyableCode from "@/components/copyable";

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

	const containerVariants = {
		hidden: { opacity: 0, x: -100 },
		visible: {
			opacity: 1,
			x: 0,
			transition: { type: "spring", stiffness: 50, delay: 0.2 },
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0, transition: { delay: 0.3, duration: 0.6 } },
	};

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
			<motion.div
				className='container mx-auto px-4 py-8'
				variants={containerVariants}
				initial='hidden'
				animate='visible'
			>
				<motion.h1 className='text-3xl font-bold mb-4' variants={itemVariants}>
					{blog.title}
				</motion.h1>
				<motion.p className='text-white mb-4' variants={itemVariants}>
					<p>{blog.author.name}</p>
				</motion.p>
				<motion.div className='mb-6' variants={itemVariants}>
					{new Date(blog.createdAt).toLocaleDateString()}
					{/* <h2 className='text-xl font-semibold mb-2'>Author:</h2> */}
					{blog.author.image && (
						<Image
							src={blog.author.image}
							alt={`${blog.author.name}'s profile picture`}
							width={50}
							height={50}
							className='rounded-full'
						/>
					)}
				</motion.div>
				<motion.div className='mb-6' variants={itemVariants}>
					{/* <h2 className='text-xl font-semibold mb-2'>Content</h2> */}
					<div dangerouslySetInnerHTML={{ __html: blog.content }} />
				</motion.div>
				{blog.images && blog.images.length > 0 && (
					<motion.div className='mb-6' variants={itemVariants}>
						<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
							{blog.images.map((image, index) => (
								<motion.div key={index} whileHover={{ scale: 1.05 }}>
									<Image
										src={image}
										alt={`Blog image ${index + 1}`}
										width={500}
										height={300}
										layout='responsive'
										objectFit='cover'
									/>
								</motion.div>
							))}
						</div>
					</motion.div>
				)}
				{blog.sourceCode && (
					<motion.div className='mb-6' variants={itemVariants}>
						<h2 className='text-xl font-semibold mb-2'>Source Code:</h2>
						<p>Language: {blog.sourceCode.language}</p>
						<pre className=' p-4 rounded-md overflow-x-auto text-black'>
							<CopyableCode
								code={blog.sourceCode.code}
								language={blog.sourceCode.language}
							/>
						</pre>
					</motion.div>
				)}
			</motion.div>
		</>
	);
}
