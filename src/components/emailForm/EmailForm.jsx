import React, { useState } from 'react';

const EmailForm = ({ onSubmit }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submitting email:', email);
        onSubmit(email);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
            />
            <button type="submit">Submit Email</button>
        </form>
    );
};

export default EmailForm;