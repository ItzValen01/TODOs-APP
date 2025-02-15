import { useMemo } from "react";

const useFilteredTodos = (todos, search, hidden) => {
    return useMemo(() => {
        let filteredTodos = todos;

        // Filtrar por búsqueda
        if(search !== ''){
            filteredTodos = filteredTodos.filter(todo => todo.text.toLowerCase().includes(search.toLowerCase()));
        }

        // Filtrar los TODOs que ya esten completados
        if(hidden){
            filteredTodos = filteredTodos.filter(todo => !todo.completed);
        }

        return filteredTodos;
    }, [todos, search, hidden]);
};

export default useFilteredTodos;