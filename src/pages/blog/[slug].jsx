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
			// console.log(data);
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
		<motion.div
			className='min-h-screen bg-white dark:bg-gray-800 text-black dark:text-white'
			variants={containerVariants}
			initial='hidden'
			animate='visible'
		>
			<Head>
				<title>Coding Blog - {blog.title}</title>
			</Head>
			<div className='container mx-auto px-4 py-8'>
				<motion.h1
					className='text-3xl font-bold mb-4 dark:text-white'
					variants={itemVariants}
				>
					{blog.title}
				</motion.h1>
				<motion.p
					className='text-gray-600 dark:text-gray-300 mb-4'
					variants={itemVariants}
				>
					<p>{blog.author.name}</p>
				</motion.p>
				<motion.div
					className='mb-6 text-gray-600 dark:text-gray-300'
					variants={itemVariants}
				>
					{new Date(blog.createdAt).toLocaleDateString()}
					{blog.author.image && (
						<Image
							src={blog.author.image}
							alt={`${blog.author.name}'s profile picture`}
							width={50}
							height={50}
							className='rounded-full mt-2'
						/>
					)}
				</motion.div>
				{blog.content.map((contentItem, index) => (
					<motion.div
						className='mb-6 dark:text-white'
						key={index}
						variants={itemVariants}
					>
						<div dangerouslySetInnerHTML={{ __html: contentItem }} />
					</motion.div>
				))}
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
				{blog.sourceCode.code.map((codeItem, index) => (
					<motion.div className='mb-6' key={index} variants={itemVariants}>
						<CopyableCode
							className='p-4 rounded-md overflow-x-auto bg-gray-100 dark:bg-gray-700 text-white dark:text-white'
							code={codeItem}
						/>
					</motion.div>
				))}
			</div>
		</motion.div>
	);
}
