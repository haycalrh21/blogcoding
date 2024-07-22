import { useState, useEffect } from "react";
import Modal from "@/components/pages/admin/modal";
import { useRouter } from "next/router";
import NotFound from "../404";
import { useSession } from "next-auth/react";

export default function AdminDashboard() {
	const router = useRouter();
	const { data: session, status } = useSession();
	const [isModalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		// Menangani status pengambilan sesi
		if (status === "loading") return;

		if (status === "unauthenticated") {
			router.push("/login");
		} else if (session?.user?.role !== "ADMIN") {
			router.push("/404");
		}
	}, [session, status, router]);

	const handleOpenModal = () => setModalOpen(true);
	const handleCloseModal = () => setModalOpen(false);

	// Tampilkan loading state saat sesi sedang diambil
	if (status === "loading") {
		return <div>Loading...</div>;
	}

	// Render halaman jika pengguna adalah admin
	if (session?.user?.role === "ADMIN") {
		return (
			<div className='p-4 min-h-screen'>
				<button
					onClick={handleOpenModal}
					className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
				>
					Add Posting
				</button>

				<Modal isOpen={isModalOpen} onClose={handleCloseModal} />
			</div>
		);
	}

	// Jika tidak ada kondisi yang terpenuhi, render NotFound
	return <NotFound />;
}
