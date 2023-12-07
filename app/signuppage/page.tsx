'use client'
// pages/signup.tsx
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, TextField, Container, Typography, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { auth, createUserWithEmailAndPassword } from '@/app/lib/firebase';

const Signup = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isModalOpen, setModalOpen] = useState(true);
    const handleSignup = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('User signed up successfully!');
            router.push('/loginpage');
        } catch (error) {
            console.error('Error signing up:', error.message);
            setErrorMessage(error.message);
            setTimeout(() => setErrorMessage(''), 3000);
        }
    };

    return (
        <Dialog open={isModalOpen} >
            <DialogContent>
                <Container>
                    <DialogTitle>Signup</DialogTitle>
                    <form>
                        <TextField
                            size='small'
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            margin="normal"
                            fullWidth
                        />

                        <TextField
                            size='small'
                            label="Password"
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

                        <Button className='bg-slate-500' variant="contained" color="primary" onClick={handleSignup}>
                            Sign Up
                        </Button>
                    </form>
                </Container>
            </DialogContent>
        </Dialog>
    );
};

export default Signup;
