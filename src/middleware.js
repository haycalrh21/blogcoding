// src/pages/_middleware.ts
import withAuth from "@/middlewares/withAuth";
import { NextResponse } from "next/server";

export default withAuth(
	function middleware(req) {
		console.log("Request Path:", req.nextUrl.pathname); // Tambahkan logging ini
		return NextResponse.next();
	},
	["dashboard", "admin"]
);

export const config = {
	matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register"],
};
