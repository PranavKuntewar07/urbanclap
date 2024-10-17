import React, { useState, useEffect } from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config'; // Adjust the import path as needed


// Register the necessary components for Chart.js
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, ArcElement, BarElement, Tooltip, Legend);

const Dashboard = () => {
  const navigate = useNavigate();
  const [vendorName, setVendorName] = useState('');

  useEffect(() => {
    const fetchVendorName = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.user && user.user.email) {
        const email = user.user.email.toLowerCase();
        const vendorDocRef = doc(db, 'emails', email);
        try {
          const vendorDoc = await getDoc(vendorDocRef);
          if (vendorDoc.exists()) {
            // Extract vendor name from email
            const nameFromEmail = email.split('@')[0];
            // Capitalize the first letter of each word
            const formattedName = nameFromEmail.split('.').map(word =>
              word.charAt(0).toUpperCase() + word.slice(1)
            ).join(' ');
            setVendorName(formattedName);
          } else {
            console.log('No vendor document found');
            setVendorName('Vendor'); // Fallback name
          }
        } catch (error) {
          console.error("Error fetching vendor document:", error);
          setVendorName('Vendor'); // Fallback name
        }
      } else {
        console.log('No user found in localStorage');
        setVendorName('Vendor'); // Fallback name
      }
    };

    fetchVendorName();
  }, []);

  // Data for Line Chart (Sales Value)
  const lineData = {
    labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    datasets: [
      {
        label: 'Sales Value',
        data: [12000, 15000, 17000, 14000, 18000, 22000, 25000],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  // Data for Doughnut Chart (Goal Overview)
  const doughnutData = {
    labels: ['Completed', 'In Progress'],
    datasets: [
      {
        label: 'Goal Overview',
        data: [83, 17],
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderWidth: 1,
      },
    ],
  };

  // Data for Bar Chart (Customer Retention)
  const barData = {
    labels: ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    datasets: [
      {
        label: 'New Customers',
        data: [200, 300, 250, 400, 350, 450, 500],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Retained Customers',
        data: [-150, -200, -100, -300, -250, -400, -450],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
    ],
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="bg-red-600 text-white w-64 p-4 space-y-6">
        <div className="text-2xl font-bold">Choice Up</div>
        <nav className="space-y-4">
          {['Dashboard', 'Orders', 'Promotions', 'Track Orders', 'Messages'].map((item, index) => (
            <a
              href="#"
              key={index}
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-red-500"
              aria-label={item}
            >
              <span role="img" aria-label={item}>{['🏠', '📦', '🎁', '🚚', '💬'][index]}</span>
              <span>{item}</span>
            </a>
          ))}
        </nav>
        <div className="space-y-2">
          <a
            href="#"
            onClick={() => navigate('/inventory')} // Add onClick for Inventory
            className="block p-2 rounded-md hover:bg-red-500"
            aria-label="Inventory"
          >
            Inventory
          </a>
          {['Accounts', 'Support Centre'].map((item, index) => (
            <a
              href="#"
              key={index}
              className="block p-2 rounded-md hover:bg-red-500"
              aria-label={item}
            >
              {item}
            </a>
          ))}
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 p-6 bg-gray-100 ">
        {/* Top Navigation Bar */}
        <header className="flex justify-between items-center mb-6">
          <div className="relative w-1/2">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 pl-10 rounded-md bg-white shadow-sm border border-gray-300"
              aria-label="Search"
            />
            <span className="absolute top-0 left-0 mt-3 ml-3">🔍</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-bold">
              Welcome Back! <span className="text-blue-600">{vendorName}</span>
            </span>
            <button className="p-2 bg-gray-200 rounded-full" aria-label="Notifications">
              🔔
            </button>
            <img
              src="https://via.placeholder.com/150"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {/* Orders So Far */}
          <div className="bg-red-500 text-white p-4 rounded-lg shadow-md">
            <div className="text-lg font-semibold">Orders so far</div>
            <div className="text-4xl font-bold mt-2">24,000</div>
            <div className="text-sm mt-1">Compared to last month</div>
            <div className="mt-2">📈 24%</div>
          </div>

          {/* Profit */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-lg font-semibold">Profit</div>
            <div className="text-4xl font-bold text-green-600 mt-2">32%</div>
            <div className="text-sm mt-1">Compared to last month</div>
            <div className="mt-2">📈</div>
          </div>

          {/* Unique Customers */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-lg font-semibold">Unique Customers</div>
            <div className="text-4xl font-bold mt-2">14,674</div>
            <div className="text-sm mt-1">Compared to last month</div>
            <div className="mt-2">📈 24%</div>
          </div>

          {/* Revenue Growth */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-lg font-semibold">Revenue Growth</div>
            <div className="text-2xl font-bold text-green-600 mt-2">₹25,980</div>
            <div className="text-sm mt-1">Compared to last month</div>
            <div className="mt-2">📊</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="bg-white p-4 rounded-lg shadow-md mb-6">
          <div className="flex justify-between">
            <div className="text-lg font-semibold">Sales Value</div>
            <div className="space-x-4">
              {['Year', 'Month', 'Week'].map((period, index) => (
                <button
                  key={index}
                  className="p-2 bg-gray-100 rounded-md hover:bg-gray-200"
                  aria-label={`View ${period} data`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 h-48">
            <Line data={lineData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        {/* Goal Overview and Customer Retention */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Goal Overview */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-lg font-semibold">Goal Overview</div>
            <div className="flex justify-center items-center h-48">
              <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>

          {/* Customer Retention */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-lg font-semibold">Customer Retention</div>
            <div className="h-48">
              <Bar data={barData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
          {/* Latest Order Reviews */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-lg font-semibold">Latest Order Reviews</div>
            <div className="mt-4 space-y-3">
              {[
                { name: 'John Michael', rating: 4.8, color: 'text-green-600' },
                { name: 'Alex Smith', rating: 2.0, color: 'text-red-600' },
                { name: 'Samantha Ivy', rating: 4.2, color: 'text-green-600' }
              ].map((review, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://via.placeholder.com/50"
                      alt={`Profile of ${review.name}`}
                      className="w-10 h-10 rounded-full"
                    />
                    <span>{review.name}</span>
                  </div>
                  <div className={review.color}>{review.rating}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Boys */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="text-lg font-semibold">Delivery Boys</div>
            <div className="mt-4 space-y-3">
              {[
                { name: 'Karen Moss', orders: '1200 Orders' },
                { name: 'Karen Moss', orders: '1200 Orders' },
                { name: 'Eugen Sandhu', orders: '900 Orders' }
              ].map((boy, index) => (
                <div key={index} className="flex justify-between">
                  <div>{boy.name}</div>
                  <div>{boy.orders}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
