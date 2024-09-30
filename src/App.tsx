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
  const [editText, setEditText] = useState(""); // Add this line

  useEffect(() => {
    if (todos.length === 0) {
      const boilerplateTodos = [
        { id: 1, text: "Install Node.js", done: false },
        { id: 2, text: "Install Cursor IDE", done: false },
        { id: 3, text: "Log into Github", done: false },
        { id: 4, text: "Fork a repo", done: false },
        { id: 5, text: "Make changes", done: false },
        { id: 6, text: "Commit", done: false },
        { id: 7, text: "Deploy", done: false },
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
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setEditText(todoToEdit.text);
    }
  };

  const handleUpdateTodo = (id: number) => {
    if (editText.trim() !== "") {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, text: editText.trim() } : todo
        )
      );
    }
    setEditingId(null);
    setEditText("");
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
        autoFocus // Add this line to enable autofocus
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
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onBlur={() => handleUpdateTodo(todo.id)}
                onKeyPress={(e) =>
                  e.key === "Enter" && handleUpdateTodo(todo.id)
                }
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
