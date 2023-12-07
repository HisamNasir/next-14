'use client'
import withAuth from '../lib/withAuth';
import Layout from '../ui/layout/Layout';
import { useEffect, useState } from 'react';
import { deleteUserData, getAllUsersData } from '../lib/firebase';
import { Typography } from '@mui/material';

import { updateUserData } from '../lib/firebase';
import { Button } from '@mui/material';

import UserModal from '../ui/UserModal';

import UserData from '../lib/types';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const HomePage = () => {
  const [usersData, setUsersData] = useState<UserData[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const data = await getAllUsersData();
        setUsersData(data);
      } catch (error) {
        console.error('Error fetching user data:', error.message);
      }
    };

    fetchUsersData();
  }, []);

  const handleEdit = (user: UserData) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleDelete = async (userId: string) => {
    try {
      await deleteUserData(userId);
      setUsersData(usersData.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  const handleSave = async (updatedUser: UserData) => {
    try {
      await updateUserData(updatedUser.id, updatedUser);
      setUsersData((prevUsers) =>
        prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
    } catch (error) {
      console.error('Error updating user data:', error.message);
    }
  };

  return (
    <Layout>
      <div>
        <Typography variant="h4">User List</Typography>
        <List>
          {usersData.map((user) => (
            <ListItem className='grid grid-cols-5' key={user.id} sx={{ border: '1px solid #ddd', borderRadius: '4px', margin: '8px 0', padding: '12px' }}>
              
                  <Typography variant="subtitle1">
                    Name: {user.name}
                  </Typography>
                  <Typography variant="subtitle1">
                    Age: {user.age}
                  </Typography>
                  <Typography variant="subtitle1">
                    Job Position: {user.jobPosition}
                  </Typography>
                  <Typography variant="subtitle1">
                    Salary: {user.salary}
                  </Typography>
                
              
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={() => handleEdit(user)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(user.id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </div>
      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSave} user={selectedUser} />
    </Layout>
  );
};

export default HomePage;
