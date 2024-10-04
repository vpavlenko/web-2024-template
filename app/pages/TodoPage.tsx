import React, { useState, useEffect } from 'react';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import DebugInfo from '../components/DebugInfo';
import { Box, Typography } from '@mui/material';

// Define TodoFormProps
interface TodoFormProps {
  onAddTodo: (title: string, description: string) => void;
}

const TodoPage: React.FC = () => {
  const [todos, setTodos] = useState<Array<{ id: string; title: string; description: string }>>([]);

  useEffect(() => {
    // Simulating fetching todos from an API
    const fetchedTodos = [
      { id: '1', title: 'Test Todo', description: 'Line 1\nLine 2\nLine 3' },
    ];
    setTodos(fetchedTodos);
  }, []);

  const handleAddTodo = (title: string, description: string) => {
    const newTodo = {
      id: Date.now().toString(),
      title,
      description,
    };
    setTodos([...todos, newTodo]);
  };

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleEditTodo = (id: string) => {
    // Implement edit functionality
  };

  return (
    <Box>
      <Typography variant="h4">Todo List</Typography>
      <TodoForm onAddTodo={handleAddTodo} />
      <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} onEditTodo={handleEditTodo} />
      <DebugInfo data={todos} title="TodoPage Debug Info" />
      <Box mt={4}>
        <Typography variant="h6">Direct Todo Rendering:</Typography>
        {todos.map(todo => (
          <Box key={todo.id} mt={2}>
            <Typography variant="subtitle1">{todo.title}</Typography>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', backgroundColor: '#f0f0f0', padding: '8px' }}>
              {todo.description}
            </pre>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default TodoPage;