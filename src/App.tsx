import { useState, useEffect } from "react";
import useLocalStorageState from "use-local-storage-state";
import styled from "styled-components";
import {
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Checkbox,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

const AppContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
`;

const StyledButton = styled(Button)`
  && {
    margin-top: 1rem;
  }
`;

const StyledListItemText = styled(ListItemText)<{ done: boolean }>`
  && {
    text-decoration: ${(props) => (props.done ? "line-through" : "none")};
  }
`;

function App() {
  const [todos, setTodos] = useLocalStorageState<Todo[]>("todos", {
    defaultValue: [],
  });
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    if (todos.length === 0) {
      const boilerplateTodos = [
        { id: 1, text: "Install Node.js", done: false },
        { id: 2, text: "Install Cursor IDE", done: false },
        { id: 3, text: "Log into Github", done: false },
        { id: 4, text: "Fork a repo", done: false },
        { id: 5, text: "Make changes", done: false },
        { id: 5, text: "Commit", done: false },
        { id: 5, text: "Deploy", done: false },
      ];
      setTodos(boilerplateTodos);
    }
  }, [todos, setTodos]);

  const handleAddTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), text: newTodo.trim(), done: false },
      ]);
      setNewTodo("");
    }
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleToggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const handleEditTodo = (id: number) => {
    setEditingId(id);
  };

  const handleUpdateTodo = (id: number, newText: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      )
    );
    setEditingId(null);
  };

  return (
    <AppContainer>
      <Typography variant="h4" component="h1" gutterBottom>
        Todo List
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        label="New Todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleAddTodo()}
      />
      <StyledButton
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleAddTodo}
      >
        Add Todo
      </StyledButton>
      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id} dense>
            <Checkbox
              edge="start"
              checked={todo.done}
              onChange={() => handleToggleTodo(todo.id)}
            />
            {editingId === todo.id ? (
              <TextField
                fullWidth
                value={todo.text}
                onChange={(e) => handleUpdateTodo(todo.id, e.target.value)}
                onBlur={() => setEditingId(null)}
                onKeyPress={(e) => e.key === "Enter" && setEditingId(null)}
                autoFocus
              />
            ) : (
              <StyledListItemText primary={todo.text} done={todo.done} />
            )}
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="edit"
                onClick={() => handleEditTodo(todo.id)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteTodo(todo.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </AppContainer>
  );
}

export default App;
