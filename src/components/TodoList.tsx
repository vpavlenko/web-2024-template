import React from 'react';
import { List } from '@mui/material';
import TodoItem from './TodoItem';
import { Todo } from '../firebaseUtils';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onArchive: (id: string) => void;
  onUnarchive: (id: string) => void;
  onEdit: (id: string, newTitle: string) => void;
  onAddChild: (parentId: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggle, onArchive, onUnarchive, onEdit, onAddChild }) => {
  const renderTodoItem = (todo: Todo, depth: number) => {
    return (
      <React.Fragment key={todo.id}>
        <TodoItem
          todo={todo}
          onToggle={() => onToggle(todo.id)}
          onArchive={() => onArchive(todo.id)}
          onUnarchive={() => onUnarchive(todo.id)}
          onEdit={onEdit}
          onAddChild={onAddChild}
          depth={depth}
        />
        {todo.childIds.map(childId => {
          const childTodo = todos.find(t => t.id === childId);
          return childTodo ? renderTodoItem(childTodo, depth + 1) : null;
        })}
      </React.Fragment>
    );
  };

  const rootTodos = todos.filter(todo => !todo.parentId);

  return (
    <List>
      {rootTodos.map(todo => renderTodoItem(todo, 0))}
    </List>
  );
};

export default TodoList;