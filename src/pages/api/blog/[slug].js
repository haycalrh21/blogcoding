import prisma from "@/db/db";

export default async function handler(req, res) {
	if (req.method === "GET") {
		const { slug } = req.query;
		// console.log("Requested slug:", slug);

		try {
			// console.log("Prisma model:", prisma.blog);
			// console.log("Prisma query:", {
			// 	where: { slug },
			// 	include: {
			// 		author: {
			// 			select: { name: true, image: true },
			// 		},
			// 		sourceCode: true,
			// 	},
			// });

			const blog = await prisma.blog.findFirst({
				where: { slug },
				include: {
					author: {
						select: { name: true, image: true },
					},
					sourceCode: true,
				},
			});

			// console.log("Query result:", blog);

			if (!blog) {
				return res.status(404).json({ message: "Blog not found" });
			}

			res.status(200).json(blog);
		} catch (error) {
			console.error("Detailed error:", error);
			res.status(500).json({
				message: "Internal Server Error",
				error: error.message,
				stack: error.stack,
			});
		}
	} else {
		res.setHeader("Allow", ["GET"]);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
