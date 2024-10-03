import { useState } from 'react';
import { Button, TextField, Box, Typography } from '@mui/material';
import { saveDataToFirestore } from '../firebaseUtils';

const UserForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const docId = await saveDataToFirestore({
        name,
        age: parseInt(age, 10),
        email,
      });
      setSuccess(true);
      console.log(`Data saved with document ID: ${docId}`);
      // Reset form
      setName('');
      setAge('');
      setEmail('');
    } catch (err) {
      setError('Failed to save data. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        User Information
      </Typography>
      <TextField
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        margin="normal"
        required
      />
      <TextField
        fullWidth
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        margin="normal"
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading}
        sx={{ mt: 2 }}
      >
        {isLoading ? 'Saving...' : 'Save'}
      </Button>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {success && (
        <Typography color="success" sx={{ mt: 2 }}>
          Data saved successfully!
        </Typography>
      )}
    </Box>
  );
};

export default UserForm;