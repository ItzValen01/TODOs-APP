import { HiddenIcon, ShowIcon } from "./Icons";
import '../styles/HiddenTodos.css';

export function HiddenTodos({ hidden, setHidden }) {
    return (
        <div className="fil-box"> 
            <div className="filter-container" onClick={() => setHidden(!hidden)}>
                {
                    (hidden === false) ? <HiddenIcon /> : <ShowIcon />
                }
                <p className="filter-text">
                    {
                        hidden ? 'Show' : 'Hide'
                    } completed tasks
                </p>
            </div>
        </div>
    )
}