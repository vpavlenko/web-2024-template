import React from 'react';
import { ListItem, ListItemText, Checkbox, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface TodoItemProps {
  title: string;
  description: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ title, description, completed, onToggle, onDelete }) => {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      }
    >
      <Checkbox
        edge="start"
        checked={completed}
        onChange={onToggle}
        tabIndex={-1}
        disableRipple
      />
      <ListItemText
        primary={title}
        secondary={description}
        style={{ textDecoration: completed ? 'line-through' : 'none' }}
      />
    </ListItem>
  );
};

export default TodoItem;