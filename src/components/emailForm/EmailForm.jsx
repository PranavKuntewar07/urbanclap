import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase'; // Import the Firestore instance
import { toast } from 'react-toastify';


const EmailForm = ({ onSubmitEmail }) => {
    const [email, setEmail] = useState('');

    // Handle input change
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const lowerCaseEmail = email.toLowerCase();
            const emailDocRef = doc(db, 'emails', lowerCaseEmail);
            await setDoc(emailDocRef, { email: lowerCaseEmail }, { merge: true });
            localStorage.setItem('submittedEmail', lowerCaseEmail);
            console.log('Stored email:', localStorage.getItem('submittedEmail'));
            toast.success('Email submitted successfully!');
            onSubmitEmail(lowerCaseEmail);
            setEmail('');
        } catch (error) {
            console.error("Error submitting email: ", error);
            toast.error(`Failed to submit email: ${error.message}`);
        }
    };

    return (
        <Box p={3} border={1} borderRadius={2} borderColor="grey.400" width={300}>
            <Typography variant="h6">Email</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Email"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={email}
                    onChange={handleEmailChange}
                    type="email"
                    required
                />
                <Button type="submit" variant="contained" color="primary" fullWidth>
                    Send
                </Button>
            </form>
        </Box>
    );
};

export default EmailForm;

