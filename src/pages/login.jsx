import { useState } from "react";
import Head from "next/head";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { data: session, update } = useSession();

	const [error, setError] = useState("");
	const router = useRouter();
	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");

		try {
			const result = await signIn("credentials", {
				redirect: false,
				email,
				password,
			});

			if (result.error) {
				setError("Invalid email or password");
			} else {
				// Perbarui sesi untuk mendapatkan informasi peran terbaru
				await update();

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

	return (
		<div className='min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8'>
			<Head>
				<title>Login</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<div className='sm:mx-auto sm:w-full sm:max-w-md'>
				<h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
					Login ke akun Anda
				</h2>
			</div>

			<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
				<div className='bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10'>
					<form className='space-y-6' onSubmit={handleSubmit}>
						<div>
							<label
								htmlFor='email'
								className='block text-sm font-medium text-gray-700'
							>
								Alamat Email
							</label>
							<div className='mt-1'>
								<input
									id='email'
									name='email'
									type='email'
									autoComplete='email'
									required
									className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</div>
						</div>

						<div>
							<label
								htmlFor='password'
								className='block text-sm font-medium text-gray-700'
							>
								Password
							</label>
							<div className='mt-1'>
								<input
									id='password'
									name='password'
									type='password'
									autoComplete='current-password'
									required
									className='appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
						</div>

						<div>
							<button
								type='submit'
								className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
							>
								Login
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
