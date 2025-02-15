import '../styles/TodoSearch.css';
import { SearchIcon } from './Icons.jsx';

export function TodoSearch({ setSearch }) {
    return (
        <div className="search-cont">
            <div className="search-body">
                <input id='searchInput' className="search" placeholder="Search..."></input>
                <SearchIcon setSearch={setSearch} />
            </div>
        </div>
    );
}
