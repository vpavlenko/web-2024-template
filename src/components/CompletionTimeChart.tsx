import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Paper } from '@mui/material';
import { Todo } from '../types';

interface CompletionTimeChartProps {
  todos: Todo[];
}

const CompletionTimeChart: React.FC<CompletionTimeChartProps> = ({ todos }) => {
  const chartData = todos
    .filter(todo => todo.completedAt !== null)
    .map(todo => ({
      name: todo.title,
      completionTime: todo.completedAt ? new Date(todo.completedAt).toLocaleString() : '',
    }));

  return (
    <Paper elevation={3} sx={{ p: 2, height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            label={{ value: 'Todo', position: 'insideBottom', offset: -10 }}
          />
          <YAxis
            label={{ value: 'Completion Time', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Line type="monotone" dataKey="completionTime" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default CompletionTimeChart;