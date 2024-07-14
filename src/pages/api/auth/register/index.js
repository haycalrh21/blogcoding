import prisma from "@/db/db";
import bcrypt from "bcryptjs";

export default async function handler(req, res) {
	if (req.method === "POST") {
		const { name, email, password } = req.body;

		try {
			// Memeriksa apakah name, email, dan password diberikan
			if (!name || !email || !password) {
				return res.status(400).json({ message: "Missing required fields" });
			}

			// Menghitung jumlah pengguna
			const userCount = await prisma.user.count();

			// Menetapkan peran berdasarkan jumlah pengguna
			let role = "USER";
			if (userCount < 1) {
				role = "ADMIN";
			}

			// Mengenkripsi password
			const hashedPassword = await bcrypt.hash(password, 10);

			// Membuat pengguna baru
			const user = await prisma.user.create({
				data: {
					name,
					email,
					password: hashedPassword,
					role,
				},
			});

			// Mengembalikan respons sukses
			res.status(201).json({
				message: "User created successfully",
				user: { id: user.id, name: user.name, email: user.email },
			});
		} catch (error) {
			console.error("Registration error:", error);
			res.status(500).json({ message: "Internal Server Error", error });
		}
	} else {
		// Mengembalikan respons jika metode tidak diizinkan
		res.status(405).json({ message: "Method not allowed" });
	}
}
