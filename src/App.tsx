import React, { useState, useEffect } from 'react';
import { Container, Grid, List, Typography, Paper, Divider } from '@mui/material';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import { Todo, updateTodoInFirestore } from './firebaseUtils';
import CompletionTimeChart from './components/CompletionTimeChart';

const fetchTodos = async () => {
  const todosCollection = collection(db, 'todos');
  const todosSnapshot = await getDocs(todosCollection);
  return todosSnapshot.docs.map(doc => {
    const data = doc.data();
    let completedAt = null;
    if (data.completedAt) {
      if (typeof data.completedAt === 'object' && 'toDate' in data.completedAt) {
        // Firestore Timestamp object
        completedAt = data.completedAt.toDate().getTime();
      } else if (typeof data.completedAt === 'number') {
        // Already a timestamp
        completedAt = data.completedAt;
      } else if (typeof data.completedAt === 'string') {
        // ISO date string
        completedAt = new Date(data.completedAt).getTime();
      }
    }
    return {
      ...data,
      id: doc.id,
      completedAt
    };
  });
};

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodos().then(setTodos).catch(console.error);
  }, []);

  const handleToggle = async (id: string) => {
    const todoToToggle = todos.find(todo => todo.id === id);
    if (todoToToggle) {
      const updatedTodo = { 
        ...todoToToggle, 
        completed: !todoToToggle.completed,
        completedAt: !todoToToggle.completed ? Date.now() : undefined
      };
      await updateTodoInFirestore(id, { 
        completed: updatedTodo.completed, 
        completedAt: updatedTodo.completedAt 
      });
      setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
    }
  };

  const addTodo = (newTodo: Omit<Todo, 'id' | 'createdAt'>) => {
    setTodos([...todos, { ...newTodo, id: Date.now().toString(), createdAt: Date.now() }]);
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Todo List
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
            <TodoForm onAddTodo={addTodo} />
          </Paper>
          <Divider style={{ margin: '20px 0' }} />
          <List>
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={() => handleToggle(todo.id)}
              />
            ))}
          </List>
        </Grid>
        <Grid item xs={12} md={6}>
          <CompletionTimeChart todos={todos} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
