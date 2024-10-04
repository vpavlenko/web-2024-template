import React, { useState } from 'react';
import { ListItem, IconButton, Box, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DebugInfo from './DebugInfo';

interface TodoItemProps {
  todo: {
    id: string;
    title: string;
    description: string;
  };
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onEdit }) => {
  const [expanded, setExpanded] = useState(false);

  const handleToggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <ListItem
      alignItems="flex-start"
      sx={{
        flexDirection: 'column',
        alignItems: 'flex-start',
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        mb: 2,
        p: 2,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 1 }}>
        <Typography variant="h6">{todo.title}</Typography>
        <Box>
          <IconButton onClick={handleToggleExpand} size="small">
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
          <IconButton onClick={() => onEdit(todo.id)} size="small">
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(todo.id)} size="small">
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      {expanded && (
        <Box
          component="pre"
          sx={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            mt: 1,
            p: 1,
            backgroundColor: '#f5f5f5',
            borderRadius: '4px',
            width: '100%',
            fontFamily: 'inherit',
            fontSize: 'inherit',
          }}
        >
          {todo.description}
        </Box>
      )}
      <DebugInfo data={{ todo, expanded }} title="TodoItem Debug Info" />
    </ListItem>
  );
};

export default TodoItem;