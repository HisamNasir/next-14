'use client'
import { useState } from 'react';
import { Button, TextField, Container, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { auth, signInWithEmailAndPassword } from '@/app/lib/firebase';
import { useRouter } from 'next/navigation';
const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isModalOpen, setModalOpen] = useState(true);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully!');

      // Redirect to the dashboard page after successful login
      router.push('/dashboard');
    } catch (error) {
      console.error('Error logging in:', error.message);
      // Display error message with red background for 3 seconds
      setErrorMessage(error.message);
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };


  return (
    <Dialog open={isModalOpen} >
      <DialogContent>
        <Container>
          <DialogTitle>Login</DialogTitle>
          <form>
            <TextField
              label="Email"
              size='small'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              margin="normal"
              fullWidth
            />

            <TextField
              label="Password"
              size='small'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              fullWidth
            />

            {errorMessage && (
              <Typography variant="subtitle2" style={{ color: 'red', backgroundColor: '#1f1f1f', padding: '8px', borderRadius: '4px' }}>
                {errorMessage}
              </Typography>
            )}
            <DialogActions>
              <Button className='bg-slate-500' variant="contained" color="primary" onClick={handleLogin}>
                Log In
              </Button> </DialogActions>
          </form>
        </Container> 
      </DialogContent>
    </Dialog>
  );
};

export default LoginPage;
