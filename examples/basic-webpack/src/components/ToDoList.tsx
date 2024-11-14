
import React, { useState, useEffect } from 'react';
import { useTodoStore } from '../store/useTodoStore';

export const TodoList: React.FC = () => {
    const [newTodoText, setNewTodoText] = useState('');
    const { 
        todos,
        loading,
        loadTodos,
        addTodo,
        toggleTodo,
        deleteTodo,
        getRemainingCount
    } = useTodoStore();

    useEffect(() => {
        loadTodos();
    }, [loadTodos]);

    console.log('react render ⚛️')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTodoText.trim()) {
            addTodo(newTodoText);
            setNewTodoText('');
        }
    };

    return (
        <article className="pure-g">
        <div className="pure-u-1">
            <header>
                <p className="todo-count">
                    Remaining tasks: {getRemainingCount()}
                </p>
            </header>

            <form onSubmit={handleSubmit} className="pure-form">
                <div className="todo-input-group">
                    <input
                        type="text"
                        value={newTodoText}
                        onChange={(e) => setNewTodoText(e.target.value)}
                        placeholder="What needs to be done?"
                        className="pure-input-1"
                        required
                    />
                    <button 
                        type="submit"
                        className="pure-button pure-button-primary"
                    >
                        Add Todo
                    </button>
                </div>
            </form>

            {loading && (
                <p className="todo-loading">Loading...</p>
            )}

            <ul className="todo-list">
                {todos.map(item => (
                    <li key={item.id} className="todo-item">
                        <button
                            onClick={() => deleteTodo(item.id)}
                            className="todo-delete"
                            aria-label="Delete todo"
                        >
                            🗑️
                        </button>
                        <label className="todo-label">
                            <input
                                type="checkbox"
                                checked={item.completed}
                                onChange={() => toggleTodo(item.id)}
                                className="todo-checkbox"
                            />
                            <span className={item.completed ? 'todo-text completed' : 'todo-text'}>
                                {item.text}
                            </span>
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    </article>
    );
};