import React, { useState, useEffect } from 'react';
import { getEmail, updateService, deleteService } from '../../services/api';

const ServiceList = ({ emailId }) => {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    fetchEmail();
  }, [emailId]);

  const fetchEmail = async () => {
    try {
      const response = await getEmail(emailId);
      setEmail(response.data);
    } catch (error) {
      console.error('Error fetching email:', error);
    }
  };

  const handleUpdateService = async (serviceName, data) => {
    try {
      await updateService(emailId, serviceName, data);
      fetchEmail();
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  const handleDeleteService = async (serviceName) => {
    try {
      await deleteService(emailId, serviceName);
      fetchEmail();
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  if (!email) return <div>Loading...</div>;

  return (
    <div>
      <h2>Services for {email.emailAddress}</h2>
      {Object.entries(email.services || {}).map(([serviceName, serviceData]) => (
        <div key={serviceName}>
          <h3>{serviceName}</h3>
          {Object.entries(serviceData).map(([subServiceName, subServiceData]) => (
            <div key={subServiceName}>
              <h4>{subServiceName}</h4>
              <p>Specification: {subServiceData.specification}</p>
              <p>Description: {subServiceData.description}</p>
              <button onClick={() => handleUpdateService(serviceName, { ...serviceData, [subServiceName]: { ...subServiceData, description: 'Updated description' } })}>
                Update Description
              </button>
            </div>
          ))}
          <button onClick={() => handleDeleteService(serviceName)}>Delete Service</button>
        </div>
      ))}
    </div>
  );
};

export default ServiceList;