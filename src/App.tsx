import React, { useState, useEffect } from 'react';
import { Container, List, Typography, Paper, Divider } from '@mui/material';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';

interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const querySnapshot = await getDocs(collection(db, 'todos'));
      const fetchedTodos = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Todo));
      setTodos(fetchedTodos);
    };

    fetchTodos();
  }, []);

  const handleToggle = async (id: string) => {
    const todoToToggle = todos.find(todo => todo.id === id);
    if (todoToToggle) {
      const updatedTodo = { ...todoToToggle, completed: !todoToToggle.completed };
      await updateDoc(doc(db, 'todos', id), { completed: updatedTodo.completed });
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
    }
  };

  const addTodo = (newTodo: Omit<Todo, 'id'>) => {
    setTodos([...todos, { ...newTodo, id: Date.now().toString() }]);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Todo List
      </Typography>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <TodoForm onAddTodo={addTodo} />
      </Paper>
      <Divider style={{ margin: '20px 0' }} />
      <List>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            title={todo.title}
            description={todo.description}
            completed={todo.completed}
            onToggle={() => handleToggle(todo.id)}
          />
        ))}
      </List>
    </Container>
  );
};

export default App;
