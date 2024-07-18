import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Services() {
	const services = [
		{
			id: 1,
			title: "Custom Website Development",
			description:
				"We provide custom website development services tailored to your specific needs and requirements.",
		},
		{
			id: 2,
			title: "E-commerce Solutions",
			description:
				"Build your online store with our comprehensive e-commerce solutions that include everything from product listings to payment integration.",
		},
		{
			id: 3,
			title: "Responsive Web Design",
			description:
				"Ensure your website looks great on all devices with our responsive web design services.",
		},
		{
			id: 4,
			title: "SEO Optimization",
			description:
				"Improve your website's visibility on search engines with our expert SEO optimization services.",
		},
		{
			id: 5,
			title: "Website Maintenance",
			description:
				"Keep your website up-to-date and running smoothly with our website maintenance services.",
		},
	];

	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};

	return (
		<div className='flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4'>
			<h1 className='text-3xl font-semibold mb-8'>Our Services</h1>
			<motion.div
				className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl'
				variants={containerVariants}
				initial='hidden'
				animate='visible'
			>
				{services.map((service) => (
					<motion.div
						key={service.id}
						className='bg-gray-800 p-6 rounded-lg shadow-md hover:bg-gray-700 transition-colors'
						variants={itemVariants}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<h2 className='text-xl font-semibold mb-2'>{service.title}</h2>
						<p className='text-lg'>{service.description}</p>
					</motion.div>
				))}
			</motion.div>
			<a
				href='https://wa.me/6285157001437'
				target='_blank'
				rel='noopener noreferrer'
			>
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					className='mt-8 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors'
				>
					Contact Us
				</motion.button>
			</a>
		</div>
	);
}
