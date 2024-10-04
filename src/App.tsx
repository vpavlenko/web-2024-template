import React, { useState, useEffect } from 'react';
import { Container, Grid, List, Typography, Paper, Box, Collapse, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';
import { Todo, updateTodoInFirestore, fetchTodosForCurrentUser, saveTodoToFirestore } from './firebaseUtils';
import CompletionTimeChart from './components/CompletionTimeChart';
import { auth } from './firebaseConfig';
import { signInWithPopup, GoogleAuthProvider, User, onAuthStateChanged } from 'firebase/auth';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showArchived, setShowArchived] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        fetchTodosForCurrentUser().then(setTodos).catch(console.error);
      } else {
        setTodos([]);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    document.title = "atm-todos";
  }, []);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Error signing in:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleToggle = async (id: string) => {
    try {
      const todoToToggle = todos.find(todo => todo.id === id);
      if (todoToToggle) {
        const updatedTodo = { 
          ...todoToToggle, 
          completed: !todoToToggle.completed,
          completedAt: !todoToToggle.completed ? Date.now() : null
        };
        await updateTodoInFirestore(id, { 
          completed: updatedTodo.completed, 
          completedAt: updatedTodo.completedAt 
        });
        setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
      }
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const addTodo = async (newTodo: Omit<Todo, 'id' | 'createdAt' | 'completedAt' | 'userId' | 'archived' | 'archivedAt'>) => {
    try {
      const id = await saveTodoToFirestore(newTodo);
      const todoToAdd: Todo = { ...newTodo, id, createdAt: Date.now(), completedAt: null, userId: user!.uid, archived: false, archivedAt: null };
      setTodos(prevTodos => [...prevTodos, todoToAdd]);
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const handleArchive = async (id: string) => {
    try {
      const todoToArchive = todos.find(todo => todo.id === id);
      if (todoToArchive) {
        const updatedTodo = { 
          ...todoToArchive, 
          archived: true,
          archivedAt: Date.now()
        };
        await updateTodoInFirestore(id, { 
          archived: updatedTodo.archived, 
          archivedAt: updatedTodo.archivedAt 
        });
        setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
      }
    } catch (error) {
      console.error("Error archiving todo:", error);
    }
  };

  const handleUnarchive = async (id: string) => {
    try {
      const todoToUnarchive = todos.find(todo => todo.id === id);
      if (todoToUnarchive) {
        const updatedTodo = { 
          ...todoToUnarchive, 
          archived: false,
          archivedAt: null
        };
        await updateTodoInFirestore(id, { 
          archived: updatedTodo.archived, 
          archivedAt: updatedTodo.archivedAt 
        });
        setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
      }
    } catch (error) {
      console.error("Error unarchiving todo:", error);
    }
  };

  const handleEdit = async (id: string, newTitle: string) => {
    try {
      const todoToEdit = todos.find(todo => todo.id === id);
      if (todoToEdit) {
        const updatedTodo = { 
          ...todoToEdit, 
          title: newTitle
        };
        await updateTodoInFirestore(id, { title: newTitle });
        setTodos(todos.map(todo => todo.id === id ? updatedTodo : todo));
      }
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  const activeTodos = todos.filter(todo => !todo.completed && !todo.archived);
  const completedTodos = todos.filter(todo => todo.completed && !todo.archived);
  const archivedTodos = todos.filter(todo => todo.archived);

  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom>Welcome to atm-todos</Typography>
          <Button variant="contained" onClick={handleSignIn}>Sign in with Google</Button>
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h4" component="h1">atm-todos</Typography>
        <Button variant="outlined" onClick={handleSignOut}>Sign Out</Button>
      </Box>
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
                  onArchive={() => handleArchive(todo.id)}
                  onUnarchive={() => handleUnarchive(todo.id)}
                  onEdit={handleEdit}
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
                        onArchive={() => handleArchive(todo.id)}
                        onUnarchive={() => handleUnarchive(todo.id)}
                      />
                    ))}
                  </List>
                </Collapse>
              </>
            )}
            {archivedTodos.length > 0 && (
              <>
                <Button
                  onClick={() => setShowArchived(!showArchived)}
                  startIcon={showArchived ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  fullWidth
                  sx={{ mt: 2, mb: 1 }}
                >
                  {showArchived ? 'Hide' : 'Show'} archived todos ({archivedTodos.length})
                </Button>
                <Collapse in={showArchived}>
                  <List disablePadding>
                    {archivedTodos.map((todo) => (
                      <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={() => handleToggle(todo.id)}
                        onArchive={() => {}} // Archived todos can't be archived again
                        onUnarchive={() => handleUnarchive(todo.id)}
                      />
                    ))}
                  </List>
                </Collapse>
              </>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <CompletionTimeChart todos={todos.filter(todo => !todo.archived)} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;