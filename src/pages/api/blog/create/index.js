import prisma from "@/db/db";
import cloudinary from "cloudinary";

cloudinary.v2.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
	api: {
		bodyParser: {
			sizeLimit: "2mb", // Adjust as necessary
		},
	},
};

export default async function handler(req, res) {
	if (req.method === "POST") {
		const { title, content, slug, images, code, language, authorId } = req.body;

		try {
			// Upload images to Cloudinary
			const uploadedImages = await Promise.all(
				(images || []).map(async (image) => {
					const result = await cloudinary.v2.uploader.upload(image, {
						folder: process.env.CLOUDINARY_FOLDER,
					});
					return result.secure_url;
				})
			);

			// Create blog in the database
			const blog = await prisma.blog.create({
				data: {
					title,
					content, // content is now an array
					slug,
					images: uploadedImages,
					authorId,
					sourceCode: {
						create: {
							code, // code is now an array
							language,
						},
					},
				},
			});

			res.status(201).json({ message: "Blog created successfully", blog });
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal Server Error" });
		}
	} else if (req.method === "GET") {
		try {
			const { page = 1, limit = 10, authorId } = req.query;
			const skip = (parseInt(page) - 1) * parseInt(limit);

			const where = {};
			if (authorId) {
				where.authorId = authorId;
			}

			const blogs = await prisma.blog.findMany({
				where,
				include: {
					author: {
						select: {
							name: true,
							image: true,
						},
					},
					sourceCode: true,
				},
				orderBy: {
					createdAt: "desc",
				},
				skip,
				take: parseInt(limit),
			});

			const totalBlogs = await prisma.blog.count({ where });

			res.status(200).json({
				blogs,
				totalPages: Math.ceil(totalBlogs / parseInt(limit)),
				currentPage: parseInt(page),
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Internal Server Error" });
		}
	} else {
		res.status(405).json({ message: "Method not allowed" });
	}
}
