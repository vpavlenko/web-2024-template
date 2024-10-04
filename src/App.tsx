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
        fetchTodosForCurrentUser().then(fetchedTodos => {
          console.log('Fetched todos:', fetchedTodos);
          setTodos(fetchedTodos);
        }).catch(console.error);
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
        const newCompletedState = !todoToToggle.completed;
        
        const updateDescendants = (todoId: string, completed: boolean): Todo[] => {
          return todos.map(todo => {
            if (todo.id === todoId || (completed && todo.parentId === todoId)) {
              const updatedTodo = {
                ...todo,
                completed,
                completedAt: completed ? Date.now() : null
              };
              updateTodoInFirestore(todo.id, {
                completed: updatedTodo.completed,
                completedAt: updatedTodo.completedAt
              }).catch(console.error);
              return updatedTodo;
            }
            return todo;
          });
        };

        let updatedTodos = updateDescendants(id, newCompletedState);
        setTodos(updatedTodos);

        await updateTodoInFirestore(id, { 
          completed: newCompletedState, 
          completedAt: newCompletedState ? Date.now() : null 
        });
      }
    } catch (error) {
      console.error("Error toggling todo:", error);
    }
  };

  const addTodo = async (newTodo: Omit<Todo, 'id' | 'createdAt' | 'completedAt' | 'archived'>) => {
    try {
      const id = await saveTodoToFirestore(newTodo);
      const todoToAdd: Todo = { ...newTodo, id, createdAt: Date.now(), completedAt: null, archived: false };
      console.log('Adding todo:', todoToAdd);
      setTodos(prevTodos => {
        const updatedTodos = [...prevTodos, todoToAdd];
        console.log('Updated todos state:', updatedTodos);
        return updatedTodos;
      });
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
          archived: true
        };
        await updateTodoInFirestore(id, { archived: updatedTodo.archived });
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
          archived: false
        };
        await updateTodoInFirestore(id, { archived: updatedTodo.archived });
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

  const handleAddChild = async (parentId: string) => {
    try {
      const newChildTodo: Omit<Todo, 'id' | 'createdAt' | 'completedAt' | 'archived'> = {
        title: 'New child todo',
        completed: false,
        parentId: parentId,
        childIds: [],
      };
      const newChildId = await saveTodoToFirestore(newChildTodo);
      const updatedTodos = todos.map(todo => 
        todo.id === parentId 
          ? { ...todo, childIds: [...(todo.childIds || []), newChildId] } 
          : todo
      );
      setTodos([...updatedTodos, { ...newChildTodo, id: newChildId, createdAt: Date.now(), completedAt: null, archived: false }]);
      await updateTodoInFirestore(parentId, { childIds: [...(todos.find(t => t.id === parentId)?.childIds || []), newChildId] });
    } catch (error) {
      console.error("Error adding child todo:", error);
    }
  };

  const renderTodoItem = (todo: Todo, depth: number = 0) => (
    <React.Fragment key={todo.id}>
      <TodoItem
        todo={todo}
        onToggle={() => handleToggle(todo.id)}
        onArchive={() => handleArchive(todo.id)}
        onUnarchive={() => handleUnarchive(todo.id)}
        onEdit={handleEdit}
        onAddChild={handleAddChild}
        depth={depth}
      />
      {todo.childIds && todo.childIds.length > 0 && todo.childIds.map(childId => {
        const childTodo = todos.find(t => t.id === childId);
        return childTodo ? renderTodoItem(childTodo, depth + 1) : null;
      })}
    </React.Fragment>
  );

  const renderTodoItemWithChildren = (todo: Todo, depth: number = 0) => (
    <React.Fragment key={todo.id}>
      <TodoItem
        todo={todo}
        onToggle={() => handleToggle(todo.id)}
        onArchive={() => handleArchive(todo.id)}
        onUnarchive={() => handleUnarchive(todo.id)}
        onEdit={handleEdit}
        onAddChild={handleAddChild}
        depth={depth}
      />
      {todo.childIds && todo.childIds.length > 0 && todo.childIds.map(childId => {
        const childTodo = todos.find(t => t.id === childId);
        return childTodo ? renderTodoItemWithChildren(childTodo, depth + 1) : null;
      })}
    </React.Fragment>
  );

  const getAllParents = (todoId: string): Todo[] => {
    const parents: Todo[] = [];
    let currentTodo = todos.find(t => t.id === todoId);
    while (currentTodo && currentTodo.parentId) {
      const parent = todos.find(t => t.id === currentTodo.parentId);
      if (parent) {
        parents.push(parent);
        currentTodo = parent;
      } else {
        break;
      }
    }
    return parents;
  };

  const hasIncompleteDescendants = (todoId: string): boolean => {
    const todo = todos.find(t => t.id === todoId);
    if (!todo || !todo.childIds) return false;
    return todo.childIds.some(childId => {
      const child = todos.find(t => t.id === childId);
      return child && (!child.completed || hasIncompleteDescendants(childId));
    });
  };

  const filterTodos = (todos: Todo[], completed: boolean, archived: boolean, parentId: string | null = null) => {
    let filteredTodos = todos.filter(todo => 
      todo.completed === completed && 
      todo.archived === archived &&
      (parentId === null ? !todo.parentId : todo.parentId === parentId)
    );

    if (completed) {
      // Add parents of completed todos
      const parentsOfCompleted = filteredTodos.flatMap(todo => getAllParents(todo.id));
      filteredTodos = [...new Set([...filteredTodos, ...parentsOfCompleted])];

      // Add incomplete children with incomplete descendants
      const incompleteChildren = todos.filter(todo => 
        !todo.completed && 
        !todo.archived && 
        todo.parentId && 
        filteredTodos.some(ft => ft.id === todo.parentId) &&
        hasIncompleteDescendants(todo.id)
      );
      filteredTodos = [...filteredTodos, ...incompleteChildren];
    }

    return filteredTodos;
  };

  const activeTodos = filterTodos(todos, false, false, null);
  const completedTodos = filterTodos(todos, true, false, null);
  const archivedTodos = todos.filter(todo => todo.archived);

  console.log('Render - All todos:', todos);
  console.log('Render - Active todos:', activeTodos);
  console.log('Render - Completed todos:', completedTodos);
  console.log('Render - Archived todos:', archivedTodos);

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
              {activeTodos.map((todo) => renderTodoItem(todo))}
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
                    {completedTodos.map((todo) => renderTodoItemWithChildren(todo, getAllParents(todo.id).length))}
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
                    {archivedTodos.map((todo) => renderTodoItem(todo))}
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