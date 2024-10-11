import React from 'react';
import { Bell, MessageSquare, Gift, ChevronRight } from 'lucide-react';

// OrderItem component represents a single order in the list
const OrderItem = ({ image, name, orderId, customer, address, quantity, price, status }) => (
  <div className="flex items-center justify-between py-4 border-b">
    <div className="flex items-center w-1/4">
      <img src={image} alt={name} className="w-12 h-12 rounded-full mr-4" />
      <div>
        <h3 className="font-semibold">{name}</h3>
        <p className="text-gray-500 text-sm">#{orderId}</p>
      </div>
    </div>
    <div className="w-1/4">
      <p className="font-semibold">{customer}</p>
      <p className="text-gray-500 text-sm">{address}</p>
    </div>
    <div className="text-center w-1/12">
      <p>x{quantity}</p>
    </div>
    <div className="w-1/12 text-right">
      <p className="font-semibold">${price}</p>
    </div>
    <div className="w-1/6 text-center">
      <span className={`px-3 py-1 rounded-full text-xs ${
        status === 'PENDING' ? 'bg-yellow-200 text-yellow-800' :
        status === 'DELIVERED' ? 'bg-green-200 text-green-800' :
        'bg-red-200 text-red-800'
      }`}>
        {status}
      </span>
    </div>
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

      {/* Recent Order Request section */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-2">Recent Order Request</h3>
        <p className="text-gray-500 mb-4">Lorem Ipsum is</p>
        
        {/* Table header */}
        <div className="flex items-center justify-between py-2 border-b font-semibold text-gray-600">
          <div className="w-1/4">Order</div>
          <div className="w-1/4">Customer</div>
          <div className="w-1/12 text-center">Qty</div>
          <div className="w-1/12 text-right">Price</div>
          <div className="w-1/6 text-center">Status</div>
          <div className="w-8"></div>
        </div>

        {/* Order items */}
        <OrderItem
          image="/api/placeholder/48/48"
          name="Cheese Margherita Pizza"
          orderId="02002202"
          customer="Jimmy Kueai"
          address="Shouth Corner st.41214 london"
          quantity={3}
          price={7.2}
          status="PENDING"
        />
        <OrderItem
          image="/api/placeholder/48/48"
          name="Veg Hakka Noodles"
          orderId="0245555"
          customer="Rick Wright"
          address="Blue Ocean st.41551 london"
          quantity={2}
          price={6.2}
          status="DELIVERED"
        />
        <OrderItem
          image="/api/placeholder/48/48"
          name="Veggie Paradise Pizza"
          orderId="02085558"
          customer="Murdock"
          address="Franklin Avenue st.66125 london"
          quantity={1}
          price={3.5}
          status="CANCELED"
        />
        <OrderItem
          image="/api/placeholder/48/48"
          name="Turkey burger"
          orderId="02085559"
          customer="Willie Tanner"
          address="Sunset Boulevard st.90210 los angeles"
          quantity={2}
          price={8.4}
          status="PENDING"
        />
      </div>
    </main>
  </div>
);

export default Inventory;