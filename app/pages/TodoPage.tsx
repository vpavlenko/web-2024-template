import TodoForm from '../components/TodoForm';

const TodoPage = () => {
  console.log("TodoPage is rendering");
  return (
    <div>
      <h1>atm-todos</h1>
      <TodoForm />
    </div>
  );
};

export default TodoPage;