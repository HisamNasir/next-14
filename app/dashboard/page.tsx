'use client'
import Layout from '../ui/layout/Layout';
import { useState, useEffect, ChangeEvent } from 'react';
import { getAuth } from 'firebase/auth';
import { getUserData, updateUserData } from '../lib/firebase';
import { Button, TextField, Typography } from '@mui/material';
import { auth, signOut, uploadProfilePicture } from '../lib/firebase';

const Dashboard = () => {
  const user = auth.currentUser;
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [jobPosition, setJobPosition] = useState('');
  const [salary, setSalary] = useState('');
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState('');

  useEffect(() => {
    if (user) {
      // Fetch user data from Firestore
      getUserData(user.uid)
        .then((userData) => {
          if (userData) {
            setName(userData.name || '');
            setAge(userData.age || '');
            setJobPosition(userData.jobPosition || '');
            setSalary(userData.salary || '');
            setProfilePictureUrl(userData.profilePictureUrl || '');
          }
        })
        .catch((error) => {
          console.error('Error fetching user data:', error.message);
        });
    }
  }, [user]);

  const handleProfileUpdate = async () => {
    try {
      // Upload profile picture to Firebase Storage
      if (profilePicture) {
        const profilePictureUrl = await uploadProfilePicture(user.uid, profilePicture);
        setProfilePictureUrl(profilePictureUrl);
      }

      // Update user data in Firestore
      await updateUserData(user.uid, {
        name,
        age,
        jobPosition,
        salary,
      });

      console.log('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error.message);
    }
  };





  return (
    <Layout>
      <div className=' flex flex-col gap-4'>
        <Typography className=' font-bold' variant="h4">Dashboard Page</Typography>
        <Typography className=' text-center' variant="h6"><span className=' font-bold'>Your Email:</span> {user?.email}</Typography>
        <Typography className=' font-bold' variant="h6">Add a User</Typography>
        <TextField size='small' label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
        <TextField size='small' label="Age" value={age} onChange={(e) => setAge(e.target.value)} fullWidth />
        <TextField size='small' label="Job Position" value={jobPosition} onChange={(e) => setJobPosition(e.target.value)} fullWidth />
        <TextField size='small' label="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} fullWidth />

        <Button className=' bg-slate-400' variant="contained" color="primary" onClick={handleProfileUpdate}>
          Update Profile
        </Button>

      </div>
    </Layout>
  );
};

export default Dashboard;
