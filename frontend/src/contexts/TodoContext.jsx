import { createContext, useContext, useEffect, useState } from 'react';
import api from '../api';

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await api.get('/todos');

                setTodos(response.data);
            } catch (error) {
                console.error('Error al cargar los TODOs:', error);
            }
        };

        fetchTodos();
    }, []);

    const addTodo = async (text) => {
        try {
          const response = await api.post('/todos', { text });
          const newTodo = response.data;
          setTodos((prevTodos) => [...prevTodos, newTodo]);
        } catch (error) {
          console.error('Error al crear el TODO:', error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await api.delete(`/todos/${id}`);
            setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
        } catch (error) {
            console.error('Error al eliminar el TODO:', error);
        }
    };

    const toggleTodo = async (id) => {
        try {
            await api.post(`/todos/${id}`);
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === id ? { ...todo, completed: !todo.completed } : todo
                )
            );
        } catch (error) {
            console.error('Error al alternar el estado del TODO:', error);
        }
    };

    const getCompletedTodosCount = () => {
        if (!Array.isArray(todos)) {
            console.error('El estado "todos" no es un array');
            return 0;
        }
        return todos.filter((todo) => todo.completed).length;
    };

    const checkTodoExist = (text) => {
        return todos.some(todo => todo.text === text);
    }

    return (
        <TodoContext.Provider value={{ todos, addTodo, deleteTodo, toggleTodo, getCompletedTodosCount, checkTodoExist }}>
            {children}
        </TodoContext.Provider>
    );
};

export const useTodos = () => useContext(TodoContext);