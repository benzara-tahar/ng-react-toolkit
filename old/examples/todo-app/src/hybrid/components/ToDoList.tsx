
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
        <article className="p-4">
            <header>
                <p className="text-lg font-medium">
                    Remaining tasks: {getRemainingCount()}
                </p>
            </header>

            <form onSubmit={handleSubmit} className="my-4">
                <div className="grid gap-4 md:grid-cols-[1fr,auto]">
                    <input
                        type="text"
                        value={newTodoText}
                        onChange={(e) => setNewTodoText(e.target.value)}
                        placeholder="What needs to be done?"
                        className="p-2 border rounded"
                        required
                    />
                    <button 
                        type="submit"
                        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
                    >
                        Add Todo
                    </button>
                </div>
            </form>

            {loading && (
                <p className="text-gray-500">Loading...</p>
            )}

            <ul className="space-y-3">
                {todos.map(item => (
                    <li 
                        key={item.id} 
                        className="flex items-center gap-4 p-3 bg-white border rounded shadow-sm"
                    >
                        <button
                            onClick={() => deleteTodo(item.id)}
                            className="p-1 text-red-500 hover:text-red-600"
                            aria-label="Delete todo"
                        >
                            🗑️
                        </button>
                        <label className="flex items-center gap-3 flex-1">
                            <input
                                type="checkbox"
                                checked={item.completed}
                                onChange={() => toggleTodo(item.id)}
                                className="w-5 h-5"
                            />
                            <span className={`flex-1 ${item.completed ? 'line-through text-gray-500' : ''}`}>
                                {item.text}
                            </span>
                        </label>
                    </li>
                ))}
            </ul>
        </article>
    );
};