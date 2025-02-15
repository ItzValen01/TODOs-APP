import '../styles/TodoList.css';
import PropTypes from 'prop-types';

export function TodoList({ children, todos }) {

    const status = (todos.length === 0) ? 'no-todos-cont' : '';

    return (
        <ul className={`todo-list ` + status}>
            {
                (todos.length > 0) ? children : <p className='no-todos'>No TODOs</p>
            }
        </ul>
    );
}

TodoList.propTypes = {
    children: PropTypes.node.isRequired,
};