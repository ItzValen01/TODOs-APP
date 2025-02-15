import '../styles/SettingsMenu.css';
import { ToggleDarkMode } from './ToggleDarkMode';

export function SettingsMenu({ openSettings }){
    return (
        <div className={`settings-container ${openSettings ? "settings-on" : ""}`}>
            <div className="setting-cont">
                <h1>Settings</h1>

                <div className="options-sec">
                    <div className="option">
                        <p>Dark Mode: </p>
                        <ToggleDarkMode status={false} />
                    </div>
                </div>
            </div>
        </div>
    )
}