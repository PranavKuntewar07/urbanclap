import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase/firebase-config';
import { doc, getDoc, collection, getDocs, updateDoc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Bell, MessageSquare, Gift, ChevronRight } from 'lucide-react';
import { FiMoreVertical } from 'react-icons/fi';
import InventoryAdd from './InventoryAdd'; // Ensure correct casing


const ServiceProviderItem = ({ service, onEdit, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this service?')) {
            onDelete(service.id);
        }
        setIsOpen(false);
    };

    return (
        <div className="flex items-center justify-between py-4 border-b relative">
            <div className="w-1/4">
                <img src={service.photoURL || "/api/placeholder/48/48"} alt="Provider" className="w-12 h-12 rounded-full" />
            </div>
            <div className="w-1/4 font-semibold truncate">{service.serviceCategory}</div>
            <div className="w-1/4">
                <div className="font-semibold truncate">{service.serviceName}</div>
            </div>
            <div className="w-1/6 text-center font-semibold">Rs{service.priceRange[0]} - {service.priceRange[1]}</div>
            <div className="w-1/6 text-center font-semibold truncate">{service.serviceZone}</div>
            <div className="relative">
                <button
                    className="text-gray-500 p-2 hover:bg-gray-100 rounded-full"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <FiMoreVertical size={20} />
                </button>

                {isOpen && (
                    <div className="absolute right-0 mt-2 bg-white border border-gray-300 rounded shadow-lg p-2 z-10">
                        <div
                            onClick={() => {
                                onEdit(service);
                                setIsOpen(false);
                            }}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded-t whitespace-nowrap"
                        >
                            Edit
                        </div>
                        <div
                            onClick={handleDelete}
                            className="px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer rounded-b whitespace-nowrap"
                        >
                            Delete
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const EditServiceForm = ({ service, onSave, onCancel }) => {
    const [editedService, setEditedService] = useState(service);

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
        setEditedService(prev => ({ ...prev, [name]: value }));
    };

    const handlePriceRangeChange = (index, value) => {
        const newPriceRange = [...editedService.priceRange];
        newPriceRange[index] = value;
        setEditedService(prev => ({ ...prev, priceRange: newPriceRange }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(editedService);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full h-auto max-h-screen">
            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Edit Service</h3>

            {/* Service Category */}
            <div className="mb-5">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="serviceCategory">
                    Service Category
                </label>
                <select
                    id="serviceCategory"
                    name="serviceCategory"
                    value={editedService.serviceCategory}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-gray-700"
                >
                    <option value="" disabled>Select a category</option>
                    {Object.keys(serviceCategories).map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            {/* Service Name */}
            <div className="mb-5">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="serviceName">
                    Service Name
                </label>
                <select
                    id="serviceName"
                    name="serviceName"
                    value={editedService.serviceName}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-gray-700"
                    disabled={!editedService.serviceCategory}
                >
                    <option value="" disabled>Select a service</option>
                    {editedService.serviceCategory && serviceCategories[editedService.serviceCategory]?.map((name, index) => (
                        <option key={index} value={name}>{name}</option>
                    ))}
                </select>
            </div>

            {/* Price Range */}
            <div className="mb-5">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="priceRange">
                    Price Range
                </label>
                <div className="flex space-x-4">
                    <input
                        type="number"
                        id="priceRangeMin"
                        placeholder="Min Price"
                        value={editedService.priceRange[0]}
                        onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                        className="block w-1/2 px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-gray-700"
                    />
                    <input
                        type="number"
                        id="priceRangeMax"
                        placeholder="Max Price"
                        value={editedService.priceRange[1]}
                        onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                        className="block w-1/2 px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-gray-700"
                    />
                </div>
            </div>

            {/* Service Zone */}
            <div className="mb-5">
                <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="serviceZone">
                    Service Zone
                </label>
                <select
                    id="serviceZone"
                    name="serviceZone"
                    value={editedService.serviceZone}
                    onChange={handleChange}
                    className="block w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-gray-700"
                >
                    <option value="">Select Service Zone</option>
                    {serviceZones.map((zone) => (
                        <option key={zone} value={zone}>
                            {zone}
                        </option>
                    ))}
                </select>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-5 rounded-lg focus:outline-none focus:shadow-outline"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-5 rounded-lg focus:outline-none focus:shadow-outline"
                >
                    Save Changes
                </button>
            </div>
        </form>
    );
};


const Inventory = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [vendorName, setVendorName] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [editingService, setEditingService] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    const vendorEmail = user.email.toLowerCase();
                    const vendorDocRef = doc(db, 'emails', vendorEmail);
                    const vendorDoc = await getDoc(vendorDocRef);

                    if (!vendorDoc.exists()) {
                        setError('Vendor profile not found');
                        setLoading(false);
                        return;
                    }

                    setVendorName(vendorDoc.data().name || 'Vendor');

                    const servicesRef = collection(vendorDocRef, 'services');
                    const servicesSnapshot = await getDocs(servicesRef);

                    const fetchedServices = servicesSnapshot.docs.map(doc => ({
                        id: doc.id,
                        serviceCategory: doc.data().serviceCategory,
                        serviceName: doc.data().serviceName,
                        priceRange: doc.data().priceRange || ['0', '0'],
                        serviceZone: doc.data().serviceZone,
                        photoURL: doc.data().photoURL,
                        createdAt: doc.data().createdAt?.toDate(),
                    }));

                    fetchedServices.sort((a, b) => b.createdAt - a.createdAt);
                    setServices(fetchedServices);
                    setLoading(false);
                } catch (err) {
                    setError('Error fetching services. Please try again later.');
                    setLoading(false);
                }
            } else {
                setError('Please sign in to view inventory');
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const handleClickOutside = (e) => {
        const dropdowns = document.querySelectorAll('.dropdown-menu');
        dropdowns.forEach(dropdown => {
            if (!dropdown.contains(e.target)) {
                // Close the dropdown
                const button = dropdown.previousElementSibling;
                if (button) {
                    button.click();
                }
            }
        });
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleServiceAdded = (newService) => {
        setServices(prevServices => [newService, ...prevServices]);
    };

    const handleEdit = (service) => {
        setEditingService(service);
    };

    const handleSave = async (editedService) => {
        try {
            const vendorEmail = auth.currentUser.email.toLowerCase();
            const vendorDocRef = doc(db, 'emails', vendorEmail);
            const serviceDocRef = doc(vendorDocRef, 'services', editedService.id);

            await updateDoc(serviceDocRef, {
                serviceName: editedService.serviceName,
                serviceCategory: editedService.serviceCategory,
                priceRange: editedService.priceRange,
                serviceZone: editedService.serviceZone,
            });

            setServices(prevServices =>
                prevServices.map(service =>
                    service.id === editedService.id ? editedService : service
                )
            );
            setEditingService(null);
        } catch (err) {
            console.error('Error updating service:', err);
            setError('Failed to update service. Please try again.');
        }
    };

    const handleCancel = () => {
        setEditingService(null);
    };


    const handleDelete = async (serviceId) => {
        try {
            const vendorEmail = auth.currentUser.email.toLowerCase();
            const vendorDocRef = doc(db, 'emails', vendorEmail);
            const serviceDocRef = doc(vendorDocRef, 'services', serviceId);

            await deleteDoc(serviceDocRef);

            setServices(prevServices => prevServices.filter(service => service.id !== serviceId));
        } catch (err) {
            console.error('Error deleting service:', err);
            setError('Failed to delete service. Please try again.');
        }
    };


    return (
        <div className="flex min-h-screen max-h-screen overflow-hidden bg-gray-100">
            {/* Sidebar */}
            <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} bg-red-500 text-white p-6 transition-all duration-300 flex-shrink-0`}>
                <div className="flex items-center justify-between mb-8">
                    <h1 className={`text-2xl font-bold ${!isSidebarOpen && 'hidden'}`}>Choice Up</h1>
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="text-white hover:bg-red-600 p-2 rounded"
                    >
                        ☰
                    </button>
                </div>
                <nav>
                    <ul>
                        <li className="mb-4">
                            <a href="#" className="flex items-center hover:bg-red-600 p-2 rounded transition-colors">
                                {/* <span className="mr-2">☰</span> */}
                                {isSidebarOpen && 'Inventory'}
                            </a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="flex items-center hover:bg-red-600 p-2 rounded transition-colors">
                                {isSidebarOpen && 'Analytics'}
                            </a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="flex items-center hover:bg-red-600 p-2 rounded transition-colors">
                                {isSidebarOpen && 'Review'}
                            </a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="flex items-center hover:bg-red-600 p-2 rounded transition-colors">
                                {isSidebarOpen && 'Order'}
                            </a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="flex items-center hover:bg-red-600 p-2 rounded transition-colors">
                                {isSidebarOpen && 'Order List'}
                            </a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="flex items-center hover:bg-red-600 p-2 rounded transition-colors">
                                {isSidebarOpen && 'Customer List'}
                            </a>
                        </li>
                        {isSidebarOpen && (
                            <>
                                <li className="mb-4">
                                    <a href="#" className="flex items-center justify-between hover:bg-red-600 p-2 rounded transition-colors">
                                        <span>Apps</span>
                                        <ChevronRight size={16} />
                                    </a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="flex items-center justify-between hover:bg-red-600 p-2 rounded transition-colors">
                                        <span>Charts</span>
                                        <ChevronRight size={16} />
                                    </a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="flex items-center justify-between hover:bg-red-600 p-2 rounded transition-colors">
                                        <span>Bootstrap</span>
                                        <ChevronRight size={16} />
                                    </a>
                                </li>
                                <li className="mb-4">
                                    <a href="#" className="flex items-center justify-between hover:bg-red-600 p-2 rounded transition-colors">
                                        <span>Plugins</span>
                                        <ChevronRight size={16} />
                                    </a>
                                </li>
                            </>
                        )}
                    </ul>
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="flex justify-between items-center p-8 bg-white shadow-sm">
                    <h2 className="text-2xl font-semibold">Inventory</h2>
                    <div className="flex items-center space-x-4">
                        <button className="p-2 bg-white rounded-full shadow relative hover:bg-gray-50 transition-colors">
                            <Bell />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                12
                            </span>
                        </button>
                        <button className="p-2 bg-white rounded-full shadow relative hover:bg-gray-50 transition-colors">
                            <MessageSquare />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                5
                            </span>
                        </button>
                        <button className="p-2 bg-white rounded-full shadow hover:bg-gray-50 transition-colors">
                            <Gift />
                        </button>
                        <div className="flex items-center">
                            <span className="mr-2 text-right">
                                <div className="text-sm text-gray-600">Good Morning</div>
                                <div className="font-semibold">{vendorName}</div>
                            </span>
                            <img src="/api/placeholder/50/50" alt="Profile" className="w-12 h-12 rounded-full" />
                        </div>
                    </div>
                </header>

                <div className="flex-1 p-8 overflow-auto">
                    <div className="bg-white p-6 rounded-lg shadow">
                        {editingService ? (
                            <EditServiceForm
                                service={editingService}
                                onSave={handleSave}
                                onCancel={handleCancel}
                            />
                        ) : (
                            <>
                                <div className="flex justify-between items-center mb-6">
                                    <div>
                                        <h3 className="text-xl font-semibold mb-2">Recent Order Request</h3>
                                        <p className="text-gray-500">Browse and manage service</p>
                                    </div>
                                    <button
                                        onClick={() => setShowAddForm(true)}
                                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                                    >
                                        Add New Service
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <div className="min-w-full">
                                        <div className="flex items-center justify-between py-2 border-b font-semibold text-gray-600">
                                            <div className="w-1/4">Profile Photo</div>
                                            <div className="w-1/4">Service Category</div>
                                            <div className="w-1/4">Service Name</div>
                                            <div className="w-1/6 text-center">Price Range</div>
                                            <div className="w-1/6 text-center">Service Zone</div>
                                            <div className="w-8"></div>
                                        </div>

                                        {loading && (
                                            <div className="py-8 text-center">
                                                <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-red-500 border-t-transparent"></div>
                                                <div className="mt-2 text-gray-600">Loading services...</div>
                                            </div>
                                        )}

                                        {error && (
                                            <div className="py-8 text-center">
                                                <div className="text-red-500 bg-red-50 p-4 rounded-lg inline-block">
                                                    {error}
                                                </div>
                                            </div>
                                        )}

                                        {!loading && !error && services.length === 0 && (
                                            <div className="py-8 text-center text-gray-500">
                                                No services found. Click "Add New Service" to get started.
                                            </div>
                                        )}

                                        {!loading && !error && services.map((service) => (
                                            <ServiceProviderItem
                                                key={service.id}
                                                service={service}
                                                onEdit={handleEdit}
                                                onDelete={handleDelete}
                                            />
                                        ))}

                                        {showAddForm && (
                                            <InventoryAdd
                                                onClose={() => setShowAddForm(false)}
                                                onServiceAdded={handleServiceAdded}
                                            />
                                        )}

                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Inventory;