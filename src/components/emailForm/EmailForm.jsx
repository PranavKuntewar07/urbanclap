import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';

const EmailForm = ({ onSubmitEmail }) => {
    const [email, setEmail] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSubmitEmail) {
            onSubmitEmail({ email });
        }
        setEmail('');
        
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
