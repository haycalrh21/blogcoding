import { motion } from "framer-motion";
import CreateBlogPage from "./blogpostingan/blogcreate";

const Modal = ({ isOpen, onClose }) => {
	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50'>
			<motion.div
				className='bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative'
				initial={{ opacity: 0, scale: 0.9 }}
				animate={{ opacity: 1, scale: 1 }}
				exit={{ opacity: 0, scale: 0.9 }}
			>
				<button
					onClick={onClose}
					className='absolute top-4 right-4 text-gray-500 hover:text-gray-800'
				>
					&times;
				</button>
				<CreateBlogPage onSuccess={onClose} />
			</motion.div>
		</div>
	);
};

export default Modal;
