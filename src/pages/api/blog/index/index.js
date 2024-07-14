import prisma from "@/db/db";

export default async function handler(req, res) {
	if (req.method === "GET") {
		try {
			// Get all blogs
			const blogs = await prisma.blog.findMany({
				include: {
					author: {
						select: {
							id: true,
							name: true,
							email: true,
						},
					},
					sourceCode: true,
				},
				orderBy: {
					createdAt: "desc",
				},
			});

			res.status(200).json(blogs);
		} catch (error) {
			console.error("Error fetching blogs:", error);
			res.status(500).json({ message: "Internal Server Error" });
		}
	} else {
		res.status(405).json({ message: "Method not allowed" });
	}
}
