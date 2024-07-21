import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const [darkMode, setDarkMode] = useState(false);

	useEffect(() => {
		const savedMode = localStorage.getItem("dark-mode") === "true";
		setDarkMode(savedMode);
		document.documentElement.classList.toggle("dark", savedMode);
	}, []);

	const toggleDarkMode = () => {
		const newMode = !darkMode;
		setDarkMode(newMode);
		document.documentElement.classList.toggle("dark", newMode);
		localStorage.setItem("dark-mode", newMode);
	};

	return (
		<ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
			{children}
		</ThemeContext.Provider>
	);
};
