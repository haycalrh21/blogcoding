"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";

export default function Navbar() {
	const { data: session, status } = useSession();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className='bg-gray-800'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					<div className='flex items-center'>
						<div className='flex-shrink-0'>
							<Link href='/' className='text-white font-bold text-xl'>
								Logo
							</Link>
						</div>
						<div className='hidden md:block'>
							<div className='ml-10 flex items-center space-x-4'>
								<Link
									href='/'
									className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
								>
									Home
								</Link>
								<Link
									href='/post'
									className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
								>
									post
								</Link>
								<Link
									href='/services'
									className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
								>
									Services
								</Link>
								<Link
									href='/contact'
									className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
								>
									Contact
								</Link>
							</div>
						</div>
					</div>
					<div className='hidden md:flex items-center space-x-2'>
						{session ? (
							<>
								<Button asChild>
									<Link href='/dashboard'>Dashboard</Link>
								</Button>
								<Button onClick={() => signOut()}>Sign Out</Button>
							</>
						) : (
							<Button onClick={() => signIn()}>Login</Button>
						)}
					</div>
					<div className='-mr-2 flex md:hidden'>
						<button
							onClick={() => setIsOpen(!isOpen)}
							type='button'
							className='bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
							aria-controls='mobile-menu'
							aria-expanded='false'
						>
							<span className='sr-only'>Open main menu</span>
							<motion.svg
								className='block h-6 w-6'
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
								aria-hidden='true'
								animate={{ rotate: isOpen ? 90 : 0 }}
								transition={{ duration: 0.2 }}
							>
								{isOpen ? (
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M6 18L18 6M6 6l12 12'
									/>
								) : (
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M4 6h16M4 12h16M4 18h16'
									/>
								)}
							</motion.svg>
						</button>
					</div>
				</div>
			</div>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						transition={{ duration: 0.3, ease: "easeInOut" }}
						className='md:hidden'
						id='mobile-menu'
					>
						<motion.div
							initial={{ opacity: 0, y: -20 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -20 }}
							transition={{ duration: 0.2, delay: 0.1 }}
							className='px-2 pt-2 pb-3 space-y-1 sm:px-3'
						>
							<Link
								href='/'
								className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
							>
								Home
							</Link>
							<Link
								href='/about'
								className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
							>
								About
							</Link>
							<Link
								href='/services'
								className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
							>
								Services
							</Link>
							<Link
								href='/contact'
								className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
							>
								Contact
							</Link>
							{session ? (
								<>
									<Link
										href='/dashboard'
										className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
									>
										Dashboard
									</Link>
									<button
										onClick={() => signOut()}
										className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left'
									>
										Sign Out
									</button>
								</>
							) : (
								<button
									onClick={() => signIn()}
									className='text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left'
								>
									Login
								</button>
							)}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</nav>
	);
}
