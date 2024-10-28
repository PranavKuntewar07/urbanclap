import React, { useState } from 'react';
import { db, auth } from '../../firebase/firebase-config';
import { doc, collection, addDoc, serverTimestamp } from 'firebase/firestore';

const InventoryAdd = ({ onClose, onServiceAdded }) => {
    const [formData, setFormData] = useState({
        serviceCategory: '',
        serviceName: '',
        priceRange: ['', ''],
        serviceZone: '',
        photoURL: '/api/placeholder/48/48' // Default placeholder image
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const serviceCategories = {
        "Electricians": ["Electrician Basic", "Electrician Advanced"],
        "Plumbers": ["Plumbing Fixes", "Pipe Installation", "General Plumbing"],
        "Carpenters": ["Woodworking", "Custom Carpentry", "Furniture crafting"],
        "Painting": ["Interior Painting", "Exterior Painting"],
        "Waterproofing": ["Waterproofing Basic", "Advanced Waterproofing"],
        "Wallpanels": ["Standard Wallpanels", "Custom Wallpanels"],
        "AC Appliance & Repair": ["AC Installation", "AC Repair", "AC Service"],
        "Electronic items Repair": ["Refrigerator repair", "Air Cooler Repair", "Water Purifier Repair", "Geyser Repair", "Inverter Repair", "Chimney Repair", "Microwave Repair", "Laptop Repair", "Gas Stove Repair", "Telivison Repair"],
        "Cleaning, Pest Control": ["Home Cleaning", "Pest Control", "Water Tank Cleaning", "Sofa and Carpet deep Cleaning", "Full Home Cleaning", "Bed Bugs Control", "Bathroom and Kitchen Cleaning", "Disinfection Service"],
        "Women's Salon, Spa & Laser Clinic": ["Facials", "Haircut & Styling", "Salon Prime", "Hydraderma Facials & Treatments", "Salon Classic", "Nail Studio", "Laser Hair Reduction", "Spa Ayurveda", "Spa Luxe", "Hair Studio For Women", "Salon Luxe", "Spa for Women"],
        "Men's Salon & Massage": ["Haircut", "Massage Therapy", "Men Therapy", "Massage For Men", "Salon Royale For Kids", "Massage For Men Ayurveda"]
    };

    const serviceZones = [
        "Wakad", "Sangavi", "Hinjewadi", "Chaturshringi", "Pimpri", "Chinchwad",
        "Nigadi", "Bhosari", "MIDC Bhosari", "Yerawada", "Vimantal",
        "Vishrantwadi", "Khadaki", "Dighi", "Mundhawa", "Hadapsar", "Kondhwa",
        "Wanawadi", "Faraskhana", "Khadak", "Vishrambaug", "Shivajinagar",
        "Deccan", "Kothrud", "Warje Malwadi", "Bharati Vidyapeeth",
        "Sahakar Nagar", "Market Yard", "Sinhagad", "Bibvewadi", "Dattawadi",
        "Swargate", "Bund Garden", "Koregaon Park", "Lashkar",
        "Samarth (Somwar Peth)"
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePriceRangeChange = (index, value) => {
        const newPriceRange = [...formData.priceRange];
        newPriceRange[index] = value;
        setFormData(prev => ({
            ...prev,
            priceRange: newPriceRange
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (!auth.currentUser) {
                throw new Error('You must be logged in to add a service');
            }

            // Validate form data
            if (!formData.serviceCategory || !formData.serviceName || !formData.serviceZone) {
                throw new Error('Please fill in all required fields');
            }

            if (!formData.priceRange[0] || !formData.priceRange[1]) {
                throw new Error('Please enter both minimum and maximum price');
            }

            const vendorEmail = auth.currentUser.email.toLowerCase();
            const vendorDocRef = doc(db, 'emails', vendorEmail);
            const servicesRef = collection(vendorDocRef, 'services');

            const serviceData = {
                ...formData,
                createdAt: serverTimestamp(),
                priceRange: formData.priceRange.map(price => parseFloat(price))
            };

            const docRef = await addDoc(servicesRef, serviceData);
            onServiceAdded({ id: docRef.id, ...serviceData });
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Add New Service</h2>
                    <button onClick={onClose} className="text-gray-600 hover:text-gray-800">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="serviceCategory" className="block text-sm font-medium text-gray-700 mb-1">
                            Service Category *
                        </label>
                        <select
                            id="serviceCategory"
                            name="serviceCategory"
                            value={formData.serviceCategory}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select a category</option>
                            {Object.keys(serviceCategories).map((category) => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="serviceName" className="block text-sm font-medium text-gray-700 mb-1">
                            Service Name *
                        </label>
                        <select
                            id="serviceName"
                            name="serviceName"
                            value={formData.serviceName}
                            onChange={handleChange}
                            required
                            disabled={!formData.serviceCategory}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
                        >
                            <option value="">Select a service</option>
                            {formData.serviceCategory &&
                                serviceCategories[formData.serviceCategory]?.map((service) => (
                                    <option key={service} value={service}>{service}</option>
                                ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Price Range (Rs.) *
                        </label>
                        <div className="flex space-x-4">
                            <input
                                type="number"
                                placeholder="Min Price"
                                value={formData.priceRange[0]}
                                onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                                required
                                min="0"
                                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                                type="number"
                                placeholder="Max Price"
                                value={formData.priceRange[1]}
                                onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                                required
                                min="0"
                                className="w-1/2 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="serviceZone" className="block text-sm font-medium text-gray-700 mb-1">
                            Service Zone *
                        </label>
                        <select
                            id="serviceZone"
                            name="serviceZone"
                            value={formData.serviceZone}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option value="">Select a service zone</option>
                            {serviceZones.map((zone) => (
                                <option key={zone} value={zone}>{zone}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                        >
                            {loading ? 'Adding...' : 'Add Service'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InventoryAdd;