import React, { useState, useEffect } from 'react';
import { db, auth } from '../../firebase/firebase-config';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { Bell, MessageSquare, Gift, ChevronRight } from 'lucide-react';
import { FiMoreVertical } from 'react-icons/fi';

const ServiceProviderItem = ({ image, serviceId, name, category, serviceZone, priceRange }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex items-center justify-between py-4 border-b relative">
            <div className="w-1/4">
                <img src={image} alt="Provider" className="w-12 h-12 rounded-full" />
            </div>
            <div className="w-1/4 font-semibold truncate">{category}</div>
            <div className="w-1/4">
                <div className="font-semibold truncate">{name}</div>
            </div>
            <div className="w-1/6 text-center font-semibold">Rs{priceRange[0]} - {priceRange[1]}</div>
            <div className="w-1/6 text-center font-semibold truncate">{serviceZone}</div>
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
                                console.log('Edit clicked');
                                setIsOpen(false);
                            }}
                            className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded-t whitespace-nowrap"
                        >
                            Edit
                        </div>
                        <div
                            onClick={() => {
                                console.log('Delete clicked');
                                setIsOpen(false);
                            }}
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

const Inventory = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [vendorName, setVendorName] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
                        <div className="flex justify-between items-center mb-6">
                            <div>
                                <h3 className="text-xl font-semibold mb-2">Recent Order Request</h3>
                                <p className="text-gray-500">Browse and manage service</p>
                            </div>
                            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
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
                                        image={service.photoURL || "/api/placeholder/48/48"}
                                        name={service.serviceName}
                                        serviceId={service.id.slice(0, 7)}
                                        category={service.serviceCategory}
                                        serviceZone={service.serviceZone}
                                        priceRange={service.priceRange}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Inventory;