import '../styles/TodoItem.css';
import { DeleteButton } from './DeleteButton';
import { TodoStatus } from './TodoStatus';
import PropTypes from 'prop-types';

export function TodoItem({ text, completed, id }) {

    const status = completed ? 'content-activated' : '';
    const actived = completed ? ' active' : '';

    return (
        <li className={`item` + actived}>
            <TodoStatus status={completed} text={text} id={id} />

            <div className="content">
                <p className={status}>{text}</p>
            </div>

            <DeleteButton text={text} id={id} />
            {/*<span className="delete">X</span>*/}
        </li>
    );
}

TodoItem.propTypes = {
    text: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
};