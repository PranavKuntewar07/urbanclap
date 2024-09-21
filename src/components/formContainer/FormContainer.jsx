import React, { useState } from 'react';
import ContactForm from '../contactForm/ContactForm';
import EmailForm from "../emailForm/EmailForm";
import ServicePanel from "../servicePanel/ServicePanel";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormContainer = () => {
    const [step, setStep] = useState(0); // 0: ContactForm, 1: EmailForm, 2: ServicePanel
    const [vendorEmail, setVendorEmail] = useState('');

    const handleOtpSuccess = () => {
        setStep(1); // Move to EmailForm after OTP verification
    };

    const handleEmailSubmission = (email) => {
        setVendorEmail(email);
        setStep(2); // Move to ServicePanel after email submission
    };

    useEffect(() => {
        console.log('Current step:', step);
    }, [step]);

    return (
        <div>
            {step === 0 && <ContactForm onOtpSuccess={handleOtpSuccess} />}
            {step === 1 && <EmailForm onSubmit={handleEmailSubmission} />}
            {step === 2 && <ServicePanel vendorEmail={vendorEmail} />}
            <ToastContainer />
        </div>
    );
};

export default FormContainer;