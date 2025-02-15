import '../styles/TodoStatus.css';
import { CheckIcon } from './Icons';
import PropTypes from 'prop-types';
import { useTodos } from '../contexts/TodoContext';

export function TodoStatus({ status, id }) {
    const { toggleTodo } = useTodos();

    const estado = status ? "todo-status-activated" : "todo-status";

    const handleUpdateStatus = () => {
        return toggleTodo(id);
    }

    return (
        <div className="status-cont" onClick={handleUpdateStatus}>
            <span className={estado}
            >
                <CheckIcon />
            </span>
        </div>
    );
}

TodoStatus.propTypes = {
    status: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
};