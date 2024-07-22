// src/pages/_middleware.ts
import withAuth from "@/middlewares/withAuth";
import { NextResponse } from "next/server";

export default withAuth(
	function middleware(req) {
		console.log("Request Path:", req.nextUrl.pathname); // Tambahkan logging ini
		return NextResponse.next();
	},
	["dashboard"]
);

export const config = {
	matcher: ["/dashboard/:path*", "/login", "/register"],
};
