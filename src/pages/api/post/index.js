import prisma from "@/db/db";
import cloudinary from "cloudinary";

cloudinary.v2.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
	if (req.method === "POST") {
		try {
			if (!prisma) {
				throw new Error("Prisma client tidak diinisialisasi");
			}

			const { title, content, images, authorId } = req.body;

			if (!title) {
				throw new Error("Judul tidak boleh kosong");
			}

			// Upload gambar ke Cloudinary
			const uploadedImages = await Promise.all(
				(images || []).map(async (image) => {
					const result = await cloudinary.v2.uploader.upload(image, {
						folder: process.env.CLOUDINARY_FOLDER,
					});
					return result.secure_url;
				})
			);

			// Buat post dengan URL gambar yang diupload
			const post = await prisma.post.create({
				data: {
					title,
					content,
					images: uploadedImages,
					author: { connect: { id: authorId } },
				},
			});
			res.status(201).json(post);
		} catch (error) {
			console.error("Error membuat post:", error);
			res.status(400).json({ error: error.message || "Gagal membuat post" });
		}
	} else if (req.method === "GET") {
		// ... (Logika GET tetap sama)
	} else {
		res.setHeader("Allow", ["POST", "GET"]);
		res.status(405).end(`Metode ${req.method} Tidak Diizinkan`);
	}
}
