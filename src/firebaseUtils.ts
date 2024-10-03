import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

export const saveTodoToFirestore = async (todo: Todo): Promise<string> => {
  console.log("Attempting to save todo:", todo);
  try {
    const docRef = await addDoc(collection(db, 'todos'), todo);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};