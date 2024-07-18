import prisma from "@/db/db";

export default async function handler(req, res) {
	try {
		const posts = await prisma.post.findMany({
			include: {
				author: true,
			},
		});
		res.status(200).json(posts);
	} catch (error) {
		console.error("Error fetching posts:", error);
		res.status(500).json({ error: "Failed to fetch posts" });
	}
}
