import React from "react";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className='bg-gray-700 text-white py-10'>
			<div className='container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
				<div>
					<h3 className='font-bold mb-3'>Perusahaan</h3>
					<ul>
						<li>
							<Link href='/about' className='hover:text-gray-400'>
								Tentang Kami
							</Link>
						</li>
						<li>
							<Link href='/careers' className='hover:text-gray-400'>
								Karir
							</Link>
						</li>
						<li>
							<Link href='/contact' className='hover:text-gray-400'>
								Kontak
							</Link>
						</li>
					</ul>
				</div>
				<div>
					<h3 className='font-bold mb-3'>Layanan</h3>
					<ul>
						<li>
							<Link
								href='/services/web-development'
								className='hover:text-gray-400'
							>
								Pengembangan Web
							</Link>
						</li>
						<li>
							<Link
								href='/services/mobile-development'
								className='hover:text-gray-400'
							>
								Pengembangan Mobile
							</Link>
						</li>
						<li>
							<Link href='/services/seo' className='hover:text-gray-400'>
								SEO
							</Link>
						</li>
					</ul>
				</div>
				<div>
					<h3 className='font-bold mb-3'>Ikuti Kami</h3>
					<ul className='flex space-x-4'>
						<li>
							<a href='https://facebook.com' className='hover:text-gray-400'>
								Facebook
							</a>
						</li>
						<li>
							<a href='https://twitter.com' className='hover:text-gray-400'>
								Twitter
							</a>
						</li>
						<li>
							<a href='https://instagram.com' className='hover:text-gray-400'>
								Instagram
							</a>
						</li>
					</ul>
				</div>
				<div>
					<h3 className='font-bold mb-3'>Berlangganan</h3>
					<form className='flex flex-col space-y-2'>
						<input
							type='email'
							className='p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none'
							placeholder='Email Anda'
						/>
						<button className='p-2 rounded bg-blue-600 hover:bg-blue-700'>
							Berlangganan
						</button>
					</form>
				</div>
			</div>
			<div className='mt-10 text-center text-gray-400'>
				&copy; {new Date().getFullYear()} CodingBlog. All rights reserved.
			</div>
		</footer>
	);
};

export default Footer;
