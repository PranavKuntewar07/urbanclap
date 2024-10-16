import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Firestore imports
import { auth, db } from '../../firebase/firebase-config'; // Ensure db is imported
import { toast } from 'react-toastify';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = async () => {
        const toastId = "login-toast";  // Unique toast ID to prevent duplicate messages
        
        try {
            console.log("Starting login process...");
            
            // Firebase Authentication Login
            const result = await signInWithEmailAndPassword(auth, email, password);
            const user = result.user;

            console.log("User logged in successfully:", user.email);

            // Prevent duplicate success toast
            if (!toast.isActive(toastId)) {
                toast.success("Login successful", {
                    toastId,  // Assign a unique toast ID
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }

            // Store result in localStorage (optional)
            localStorage.setItem('user', JSON.stringify(result));

            // Vendor Email: Fetch the vendor's email from Firestore (emails collection)
            console.log(`Fetching vendor email for: ${email.toLowerCase()} from Firestore...`);
            const vendorDocRef = doc(db, 'emails', email.toLowerCase());
            const vendorDoc = await getDoc(vendorDocRef);

            // Check if vendor email exists
            if (vendorDoc.exists()) {
                const vendorEmail = vendorDoc.data()?.email?.toLowerCase();
                console.log("Vendor email found in Firestore:", vendorEmail);
                
                // Compare user email with vendor email
                if (user.email.toLowerCase() === vendorEmail) {
                    console.log("Emails match. Navigating to dashboard...");
                    navigate('/dashboard');  // Navigate to dashboard if emails match
                    return;  // Early return to prevent further processing
                } else {
                    console.log("Emails do not match. Navigating to home page...");
                }
            } else {
                console.log("No vendor email found in Firestore. Navigating to home page...");
            }

            // If no matching vendor email, navigate to the home page
            navigate('/');

        } catch (error) {
            console.error("Login error: ", error);
            
            // Prevent duplicate error toast
            if (!toast.isActive(toastId)) {
                toast.error("Login failed", {
                    toastId,  // Assign the same unique toast ID for error
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });
            }
        }
    };

    return (
        <div className='flex justify-center items-center h-screen'>
            <div className='bg-gray-800 px-10 py-10 rounded-xl'>
                <div>
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
                </div>
                <div>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        name='email'
                        className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                    />
                </div>
                <div className='flex justify-center mb-3'>
                    <button
                        onClick={login}
                        className='bg-yellow-500 w-full text-black font-bold px-2 py-2 rounded-lg'>
                        Login
                    </button>
                </div>
                <div>
                    <h2 className='text-white'>
                        Don't have an account? <Link className='text-yellow-500 font-bold' to={'/signup'}>Signup</Link>
                    </h2>
                </div>
            </div>
        </div>
    );
}

export default Login;
