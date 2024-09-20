import React, { useState } from 'react'; // Import useState from React
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import ContactForm from '../contactForm/ContactForm'; // Adjust path if necessary

export default function Modal({
    yourName,
    shopName,
    shopLocation,
    vendorEmail,
    setYourName,
    setShopName,
    setShopLocation,
    addNow,
    isOpen,
    closeModal
}) {
    // Define the state for showing the ContactForm
    const [isContactFormOpen, setIsContactFormOpen] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        addNow();
        setIsContactFormOpen(true); // Open the ContactForm
    };

    const handleCloseContactForm = () => {
        setIsContactFormOpen(false); // Close the ContactForm
    };

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" aria-hidden="true" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all bg-gray-50">
                                    <h2 className="text-lg font-semibold mb-4">Shop Details</h2>
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <label htmlFor="yourName" className="block mb-2 text-sm font-medium text-gray-900">
                                                Your Name
                                            </label>
                                            <input
                                                value={yourName}
                                                onChange={(e) => setYourName(e.target.value)}
                                                type="text"
                                                name="yourName"
                                                id="yourName"
                                                className="border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="shopName" className="block mb-2 text-sm font-medium text-gray-900">
                                                Shop Name
                                            </label>
                                            <input
                                                value={shopName}
                                                onChange={(e) => setShopName(e.target.value)}
                                                type="text"
                                                name="shopName"
                                                id="shopName"
                                                className="border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="shopLocation" className="block mb-2 text-sm font-medium text-gray-900">
                                                Shop Location
                                            </label>
                                            <input
                                                value={shopLocation}
                                                onChange={(e) => setShopLocation(e.target.value)}
                                                type="text"
                                                name="shopLocation"
                                                id="shopLocation"
                                                className="border outline-0 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-100"
                                                required
                                            />
                                        </div>

                                        <button
                                            type="submit"
                                            className="focus:outline-none w-full text-white bg-violet-600 hover:bg-violet-800 font-medium rounded-lg text-sm px-5 py-2.5"
                                        >
                                            Add Now
                                        </button>
                                    </form>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>

            {/* Conditionally render ContactForm */}
            {isContactFormOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-20 bg-black bg-opacity-50">
                    <div className="bg-gray-50 p-6 rounded-lg shadow-lg relative">
                        <ContactForm vendorEmail={vendorEmail} />
                        <button 
                            onClick={handleCloseContactForm} 
                            className="absolute top-4 right-4 text-white bg-red-600 p-2 rounded"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
