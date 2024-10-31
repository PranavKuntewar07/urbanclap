import React from 'react';
import { X, Star } from 'lucide-react';
import { ShieldCheckIcon, HandThumbUpIcon as HandIcon, CheckBadgeIcon as DocumentCheckIcon } from '@heroicons/react/24/outline';

const ServiceDetailModal = ({ isOpen, onClose, service }) => {
  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-1 rounded-full hover:bg-gray-100"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>
        <div className="p-6 space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{service.title}</h2>

            <div className="flex items-center gap-1">
              <div className="bg-emerald-600 text-white px-2 py-0.5 rounded flex items-center">
                <Star className="w-4 h-4 fill-white text-white mr-1" />
                <span>{service.rating}</span>
              </div>
              <span className="text-gray-500 text-sm">{service.reviews} reviews</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xl font-semibold">₹{service.price}</span>
              <span className="text-gray-500 line-through text-sm">₹{service.originalPrice}</span>
              <span className="text-gray-600 text-sm">• {service.duration}</span>
            </div>

            <div className="text-emerald-600 text-sm">
              <span>{service.discount}</span>
            </div>
          </div>

          <hr />

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">About the service</h3>
            <ul className="space-y-4">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className="mt-1 w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <hr />

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">power</div>
              <div className="bg-purple-600 text-white px-2 rounded">saver</div>
            </div>
            <h3 className="text-2xl font-semibold">Save more on your electricity bill</h3>
            <p>With advanced foam-jet technology for superior cleaning & better savings</p>
            <button className="text-blue-600 underline">Learn how</button>
          </div>

          <hr />

          <div className="space-y-4">
            <div className="text-2xl font-semibold">CU covers</div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="bg-gray-100 p-4 rounded">
                  <ShieldCheckIcon className="w-6 h-6 text-gray-700 mx-auto" />
                </div>
                <span className="text-sm">30-day warranty</span>
              </div>
              <div className="text-center">
                <div className="bg-gray-100 p-4 rounded">
                  <HandIcon className="w-6 h-6 text-gray-700 mx-auto" />
                </div>
                <span className="text-sm">No questions asked claim</span>
              </div>
              <div className="text-center">
                <div className="bg-gray-100 p-4 rounded">
                  <DocumentCheckIcon className="w-6 h-6 text-gray-700 mx-auto" />
                </div>
                <span className="text-sm">UC verified quotes</span>
              </div>
            </div>
            <button className="text-blue-600 underline">Learn about claims process</button>
          </div>

          <hr />

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">We service all brands*</h3>
            <div className="grid grid-cols-3 gap-4">
              {["LG", "Voltas", "Haier", "Hitachi", "Panasonic", "Mitsubishi Electric", "Blue Star", "Daikin", "Samsung", "Godrej", "Toshiba", "& more"].map((brand, index) => (
                <div key={index} className="flex items-center justify-center bg-gray-100 rounded-lg p-4">
                  <span className="text-lg font-medium">{brand}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-500">
              *These trademarks or logos are used for illustration purposes only & we disclaim any specific connection with the brand in this regard.
            </p>
          </div>

          <hr />

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Energy Saving Tips</h3>
            <ul className="space-y-2">
              {[
                "Service the AC unit at least twice a year",
                "Maintain the unit at an ideal operating temperature of 24°C",
                "Keep the area around the outdoor unit (condenser) free from debris",
                "Pay attention to any unusual sounds, smells, or changes in cooling performance",
                "Avoid opening windows & doors"
              ].map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${index === 4 ? "bg-gray-300" : "bg-emerald-600"}`}>
                    {index === 4 ? (
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          <hr />

          <div className="space-y-4">
            <h3 className="text-2xl font-semibold">Frequently Asked Questions</h3>
            {[
              "Will the professional bring the tools needed for the service?",
              "How do I know whether genuine products are being used?",
              "What if during the servicing, the professional finds out an issue in the AC?",
              "Will the professional check the AC after the service?",
              "What happens if any issue occurs after the service is done?",
              "Does UC service centralized/VRV ACs?"
            ].map((question, index) => (
              <details key={index} className="border-b py-2 cursor-pointer">
                <summary className="text-gray-800 font-medium">{question}</summary>
                <p className="text-gray-600 text-sm mt-1">[Provide answer here]</p>
              </details>
            ))}
          </div>

          <hr />

        </div>
      </div>
    </div>
  );
};

export default ServiceDetailModal;
