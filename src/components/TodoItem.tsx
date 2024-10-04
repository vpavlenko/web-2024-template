import React, { useState } from 'react';
import { ListItem, ListItemText, Checkbox, IconButton, Box, Typography, TextField, Button } from '@mui/material';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { formatDistanceToNow } from 'date-fns';
import { Todo } from '../firebaseUtils';

interface TodoItemProps {
  todo: Todo;
  onToggle: () => void;
  onArchive: () => void;
  onUnarchive: () => void;
  onEdit: (id: string, newTitle: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onArchive, onUnarchive, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [isExpanded, setIsExpanded] = useState(false);

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

  const handleEditSubmit = () => {
    onEdit(todo.id, editedTitle);
    setIsEditing(false);
  };

  const firstLine = todo.title.split('\n')[0];
  const hasMultipleLines = todo.title.includes('\n');

  return (
    <ListItem
      dense
      disableGutters
      secondaryAction={
        <Box display="flex" alignItems="center">
          <Typography variant="caption" color="text.secondary" sx={{ mr: 1 }}>
            {formatRelativeDate(todo.completed ? todo.completedAt : todo.createdAt)}
          </Typography>
          {!isEditing && (
            <>
              <IconButton edge="end" aria-label="edit" onClick={() => setIsEditing(true)} size="small">
                <EditIcon />
              </IconButton>
              {hasMultipleLines && (
                <IconButton edge="end" aria-label="expand" onClick={() => setIsExpanded(!isExpanded)} size="small">
                  {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </IconButton>
              )}
              {todo.archived ? (
                <IconButton edge="end" aria-label="unarchive" onClick={onUnarchive} size="small">
                  <UnarchiveIcon />
                </IconButton>
              ) : (
                <IconButton edge="end" aria-label="archive" onClick={onArchive} size="small">
                  <ArchiveIcon />
                </IconButton>
              )}
            </>
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
      {isEditing ? (
        <Box display="flex" alignItems="center" width="100%">
          <TextField
            fullWidth
            multiline
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            size="small"
          />
          <Button onClick={handleEditSubmit} size="small">Save</Button>
        </Box>
      ) : (
        isExpanded ? (
          <Typography
            variant="body2"
            sx={{
              whiteSpace: 'pre-line',
              width: '100%',
              paddingRight: 2, // Add some padding to prevent text from touching the icons
            }}
          >
            {todo.title}
          </Typography>
        ) : (
          <ListItemText
            primary={firstLine}
            primaryTypographyProps={{ variant: 'body2' }}
          />
        )
      )}
    </ListItem>
  );
};

export default TodoItem;