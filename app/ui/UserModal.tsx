// components/UserModal.tsx
import React, { useState } from 'react';
import Modal from 'react-modal';
import { Button, TextField } from '@mui/material';
import UserData from '../lib/types';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedUser: UserData) => void;
  user: UserData | null;
}

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSave, user }) => {
  const [name, setName] = useState(user?.name || '');
  const [age, setAge] = useState(user?.age.toString() || '');
  const [jobPosition, setJobPosition] = useState(user?.jobPosition || '');
  const [salary, setSalary] = useState(user?.salary.toString() || '');

  const handleSave = () => {
    const updatedUser: UserData = {
      id: user?.id || '',
      name,
      age: parseInt(age, 10),
      jobPosition,
      salary: parseInt(salary, 10),
    };

    onSave(updatedUser);
    onClose();
  };
  const customModalStyle = {
    content: {
      width: '60%', // Adjust the width as needed
      maxWidth: '600px', // Set a maximum width if desired
      height: '40%', // Adjust the width as needed
      maxHeight: '600px', // Set a maximum width if desired
      margin: 'auto', // Center the modal horizontally
    },
  };
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} contentLabel="Edit User Modal"style={customModalStyle}>
      <h2>Edit User</h2>
      <TextField size='small' className=' my-2' label="Name" value={name} onChange={(e) => setName(e.target.value)} fullWidth />
      <TextField size='small' className=' my-2' label="Age" value={age} onChange={(e) => setAge(e.target.value)} fullWidth />
      <TextField size='small' className=' my-2' label="Job Position" value={jobPosition} onChange={(e) => setJobPosition(e.target.value)} fullWidth />
      <TextField size='small' className=' my-2' label="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} fullWidth />
      <div className=' flex gap-2'>
      <Button className=' w-full bg-slate-400' variant="contained" color="primary" onClick={handleSave}>
        Save
      </Button>
      <Button className=' w-full bg-slate-400' variant="contained" color="secondary" onClick={onClose}>
        Cancel
      </Button>
      </div>
    </Modal>
  );
};

export default UserModal;
