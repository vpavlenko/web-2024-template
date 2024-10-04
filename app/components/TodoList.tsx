import React from 'react';
import { List, Box } from '@mui/material';
import TodoItem from './TodoItem';
import DebugInfo from './DebugInfo';

interface TodoListProps {
  todos: Array<{ id: string; title: string; description: string }>;
  onDeleteTodo: (id: string) => void;
  onEditTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDeleteTodo, onEditTodo }) => {
  return (
    <Box>
      <List>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={onDeleteTodo}
            onEdit={onEditTodo}
          />
        ))}
      </List>
      <DebugInfo data={todos} title="TodoList Debug Info" />
    </Box>
  );
};

export default TodoList;