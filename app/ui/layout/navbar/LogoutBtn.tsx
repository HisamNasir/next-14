'use client'
import React from 'react'
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { signOut } from '@/app/lib/firebase';

export default function LogoutBtn() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      // Redirect to the login page after logout
      router.replace('/loginpage');
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };
  return <Button className='bg-purple-900' variant="contained" color="secondary" onClick={handleLogout}>
  Logout
</Button>
}
