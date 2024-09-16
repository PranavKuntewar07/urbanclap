import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Avatar, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { db, storage, collection, addDoc, ref, uploadBytes, getDownloadURL } from '../../firebase/firebase-config';
import { toast } from 'react-toastify';

const ServicePanel = ({ isOpen, onClose }) => {
  const [vendor, setVendor] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    categories: [{ name: '', subcategories: [{ name: '', services: [{ name: '', price: 0 }] }] }]
  });
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleVendorChange = (e) => {
    setVendor({ ...vendor, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (index, value) => {
    const updatedCategories = [...vendor.categories];
    updatedCategories[index].name = value;
    setVendor({ ...vendor, categories: updatedCategories });
  };

  const handleSubcategoryChange = (catIndex, subIndex, value) => {
    const updatedCategories = [...vendor.categories];
    updatedCategories[catIndex].subcategories[subIndex].name = value;
    setVendor({ ...vendor, categories: updatedCategories });
  };

  const handleServiceChange = (catIndex, subIndex, serviceIndex, field, value) => {
    const updatedCategories = [...vendor.categories];
    updatedCategories[catIndex].subcategories[subIndex].services[serviceIndex][field] = value;
    setVendor({ ...vendor, categories: updatedCategories });
  };

  const addCategory = () => {
    setVendor({
      ...vendor,
      categories: [...vendor.categories, { name: '', subcategories: [{ name: '', services: [{ name: '', price: 0 }] }] }]
    });
  };

  const addSubcategory = (catIndex) => {
    const updatedCategories = [...vendor.categories];
    updatedCategories[catIndex].subcategories.push({ name: '', services: [{ name: '', price: 0 }] });
    setVendor({ ...vendor, categories: updatedCategories });
  };

  const addService = (catIndex, subIndex) => {
    const updatedCategories = [...vendor.categories];
    updatedCategories[catIndex].subcategories[subIndex].services.push({ name: '', price: 0 });
    setVendor({ ...vendor, categories: updatedCategories });
  };

  const handlePhotoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePhoto(event.target.files[0]);
    }
  };

  const handleSave = async () => {
    try {
      let photoURL = '';
      if (profilePhoto) {
        const photoRef = ref(storage, `profilePhotos/${profilePhoto.name}`);
        const snapshot = await uploadBytes(photoRef, profilePhoto);
        photoURL = await getDownloadURL(photoRef);
      }

      await addDoc(collection(db, 'vendors'), {
        ...vendor,
        photoURL,
      });

      toast.success('Vendor added successfully!');
      onClose();
    } catch (error) {
      console.error('Error saving vendor:', error);
      toast.error('Failed to add vendor. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <Box p={3} border={1} borderRadius={2} borderColor="grey.400" width={400}>
      <Typography variant="h6">Add New Vendor</Typography>
      
      <TextField fullWidth margin="normal" name="name" label="Vendor Name" value={vendor.name} onChange={handleVendorChange} />
      <TextField fullWidth margin="normal" name="email" label="Email" value={vendor.email} onChange={handleVendorChange} />
      <TextField fullWidth margin="normal" name="phone" label="Phone" value={vendor.phone} onChange={handleVendorChange} />
      <TextField fullWidth margin="normal" name="address" label="Address" value={vendor.address} onChange={handleVendorChange} />

      {vendor.categories.map((category, catIndex) => (
        <Box key={catIndex} mt={2}>
          <TextField fullWidth label={`Category ${catIndex + 1}`} value={category.name} onChange={(e) => handleCategoryChange(catIndex, e.target.value)} />
          
          {category.subcategories.map((subcategory, subIndex) => (
            <Box key={subIndex} ml={2} mt={1}>
              <TextField fullWidth label={`Subcategory ${subIndex + 1}`} value={subcategory.name} onChange={(e) => handleSubcategoryChange(catIndex, subIndex, e.target.value)} />
              
              {subcategory.services.map((service, serviceIndex) => (
                <Box key={serviceIndex} ml={2} mt={1} display="flex">
                  <TextField 
                    label={`Service ${serviceIndex + 1}`} 
                    value={service.name} 
                    onChange={(e) => handleServiceChange(catIndex, subIndex, serviceIndex, 'name', e.target.value)}
                    sx={{ flex: 2, mr: 1 }}
                  />
                  <TextField 
                    label="Price" 
                    type="number" 
                    value={service.price} 
                    onChange={(e) => handleServiceChange(catIndex, subIndex, serviceIndex, 'price', Number(e.target.value))}
                    sx={{ flex: 1 }}
                  />
                </Box>
              ))}
              <Button onClick={() => addService(catIndex, subIndex)}>Add Service</Button>
            </Box>
          ))}
          <Button onClick={() => addSubcategory(catIndex)}>Add Subcategory</Button>
        </Box>
      ))}
      <Button onClick={addCategory}>Add Category</Button>

      <Typography mt={2}>Profile Photo</Typography>
      <input type="file" accept="image/*" onChange={handlePhotoChange} />
      {profilePhoto && <Avatar src={URL.createObjectURL(profilePhoto)} sx={{ width: 100, height: 100, mt: 2 }} />}

      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleSave}>Save</Button>
        <Button variant="outlined" onClick={onClose} sx={{ ml: 1 }}>Cancel</Button>
      </Box>
    </Box>
  );
};

export default ServicePanel;