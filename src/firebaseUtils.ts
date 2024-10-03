import { collection, addDoc, updateDoc, doc, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from './firebaseConfig';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  archived: boolean;  // New field
  createdAt: number;
  completedAt: number | null;
  archivedAt: number | null;  // New field
  userId: string;
}

export const saveTodoToFirestore = async (todo: Omit<Todo, 'id' | 'createdAt' | 'userId' | 'completedAt' | 'archived' | 'archivedAt'>): Promise<string> => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  const todoWithTimestamp = {
    ...todo,
    createdAt: Date.now(),
    userId: user.uid,
    completedAt: null,
    archived: false,
    archivedAt: null,
  };
  const docRef = await addDoc(collection(db, 'todos'), todoWithTimestamp);
  return docRef.id;
};

export const updateTodoInFirestore = async (id: string, updates: Partial<Todo>) => {
  const todoRef = doc(db, 'todos', id);
  await updateDoc(todoRef, updates);
};

export const fetchTodosForCurrentUser = async (): Promise<Todo[]> => {
  const user = auth.currentUser;
  if (!user) throw new Error('User not authenticated');

  const todosCollection = collection(db, 'todos');
  const userTodosQuery = query(todosCollection, where('userId', '==', user.uid));
  const todosSnapshot = await getDocs(userTodosQuery);

  return todosSnapshot.docs.map(doc => {
    const data = doc.data() as Omit<Todo, 'id'>;
    return {
      ...data,
      id: doc.id,
      completedAt: data.completedAt || null,
      archivedAt: data.archivedAt || null,
    } as Todo;
  });
};