import { useState } from "react";
import Modal from "@/components/pages/admin/modal";

export default function AdminDashboard() {
	const [isModalOpen, setModalOpen] = useState(false);

	const handleOpenModal = () => setModalOpen(true);
	const handleCloseModal = () => setModalOpen(false);

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
