import React from 'react';
import { ListItem, ListItemText, Checkbox, Typography } from '@mui/material';
import { formatDistanceToNow } from 'date-fns';
import { Todo } from '../firebaseUtils';

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle }) => {
  const { title, description, completed, createdAt, completedAt } = todo;

  const formatDate = (timestamp: number | undefined) => {
    if (!timestamp || isNaN(timestamp)) {
      return 'Unknown';
    }
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Invalid date';
    }
  };

  const createdAgo = formatDate(createdAt);
  const completedAgo = completedAt ? formatDate(completedAt) : null;

  return (
    <ListItem>
      <Checkbox
        edge="start"
        checked={completed}
        onChange={onToggle}
        tabIndex={-1}
        disableRipple
      />
      <ListItemText
        primary={title}
        secondary={
          <>
            <Typography component="span" variant="body2" color="textPrimary">
              {description}
            </Typography>
            <br />
            <Typography component="span" variant="caption" color="textSecondary">
              Created: {createdAgo}
              {completedAgo && <> • Completed: {completedAgo}</>}
            </Typography>
          </>
        }
        style={{ textDecoration: completed ? 'line-through' : 'none' }}
      />
    </ListItem>
  );
};

export default TodoItem;