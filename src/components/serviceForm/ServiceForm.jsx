import React, { useState } from 'react';
import { updateService } from '../../services/api';

const ServiceForm = ({ emailId }) => {
  const [serviceName, setServiceName] = useState('');
  const [subServiceName, setSubServiceName] = useState('');
  const [specification, setSpecification] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateService(emailId, serviceName, {
        [subServiceName]: { specification, description }
      });
      // Reset form or show success message
    } catch (error) {
      console.error('Error updating service:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={serviceName}
        onChange={(e) => setServiceName(e.target.value)}
        placeholder="Service Name"
        required
      />
      <input
        type="text"
        value={subServiceName}
        onChange={(e) => setSubServiceName(e.target.value)}
        placeholder="Sub-service Name"
        required
      />
      <input
        type="text"
        value={specification}
        onChange={(e) => setSpecification(e.target.value)}
        placeholder="Specification"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <button type="submit">Add/Update Service</button>
    </form>
  );
};

export default ServiceForm;