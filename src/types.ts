export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
  completedAt: number | null;
}