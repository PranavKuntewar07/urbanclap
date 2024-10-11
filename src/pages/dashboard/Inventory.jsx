import React from 'react';
import { Bell, MessageSquare, Gift, ChevronRight } from 'lucide-react';

// ServiceProviderItem component represents a single service provider in the list
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
        <div className="w-1/6  text-center">${priceRange}</div>
        <div className="w-1/6 text-center">{serviceZone}</div>
        <button className="text-gray-500">
            <ChevronRight size={20} />
        </button>
    </div>
);

const Inventory = () => (
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

            {/* Service Providers section */}
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

                {/* Service provider items */}
                <ServiceProviderItem
                    image="/api/placeholder/48/48"
                    name="Home Cleaning Express"
                    serviceId="SP002202"
                    category="Home Cleaning"
                    serviceZone="North London"
                    priceRange={30}
                    status="ACTIVE"
                />
                <ServiceProviderItem
                    image="/api/placeholder/48/48"
                    name="QuickFix Plumbing"
                    serviceId="SP245555"
                    category="Plumbing"
                    serviceZone="South London"
                    priceRange={45}
                    status="BUSY"
                />
                <ServiceProviderItem
                    image="/api/placeholder/48/48"
                    name="GreenThumb Gardens"
                    serviceId="SP085558"
                    category="Gardening"
                    serviceZone="East London"
                    priceRange={25}
                    status="OFFLINE"
                />
                <ServiceProviderItem
                    image="/api/placeholder/48/48"
                    name="ElectroMasters"
                    serviceId="SP085559"
                    category="Electrician"
                    serviceZone="West London"
                    priceRange={40}
                    status="ACTIVE"
                />
            </div>
        </main>
    </div>
);

export default Inventory;