import { useState, useEffect } from 'react';
import { Button, TextField, Box, Typography, Checkbox, FormControlLabel } from '@mui/material';
import { saveTodoToFirestore, logFirestoreStatus } from '../../firebaseUtils';

const TodoForm = () => {
  console.log("TodoForm is rendering");

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    logFirestoreStatus();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    console.log("Submitting todo:", { title, description, completed });

    try {
      logFirestoreStatus(); // Log Firestore status before saving
      const docId = await saveTodoToFirestore({
        title,
        description,
        completed,
      });
      setSuccess(true);
      console.log(`Todo saved with document ID: ${docId}`);
      // Reset form
      setTitle('');
      setDescription('');
      setCompleted(false);
    } catch (err) {
      setError('Failed to save todo. Please try again.');
      console.error("Error in handleSubmit:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Add New Todo
      </Typography>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        margin="normal"
        multiline
        rows={3}
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            color="primary"
          />
        }
        label="Completed"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
        sx={{ mt: 2 }}
      >
        {isLoading ? 'Saving...' : 'Save Todo'}
      </Button>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {success && (
        <Typography color="success" sx={{ mt: 2 }}>
          Todo saved successfully!
        </Typography>
      )}
    </Box>
  );
};

export default TodoForm;