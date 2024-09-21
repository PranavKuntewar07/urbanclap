import React, { useState } from 'react';
import { db } from '../../firebase/firebase-config';
import { doc, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { TextField, Button } from '@mui/material';

const EmailForm = ({ onSubmit, onVerificationStart }) => {
    const [emailAddress, setEmailAddress] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await setDoc(doc(db, 'emails', emailAddress), { createdAt: new Date() });
            toast.success('Email added successfully');
            setEmailAddress('');
            onSubmit(emailAddress); // Notify parent with email
            if (onVerificationStart) {
                onVerificationStart(); // Trigger OTP verification process
            }
        } catch (error) {
            console.error('Error creating email:', error);
            toast.error('Failed to add email');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                type="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
                placeholder="Enter email address"
                required
            />
            <Button type="submit">Add Email</Button>
        </form>
    );
};

export default EmailForm;