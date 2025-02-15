import '../styles/CreateTodo.css';
import { CreateError } from './CreateError.jsx';
import { TodoCreateIcon } from './Icons.jsx';
import { useState } from 'react';
import { useTodos } from '../contexts/TodoContext.jsx';

export function CreateTodo() {
    const [error, setError] = useState("");

    const { addTodo, checkTodoExist } = useTodos();

    const handleCreateTodo = () => {
        const text = document.getElementById("createTodo").value;

        if(text.trim() === "" || text === null) {
            setError("You must enter a valid text.");
            return;
        }

        if(checkTodoExist(text)) {
            setError("The TODO you tried to create already exists.");
            return;
        }

        addTodo(text);

        document.getElementById("createTodo").value = '';
        setError('');
        return;
    }

    return (
        <div className="create-container">
            <h2>Create new task</h2>

            <label htmlFor="createTodo">Task Name</label>
            <input id="createTodo" placeholder="Program a game" maxLength={120} />

            <CreateError error={error} />
            
            <button className="create" onClick={handleCreateTodo}>Create task</button>


            <TodoCreateIcon />
        </div>
    );
}
