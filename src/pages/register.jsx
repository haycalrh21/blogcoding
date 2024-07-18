"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

export default function Register() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const router = useRouter();
	const { toast } = useToast();

	const [loading, setLoading] = useState(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			const response = await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ name, email, password }),
			});

			const data = await response.json();

			if (!response.ok) {
				toast({
					title: "Failed to register ",
					description: "Something went wrong. Please try again.",
				});
				setLoading(false);
				throw new Error(data.message || "Something went wrong");
			}
			toast({
				title: "Registration successful",
				description: "You have successfully registered. Please sign-in.",
			});
			// Registration successful
			// console.log("User registered:", data.user);
			router.push("/login"); // Redirect to sign-in page
		} catch (error) {
			setError(error.message);
		}
	};
	const containerVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delayChildren: 0.3,
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
		},
	};

	return (
		<motion.div
			className='min-h-screen flex items-center justify-center bg-gray-700 py-12 px-4 sm:px-6 lg:px-8'
			initial='hidden'
			animate='visible'
			variants={containerVariants}
		>
			<div className='max-w-md w-full space-y-8'>
				<motion.div variants={itemVariants}>
					<h2 className='mt-6 text-center text-3xl font-extrabold text-white'>
						Register for an account
					</h2>
				</motion.div>
				<motion.form
					className='mt-8 space-y-6'
					onSubmit={handleSubmit}
					variants={itemVariants}
				>
					<input type='hidden' name='remember' defaultValue='true' />
					<div className='rounded-md shadow-sm -space-y-px'>
						<motion.div variants={itemVariants}>
							<label htmlFor='name' className='sr-only'>
								Name
							</label>
							<motion.input
								id='name'
								name='name'
								type='text'
								required
								className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
								placeholder='Name'
								value={name}
								onChange={(e) => setName(e.target.value)}
								whileFocus={{ scale: 1.02 }}
							/>
						</motion.div>
						<motion.div variants={itemVariants}>
							<label htmlFor='email-address' className='sr-only'>
								Email address
							</label>
							<motion.input
								id='email-address'
								name='email'
								type='email'
								autoComplete='email'
								required
								className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
								placeholder='Email address'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								whileFocus={{ scale: 1.02 }}
							/>
						</motion.div>
						<motion.div variants={itemVariants}>
							<label htmlFor='password' className='sr-only'>
								Password
							</label>
							<motion.input
								id='password'
								name='password'
								type='password'
								autoComplete='current-password'
								required
								className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm'
								placeholder='Password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								whileFocus={{ scale: 1.02 }}
							/>
						</motion.div>
					</div>

					{error && <div className='text-red-500 text-sm mt-2'>{error}</div>}

					<motion.div variants={itemVariants}>
						<motion.button
							type='submit'
							disabled={loading}
							className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							{loading ? (
								<>
									<motion.div
										className='rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-2'
										animate={{ rotate: 360 }}
										transition={{
											duration: 1,
											repeat: Infinity,
											ease: "linear",
										}}
									/>
									Loading...
								</>
							) : (
								"Register"
							)}
						</motion.button>
					</motion.div>
				</motion.form>
			</div>
		</motion.div>
	);
}
