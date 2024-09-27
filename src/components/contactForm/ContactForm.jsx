import React, { useState, useEffect, useCallback } from 'react';
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { auth } from '../../firebase/firebase-config';
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import ServicePanel from '../servicePanel/ServicePanel';

const EmailForm = ({ onSubmit }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email submitted:', email);
    onSubmit({ email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        type="email"
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        style={{ marginTop: '16px' }}
      >
        Submit Email
      </Button>
    </form>
  );
};

const ContactForm = ({ onOtpSuccess, onSubmitEmail, onCloseContactForm }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isOtpVerified, setIsOtpVerified] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);

  const setupRecaptcha = useCallback(() => {
    console.log('Setting up reCAPTCHA...');
    if (!window.recaptchaVerifier && auth) {
      try {
        window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'invisible',
        });
        console.log('reCAPTCHA set up successfully.');
      } catch (error) {
        setError('Error setting up reCAPTCHA. Please try again later.');
        console.error('reCAPTCHA setup error:', error);
      }
    }
  }, []);

  useEffect(() => {
    console.log('Checking authentication service...');
    if (auth) {
      setupRecaptcha();
    } else {
      setError('Authentication service is not available. Please try again later.');
      console.warn('Authentication service is not available.');
    }
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
        console.log('Cleared reCAPTCHA verifier.');
      }
    };
  }, [setupRecaptcha]);

  const handleSendOtp = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    const formattedPhoneNumber = phoneNumber.startsWith('+91') ? phoneNumber : `+91${phoneNumber}`;
    console.log('Sending OTP to:', formattedPhoneNumber);

    try {
      if (!auth || !window.recaptchaVerifier) {
        throw new Error('Authentication service is not ready. Please try again.');
      }
      const result = await signInWithPhoneNumber(auth, formattedPhoneNumber, window.recaptchaVerifier);
      setConfirmationResult(result);
      setIsOtpSent(true);
      setSuccess('OTP sent successfully. Please check your phone.');
      console.log('OTP sent successfully. Confirmation result:', result);
    } catch (error) {
      setError(`Error sending OTP: ${error.message}`);
      console.error('Error sending OTP:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    console.log('Verifying OTP:', otp);

    try {
      if (!confirmationResult) throw new Error('Please send OTP first');
      await confirmationResult.confirm(otp);
      setSuccess('Phone number verified successfully!');
      setIsOtpVerified(true);
      setShowEmailForm(true);
      if (onOtpSuccess) onOtpSuccess();
      console.log('OTP verified successfully!');

    } catch (error) {
      setError(`Error verifying OTP: ${error.message}`);
      console.error('Error verifying OTP:', error);

    } finally {
      setLoading(false);
    }
  };

   const handleEmailSubmit = (emailData) => {
    console.log('Email data received from EmailForm:', emailData);
    if (onSubmitEmail) {
      onSubmitEmail(emailData);
    }
    setIsEmailSubmitted(true);
    if (onCloseContactForm) {
      onCloseContactForm();
    }
  };

  if (isEmailSubmitted) {
    console.log('Rendering ServicePanel.');
    return <ServicePanel />; // Render ServicePanel only after email is submitted
  }


  return (
    <Box p={3} border={1} borderRadius={2} borderColor="grey.400" width={300}>
      <Typography variant="h6" gutterBottom>Contact Details</Typography>
      {error && <Typography color="error" gutterBottom>{error}</Typography>}
      {success && <Typography color="success.main" gutterBottom>{success}</Typography>}
      <form onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp}>
        <TextField
          label="Phone Number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={phoneNumber}
          onChange={(e) => {
            console.log('Phone number input changed:', e.target.value);
            setPhoneNumber(e.target.value);
          }}
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
            onChange={(e) => {
              console.log('OTP input changed:', e.target.value);
              setOtp(e.target.value);
            }}
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
          disabled={loading || !auth}
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {loading ? 'Processing...' : (isOtpSent ? 'Verify OTP' : 'Send OTP')}
        </Button>
      </form>
      {isOtpVerified && !showEmailForm && (
        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: '16px' }}
          onClick={() => {
            console.log('Proceeding to email form...');
            setShowEmailForm(true);
          }}
        >
          Proceed to Email
        </Button>
      )}
      {showEmailForm && (
        <Box mt={2}>
          <Typography variant="subtitle1" gutterBottom>Enter your email</Typography>
          <EmailForm onSubmit={handleEmailSubmit} />
        </Box>
      )}
      <div id="recaptcha-container" style={{ marginTop: '16px' }}></div>
    </Box>
  );
};

export default ContactForm;
