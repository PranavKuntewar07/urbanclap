import React, { useState } from 'react';
import ContactForm from '../contactForm/ContactForm';
import EmailForm from '../emailForm/EmailForm';
import ServicePanel from '../servicePanel/ServicePanel';

const FormContainer = () => {
    const [showContactForm, setShowContactForm] = useState(true);  // Initially show the Contact Form
    const [showEmailForm, setShowEmailForm] = useState(false);     // Email Form is hidden initially
    const [showServicePanel, setShowServicePanel] = useState(false);
    const [vendorEmail, setVendorEmail] = useState('');

    // Function to handle OTP success and switch to Email Form
    const handleOtpSuccess = () => {
        setShowContactForm(false);  // Hide Contact Form
        setShowEmailForm(true);     // Show Email Form
    };

    // Function to close the Contact Form (when OTP is verified)
    const handleCloseContactForm = () => {
        setShowContactForm(false);  // Close the Contact Form
        setShowEmailForm(true);
    };

    // Function to handle email submission (you can customize this)
    const handleEmailSubmit = (emailData) => {
        console.log('Email submitted:', emailData);
        // Here you can handle the email data, like saving it to Firebase
        setVendorEmail(emailData.email);
        setShowEmailForm(false);
        setShowServicePanel(true);
    };

    return (
        <div>
            <Typography variant="h6" align="center" gutterBottom>
                {showContactForm ? 'Contact Form' : showEmailForm ? 'Email Form' : 'Service Panel'}
            </Typography>
            {showContactForm && (
                <ContactForm
                    onOtpSuccess={handleOtpSuccess}
                    onCloseContactForm={handleCloseContactForm}
                />
            )}
            {showEmailForm && (
                <EmailForm
                    onSubmitEmail={handleEmailSubmit}
                />
            )}
            {showServicePanel && (
                <ServicePanel
                    vendorEmail={vendorEmail}
                />

            )}
        </div>
    );
};

export default FormContainer;
