import React from 'react';
import { ListItem, ListItemText, Checkbox, IconButton, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { formatDistanceToNow } from 'date-fns';
import { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onDelete?: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const formatRelativeDate = (timestamp: number | null) => {
    if (!timestamp || isNaN(timestamp)) {
      return 'Unknown date';
    }
    try {
      return formatDistanceToNow(timestamp, { addSuffix: true });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  return (
    <ListItem
      dense
      disableGutters
      secondaryAction={
        <Box display="flex" alignItems="center">
          <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
            {formatRelativeDate(todo.completed ? todo.completedAt : todo.createdAt)}
          </Typography>
          {onDelete && (
            <IconButton edge="end" aria-label="delete" onClick={onDelete} size="small">
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      }
    >
      <Checkbox
        edge="start"
        checked={todo.completed}
        onChange={onToggle}
        size="small"
      />
      <ListItemText
        primary={todo.title}
        primaryTypographyProps={{ variant: 'body2' }}
      />
    </ListItem>
  );
};

export default TodoItem;