import { getToken } from "next-auth/jwt";
import {
	NextFetchEvent,
	NextMiddleware,
	NextRequest,
	NextResponse,
} from "next/server";

const onlyAdmin = ["admin"];
const authPage = ["register", "login"];

export default function withAuth(
	middleware: NextMiddleware,
	requireAuth: string[] = []
) {
	return async (req: NextRequest, next: NextFetchEvent) => {
		const pathname = req.nextUrl.pathname.split("/")[1];

		const token = await getToken({
			req,
			secret: process.env.NEXTAUTH_SECRET,
		});

		// console.log("Token:", token); // Logging untuk debugging
		// console.log("Current path:", pathname); // Logging untuk debugging

		// Jika pengguna sudah login dan mencoba mengakses halaman login
		if (token && authPage.includes(pathname)) {
			// console.log("Redirecting logged-in user from login page");
			return NextResponse.redirect(new URL("/", req.url));
		}

		// Jika tidak ada token dan mencoba mengakses halaman yang memerlukan autentikasi
		if (!token && requireAuth.includes(pathname)) {
			// console.log("Redirecting unauthenticated user to login");
			const url = new URL("/login", req.url);
			url.searchParams.set("callbackUrl", encodeURI(req.url));
			return NextResponse.redirect(url);
		}

		// Jika pengguna bukan admin dan mencoba mengakses halaman admin
		if (token && onlyAdmin.includes(pathname) && token.role !== "ADMIN") {
			// console.log("Redirecting non-admin user from admin page");
			return NextResponse.redirect(new URL("/", req.url));
		}

		console.log("Allowing request to continue");
		return middleware(req, next);
	};
}
