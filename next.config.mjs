/** @type {import('next').NextConfig} */
const nextConfig = {
	api: {
		bodyParser: {
			sizeLimit: "10mb", // Atau lebih besar jika diperlukan
		},
	},
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
