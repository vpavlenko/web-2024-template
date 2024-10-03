import React, { useState, useEffect } from 'react';
import { Container, Grid, List, Typography, Paper, Divider, Box, Collapse, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
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
    let createdAt = data.createdAt;

    if (data.completedAt) {
      if (typeof data.completedAt === 'object' && 'toDate' in data.completedAt) {
        completedAt = data.completedAt.toDate().getTime();
      } else if (typeof data.completedAt === 'number') {
        completedAt = data.completedAt;
      } else if (typeof data.completedAt === 'string') {
        completedAt = new Date(data.completedAt).getTime();
      }
    }

    if (typeof createdAt === 'object' && 'toDate' in createdAt) {
      createdAt = createdAt.toDate().getTime();
    } else if (typeof createdAt === 'string') {
      createdAt = new Date(createdAt).getTime();
    }

    return {
      ...data,
      id: doc.id,
      completedAt,
      createdAt: createdAt || Date.now() // Fallback to current time if createdAt is invalid
    };
  });
};

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showCompleted, setShowCompleted] = useState(false);

  useEffect(() => {
    fetchTodos().then(setTodos).catch(console.error);
  }, []);

  const handleToggle = async (id: string) => {
    try {
      const todoToToggle = todos.find(todo => todo.id === id);
      if (todoToToggle) {
        const updatedTodo = { 
          ...todoToToggle, 
          completed: !todoToToggle.completed,
          completedAt: !todoToToggle.completed ? Date.now() : null // Change this line
        };
        await updateTodoInFirestore(id, { 
          completed: updatedTodo.completed, 
          completedAt: updatedTodo.completedAt 
        });
        setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
      }
    } catch (error) {
      console.error("Error toggling todo:", error);
      // Optionally, show an error message to the user
    }
  };

  const addTodo = async (newTodo: Omit<Todo, 'id' | 'createdAt' | 'completedAt'>) => {
    const createdAt = Date.now();
    const todoToAdd = { ...newTodo, id: createdAt.toString(), createdAt, completedAt: null };
    setTodos([...todos, todoToAdd]);
    // Add the todo to Firestore (you'll need to implement this function)
    await addTodoToFirestore(todoToAdd);
  };

  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 2 }}>
        Todo List
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <TodoForm onAddTodo={addTodo} />
          </Paper>
          <Box sx={{ maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}>
            <List disablePadding>
              {activeTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={() => handleToggle(todo.id)}
                  onDelete={() => {/* Implement delete function */}}
                />
              ))}
            </List>
            {completedTodos.length > 0 && (
              <>
                <Button
                  onClick={() => setShowCompleted(!showCompleted)}
                  startIcon={showCompleted ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  fullWidth
                  sx={{ mt: 2, mb: 1 }}
                >
                  {showCompleted ? 'Hide' : 'Show'} completed todos ({completedTodos.length})
                </Button>
                <Collapse in={showCompleted}>
                  <List disablePadding>
                    {completedTodos.map((todo) => (
                      <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={() => handleToggle(todo.id)}
                        onDelete={() => {/* Implement delete function */}}
                      />
                    ))}
                  </List>
                </Collapse>
              </>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <CompletionTimeChart todos={todos} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
