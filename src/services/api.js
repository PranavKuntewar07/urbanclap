import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5174/';

export const getEmails = () => axios.get(`${API_URL}/emails`);
export const getEmail = (id) => axios.get(`${API_URL}/emails/${id}`);
export const createEmail = (data) => axios.post(`${API_URL}/emails`, data);
export const updateEmail = (id, data) => axios.put(`${API_URL}/emails/${id}`, data);
export const deleteEmail = (id) => axios.delete(`${API_URL}/emails/${id}`);

export const getService = (emailId, serviceName) => axios.get(`${API_URL}/emails/${emailId}/services/${serviceName}`);
export const updateService = (emailId, serviceName, data) => axios.put(`${API_URL}/emails/${emailId}/services/${serviceName}`, data);
export const deleteService = (emailId, serviceName) => axios.delete(`${API_URL}/emails/${emailId}/services/${serviceName}`);

export const getSubService = (emailId, serviceName, subServiceName) => axios.get(`${API_URL}/emails/${emailId}/services/${serviceName}/${subServiceName}`);
export const updateSubService = (emailId, serviceName, subServiceName, data) => axios.put(`${API_URL}/emails/${emailId}/services/${serviceName}/${subServiceName}`, data);