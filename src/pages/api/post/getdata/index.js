import prisma from "@/db/db";

export default async function handler(req, res) {
	try {
		const { offset = 0, limit = 12 } = req.query;

		// Convert offset and limit to integers
		const parsedOffset = parseInt(offset, 10);
		const parsedLimit = parseInt(limit, 10);

		if (isNaN(parsedOffset) || isNaN(parsedLimit)) {
			return res.status(400).json({ error: "Invalid offset or limit" });
		}

		// Fetch total count of posts
		const totalPosts = await prisma.post.count();

		// Fetch posts with pagination
		const posts = await prisma.post.findMany({
			include: {
				author: true,
			},
			skip: parsedOffset,
			take: parsedLimit,
		});

		// Send response with posts and total count
		res.status(200).json({ posts, total: totalPosts });
	} catch (error) {
		console.error("Error fetching posts:", error);
		res.status(500).json({ error: "Failed to fetch posts" });
	}
}
