// src/ContactForm.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../firebase/firebase-config';
import { TextField, Button, Typography, Box } from '@mui/material';
import ServicePanel from '../servicePanel/ServicePanel';

export default function ContactForm({ vendorEmail }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [isVerified, setIsVerified] = useState(false); // Track verification status
    const [isPanelVisible, setIsPanelVisible] = useState(false); // Control visibility of ServicePanel

    const setupRecaptcha = useCallback(() => {
        console.log('Setting up reCAPTCHA...');
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
                'callback': () => {
                    console.log('reCAPTCHA solved.');
                },
                'expired-callback': () => {
                    console.log('reCAPTCHA expired.');
                    setError('reCAPTCHA expired. Please try again.');
                    setLoading(false);
                }
            });
        }
    }, []);

    useEffect(() => {
        console.log('Setting up reCAPTCHA on mount...');
        setupRecaptcha();
        return () => {
            console.log('Cleaning up reCAPTCHA on unmount...');
            if (window.recaptchaVerifier) {
                window.recaptchaVerifier.clear();
                window.recaptchaVerifier = null;
            }
        };
    }, [setupRecaptcha]);

    const handleSendOtp = async (event) => {
        event.preventDefault();
        console.log('Sending OTP...');
        setError('');
        setSuccess('');
        setLoading(true);

        const formattedPhoneNumber = phoneNumber.startsWith('+91') ? phoneNumber : `+91${phoneNumber}`;
        console.log(`Formatted Phone Number: ${formattedPhoneNumber}`);

        try {
            const result = await signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier);
            console.log('OTP sent successfully.');
            setConfirmationResult(result);
            setIsOtpSent(true);
            setSuccess('OTP sent successfully. Please check your phone.');
        } catch (error) {
            console.error('Error sending OTP:', error);
            setError(`Error sending OTP: ${error.message}`);
            if (window.recaptchaVerifier) {
                window.recaptchaVerifier.render().then(widgetId => {
                    console.log('Resetting reCAPTCHA widget...');
                    window.recaptchaVerifier.reset(widgetId);
                });
            }
        } finally {
            setLoading(false);
            console.log('Finished sending OTP process.');
        }
    };

    const handleVerifyOtp = async (event) => {
        event.preventDefault();
        console.log('Verifying OTP...');
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            if (!confirmationResult) {
                throw new Error('Please send OTP first');
            }

            const userCredential = await confirmationResult.confirm(otp);
            const user = userCredential.user;
            console.log('OTP verified successfully.');
            console.log(`User ID: ${user.uid}`);
            console.log(`Phone Number: ${user.phoneNumber}`);

            await addUserToFirestore(user.uid, { phoneNumber: user.phoneNumber });
            setSuccess('Phone number verified and user data stored successfully!');
            setIsVerified(true); // Set verification status to true

            // Delay rendering of ServicePanel to show success message first
            setTimeout(() => {
                console.log('Showing ServicePanel...');
                setIsPanelVisible(true);
            }, 1000); // Adjust delay as needed
        } catch (error) {
            console.error('Error verifying OTP:', error);
            setError(`Error verifying OTP: ${error.message}`);
        } finally {
            setLoading(false);
            console.log('Finished verifying OTP process.');
        }
    };

    const addUserToFirestore = async (uid, userData) => {
        console.log('Adding user to Firestore...');
        try {
            await setDoc(doc(db, 'users', uid), {
                ...userData,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }, { merge: true });
            console.log('User data saved to Firestore successfully.');
        } catch (error) {
            console.error('Error saving user data to Firestore:', error);
            throw new Error(`Error saving user data: ${error.message}`);
        }
    };

    if (isPanelVisible) {
        console.log('Rendering ServicePanel.');
        return <ServicePanel vendorEmail={vendorEmail} />; // Render ServicePanel if isPanelVisible is true
    }

    return (
        <Box p={3} border={1} borderRadius={2} borderColor="grey.400" width={300}>
            <Typography variant="h6">Contact Details</Typography>
            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="success">{success}</Typography>}
            <form onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp}>
                <TextField
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    type="tel"
                    required
                    placeholder="+919876543210"
                    disabled={isOtpSent || loading}
                    pattern="^\+91[1-9]\d{9}$"
                    title="Please enter a valid Indian phone number starting with +91"
                />
                {isOtpSent && (
                    <TextField
                        label="OTP"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        type="text"
                        required
                        disabled={loading}
                        pattern="\d{6}"
                        title="Please enter a 6-digit OTP"
                    />
                )}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                >
                    {loading ? 'Processing...' : (isOtpSent ? 'Verify OTP' : 'Send OTP')}
                </Button>
            </form>
            <div id="recaptcha-container" className="mt-4"></div>
        </Box>
    );
}
