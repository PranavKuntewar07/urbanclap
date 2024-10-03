import React, { useState, useEffect } from 'react';
import { TextField, Slider, Button, Typography, Box, Avatar, Input, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { db, storage } from '../../firebase/firebase-config'; // Ensure this import matches your file structure
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for toast notifications


const ServicePanel = () => {
  const [serviceCategory, setServiceCategory] = useState('');
  const [serviceName, setServiceName] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [serviceZone, setServiceZone] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [vendorEmail, setVendorEmail] = useState('');

  // Define the service options
  const serviceOptions = {
    Electricians: ["Electrician Basic", "Electrician Advanced"],
    Plumbers: ["Plumbing Fixes", "Pipe Installation", "General Plumbing"],
    Carpenters: ["Woodworking", "Custom Carpentry", "Furniture crafting"],
    Painting: ["Interior Painting", "Exterior Painting"],
    Waterproofing: ["Waterproofing Basic", "Advanced Waterproofing"],
    Wallpanels: ["Standard Wallpanels", "Custom Wallpanels"],
    "AC Appliance & Repair": ["AC Installation", "AC Repair", "AC Service"],
    "Electronic items Repair": ["Refrigerator repair", "Air Cooler Repair", "Water Purifier Repair ", "Geyser Repair", "Inverter Repair", "Chimney Repair", "Microwave Repair", "Laptop Repair", "Gas Stove Repair", "Telivison Repair"],
    "Cleaning, Pest Control": ["Home Cleaning", "Pest Control", "Water Tank Cleaning", "Sofa and Carpet deep Cleaning", "Full Home Cleaning", "Bed Bugs Control", "Bathroom and Kitchen Cleaning", "Disinfection Service"],
    "Women's Salon, Spa & Laser Clinic": ["Facials", "Haircut & Styling", "Salon Prime", "Hydraderma Facials & Treatments", "Salon Classic", "Nail Studio", "Laser Hair Reduction", "Spa Ayurveda", "Spa Luxe", "Hair Studio For Women", "Salon Luxe", "Spa for Women"],
    "Men's Salon & Massage": ["Haircut", "Massage Therapy", "Men Therapy", "Massage For Men", "Salon Royale For Kids", "Massage For Men Ayurveda"],
  };

  // Zone options
  const zoneOptions = [
    "Wakad", "Sangavi", "Hinjewadi", "Chaturshringi", "Pimpri", "Chinchwad",
    "Nigadi", "Bhosari", "MIDC Bhosari", "Yerawada", "Vimantal",
    "Vishrantwadi", "Khadaki", "Dighi", "Mundhawa", "Hadapsar", "Kondhwa",
    "Wanawadi", "Faraskhana", "Khadak", "Vishrambaug", "Shivajinagar",
    "Deccan", "Kothrud", "Warje Malwadi", "Bharati Vidyapeeth",
    "Sahakar Nagar", "Market Yard", "Sinhagad", "Bibvewadi", "Dattawadi",
    "Swargate", "Bund Garden", "Koregaon Park", "Lashkar",
    "Samarth (Somwar Peth)"
  ];

   // Reset service name when category changes
   useEffect(() => {
    setServiceName('');
  }, [serviceCategory]);

  // Handlers
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
      // Validation
      if (!vendorEmail) {
        throw new Error('Please provide vendor email');
      }
      if (!serviceCategory || !serviceName || !serviceZone) {
        throw new Error('Please fill all required fields');
      }

      // Upload photo to Firebase Storage
      let photoURL = '';
      if (profilePhoto) {
        const photoRef = ref(storage, `profilePhotos/${Date.now()}_${profilePhoto.name}`);
        await uploadBytes(photoRef, profilePhoto);
        photoURL = await getDownloadURL(photoRef);
      }

      // Save to Firestore
      const vendorDocRef = doc(db, 'emails', vendorEmail);
      await setDoc(vendorDocRef, { email: vendorEmail }, { merge: true });

      const servicesCollectionRef = collection(vendorDocRef, 'services');
      const newServiceData = {
        serviceCategory,
        serviceName,
        priceRange,
        serviceZone,
        photoURL,
        createdAt: new Date(),
      };
      await addDoc(servicesCollectionRef, newServiceData);

      toast.success('Service saved successfully!');
      
      // Reset form
      setServiceCategory('');
      setServiceName('');
      setPriceRange([0, 1000000]);
      setServiceZone('');
      setProfilePhoto(null);

    } catch (error) {
      console.error('Error saving data:', error);
      toast.error(`Failed to save service data: ${error.message}`);
    }
  };

  return (
    <Box p={3} border={1} borderRadius={2} borderColor="grey.400" width={300}>
      <Typography variant="h6" gutterBottom>Service Panel</Typography>

      <TextField
        fullWidth
        margin="normal"
        label="Vendor Email"
        value={vendorEmail}
        onChange={(e) => setVendorEmail(e.target.value)}
        required
      />

      <FormControl fullWidth margin="normal" required>
        <InputLabel>Service Category</InputLabel>
        <Select
          value={serviceCategory}
          onChange={(e) => setServiceCategory(e.target.value)}
        >
          {Object.keys(serviceOptions).map((category) => (
            <MenuItem key={category} value={category}>{category}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal" required>
        <InputLabel>Service Name</InputLabel>
        <Select
          value={serviceName}
          onChange={(e) => setServiceName(e.target.value)}
          disabled={!serviceCategory}
        >
          {serviceOptions[serviceCategory]?.map((service) => (
            <MenuItem key={service} value={service}>{service}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal" required>
        <InputLabel>Service Zone</InputLabel>
        <Select
          value={serviceZone}
          onChange={(e) => setServiceZone(e.target.value)}
        >
          {zoneOptions.map((zone) => (
            <MenuItem key={zone} value={zone}>{zone}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography gutterBottom>Price Range</Typography>
      <Box display="flex" justifyContent="space-between">
        <TextField
          label="From"
          type="number"
          value={priceRange[0]}
          onChange={handleFromChange}
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
          type="number"
          value={priceRange[1]}
          onChange={handleToChange}
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
      <Input 
        type="file" 
        accept="image/*" 
        onChange={handlePhotoChange}
        sx={{ mt: 1 }}
      />
      {profilePhoto && (
        <Avatar 
          src={URL.createObjectURL(profilePhoto)} 
          sx={{ width: 100, height: 100, mt: 2 }} 
        />
      )}

      <Button 
        variant="contained" 
        color="primary" 
        fullWidth 
        sx={{ mt: 2 }} 
        onClick={handleSave}
      >
        Save
      </Button>

      <ToastContainer />
    </Box>
  );
};

export default ServicePanel;