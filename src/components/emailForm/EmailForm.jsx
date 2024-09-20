import React, { useState } from 'react';
import { createEmail } from '../../services/api';

const EmailForm = () => {
  const [emailAddress, setEmailAddress] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createEmail({ emailAddress });
      setEmailAddress('');
      // You might want to trigger a refresh of the email list here
    } catch (error) {
      console.error('Error creating email:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={emailAddress}
        onChange={(e) => setEmailAddress(e.target.value)}
        placeholder="Enter email address"
        required
      />
      <button type="submit">Add Email</button>
    </form>
  );
};

export default EmailForm;