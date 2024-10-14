import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/firebase-config';
import { collection, getDocs, query, collectionGroup } from 'firebase/firestore';
import { Bell, MessageSquare, Gift, ChevronRight } from 'lucide-react';

// ServiceProviderItem component for rendering individual service items
const ServiceProviderItem = ({ image, serviceId, name, category, serviceZone, priceRange }) => (
    <div className="flex items-center justify-between py-4 border-b">
        <div className="w-1/4">
            <img src={image} alt="Provider" className="w-12 h-12 rounded-full" />
        </div>
        <div className="w-1/4">{category}</div>
        <div className="w-1/4">
            <div className="font-semibold">{name}</div>
            <div className="text-gray-500 text-sm">#{serviceId}</div>
        </div>
        <div className="w-1/6 text-center">${priceRange}</div>
        <div className="w-1/6 text-center">{serviceZone}</div>
        <button className="text-gray-500">
            <ChevronRight size={20} />
        </button>
    </div>
);

const Inventory = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                // Query all 'services' subcollections across all vendor documents
                const servicesQuery = query(collectionGroup(db, 'services'));
                const querySnapshot = await getDocs(servicesQuery);
                
                // Process and transform the fetched data
                const fetchedServices = querySnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        serviceCategory: data.serviceCategory,
                        serviceName: data.serviceName,
                        priceRange: data.priceRange,
                        serviceZone: data.serviceZone,
                        photoURL: data.photoURL,
                        createdAt: data.createdAt?.toDate(),
                    };
                });
                
                // Sort services by creation date, newest first
                fetchedServices.sort((a, b) => b.createdAt - a.createdAt);
                
                setServices(fetchedServices);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching services:", err);
                setError('Error fetching services. Please try again later.');
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return (
        <div className="flex bg-gray-100 min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-red-500 text-white p-6">
                <h1 className="text-2xl font-bold mb-8">Deonde</h1>
                <nav>
                    <ul>
                        <li className="mb-4">
                            <a href="#" className="flex items-center">
                                <span className="mr-2">☰</span> Inventory
                            </a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="flex items-center">
                                Analytics
                            </a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="flex items-center">
                                Review
                            </a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="flex items-center">
                                Order
                            </a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="flex items-center">
                                Order List
                            </a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="flex items-center">
                                Customer List
                            </a>
                        </li>
                        {/* Expandable menu items */}
                        <li className="mb-4">
                            <a href="#" className="flex items-center justify-between">
                                <span>Apps</span>
                                <ChevronRight size={16} />
                            </a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="flex items-center justify-between">
                                <span>Charts</span>
                                <ChevronRight size={16} />
                            </a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="flex items-center justify-between">
                                <span>Bootstrap</span>
                                <ChevronRight size={16} />
                            </a>
                        </li>
                        <li className="mb-4">
                            <a href="#" className="flex items-center justify-between">
                                <span>Plugins</span>
                                <ChevronRight size={16} />
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main content area */}
            <main className="flex-1 p-8">
                {/* Header */}
                <header className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-semibold">Inventory</h2>
                    <div className="flex items-center">
                        {/* Notification icons */}
                        <button className="p-2 bg-white rounded-full shadow mr-4 relative">
                            <Bell />
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                12
                            </span>
                        </button>
                        <button className="p-2 bg-white rounded-full shadow mr-4 relative">
                            <MessageSquare />
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                                5
                            </span>
                        </button>
                        <button className="p-2 bg-white rounded-full shadow mr-4">
                            <Gift />
                        </button>
                        {/* User profile */}
                        <div className="flex items-center">
                            <span className="mr-2 text-right">
                                <div>Good Morning</div>
                                <div className="font-semibold">Jonathan Higgins</div>
                            </span>
                            <img src="/api/placeholder/50/50" alt="Profile" className="w-12 h-12 rounded-full" />
                        </div>
                    </div>
                </header>

                {/* Services List */}
                <div className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-xl font-semibold mb-2">Recent Order Request</h3>
                    <p className="text-gray-500 mb-4">Browse and manage service</p>

                    {/* Table header */}
                    <div className="flex items-center justify-between py-2 border-b font-semibold text-gray-600">
                        <div className="w-1/4">Profile Photo</div>
                        <div className="w-1/4">Service Category</div>
                        <div className="w-1/4">Service Name</div>
                        <div className="w-1/6 text-center">Price Range</div>
                        <div className="w-1/6 text-center">Service Zone</div>
                        <div className="w-8"></div>
                    </div>

                    {/* Loading and error states */}
                    {loading && <div className="py-4 text-center">Loading services...</div>}
                    {error && <div className="py-4 text-center text-red-500">{error}</div>}
                    
                    {/* Service items */}
                    {!loading && !error && services.map((service) => (
                        <ServiceProviderItem
                            key={service.id}
                            image={service.photoURL || "/api/placeholder/48/48"}
                            name={service.serviceName}
                            serviceId={service.id.slice(0, 7)}
                            category={service.serviceCategory}
                            serviceZone={service.serviceZone}
                            priceRange={service.priceRange}
                        />
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Inventory;