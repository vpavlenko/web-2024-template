import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { Todo } from '../firebaseUtils';

interface TodoFormProps {
  onAddTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'completedAt' | 'userId' | 'archived' | 'archivedAt'>) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) return;

    const newTodo = { title, completed: false };
    onAddTodo(newTodo);
    setTitle('');
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" flexDirection="column">
      <TextField
        fullWidth
        multiline
        rows={3}
        variant="outlined"
        size="small"
        label="New Todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </Box>
  );
};

export default TodoForm;