import '../styles/App.css';
import { TodoCounter } from '../components/TodoCounter';
import { TodoSearch } from '../components/TodoSearch';
import { TodoList } from '../components/TodoList';
import { TodoItem } from '../components/TodoItem';
import { CreateTodo } from '../components/CreateTodo';
import { useState } from 'react';

import { useTodos } from '../contexts/TodoContext';

import { HiddenTodos } from '../components/HiddenTodos';
import useFilteredTodos from '../hooks/useFilteredTodos';
import { SettingsMenu } from '../components/SettingsMenu';

// Auth imports
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import Login from './Login';
import Register from './Register';

import { TodoProvider } from '../contexts/TodoContext';

function PreLoad() {
  const { isAuthenticated } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (!isAuthenticated) {
    return (
      <div>
        {!showRegister ? (
          <Login setShowRegister={setShowRegister} />
        ) : (
          <Register toggleRegister={() => setShowRegister(true)} />
        )}
        <button onClick={() => setShowRegister(!showRegister)}>
          {showRegister ? 'Ya tengo una cuenta' : 'Registrarme'}
        </button>
      </div>
    );
  }

  return (
    <TodoProvider>
      <AppContent />
    </TodoProvider>
  );
}

function AppContent() {
  const [hidden, setHidden] = useState(false);
  const [search, setSearch] = useState('');
  const [config, setConfig] = useState();
  const [openSettings, setOpenSettings] = useState(true);

  const { todos, getCompletedTodosCount } = useTodos();

  const filteredTodos = useFilteredTodos(todos, search, hidden);

  return (
    <div className="container">
      <SettingsMenu config={config} setConfig={setConfig} openSettings={openSettings} />
      <div className="create-sec">
        <CreateTodo />
      </div>
      <div className="app-cont">
        <TodoCounter completed={getCompletedTodosCount()} total={todos.length} setOpenSettings={setOpenSettings} openSettings={openSettings} />
        <TodoSearch setSearch={setSearch} />
        <TodoList todos={todos}>
          {filteredTodos.map(todo => (
            <TodoItem key={todo.id} text={todo.text} completed={todo.completed} id={todo.id} />
          ))}
        </TodoList>
        <HiddenTodos hidden={hidden} setHidden={setHidden} />
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <PreLoad />
    </AuthProvider>
  );
}

export default App;
