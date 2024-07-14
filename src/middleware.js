import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
	function middleware(req) {
		const token = req.nextauth.token;
		const isLoginPage = req.nextUrl.pathname.startsWith("/login");
		const isAdminPage = req.nextUrl.pathname.startsWith("/admin");

		// Jika pengguna sudah login dan mencoba mengakses halaman login
		if (token && isLoginPage) {
			// Redirect ke halaman utama
			return NextResponse.redirect(new URL("/", req.url));
		}

		// Jika pengguna bukan admin dan mencoba mengakses halaman admin
		if (isAdminPage && token?.role !== "ADMIN") {
			// Redirect ke halaman utama
			return NextResponse.redirect(new URL("/", req.url));
		}

		// Untuk halaman lain, biarkan request berlanjut
		return NextResponse.next();
	},
	{
		callbacks: {
			authorized: ({ token, req }) => {
				// Izinkan akses ke halaman login tanpa token
				if (req.nextUrl.pathname.startsWith("/login")) {
					return true;
				}
				// Untuk halaman lain, harus memiliki token
				return !!token;
			},
		},
	}
);

export const config = {
	matcher: [
		"/dashboard/:path*",
		"/admin/:path*",
		"/login", // Tetap sertakan '/login' di sini
	],
};
