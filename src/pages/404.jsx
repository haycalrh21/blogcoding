import Link from "next/link";
import React from "react";

export default function NotFound() {
	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-800'>
			<div className='text-center'>
				<h1 className='text-4xl font-bold text-gray-700 dark:text-white'>
					404
				</h1>
				<p className='mt-2 text-lg text-gray-500 dark:text-white'>
					Page Not Found
				</p>
				<Link
					href='/'
					className='mt-4 inline-block px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600'
				>
					Go Back Home
				</Link>
			</div>
		</div>
	);
}
