export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  completedAt: number | null;
  // ... any other fields
}