import { DeleteIcon } from "./Icons";
import '../styles/DeleteButton.css';
import { useTodos } from "../contexts/TodoContext";
import PropTypes from 'prop-types';

export function DeleteButton({ id }) {
    const { deleteTodo } = useTodos();

    const handleDeleteTodo = () => {
        return deleteTodo(id);
    }

    return (
        <div className="delete" onClick={handleDeleteTodo}>
            <DeleteIcon />
        </div>
    )
}

DeleteButton.propTypes = {
    id: PropTypes.number.isRequired,
}