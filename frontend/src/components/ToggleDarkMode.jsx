import { useState } from "react"
import '../styles/ToggleDarkMode.css';

export function ToggleDarkMode({ status }) {
    const [isDarkMode, setIsDarkMode] = useState(status);

    const toggleMode = () => {
        setIsDarkMode(!isDarkMode);
    }

    return (
        <div
            className={`toggle-container ${isDarkMode ? "dark" : "light"}`}
            onClick={toggleMode}
        >
            <div className={`toggle-circle ${isDarkMode ? "circle-move" : ""}`}>
                {isDarkMode ? (
                    <span className="moon-icon">🌙</span>
                ) : (
                    <span className="sun-icon">☀️</span>
                )}
            </div>
        </div>
    )
}