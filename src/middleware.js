import withAuth from "./middlewares/withAuth";
import { NextResponse } from "next/server";

export default withAuth(
	function middleware(req) {
		// Middleware ini sekarang lebih sederhana karena sebagian besar logika ada di withAuth
		return NextResponse.next();
	},
	["dashboard", "admin"] // Daftar path yang memerlukan autentikasi
);

export const config = {
	matcher: ["/dashboard/:path*", "/admin/:path*", "/login"],
};
