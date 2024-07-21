// src/components/darkmode.jsx
import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "@/context/themecontext"; // Pastikan path ini sesuai

const DarkModeToggle = () => {
	const { darkMode, toggleDarkMode } = useContext(ThemeContext);

	return (
		<motion.div
			className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer ${
				darkMode ? "bg-gray-700" : "bg-gray-300"
			}`}
			onClick={toggleDarkMode}
		>
			<motion.div
				className={`bg-white w-5 h-5 rounded-full shadow-md`}
				animate={{ x: darkMode ? 28 : 0 }}
				transition={{ type: "spring", stiffness: 300, damping: 20 }}
			/>
		</motion.div>
	);
};

export default DarkModeToggle;
