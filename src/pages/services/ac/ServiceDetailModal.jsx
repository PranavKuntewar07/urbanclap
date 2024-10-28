import React from 'react';
import { Star, X } from 'lucide-react';

const ServiceDetailModal = ({ isOpen, onClose, service }) => {

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="relative w-80 bg-white rounded-lg shadow-lg p-6">
        {/* Close Button */}
        <button className="absolute top-0 right-0 translate-x-3 -translate-y-3 bg-white border border-gray-300 rounded-full w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100">
          ✕
        </button>

        {/* Service Header */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Power saver service (2 ACs)</h2>
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-2">⭐ 4.82</span>
            <span>606K reviews</span>
          </div>
          <div className="flex items-center text-gray-700 mt-1">
            <span className="text-lg font-semibold">₹1228</span>
            <span className="text-sm line-through ml-2 text-gray-500">₹1338</span>
            <span className="ml-2 text-sm">• 1 hr 30 mins</span>
          </div>
          <div className="text-green-600 text-sm mt-1">₹110 off 2nd item onwards</div>
        </div>

        {/* Service Details */}
        <div className="mb-4">
          <h3 className="text-md font-semibold mb-2">About the service</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="text-green-600 mr-2">✔</span>
              Advanced Foam-jet cleaning of indoor unit
            </li>
            <li className="flex items-center">
              <span className="text-green-600 mr-2">✔</span>
              Thorough cleaning of outdoor unit
            </li>
            <li className="flex items-center">
              <span className="text-green-600 mr-2">✔</span>
              Final checks & clean-up
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="text-center">
          <span className="font-semibold text-indigo-600">powersaver</span>
          <p className="text-sm text-gray-600">Save more on your electricity bill</p>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailModal;