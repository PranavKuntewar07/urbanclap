import React, { createContext, useContext, useState } from 'react';
import Modal from './Modal';

const ModalContext = createContext();

export function useModal() {
    return useContext(ModalContext);
}

function ModalProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    
    const [yourName, setYourName] = useState('');
    const [shopName, setShopName] = useState('');
    const [shopLocation, setShopLocation] = useState('');

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const addNow = () => {
        // Add your logic for Buy Now here
        console.log('Add Now clicked');
    };

    const value = {
        isOpen,
        openModal,
        closeModal,
        yourName,
        setYourName,
        shopName,
        setShopName,
        shopLocation,
        setShopLocation,
        addNow


        // address,
        // setAddress,
        // pincode,
        // setPincode,
        // phoneNumber,
        // setPhoneNumber,
    };

    return (
        <ModalContext.Provider value={value}>
            {children}
            <Modal
                setYourName={setYourName}
                setShopName={setShopName}
                setShopLocation={setShopLocation}
                addNow={addNow}
                isOpen={isOpen}
                closeModal={closeModal}
                // name={name}
                // address={address}
                // pincode={pincode}
                // phoneNumber={phoneNumber}
            />
        </ModalContext.Provider>
    );
}

export default ModalProvider;
