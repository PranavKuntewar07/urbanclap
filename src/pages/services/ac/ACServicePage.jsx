import React, { useState } from 'react';
import { Star, Package, Search, ShoppingCart, Settings } from 'lucide-react';
import ServiceDetailModal from './ServiceDetailModal';



const ACServicePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const services = [
    {
      id: 1,
      title: "Power saver service (2 ACs)",
      providerName: "Rajubhai Services",
      rating: "4.82",
      reviews: "606K",
      pricePerAC: 569,
      price: 1228,
      originalPrice: 1338,
      duration: "1 hr 30 mins",
      discount: "₹110 off 2nd item onwards",
      features: [
        "Advanced Foam-jet cleaning of indoor unit",
        "Thorough cleaning of outdoor unit",
        "Final checks & clean-up"
      ]
    },
    {
      id: 2,
      title: "Power saver service (2 ACs)",
      providerName: "Kajubhai Bhide Services",
      rating: "4.82",
      reviews: "606K",
      pricePerAC: 569,
      price: 1228,
      originalPrice: 1338,
      duration: "1 hr 30 mins",
      discount: "₹110 off 2nd item onwards",
      features: [
        "Advanced Foam-jet cleaning of indoor unit",
        "Thorough cleaning of outdoor unit",
        "Final checks & clean-up"
      ]
    }
  ];

  const handleViewDetails = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="w-[83vw] mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center">
                <div className="bg-black text-white font-bold px-2 py-1 rounded">CU</div>
                <span className="ml-2 font-semibold">ChoiceUp</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search in AC Repair & Service"
                  className="pl-10 pr-4 py-2 border rounded-lg w-72"
                />
              </div>
              <div className="relative">
                <ShoppingCart size={24} />
                <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-[83vw] mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-4">Select a service</h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-purple-50 rounded-lg cursor-pointer">
                  <Package className="text-purple-600 mr-3" />
                  <span className="font-medium">Super saver packages</span>
                </div>
                <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <Settings className="text-gray-600 mr-3" />
                  <span>Service</span>
                </div>
                <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <Package className="text-gray-600 mr-3" />
                  <span>Repair & gas refill</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-6">
            <h2 className="text-2xl font-bold mb-6">AC Repair & Service </h2>

            <div className="space-y-6">
              {services.map((service) => (
                <div key={service.id} className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-4">
                      <div>
                        <p className="text-green-600 font-medium">₹{service.pricePerAC} PER AC</p>
                        <h3 className="text-xl font-semibold">{service.providerName}</h3>
                      </div>

                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-purple-600 text-purple-600" />
                        <span className="text-purple-600 text-sm">{service.rating}</span>
                        <span className="text-gray-500 text-sm">({service.reviews} reviews)</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-black font-medium">₹{service.price}</span>
                        <span className="text-gray-500 line-through text-sm">₹{service.originalPrice}</span>
                        <span className="text-gray-600 text-sm">• {service.duration}</span>
                      </div>

                      <div className="text-emerald-600 text-sm">
                        <span>{service.discount}</span>
                      </div>

                      <hr className="my-2" />

                      <ul className="list-disc list-inside text-gray-600 space-y-2 text-sm">
                        {service.features.slice(0, 2).map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>

                    <button className="px-8 py-2 rounded-lg bg-white border border-purple-600 text-purple-600 hover:bg-purple-50 transition-colors text-sm">
                      Add
                    </button>
                  </div>

                  <div className="mt-2">
                    <button
                      onClick={() => handleViewDetails(service)}
                      className="text-purple-600 text-sm hover:text-purple-700"
                    >
                      View details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-3">
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="flex justify-center items-center h-32 border-2 border-dashed border-gray-200 rounded-lg">
                <div className="text-center text-gray-500">
                  <ShoppingCart className="mx-auto mb-2" />
                  <p>No items in your cart</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <h3 className="font-semibold mb-4">Buy more save more</h3>
              <p className="text-green-600">₹110 off 2nd item onwards</p>
              <button className="text-purple-600 mt-2">View More Offers ↓</button>
            </div>

            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold">CU Promise</h3>
                <div className="bg-blue-100 p-2 rounded-full">
                  <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                </div>
              </div>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Verified Professionals
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Hassle Free Booking
                </li>
                <li className="flex items-center">
                  <span className="mr-2">✓</span>
                  Transparent Pricing
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <ServiceDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
      />
    </div>
  );
};

export default ACServicePage;