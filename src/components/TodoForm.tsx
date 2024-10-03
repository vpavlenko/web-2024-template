import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { saveTodoToFirestore, Todo } from '../firebaseUtils';

interface TodoFormProps {
  onAddTodo: (todo: Omit<Todo, 'id' | 'createdAt'>) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) return;

    try {
      const newTodo = { title, description: '', completed: false };
      const docId = await saveTodoToFirestore(newTodo);
      onAddTodo({ ...newTodo, id: docId });
      setTitle('');
    } catch (error) {
      console.error("Error saving todo:", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} display="flex" alignItems="center">
      <TextField
        fullWidth
        variant="outlined"
        size="small"
        label="New Todo"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ marginRight: '10px' }}
      />
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </Box>
  );
};

export default TodoForm;