import prisma from "@/db/db";
export default async function handler(req, res) {
	if (req.method === "GET") {
		try {
			const posts = await prisma.post.findMany({
				include: {
					author: true, // Include author details if needed
					comments: true, // Include comments if needed
				},
			});
			res.status(200).json(posts);
		} catch (error) {
			console.error("Error fetching posts:", error);
			res.status(500).json({ error: "Error fetching posts" });
		}
	} else {
		res.setHeader("Allow", ["GET"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
