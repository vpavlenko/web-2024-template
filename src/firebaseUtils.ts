import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from './firebaseConfig';

export interface Todo {
  id?: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: number; // Unix timestamp
  completedAt?: number; // Unix timestamp, optional
}

export const saveTodoToFirestore = async (todo: Omit<Todo, 'id' | 'createdAt'>): Promise<string> => {
  const todoWithTimestamp = {
    ...todo,
    createdAt: Date.now(),
  };
  const docRef = await addDoc(collection(db, 'todos'), todoWithTimestamp);
  return docRef.id;
};

export const updateTodoInFirestore = async (id: string, updates: Partial<Todo>) => {
  const todoRef = doc(db, 'todos', id);
  await updateDoc(todoRef, updates);
};