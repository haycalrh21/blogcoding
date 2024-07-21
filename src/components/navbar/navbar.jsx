"use client";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import Image from "next/image";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DarkModeToggle from "../darkmode";

export default function Navbar() {
	const { data: session, status } = useSession();
	const [isOpen, setIsOpen] = useState(false);

	const handleMenuItemClick = () => {
		setIsOpen(false); // Close the menu
	};

	return (
		<nav className='bg-gray-700'>
			{/* <hr /> */}
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-16'>
					<div className='flex items-center'>
						<div className='flex-shrink-0'>
							<Link href='/'>
								<Image src='/logo.png' alt='Logo' width={40} height={40} />
							</Link>
						</div>
						<div className='hidden md:block'>
							<div className='ml-10 flex items-center space-x-4'>
								<Link
									href='/'
									className='text-gray-300 hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
								>
									Home
								</Link>
								<Link
									href='/post'
									className='text-gray-300 hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
								>
									Post
								</Link>
								<Link
									href='/services'
									className='text-gray-300 hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
								>
									Services
								</Link>
								<Link
									href='/about'
									className='text-gray-300 hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
								>
									About
								</Link>
							</div>
						</div>
					</div>
					<div className='hidden md:flex items-center space-x-2'>
						<DarkModeToggle />
						<DropdownMenu>
							<DropdownMenuTrigger className='text-gray-300 hover:bg-gray-900 hover:text-white px-3 py-2 rounded-md text-sm font-medium'>
								{session ? session.user.name : "Login / Register"}
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								{session ? (
									<DropdownMenuItem
										onClick={() => signOut()}
										className='cursor-pointer'
									>
										Sign Out
									</DropdownMenuItem>
								) : (
									<>
										<DropdownMenuItem
											onClick={() => signIn()}
											className='cursor-pointer'
										>
											Login
										</DropdownMenuItem>
										<DropdownMenuItem
											onClick={() => (window.location.href = "/register")}
											className='cursor-pointer'
										>
											Register
										</DropdownMenuItem>
									</>
								)}
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					<div className='-mr-2 flex md:hidden'>
						<button
							onClick={() => setIsOpen(!isOpen)}
							type='button'
							className='bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white'
							aria-controls='mobile-menu'
							aria-expanded={isOpen}
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
							<DarkModeToggle />

							<Link
								href='/'
								className='text-gray-300 hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
								onClick={handleMenuItemClick}
							>
								Home
							</Link>
							<Link
								href='/post'
								className='text-gray-300 hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
								onClick={handleMenuItemClick}
							>
								Post
							</Link>
							<Link
								href='/services'
								className='text-gray-300 hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
								onClick={handleMenuItemClick}
							>
								Services
							</Link>
							<Link
								href='/about'
								className='text-gray-300 hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
								onClick={handleMenuItemClick}
							>
								About
							</Link>
							{session ? (
								<>
									<Link
										href='/dashboard'
										className='text-gray-300 hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium'
										onClick={handleMenuItemClick}
									>
										Dashboard
									</Link>
									<button
										onClick={() => {
											signOut();
											handleMenuItemClick();
										}}
										className='text-gray-300 hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left'
									>
										Sign Out
									</button>
								</>
							) : (
								<button
									onClick={() => {
										signIn();
										handleMenuItemClick();
									}}
									className='text-gray-300 hover:bg-gray-900 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left'
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
