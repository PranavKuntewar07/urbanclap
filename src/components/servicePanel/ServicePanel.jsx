import React, { useState, useEffect } from 'react';
import { TextField, Slider, Button, Typography, Box, Avatar, Input, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { db, storage } from '../../firebase/firebase-config'; // Ensure this import matches your file structure
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications


const ServicePanel = () => {
  const [serviceCategory, setServiceCategory] = useState([]);
  const [serviceName, setServiceName] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [serviceZone, setServiceZone] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoURL, setPhotoURL] = useState('');

  // Define the service options
  const serviceOptions = {
    Electricians: ["Electrician Basic", "Electrician Advanced"],
    Plumbers: ["Plumbing Fixes", "Pipe Installation", "General Plumbing"],
    Carpenters: ["Woodworking", "Custom Carpentry", "Furniture crafting"],
    Painting: ["Interior Painting", "Exterior Painting"],
    Waterproofing: ["Waterproofing Basic", "Advanced Waterproofing"],
    Wallpanels: ["Standard Wallpanels", "Custom Wallpanels"],
    "AC Appliance & Repair": ["AC Installation", "AC Repair", "AC Service"],
    "Electronic items Repair": ["Refrigerator repair", "Air Cooler Repair", "Water Purifier Repair ","Geyser Repair", "Inverter Repair", "Chimney Repair", "Microwave Repair", "Laptop Repair", "Gas Stove Repair", "Telivison Repair"],
    "Cleaning, Pest Control": ["Home Cleaning", "Pest Control", "Water Tank Cleaning", "Sofa and Carpet deep Cleaning", "Full Home Cleaning", "Bed Bugs Control", "Bathroom and Kitchen Cleaning", "Disinfection Service"],
    "Women's Salon, Spa & Laser Clinic": ["Facials", "Haircut & Styling", "Salon Prime", "Hydraderma Facials & Treatments", "Salon Classic", "Nail Studio", "Laser Hair Reduction", "Spa Ayurveda", "Spa Luxe", "Hair Studio For Women", "Salon Luxe", "Spa for Women"],
    "Men's Salon & Massage": ["Haircut", "Massage Therapy", "Men Therapy", "Massage For Men", "Salon Royale For Kids", "Massage For Men Ayurveda"],
  };

  // Get service names based on the selected category
  const getServiceNames = (category) => {
    return serviceOptions[category] || [];
  };

  useEffect(() => {
    // Clear the selected service name if the selected category changes
    setServiceName('');
  }, [serviceCategory]);

  const handlePhotoChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setProfilePhoto(event.target.files[0]);
    }
  };

  const handleSliderChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleFromChange = (event) => {
    const newValue = Number(event.target.value);
    if (!isNaN(newValue) && newValue >= 0 && newValue <= priceRange[1]) {
      setPriceRange([newValue, priceRange[1]]);
    }
  };

  const handleToChange = (event) => {
    const newValue = Number(event.target.value);
    if (!isNaN(newValue) && newValue >= priceRange[0] && newValue <= 1000000) {
      setPriceRange([priceRange[0], newValue]);
    }
  };

  const handleSave = async () => {
    try {
      let photoURL = '';
  
      // Upload the profile photo if available
      if (profilePhoto) {
        const photoRef = ref(storage, `profilePhotos/${profilePhoto.name}`);
        const snapshot = await uploadBytes(photoRef, profilePhoto);
        photoURL = await getDownloadURL(photoRef);
      }
      
  
      // Save the data to Firestore
      await setDoc(collection(db, 'serviceRequests'), {
        serviceCategory,
        serviceName,
        priceRange,
        serviceZone,
        photoURL,
      });
  
      // Clear form after successful submission
      setServiceCategory('');
      setServiceName('');
      setPriceRange([0, 1000000]);
      setServiceZone('');
      setProfilePhoto(null);
      toast.success('Data saved successfully!'); // Show success toast
    } catch (error) {
      console.error('Error saving data:', error);
      if (error.message.includes('permission-denied')) {
        toast.error('You do not have permission to save data.');
      } else if (error.message.includes('network')) {
        toast.error('Network error. Please try again.');
      } else {
        toast.error('An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <Box p={3} border={1} borderRadius={2} borderColor="grey.400" width={300}>
      <Typography variant="h6">Service Panel</Typography>

      {/* Service Category Dropdown */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="service-category-label">Service Category</InputLabel>
        <Select
          labelId="service-category-label"
          
          value={serviceCategory}
          onChange={(e) => setServiceCategory(e.target.value)}
          label="Service Category"
        >
          <MenuItem value="">Select Category</MenuItem>
          {Object.keys(serviceOptions).map((category) => (
            <MenuItem key={category} value={category}>{category}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Service Name Dropdown */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="service-name-label">Service Name</InputLabel>
        <Select
          labelId="service-name-label"
          
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          label="Service Name"
          disabled={!serviceCategory}
        >
          <MenuItem value="">Select Service</MenuItem>
          {getServiceNames(serviceCategory).map((service) => (
            <MenuItem key={service} value={service}>{service}</MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Service Zone Dropdown */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="service-zone-label">Service Zone</InputLabel>
        <Select
          labelId="service-zone-label"
          
          value={serviceZone}
          onChange={(e) => setServiceZone(e.target.value)}
          label="Service Zone"
        >
          <MenuItem value="">Select Zone</MenuItem>
          <MenuItem value="Wakad">Wakad</MenuItem>
          <MenuItem value="Sangavi">Sangavi</MenuItem>
          <MenuItem value="Hinjewadi">Hinjewadi</MenuItem>
          <MenuItem value="Chaturshringi">Chaturshringi</MenuItem>
          <MenuItem value="Pimpri">Pimpri</MenuItem>
          <MenuItem value="Chinchwad">Chinchwad</MenuItem>
          <MenuItem value="Nigadi">Nigadi</MenuItem>
          <MenuItem value="Bhosari">Bhosari</MenuItem>
          <MenuItem value="MIDC Bhosari">MIDC Bhosari</MenuItem>
          <MenuItem value="Yerawada">Yerawada</MenuItem>
          <MenuItem value="Vimantal">Vimantal</MenuItem>
          <MenuItem value="Vishrantwadi">Vishrantwadi</MenuItem>
          <MenuItem value="Khadaki">Khadaki</MenuItem>
          <MenuItem value="Dighi">Dighi</MenuItem>
          <MenuItem value="Mundhawa">Mundhawa</MenuItem>
          <MenuItem value="Hadapsar">Hadapsar</MenuItem>
          <MenuItem value="Kondhwa">Kondhwa</MenuItem>
          <MenuItem value="Wanawadi">Wanawadi</MenuItem>
          <MenuItem value="Faraskhana">Faraskhana</MenuItem>
          <MenuItem value="Khadak">Khadak</MenuItem>
          <MenuItem value="Vishrambaug">Vishrambaug</MenuItem>
          <MenuItem value="Shivajinagar">Shivajinagar</MenuItem>
          <MenuItem value="Deccan">Deccan</MenuItem>
          <MenuItem value="Kothrud">Kothrud</MenuItem>
          <MenuItem value="Warje Malwadi">Warje Malwadi</MenuItem>
          <MenuItem value="Bharati Vidyapeeth">Bharati Vidyapeeth</MenuItem>
          <MenuItem value="Sahakar Nagar">Sahakar Nagar</MenuItem>
          <MenuItem value="Market Yard">Market Yard</MenuItem>
          <MenuItem value="Sinhagad">Sinhagad</MenuItem>
          <MenuItem value="Bibvewadi">Bibvewadi</MenuItem>
          <MenuItem value="Dattawadi">Dattawadi</MenuItem>
          <MenuItem value="Swargate">Swargate</MenuItem>
          <MenuItem value="Bund Garden">Bund Garden</MenuItem>
          <MenuItem value="Koregaon Park">Koregaon Park</MenuItem>
          <MenuItem value="Lashkar">Lashkar</MenuItem>
          <MenuItem value="Samarth (Somwar Peth)">Samarth (Somwar Peth)</MenuItem>
        </Select>
      </FormControl>

      <Typography gutterBottom>Price Range</Typography>
      <Box display="flex" justifyContent="space-between">
        <TextField
          label="From"
          variant="outlined"
          type="number"
          value={priceRange[0]}
          onChange={handleFromChange}
          inputProps={{ min: 0, max: priceRange[1] }}
          sx={{ width: '45%' }}
          InputProps={{
            sx: {
              'input::-webkit-outer-spin-button': { display: 'none' },
              'input::-webkit-inner-spin-button': { display: 'none' },
            }
          }}
        />
        <TextField
          label="To"
          variant="outlined"
          type="number"
          value={priceRange[1]}
          onChange={handleToChange}
          inputProps={{ min: priceRange[0], max: 1000000 }}
          sx={{ width: '45%' }}
          InputProps={{
            sx: {
              'input::-webkit-outer-spin-button': { display: 'none' },
              'input::-webkit-inner-spin-button': { display: 'none' },
            }
          }}
        />
      </Box>
      <Slider
        value={priceRange}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        min={0}
        max={1000000}
        step={500}
        sx={{ mt: 2 }}
      />

      <Typography>Profile Photo</Typography>
      <Input type="file" accept="image/*" onChange={handlePhotoChange} />
      {profilePhoto && <Avatar src={URL.createObjectURL(profilePhoto)} sx={{ width: 100, height: 100, mt: 2 }} />}
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSave}>
        Save
      </Button>

      {/* Toast Container */}
      <ToastContainer />
    </Box>
  );
};

export default ServicePanel;
