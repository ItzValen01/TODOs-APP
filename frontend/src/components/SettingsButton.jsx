import { SettingsIcon } from "./Icons";
import '../styles/SettingsButton.css';

export function SettingsButton({ setOpenSettings, openSettings }){

    const handleClick = () => {
        setOpenSettings(!openSettings);
    }

    return (
        <div className="setting-btn" onClick={handleClick}>
            <SettingsIcon setOpenSettings={setOpenSettings} openSettings={openSettings} />
        </div>
    )
}