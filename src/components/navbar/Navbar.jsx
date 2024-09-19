import React, { useState, useEffect, useRef } from 'react';
import { useModal } from './ModalProvider'; // Import the context
import { useNavigate } from 'react-router-dom'; // Import Link for navigation
import { auth } from '../../firebase/firebase-config'; // Import auth from firebase-config

function Navbar() {
    const { openModal } = useModal(); // Use context to get openModal function
    const [selectedOption, setSelectedOption] = useState('');
    const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const dropdownRef = useRef(null); // Ref to manage clicks outside of the dropdown
    const navigate = useNavigate();

    useEffect(() => {

        // Handler for clicks outside the dropdown
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false); // Close dropdown if clicked outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);



    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleDropdownToggle = () => setDropdownOpen(!dropdownOpen);

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                setIsLoggedIn(false); // User is logged out
                setDropdownOpen(false);  // Successfully signed out
                navigate('/signup'); // Navigate to signup page
            })
            .catch((error) => {
                console.error('Sign out error:', error);
            });
    };

    const handleLogin = () => {
        navigate('/login'); // Navigate to login page
        setDropdownOpen(false); // Close dropdown after action
    };

    const handleSignup = () => {
        navigate('/signup'); // Navigate to signup page
        setDropdownOpen(false); // Close dropdown after action
    };


    const locationOptions = [
        { value: '', label: "What's your location?" },
        { value: 'Mumbai', label: 'Mumbai' },
        { value: 'Delhi', label: 'Delhi' },
        { value: 'Pune', label: 'Pune' },
        { value: 'Kolkata', label: 'Kolkata' },
        { value: 'Chennai', label: 'Chennai' },
        { value: 'Bangalore', label: 'Bangalore' },
        { value: 'Hyderabad', label: 'Hyderabad' },
        { value: 'Ahmedabad', label: 'Ahmedabad' },
        { value: 'Surat', label: 'Surat' },
        { value: 'My location', label: 'My location' }
    ];

    return (
        <div>
            <div className='w-[80vw] mx-auto'>
                <div className="flex justify-between items-center w-full mx-auto ">
                    <div className="flex items-center">
                        <div className="bg-black text-white px-3 py-2 rounded-md">
                            <span className="font-bold text-lg">CU</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className="ml-3 font-bold text-xs">Choice</span>
                            <span className="ml-3 font-bold text-xs">Up</span>
                        </div>
                    </div>

                    <div className="flex space-x-6">

                        <a
                            href="#"
                            onClick={(e) => { e.preventDefault(); openModal(); }}
                            className="text-gray-600 hover:text-gray-900"
                        >
                            Add Vendors
                        </a>


                        <a href="#" className="text-gray-600 hover:text-gray-900">Beauty</a>
                        <a href="#" className="text-gray-600 hover:text-gray-900">Homes</a>
                    </div>
                    <div className="flex space-x-6">
                        <div className="border w-auto my-4 flex items-center py-2 px-5 rounded-md">
                            <i className="fi fi-rr-marker" aria-hidden="true"></i>
                            <div className='ml-2 text-gray-600'>
                                <select
                                    value={selectedOption}
                                    onChange={handleChange}
                                    aria-label="Select your location"
                                    className="bg-transparent outline-none rounded-md p-2"
                                >
                                    {locationOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="border w-auto my-4 flex items-center py-2 px-5 rounded-md">
                            <i className="fi fi-rr-search" aria-hidden="true"></i>
                            <input
                                className="ml-2 text-gray-600 w-auto outline-none bg-transparent rounded-md p-2"
                                type="text"
                                placeholder='Search for AC service'
                                aria-label="Search"
                            />
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <a href="cart" aria-label="View cart">
                            <i className="fi fi-rr-shopping-cart" aria-hidden="true"></i>
                        </a>
                        <div className="relative" ref={dropdownRef}>
                            <div
                                className="flex items-center"
                            >
                                <button aria-label="User Menu" className="focus:outline-none" onClick={handleDropdownToggle} >
                                    <i className="fi fi-rr-user" aria-hidden="true"></i>
                                </button>
                                {dropdownOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                                        <div className="py-1">
                                            {isLoggedIn ? (
                                                <button
                                                    onClick={handleLogout}
                                                    className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md text-left"
                                                >
                                                    Logout
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={handleLogin}
                                                    className="block w-full px-4 py-2 text-gray-800 hover:bg-gray-100 rounded-md text-left"
                                                >
                                                    Login
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <hr />
        </div>
    );
}

export default Navbar;
