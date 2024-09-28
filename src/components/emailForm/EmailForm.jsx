import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase'; // Import the Firestore instance

const EmailForm = ({ onSubmitEmail }) => {
    const [email, setEmail] = useState('');

    // Handle input change
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Add a new document with the email to the 'emails' collection
            const docRef = await addDoc(collection(db, "emails"), {
                email: email,
                createdAt: new Date(), // Add a timestamp
                additionalData: "Some additional data" // Example of additional data (optional)
            });

            console.log("Document written with ID: ", docRef.id);

            // Call the onSubmitEmail callback if provided
            if (onSubmitEmail) {
                onSubmitEmail({ email });
            }

            // Clear the input field
            setEmail('');
        } catch (e) {
            console.error("Error adding document: ", e);
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
