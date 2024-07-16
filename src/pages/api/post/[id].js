import prisma from "@/db/db";

export default async function handler(req, res) {
	const { id } = req.query;

	if (req.method === "GET") {
		try {
			const post = await prisma.post.findFirst({
				where: { id },
				include: {
					author: {
						select: { name: true, image: true },
					},
				},
			});

			if (!post) {
				return res.status(404).json({ message: "Post not found" });
			}

			res.status(200).json(post);
		} catch (error) {
			console.error("Detailed error:", error);
			res.status(500).json({
				message: "Internal Server Error",
				error: error.message,
				stack: error.stack,
			});
		}
	} else if (req.method === "DELETE") {
		try {
			// Hapus semua komentar terkait terlebih dahulu
			await prisma.comment.deleteMany({
				where: { postId: id },
			});

			// Hapus postingan
			const deletedPost = await prisma.post.delete({
				where: { id },
			});

			res
				.status(200)
				.json({ message: "Post deleted successfully", deletedPost });
		} catch (error) {
			console.error("Detailed error:", error);
			res.status(500).json({
				message: "Internal Server Error",
				error: error.message,
				stack: error.stack,
			});
		}
	} else {
		res.setHeader("Allow", ["GET", "DELETE"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
