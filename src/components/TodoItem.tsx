import React from 'react';
import { ListItem, ListItemText, Checkbox, IconButton, Box, Typography } from '@mui/material';
import ArchiveIcon from '@mui/icons-material/Archive';
import { formatDistanceToNow } from 'date-fns';
import { Todo } from '../firebaseUtils';

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onArchive: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onArchive }) => {
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
          {!todo.archived && (
            <IconButton edge="end" aria-label="archive" onClick={onArchive} size="small">
              <ArchiveIcon />
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