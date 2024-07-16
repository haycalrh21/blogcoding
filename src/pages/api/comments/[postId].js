import prisma from "@/db/db";

export default async function handler(req, res) {
	const { postId } = req.query;

	if (req.method === "GET") {
		try {
			const comments = await prisma.comment.findMany({
				where: { postId },
				include: {
					author: {
						select: { name: true, image: true },
					},
				},
				orderBy: { createdAt: "desc" },
			});

			res.status(200).json(comments);
		} catch (error) {
			console.error("Error fetching comments:", error);
			res.status(500).json({ message: "Error fetching comments" });
		}
	} else if (req.method === "POST") {
		const { content, authorId } = req.body;

		if (!content || !authorId) {
			return res.status(400).json({ message: "Missing required fields" });
		}

		try {
			const newComment = await prisma.comment.create({
				data: {
					content,
					authorId,
					postId,
				},
				include: {
					author: {
						select: { name: true, image: true },
					},
				},
			});

			res.status(201).json(newComment);
		} catch (error) {
			console.error("Error creating comment:", error);
			res.status(500).json({ message: "Error creating comment" });
		}
	} else {
		res.setHeader("Allow", ["GET", "POST"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
