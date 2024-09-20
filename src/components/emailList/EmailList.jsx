import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';

const EmailList = ({ onSelectEmail }) => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchEmails = async () => {
      const emailsCollection = collection(db, 'emails');
      const emailSnapshot = await getDocs(emailsCollection);
      const emailList = emailSnapshot.docs.map(doc => doc.id);
      setEmails(emailList);
    };

    fetchEmails();
  }, []);

  return (
    <div>
      <h2>Select an Email</h2>
      <ul>
        {emails.map(email => (
          <li key={email} onClick={() => onSelectEmail(email)}>
            {email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmailList;
