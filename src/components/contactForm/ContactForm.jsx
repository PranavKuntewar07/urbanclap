import React, { useState, useEffect, useCallback } from 'react';
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { auth } from '../../firebase/firebase-config';
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';

const ContactForm = ({ onOtpSuccess }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [confirmationResult, setConfirmationResult] = useState(null);
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const setupRecaptcha = useCallback(() => {
        if (!window.recaptchaVerifier) {
            window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
                'size': 'invisible',
            });
        }
    }, []);

    useEffect(() => {
        setupRecaptcha();
        return () => {
            if (window.recaptchaVerifier) {
                window.recaptchaVerifier.clear();
                window.recaptchaVerifier = null;
            }
        };
    }, [setupRecaptcha]);

    const handleSendOtp = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);
        const formattedPhoneNumber = phoneNumber.startsWith('+91') ? phoneNumber : `+91${phoneNumber}`;

        try {
            const result = await signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier);
            setConfirmationResult(result);
            setIsOtpSent(true);
            setSuccess('OTP sent successfully. Please check your phone.');
        } catch (error) {
            setError(`Error sending OTP: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            if (!confirmationResult) throw new Error('Please send OTP first');
            await confirmationResult.confirm(otp);
            setSuccess('Phone number verified successfully!');
            if (onOtpSuccess) {
                console.log('Calling onOtpSuccess from ContactForm');
                onOtpSuccess();
            }
        } catch (error) {
            setError(`Error verifying OTP: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box p={3} border={1} borderRadius={2} borderColor="grey.400" width={300}>
            <Typography variant="h6">Contact Details</Typography>
            {error && <Typography color="error">{error}</Typography>}
            {success && <Typography color="success.main">{success}</Typography>}
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
                    />
                )}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
                >
                    {loading ? 'Processing...' : (isOtpSent ? 'Verify OTP' : 'Send OTP')}
                </Button>
            </form>
            <div id="recaptcha-container" className="mt-4"></div>
        </Box>
    );
};

export default ContactForm;