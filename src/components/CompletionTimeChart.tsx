import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Paper, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { Todo } from '../firebaseUtils';  // Update this import

interface CompletionTimeChartProps {
  todos: Todo[];
}

type TimeRange = 1 | 4 | 16 | 64;

const CompletionTimeChart: React.FC<CompletionTimeChartProps> = ({ todos }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>(4);

  const chartData = useMemo(() => {
    const now = new Date();
    const startDate = new Date(now.getTime() - timeRange * 7 * 24 * 60 * 60 * 1000);
    const completedTodos = todos.filter(todo => todo.completedAt && todo.completedAt >= startDate.getTime());

    const dateCounts: { [date: string]: number } = {};
    for (let d = new Date(startDate); d <= now; d.setDate(d.getDate() + 1)) {
      dateCounts[d.toISOString().split('T')[0]] = 0;
    }

    completedTodos.forEach(todo => {
      const date = new Date(todo.completedAt!).toISOString().split('T')[0];
      dateCounts[date] = (dateCounts[date] || 0) + 1;
    });

    const data = Object.entries(dateCounts).map(([date, count]) => ({
      date,
      count,
    }));

    return data.sort((a, b) => a.date.localeCompare(b.date));
  }, [todos, timeRange]);

  const handleTimeRangeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newTimeRange: TimeRange,
  ) => {
    if (newTimeRange !== null) {
      setTimeRange(newTimeRange);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, height: 400 }}>
      <Typography variant="h6" gutterBottom>
        Completed Todos Over Time
      </Typography>
      <ToggleButtonGroup
        value={timeRange}
        exclusive
        onChange={handleTimeRangeChange}
        aria-label="time range"
        size="small"
        sx={{ mb: 2 }}
      >
        <ToggleButton value={1} aria-label="1 week">
          1 week
        </ToggleButton>
        <ToggleButton value={4} aria-label="4 weeks">
          4 weeks
        </ToggleButton>
        <ToggleButton value={16} aria-label="16 weeks">
          16 weeks
        </ToggleButton>
        <ToggleButton value={64} aria-label="64 weeks">
          64 weeks
        </ToggleButton>
      </ToggleButtonGroup>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            label={{ value: 'Date', position: 'insideBottom', offset: -10 }}
            tick={{ fontSize: 12 }}
            interval={Math.floor(chartData.length / 7)}
          />
          <YAxis
            label={{ value: 'Completed Todos', angle: -90, position: 'insideLeft' }}
          />
          <Tooltip />
          <Bar dataKey="count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default CompletionTimeChart;