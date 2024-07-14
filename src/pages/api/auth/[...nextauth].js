import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/db/db";
import bcrypt from "bcryptjs";

const authOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		CredentialsProvider({
			name: "Email",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				const user = await prisma.user.findUnique({
					where: { email: credentials.email },
				});

				if (!user) {
					return null;
				}

				const isPasswordValid = await bcrypt.compare(
					credentials.password,
					user.password
				);

				if (!isPasswordValid) {
					return null;
				}

				// Find or create account
				let account = await prisma.account.findFirst({
					where: {
						userId: user.id,
						provider: "email",
						providerAccountId: user.email,
					},
				});

				if (!account) {
					account = await prisma.account.create({
						data: {
							userId: user.id,
							type: "email",
							provider: "email",
							providerAccountId: user.email,
							access_token: credentials.accessToken || null, // Set access token here
							expires_at: credentials.expiresAt || null, // Set expiration time if needed
						},
					});
				} else {
					// Update account with new token and expiry if needed
					account = await prisma.account.update({
						where: { id: account.id },
						data: {
							access_token: credentials.accessToken || null,
							expires_at: credentials.expiresAt || null,
						},
					});
				}

				return {
					id: user.id,
					email: user.email,
					name: user.name,
					role: user.role,
					accessToken: credentials.accessToken || null, // Include accessToken from Credentials
					expiresAt: credentials.expiresAt || null, // Include expiresAt from Credentials
				};
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token, user }) {
			if (user?.id) {
				token.id = user.id;
			}
			if (user?.role) {
				token.role = user.role;
			}
			if (user?.accessToken) {
				token.accessToken = user.accessToken;
			}
			if (user?.expiresAt) {
				token.expiresAt = user.expiresAt;
			}
			return token;
		},
		async session({ session, token }) {
			if (token?.id) {
				session.user.id = token.id;
			}
			if (token?.role) {
				session.user.role = token.role;
			}
			if (token?.accessToken) {
				session.accessToken = token.accessToken;
			}
			if (token?.expiresAt) {
				session.expiresAt = token.expiresAt;
			}
			return session;
		},
		async signOut({ token }) {
			console.log("signOut callback triggered");
			console.log("Token:", token);

			if (token?.id) {
				try {
					await prisma.account.deleteMany({
						where: {
							userId: token.id,
							provider: "email",
						},
					});
					console.log("Account deleted successfully");
				} catch (error) {
					console.error("Error deleting account:", error);
				}
			} else {
				console.log("No user ID found in token");
			}
		},
	},

	pages: {
		signIn: "/login",
	},
};

export default function auth(req, res) {
	return NextAuth(req, res, authOptions);
}
