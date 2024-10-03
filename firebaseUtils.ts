import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { db } from './firebaseConfig';

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

export const saveTodoToFirestore = async (todo: Todo): Promise<string> => {
  console.log("Attempting to save todo:", todo);
  console.log("Firestore instance:", db);

  try {
    if (!db) {
      console.error("Firestore database is not initialized");
      throw new Error("Firestore database is not initialized");
    }

    console.log("Creating collection reference...");
    const collectionRef = collection(db, 'todos');
    console.log("Collection reference created:", collectionRef);

    console.log("Adding document to Firestore...");
    const docRef = await addDoc(collectionRef, todo);
    console.log("Document added successfully. Document ID:", docRef.id);

    return docRef.id;
  } catch (error) {
    console.error("Error adding todo:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    throw error;
  }
};

// Debug function to log Firestore connection status
export const logFirestoreStatus = () => {
  const firestore = getFirestore();
  console.log("Firestore instance:", firestore);
  console.log("Is Firestore initialized?", !!firestore);
  console.log("Firestore settings:", firestore.toJSON());
};