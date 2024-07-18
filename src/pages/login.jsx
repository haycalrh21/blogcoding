import { useState } from "react";
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { data: session, update } = useSession();
	const [loading, setLoading] = useState(false);
	const { toast } = useToast();

	const [error, setError] = useState("");
	const router = useRouter();
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setLoading(true);
		try {
			const result = await signIn("credentials", {
				redirect: false,
				email,
				password,
			});

			if (result.error) {
				toast({
					title: "Failed to login",
					description: "Invalid email or password",
				});
				setLoading(false);
				setError("Invalid email or password");
			} else {
				// Perbarui sesi untuk mendapatkan informasi peran terbaru
				await update();
				toast({
					title: "Login successful",
					description: "You have successfully logged in.",
				});
				// Periksa peran pengguna dan arahkan ke halaman yang sesuai
				if (session?.user?.role === "ADMIN") {
					router.push("/admin/dashboard");
				} else {
					router.push("/");
				}
			}
		} catch (error) {
			setError("An error occurred. Please try again.");
		}
	};
	const containerVariants = {
		hidden: { opacity: 0, y: -50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: "spring",
				stiffness: 100,
				when: "beforeChildren",
				staggerChildren: 0.3,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: -20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { type: "spring", stiffness: 100 },
		},
	};

	return (
		<motion.div
			className='min-h-screen bg-gray-700 flex flex-col justify-center py-12 sm:px-6 lg:px-8'
			initial='hidden'
			animate='visible'
			variants={containerVariants}
		>
			<Head>
				<title>Login</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<motion.div
				className='sm:mx-auto sm:w-full sm:max-w-md'
				variants={itemVariants}
			>
				<h2 className='mt-6 text-center text-3xl font-extrabold text-white'>
					Login ke akun Anda
				</h2>
			</motion.div>

			<motion.div
				className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'
				variants={itemVariants}
			>
				<motion.div
					className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'
					whileHover={{ boxShadow: "0px 0px 8px rgb(255,255,255)" }}
				>
					<form className='space-y-6' onSubmit={handleSubmit}>
						<motion.div variants={itemVariants}>
							<label
								htmlFor='email'
								className='block text-sm font-medium text-gray-700'
							>
								Alamat Email
							</label>
							<div className='mt-1'>
								<motion.input
									id='email'
									name='email'
									type='email'
									autoComplete='email'
									required
									className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									whileFocus={{ scale: 1.02 }}
								/>
							</div>
						</motion.div>

						<motion.div variants={itemVariants}>
							<label
								htmlFor='password'
								className='block text-sm font-medium text-gray-700'
							>
								Password
							</label>
							<div className='mt-1'>
								<motion.input
									id='password'
									name='password'
									type='password'
									autoComplete='current-password'
									required
									className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									whileFocus={{ scale: 1.02 }}
								/>
							</div>
						</motion.div>

						<motion.div variants={itemVariants}>
							<motion.button
								type='submit'
								disabled={loading}
								className='w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed'
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
									"Login"
								)}
							</motion.button>
						</motion.div>
					</form>
				</motion.div>
			</motion.div>
		</motion.div>
	);
}
